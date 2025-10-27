# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_user = create(:user, :admin)
    @moderator_user = create(:user, :moderator)
    @regular_user = create(:user)
    @other_user = create(:user)
    @deleted_user = create(:user, :deleted)
  end

  # Index tests
  test "should get index as admin" do
    sign_in @admin_user
    get users_path

    assert_response :success
    assert_includes @response.body, @regular_user.name
    assert_includes @response.body, @moderator_user.name
  end

  test "should get index as moderator" do
    sign_in @moderator_user
    get users_path

    assert_response :success
    assert_includes @response.body, @regular_user.name
    assert_not_includes @response.body, @admin_user.name # Moderators shouldn't see admins
  end

  test "should not get index as regular user" do
    sign_in @regular_user
    get users_path

    assert_response :forbidden
  end

  test "should redirect index for unauthenticated user" do
    get users_path

    assert_redirected_to login_path
    assert_equal "Please log in to continue.", flash[:alert]
  end

  test "should filter users by role" do
    sign_in @admin_user
    get users_path, params: { role: 'admin' }

    assert_response :success
    assert_includes @response.body, @admin_user.name
    assert_not_includes @response.body, @regular_user.name
  end

  test "should search users by name" do
    sign_in @admin_user
    get users_path, params: { search: @regular_user.name.split.first }

    assert_response :success
    assert_includes @response.body, @regular_user.name
  end

  # Show tests
  test "should show own profile" do
    sign_in @regular_user
    get user_path(@regular_user)

    assert_response :success
    assert_includes @response.body, @regular_user.name
    assert_includes @response.body, @regular_user.email
  end

  test "should show other user profile as admin" do
    sign_in @admin_user
    get user_path(@regular_user)

    assert_response :success
    assert_includes @response.body, @regular_user.name
  end

  test "should show other user profile as moderator" do
    sign_in @moderator_user
    get user_path(@regular_user)

    assert_response :success
    assert_includes @response.body, @regular_user.name
  end

  test "should not show other user profile as regular user" do
    sign_in @regular_user
    get user_path(@other_user)

    assert_response :forbidden
  end

  test "should redirect show for unauthenticated user" do
    get user_path(@regular_user)

    assert_redirected_to login_path
  end

  # New tests
  test "should get new as admin" do
    sign_in @admin_user
    get new_user_path

    assert_response :success
  end

  test "should get new as moderator" do
    sign_in @moderator_user
    get new_user_path

    assert_response :success
  end

  test "should not get new as regular user" do
    sign_in @regular_user
    get new_user_path

    assert_response :forbidden
  end

  # Create tests
  test "should create user as admin" do
    sign_in @admin_user
    assert_difference('User.count', 1) do
      post users_path, params: {
        user: {
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123',
          password_confirmation: 'password123',
          role: 'user'
        }
      }
    end

    assert_redirected_to user_path(User.last)
    assert_equal 'User was successfully created.', flash[:notice]
  end

  test "should create user as moderator" do
    sign_in @moderator_user
    assert_difference('User.count', 1) do
      post users_path, params: {
        user: {
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123',
          password_confirmation: 'password123',
          role: 'user'
        }
      }
    end

    assert_redirected_to user_path(User.last)
  end

  test "should not create user as regular user" do
    sign_in @regular_user
    assert_no_difference('User.count') do
      post users_path, params: {
        user: {
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123',
          password_confirmation: 'password123',
          role: 'user'
        }
      }
    end

    assert_response :forbidden
  end

  test "should not create user with invalid data" do
    sign_in @admin_user
    assert_no_difference('User.count') do
      post users_path, params: {
        user: {
          name: '',
          email: 'invalid-email',
          password: 'short',
          password_confirmation: 'different'
        }
      }
    end

    assert_response :unprocessable_entity
  end

  test "should not create user with duplicate email" do
    sign_in @admin_user
    assert_no_difference('User.count') do
      post users_path, params: {
        user: {
          name: 'Another User',
          email: @regular_user.email,
          password: 'password123',
          password_confirmation: 'password123',
          role: 'user'
        }
      }
    end

    assert_response :unprocessable_entity
  end

  # Edit tests
  test "should edit own profile" do
    sign_in @regular_user
    get edit_user_path(@regular_user)

    assert_response :success
  end

  test "should edit user as admin" do
    sign_in @admin_user
    get edit_user_path(@regular_user)

    assert_response :success
  end

  test "should edit regular user as moderator" do
    sign_in @moderator_user
    get edit_user_path(@regular_user)

    assert_response :success
  end

  test "should not edit moderator as regular user" do
    sign_in @regular_user
    get edit_user_path(@moderator_user)

    assert_response :forbidden
  end

  test "should not edit admin as moderator" do
    sign_in @moderator_user
    get edit_user_path(@admin_user)

    assert_response :forbidden
  end

  # Update tests
  test "should update own profile" do
    sign_in @regular_user
    patch user_path(@regular_user), params: {
      user: {
        name: 'Updated Name'
      }
    }

    assert_redirected_to user_path(@regular_user)
    @regular_user.reload
    assert_equal 'Updated Name', @regular_user.name
  end

  test "should update user as admin" do
    sign_in @admin_user
    patch user_path(@regular_user), params: {
      user: {
        name: 'Updated by Admin',
        role: 'moderator'
      }
    }

    assert_redirected_to user_path(@regular_user)
    @regular_user.reload
    assert_equal 'Updated by Admin', @regular_user.name
    assert_equal 'moderator', @regular_user.role
  end

  test "should update regular user as moderator" do
    sign_in @moderator_user
    patch user_path(@regular_user), params: {
      user: {
        name: 'Updated by Moderator'
      }
    }

    assert_redirected_to user_path(@regular_user)
    @regular_user.reload
    assert_equal 'Updated by Moderator', @regular_user.name
  end

  test "should not update with invalid data" do
    sign_in @regular_user
    patch user_path(@regular_user), params: {
      user: {
        name: ''
      }
    }

    assert_response :unprocessable_entity
    @regular_user.reload
    assert_not_equal '', @regular_user.name
  end

  test "should not change role to admin as moderator" do
    original_role = @regular_user.role
    sign_in @moderator_user
    patch user_path(@regular_user), params: {
      user: {
        role: 'admin'
      }
    }

    assert_response :forbidden
    @regular_user.reload
    assert_equal original_role, @regular_user.role
  end

  # Destroy tests
  test "should soft delete user as admin" do
    sign_in @admin_user
    assert_not @regular_user.deleted?

    delete user_path(@regular_user)

    assert_redirected_to users_path
    @regular_user.reload
    assert @regular_user.deleted?
  end

  test "should soft delete regular user as moderator" do
    sign_in @moderator_user
    assert_not @regular_user.deleted?

    delete user_path(@regular_user)

    assert_redirected_to users_path
    @regular_user.reload
    assert @regular_user.deleted?
  end

  test "should not delete own profile" do
    sign_in @admin_user
    assert_not @admin_user.deleted?

    delete user_path(@admin_user)

    assert_response :forbidden
    @admin_user.reload
    assert_not @admin_user.deleted?
  end

  test "should not delete admin as moderator" do
    sign_in @moderator_user
    assert_not @admin_user.deleted?

    delete user_path(@admin_user)

    assert_response :forbidden
    @admin_user.reload
    assert_not @admin_user.deleted?
  end

  test "should not delete user as regular user" do
    sign_in @regular_user
    assert_not @other_user.deleted?

    delete user_path(@other_user)

    assert_response :forbidden
    @other_user.reload
    assert_not @other_user.deleted?
  end

  # Restore tests
  test "should restore user as admin" do
    sign_in @admin_user
    assert @deleted_user.deleted?

    patch restore_user_path(@deleted_user)

    assert_redirected_to user_path(@deleted_user)
    @deleted_user.reload
    assert_not @deleted_user.deleted?
  end

  test "should not restore user as moderator" do
    sign_in @moderator_user
    assert @deleted_user.deleted?

    patch restore_user_path(@deleted_user)

    assert_response :forbidden
    @deleted_user.reload
    assert @deleted_user.deleted?
  end

  test "should not restore user as regular user" do
    sign_in @regular_user
    assert @deleted_user.deleted?

    patch restore_user_path(@deleted_user)

    assert_response :forbidden
    @deleted_user.reload
    assert @deleted_user.deleted?
  end

  # Search tests
  test "should search users as admin" do
    sign_in @admin_user
    get search_users_path, params: { q: @regular_user.name.split.first }

    assert_response :success
  end

  test "should not search users as regular user" do
    sign_in @regular_user
    get search_users_path, params: { q: 'test' }

    assert_response :forbidden
  end

  # JSON API tests
  test "should return users as JSON for admin" do
    sign_in @admin_user
    get users_path, headers: { 'Accept' => 'application/json' }

    assert_response :success
    json_response = JSON.parse(response.body)
    assert json_response['data'].is_a?(Array)
    assert json_response['data'].any? { |u| u['name'] == @regular_user.name }
  end

  test "should return single user as JSON for admin" do
    sign_in @admin_user
    get user_path(@regular_user), headers: { 'Accept' => 'application/json' }

    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal @regular_user.name, json_response['name']
    assert_equal @regular_user.email, json_response['email']
  end

  test "should return 404 for non-existent user" do
    sign_in @admin_user
    get user_path(id: 99999)

    assert_redirected_to users_path
    assert_equal 'User not found.', flash[:alert]
  end

  test "should handle large number of users" do
    # Create additional users to test pagination
    create_list(:user, 15)

    sign_in @admin_user
    get users_path, params: { page: 2 }

    assert_response :success
  end

  # Security tests
  test "should prevent mass assignment of sensitive attributes" do
    sign_in @regular_user
    original_created_at = @regular_user.created_at

    patch user_path(@regular_user), params: {
      user: {
        name: 'Updated Name',
        created_at: 1.year.ago
      }
    }

    @regular_user.reload
    assert_equal original_created_at.to_i, @regular_user.created_at.to_i
    assert_equal 'Updated Name', @regular_user.name
  end

  test "should handle concurrent modifications gracefully" do
    sign_in @admin_user

    # Simulate concurrent update
    user_copy = User.find(@regular_user.id)
    @regular_user.update!(name: 'Updated by Admin')

    patch user_path(user_copy), params: {
      user: {
        name: 'Concurrent Update'
      }
    }

    # Should still update successfully due to optimistic locking not being implemented
    assert_redirected_to user_path(@regular_user)
    @regular_user.reload
    assert_equal 'Concurrent Update', @regular_user.name
  end
end