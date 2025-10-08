require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without name" do
    user = User.new(email: "test@example.com", password: "password123")
    assert_not user.save
  end

  test "should not save user without email" do
    user = User.new(name: "Test User", password: "password123")
    assert_not user.save
  end

  test "should not save user with invalid email" do
    user = User.new(name: "Test User", email: "invalid_email", password: "password123")
    assert_not user.save
  end

  test "should not save user with short password" do
    user = User.new(name: "Test User", email: "test@example.com", password: "12345")
    assert_not user.save
  end

  test "should save valid user" do
    user = User.new(name: "Test User", email: "test@example.com", password: "password123", password_confirmation: "password123")
    assert user.save
  end

  test "should not save user with duplicate email" do
    user1 = User.create(name: "Test User 1", email: "test@example.com", password: "password123", password_confirmation: "password123")
    user2 = User.new(name: "Test User 2", email: "test@example.com", password: "password123", password_confirmation: "password123")
    assert_not user2.save
  end

  test "should authenticate with correct password" do
    user = User.create(name: "Test User", email: "test@example.com", password: "password123", password_confirmation: "password123")
    assert user.authenticate("password123")
  end

  test "should not authenticate with incorrect password" do
    user = User.create(name: "Test User", email: "test@example.com", password: "password123", password_confirmation: "password123")
    assert_not user.authenticate("wrongpassword")
  end
end
