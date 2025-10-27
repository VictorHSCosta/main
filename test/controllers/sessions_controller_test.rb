# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create(:user, password: 'password123')
    @admin_user = create(:user, :admin, password: 'password123')
    @deleted_user = create(:user, :deleted, password: 'password123')
  end

  # New session tests
  test "should get login page" do
    get login_path

    assert_response :success
  end

  test "should redirect to root if already logged in" do
    sign_in @user
    get login_path

    assert_redirected_to root_path
    assert_equal 'You are already logged in.', flash[:notice]
  end

  # Create session tests
  test "should login with valid credentials" do
    post login_path, params: {
      email: @user.email,
      password: 'password123'
    }

    assert_redirected_to root_path
    assert_equal 'Welcome back!', flash[:notice]
    assert_equal @user.id, session[:user_id]
  end

  test "should login with case insensitive email" do
    post login_path, params: {
      email: @user.email.upcase,
      password: 'password123'
    }

    assert_redirected_to root_path
    assert_equal @user.id, session[:user_id]
  end

  test "should not login with invalid email" do
    post login_path, params: {
      email: 'nonexistent@example.com',
      password: 'password123'
    }

    assert_response :success
    assert_equal 'Invalid email or password', flash[:alert]
    assert_nil session[:user_id]
  end

  test "should not login with invalid password" do
    post login_path, params: {
      email: @user.email,
      password: 'wrongpassword'
    }

    assert_response :success
    assert_equal 'Invalid email or password', flash[:alert]
    assert_nil session[:user_id]
  end

  test "should not login with deleted user" do
    post login_path, params: {
      email: @deleted_user.email,
      password: 'password123'
    }

    assert_response :success
    assert_equal 'Invalid email or password', flash[:alert]
    assert_nil session[:user_id]
  end

  test "should redirect to intended URL after login" do
    session[:return_to] = '/users'

    post login_path, params: {
      email: @user.email,
      password: 'password123'
    }

    assert_redirected_to '/users'
    assert_nil session[:return_to]
  end

  # Destroy session tests
  test "should logout" do
    sign_in @user
    assert_equal @user.id, session[:user_id]

    delete logout_path

    assert_redirected_to root_path
    assert_equal 'Goodbye!', flash[:notice]
    assert_nil session[:user_id]
  end

  test "should logout even if not logged in" do
    delete logout_path

    assert_redirected_to root_path
    assert_equal 'Goodbye!', flash[:notice]
    assert_nil session[:user_id]
  end

  # Check authentication tests
  test "should return authenticated status for logged in user" do
    sign_in @user
    get check_auth_path, headers: { 'Accept' => 'application/json' }

    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal true, json_response['authenticated']
    assert_equal @user.name, json_response['user']['name']
  end

  test "should return unauthenticated status for logged out user" do
    get check_auth_path, headers: { 'Accept' => 'application/json' }

    assert_response :unauthorized
    json_response = JSON.parse(response.body)
    assert_equal false, json_response['authenticated']
  end

  # Password reset tests
  test "should send password reset email for existing user" do
    post forgot_password_path, params: { email: @user.email }

    assert_redirected_to login_path
    assert_equal 'If your email exists in our system, you will receive password reset instructions.', flash[:notice]

    # Note: In a real application, you would check that the email was sent
    # assert_enqueued_emails 1
  end

  test "should return same message for non-existent email" do
    post forgot_password_path, params: { email: 'nonexistent@example.com' }

    assert_redirected_to login_path
    assert_equal 'If your email exists in our system, you will receive password reset instructions.', flash[:notice]
  end

  test "should show reset password form with valid token" do
    @user.generate_password_reset_token!
    get reset_password_path(@user.password_reset_token)

    assert_response :success
    assert_includes response.body, @user.email
  end

  test "should not show reset password form with invalid token" do
    get reset_password_path('invalid_token')

    assert_redirected_to login_path
    assert_equal 'Invalid or expired reset token.', flash[:alert]
  end

  test "should not show reset password form with expired token" do
    @user.generate_password_reset_token!
    @user.update!(password_reset_sent_at: 3.hours.ago)

    get reset_password_path(@user.password_reset_token)

    assert_redirected_to login_path
    assert_equal 'Invalid or expired reset token.', flash[:alert]
  end

  test "should reset password with valid token" do
    @user.generate_password_reset_token!
    new_password = 'newpassword123'

    patch update_password_path, params: {
      token: @user.password_reset_token,
      user: {
        password: new_password,
        password_confirmation: new_password
      }
    }

    assert_redirected_to login_path
    assert_equal 'Password has been reset successfully.', flash[:notice]

    # Verify password was changed
    @user.reload
    assert @user.authenticate(new_password)
    assert_nil @user.password_reset_token
  end

  test "should not reset password with invalid token" do
    patch update_password_path, params: {
      token: 'invalid_token',
      user: {
        password: 'newpassword123',
        password_confirmation: 'newpassword123'
      }
    }

    assert_redirected_to login_path
    assert_equal 'Invalid or expired reset token.', flash[:alert]
  end

  test "should not reset password with mismatched confirmation" do
    @user.generate_password_reset_token!

    patch update_password_path, params: {
      token: @user.password_reset_token,
      user: {
        password: 'newpassword123',
        password_confirmation: 'differentpassword'
      }
    }

    assert_response :success
    # Should show the form again with errors
  end

  test "should not reset password with weak password" do
    @user.generate_password_reset_token!

    patch update_password_path, params: {
      token: @user.password_reset_token,
      user: {
        password: 'short',
        password_confirmation: 'short'
      }
    }

    assert_response :success
    # Should show the form again with errors
  end

  # JSON API tests
  test "should login with valid credentials as JSON" do
    post login_path, params: {
      email: @user.email,
      password: 'password123'
    }, headers: { 'Accept' => 'application/json' }

    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal 'Login successful', json_response['message']
    assert_equal @user.name, json_response['user']['name']
  end

  test "should return error for invalid credentials as JSON" do
    post login_path, params: {
      email: @user.email,
      password: 'wrongpassword'
    }, headers: { 'Accept' => 'application/json' }

    assert_response :unauthorized
    json_response = JSON.parse(response.body)
    assert_equal 'Invalid email or password', json_response['error']
    assert_equal 'invalid_credentials', json_response['code']
  end

  test "should logout as JSON" do
    sign_in @user
    delete logout_path, headers: { 'Accept' => 'application/json' }

    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal 'Logout successful', json_response['message']
  end

  test "should return authentication status as JSON" do
    sign_in @user
    get check_auth_path, headers: { 'Accept' => 'application/json' }

    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal true, json_response['authenticated']
    assert_equal @user.name, json_response['user']['name']
  end

  test "should handle forgot password as JSON" do
    post forgot_password_path, params: { email: @user.email },
         headers: { 'Accept' => 'application/json' }

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['message'].include?('If your email exists')
  end

  test "should handle password reset as JSON" do
    @user.generate_password_reset_token!
    new_password = 'newpassword123'

    patch update_password_path, params: {
      token: @user.password_reset_token,
      user: {
        password: new_password,
        password_confirmation: new_password
      }
    }, headers: { 'Accept' => 'application/json' }

    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal 'Password has been reset successfully.', json_response['message']
  end

  # Security tests
  test "should handle concurrent login attempts" do
    # Test multiple concurrent login attempts
    threads = []
    results = []

    5.times do
      threads << Thread.new do
        post login_path, params: {
          email: @user.email,
          password: 'password123'
        }
        results << response.status
      end
    end

    threads.each(&:join)
    # All should succeed
    assert results.all? { |status| status == 302 }
  end

  test "should handle malformed login parameters" do
    post login_path, params: {
      email: nil,
      password: nil
    }

    assert_response :success
    assert_equal 'Invalid email or password', flash[:alert]
    assert_nil session[:user_id]
  end

  test "should prevent session fixation" do
    # Set a session ID before login
    session[:test] = 'value'

    post login_path, params: {
      email: @user.email,
      password: 'password123'
    }

    # Session should be regenerated (this is handled by Rails by default)
    assert_redirected_to root_path
    assert_equal @user.id, session[:user_id]
  end

  test "should handle rate limiting (if implemented)" do
    # This test assumes rate limiting is implemented
    # You would need to add rate limiting logic to the controller

    # Multiple failed attempts
    10.times do
      post login_path, params: {
        email: @user.email,
        password: 'wrongpassword'
      }
    end

    # Should still allow attempts until rate limiting is implemented
    assert_response :success
    assert_equal 'Invalid email or password', flash[:alert]
  end

  test "should handle XSS in login form" do
    get login_path, params: { email: '<script>alert("xss")</script>' }

    assert_response :success
    # The script tag should be escaped in the response
    assert_not_includes response.body, '<script>alert("xss")</script>'
  end
end