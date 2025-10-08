require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create(
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "password123"
    )
  end

  test "should get new" do
    get signup_url
    assert_response :success
  end

  test "should create user" do
    assert_difference("User.count") do
      post signup_url, params: {
        user: {
          name: "New User",
          email: "new@example.com",
          password: "password123",
          password_confirmation: "password123"
        }
      }
    end

    assert_redirected_to root_url
  end

  test "should show profile when logged in" do
    post login_url, params: { email: @user.email, password: "password123" }
    get profile_url
    assert_response :success
  end

  test "should redirect to login when not logged in" do
    get profile_url
    assert_redirected_to login_url
  end

  test "should get edit password page when logged in" do
    post login_url, params: { email: @user.email, password: "password123" }
    get edit_profile_url
    assert_response :success
  end

  test "should update password" do
    post login_url, params: { email: @user.email, password: "password123" }

    patch profile_url, params: {
      user: {
        current_password: "password123",
        password: "newpassword123",
        password_confirmation: "newpassword123"
      }
    }

    assert_redirected_to profile_url
    assert @user.reload.authenticate("newpassword123")
  end

  test "should not update password with wrong current password" do
    post login_url, params: { email: @user.email, password: "password123" }

    patch profile_url, params: {
      user: {
        current_password: "wrongpassword",
        password: "newpassword123",
        password_confirmation: "newpassword123"
      }
    }

    assert_response :unprocessable_entity
  end
end
