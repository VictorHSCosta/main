# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  # Test validations
  test "should be valid with all attributes" do
    user = build(:user)
    assert user.valid?
  end

  test "should require name" do
    user = build(:user, name: nil)
    assert_not user.valid?
    assert_includes user.errors[:name], "can't be blank"
  end

  test "should require email" do
    user = build(:user, email: nil)
    assert_not user.valid?
    assert_includes user.errors[:email], "can't be blank"
  end

  test "should require password on creation" do
    user = build(:user, password: nil, password_digest: nil)
    assert_not user.valid?
    assert_includes user.errors[:password], "can't be blank"
  end

  test "should require password confirmation" do
    user = build(:user, password_confirmation: nil)
    assert_not user.valid?
    assert_includes user.errors[:password_confirmation], "can't be blank"
  end

  test "should validate name length" do
    # Test minimum length
    short_name_user = build(:user, name: "a")
    assert_not short_name_user.valid?
    assert_includes short_name_user.errors[:name], "is too short (minimum is 2 characters)"

    # Test maximum length
    long_name_user = build(:user, name: "a" * 51)
    assert_not long_name_user.valid?
    assert_includes long_name_user.errors[:name], "is too long (maximum is 50 characters)"

    # Test valid length
    valid_user = build(:user, name: "ab")
    assert valid_user.valid?
  end

  test "should validate email format" do
    invalid_emails = [
      "invalid-email",
      "user@",
      "@domain.com",
      "user..name@domain.com",
      "user@domain",
      "user space@domain.com"
    ]

    invalid_emails.each do |email|
      user = build(:user, email: email)
      assert_not user.valid?, "#{email} should be invalid"
      assert_includes user.errors[:email], "is not a valid email format"
    end

    valid_emails = [
      "user@domain.com",
      "user.name@domain.co.uk",
      "user+tag@domain.org",
      "user123@sub.domain.com"
    ]

    valid_emails.each do |email|
      user = build(:user, email: email)
      assert user.valid?, "#{email} should be valid"
    end
  end

  test "should validate email uniqueness" do
    existing_user = create(:user, email: "test@example.com")
    new_user = build(:user, email: "test@example.com")

    assert_not new_user.valid?
    assert_includes new_user.errors[:email], "has already been taken"
  end

  test "should validate email uniqueness case insensitive" do
    existing_user = create(:user, email: "test@example.com")
    new_user = build(:user, email: "TEST@EXAMPLE.COM")

    assert_not new_user.valid?
    assert_includes new_user.errors[:email], "has already been taken"
  end

  test "should validate password length" do
    # Test minimum length
    short_password_user = build(:user, password: "a" * 7, password_confirmation: "a" * 7)
    assert_not short_password_user.valid?
    assert_includes short_password_user.errors[:password], "is too short (minimum is 8 characters)"

    # Test maximum length
    long_password_user = build(:user, password: "a" * 129, password_confirmation: "a" * 129)
    assert_not long_password_user.valid?
    assert_includes long_password_user.errors[:password], "is too long (maximum is 128 characters)"

    # Test valid length
    valid_password_user = build(:user, password: "a" * 8, password_confirmation: "a" * 8)
    assert valid_password_user.valid?
  end

  test "should validate role inclusion" do
    valid_roles = User.roles.keys
    valid_roles.each do |role|
      user = build(:user, role: role)
      assert user.valid?, "#{role} should be a valid role"
    end

    invalid_user = build(:user, role: 'invalid_role')
    assert_not invalid_user.valid?
    assert_includes invalid_user.errors[:role], "is not included in the list"
  end

  # Test scopes
  test "scope active should return only non-deleted users" do
    active_user = create(:user)
    deleted_user = create(:user, :deleted)

    active_users = User.active
    assert_includes active_users, active_user
    assert_not_includes active_users, deleted_user
  end

  test "scope deleted should return only deleted users" do
    active_user = create(:user)
    deleted_user = create(:user, :deleted)

    deleted_users = User.deleted
    assert_includes deleted_users, deleted_user
    assert_not_includes deleted_users, active_user
  end

  test "scope by_role should filter by role" do
    regular_user = create(:user, role: :user)
    admin_user = create(:user, :admin)
    moderator_user = create(:user, :moderator)

    admin_users = User.by_role('admin')
    assert_includes admin_users, admin_user
    assert_not_includes admin_users, regular_user
    assert_not_includes admin_users, moderator_user

    moderator_users = User.by_role('moderator')
    assert_includes moderator_users, moderator_user
    assert_not_includes moderator_users, regular_user
    assert_not_includes moderator_users, admin_user
  end

  test "scope search_by_name should filter by name" do
    user1 = create(:user, name: "John Doe")
    user2 = create(:user, name: "Jane Smith")
    user3 = create(:user, name: "Johnny Appleseed")

    search_results = User.search_by_name("John")
    assert_includes search_results, user1
    assert_includes search_results, user3
    assert_not_includes search_results, user2
  end

  test "scope search_by_email should filter by email" do
    user1 = create(:user, email: "john@example.com")
    user2 = create(:user, email: "jane@example.com")
    user3 = create(:user, email: "admin@example.org")

    search_results = User.search_by_email("example.com")
    assert_includes search_results, user1
    assert_includes search_results, user2
    assert_not_includes search_results, user3
  end

  # Test callbacks
  test "normalize_email should downcase and strip email" do
    user = build(:user, email: "  TEST@EXAMPLE.COM  ")
    user.valid?
    assert_equal "test@example.com", user.email
  end

  test "normalize_name should capitalize and strip name" do
    user = build(:user, name: "  john doe  ")
    user.valid?
    assert_equal "John Doe", user.name
  end

  # Test methods
  test "soft_delete! should set deleted_at" do
    user = create(:user)
    assert_nil user.deleted_at

    user.soft_delete!
    user.reload
    assert_not_nil user.deleted_at
    assert user.deleted?
  end

  test "restore! should clear deleted_at" do
    user = create(:user, :deleted)
    assert_not_nil user.deleted_at

    user.restore!
    user.reload
    assert_nil user.deleted_at
    assert_not user.deleted?
  end

  test "deleted? should return true for deleted users" do
    active_user = create(:user)
    deleted_user = create(:user, :deleted)

    assert_not active_user.deleted?
    assert deleted_user.deleted?
  end

  test "full_name should return name" do
    user = build(:user, name: "John Doe")
    assert_equal "John Doe", user.full_name
  end

  test "admin? should return true for admin users" do
    admin_user = build(:user, :admin)
    regular_user = build(:user)

    assert admin_user.admin?
    assert_not regular_user.admin?
  end

  test "moderator? should return true for moderator users" do
    moderator_user = build(:user, :moderator)
    regular_user = build(:user)

    assert moderator_user.moderator?
    assert_not regular_user.moderator?
  end

  test "regular_user? should return true for regular users" do
    regular_user = build(:user, role: :user)
    admin_user = build(:user, :admin)

    assert regular_user.regular_user?
    assert_not admin_user.regular_user?
  end

  test "can_manage_users? should return true for admin and moderator" do
    admin_user = build(:user, :admin)
    moderator_user = build(:user, :moderator)
    regular_user = build(:user)

    assert admin_user.can_manage_users?
    assert moderator_user.can_manage_users?
    assert_not regular_user.can_manage_users?
  end

  test "active_for_authentication? should return false for deleted users" do
    active_user = create(:user)
    deleted_user = create(:user, :deleted)

    assert active_user.active_for_authentication?
    assert_not deleted_user.active_for_authentication?
  end

  # Test password reset functionality
  test "generate_password_reset_token! should set token and timestamp" do
    user = create(:user)
    assert_nil user.password_reset_token
    assert_nil user.password_reset_sent_at

    user.generate_password_reset_token!
    user.reload

    assert_not_nil user.password_reset_token
    assert_not_nil user.password_reset_sent_at
    assert_equal 20, user.password_reset_token.length
  end

  test "password_reset_token_valid? should return true for valid token" do
    user = create(:user, :with_password_reset)
    assert user.password_reset_token_valid?
  end

  test "password_reset_token_valid? should return false for expired token" do
    user = create(:user, :expired_password_reset)
    assert_not user.password_reset_token_valid?
  end

  test "password_reset_token_valid? should return false for no token" do
    user = create(:user)
    assert_not user.password_reset_token_valid?
  end

  test "clear_password_reset_token! should remove token and timestamp" do
    user = create(:user, :with_password_reset)
    assert_not_nil user.password_reset_token

    user.clear_password_reset_token!
    user.reload

    assert_nil user.password_reset_token
    assert_nil user.password_reset_sent_at
  end

  # Test password encryption
  test "should encrypt password" do
    user = create(:user, password: 'password123')
    user.reload

    assert_not_equal 'password123', user.password_digest
    assert user.authenticate('password123')
    assert_not user.authenticate('wrong_password')
  end

  # Test enum methods
  test "should respond to enum methods" do
    user = build(:user)

    assert_respond_to user, :user?
    assert_respond_to user, :admin?
    assert_respond_to user, :moderator?
    assert user.user?
    assert_not user.admin?
    assert_not user.moderator?
  end

  # Test associations
  test "should have secure password" do
    user = build(:user)
    assert_respond_to user, :password
    assert_respond_to user, :password_confirmation
    assert_respond_to user, :authenticate
  end

  # Edge cases
  test "should handle empty search terms gracefully" do
    user1 = create(:user, name: "John Doe")
    user2 = create(:user, name: "Jane Smith")

    name_search = User.search_by_name("")
    assert_includes name_search, user1
    assert_includes name_search, user2

    email_search = User.search_by_email("")
    assert_includes email_search, user1
    assert_includes email_search, user2
  end

  test "should handle nil role in by_role scope" do
    user1 = create(:user, role: :user)
    user2 = create(:user, :admin)

    scoped_users = User.by_role(nil)
    assert_includes scoped_users, user1
    assert_includes scoped_users, user2
  end

  # Performance tests
  test "should handle large number of users efficiently" do
    # Create 100 users
    users = create_list(:user, 100)

    # Test active scope
    active_users = User.active
    assert_equal 100, active_users.count

    # Test search scopes
    search_results = User.search_by_name(users.first.name.split.first)
    assert search_results.count >= 1
  end
end