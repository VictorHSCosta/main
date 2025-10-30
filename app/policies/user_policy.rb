class UserPolicy < ApplicationPolicy
  attr_reader :current_user, :user

  def initialize(current_user, user)
    @current_user = current_user
    @user = user
  end

  def index?
    current_user&.admin? || current_user&.moderator?
  end

  def show?
    # Users can view their own profile
    # Admins and moderators can view any profile
    current_user == user || current_user&.admin? || current_user&.moderator?
  end

  def create?
    # Only admins and moderators can create users
    current_user&.admin? || current_user&.moderator?
  end

  def new?
    create?
  end

  def update?
    # Users can update their own profile (with restrictions)
    # Admins can update any profile
    # Moderators can update regular users
    current_user == user || current_user&.admin? || (current_user&.moderator? && user&.regular_user?)
  end

  def edit?
    update?
  end

  def destroy?
    # Users cannot delete themselves
    # Admins can delete anyone except themselves
    # Moderators can delete regular users only
    return false if current_user == user
    return true if current_user&.admin?
    return false unless current_user&.moderator?
    return false if user&.admin? || user&.moderator?

    true
  end

  def restore?
    # Only admins can restore deleted users
    current_user&.admin?
  end

  def manage?
    # Manage is a catch-all for administrative operations
    current_user&.admin? || current_user&.moderator?
  end

  # Permissions for password reset
  def reset_password?
    # Users can always reset their own password
    current_user == user || current_user&.admin?
  end

  # Permissions for changing roles
  def change_role?
    # Only admins can change roles
    current_user&.admin?
  end

  # Permissions for viewing sensitive information
  def view_sensitive_info?
    # Only admins can view sensitive information
    current_user&.admin?
  end

  # Permissions for bulk operations
  def bulk_operations?
    current_user&.admin?
  end

  # Scope for filtering users based on permissions
  class Scope
    attr_reader :current_user, :scope

    def initialize(current_user, scope)
      @current_user = current_user
      @scope = scope
    end

    def resolve
      return scope.none unless current_user

      case current_user.role
      when 'admin'
        scope.all
      when 'moderator'
        # Moderators can see all users except admins
        scope.where.not(role: 'admin')
      when 'user'
        # Regular users can only see themselves
        scope.where(id: current_user.id)
      else
        scope.none
      end
    end
  end

  private

  def can_manage_regular_users?
    current_user&.admin? || current_user&.moderator?
  end

  def can_manage_moderators?
    current_user&.admin?
  end

  def can_manage_admins?
    current_user&.admin? && current_user != user
  end
end