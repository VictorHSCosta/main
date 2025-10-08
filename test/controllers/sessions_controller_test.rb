require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create(
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "password123"
    )
  end

  test "should get new" do
    get login_url
    assert_response :success
  end

  test "should create session with valid credentials" do
    post login_url, params: { email: @user.email, password: "password123" }
    assert_redirected_to root_url
    assert_not_nil session[:user_id]
  end

  test "should not create session with invalid credentials" do
    post login_url, params: { email: @user.email, password: "wrongpassword" }
    assert_response :unprocessable_entity
    assert_nil session[:user_id]
  end

  test "should destroy session" do
    post login_url, params: { email: @user.email, password: "password123" }
    delete logout_url
    assert_redirected_to root_url
    assert_nil session[:user_id]
  end
end
