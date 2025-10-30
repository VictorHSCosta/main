class User < ApplicationRecord
  has_secure_password

  # Enum for user roles
  enum role: { user: 0, admin: 1, moderator: 2 }

  # Validations
  validates :name, presence: true, length: { minimum: 2, maximum: 50 }
  validates :email, presence: true,
                   uniqueness: { case_sensitive: false },
                   format: { with: URI::MailTo::EMAIL_REGEXP, message: "is not a valid email format" },
                   length: { maximum: 255 }
  validates :password, presence: true,
                       length: { minimum: 8, maximum: 128 },
                       if: :password_required?
  validates :password_confirmation, presence: true, if: :password_required?
  validates :role, presence: true, inclusion: { in: roles.keys }

  # Scopes
  scope :active, -> { where(deleted_at: nil) }
  scope :deleted, -> { where.not(deleted_at: nil) }
  scope :by_role, ->(role) { where(role: role) if role.present? }
  scope :search_by_name, ->(term) { where("name ILIKE ?", "%#{term}%") if term.present? }
  scope :search_by_email, ->(term) { where("email ILIKE ?", "%#{term}%") if term.present? }

  # Callbacks
  before_validation :normalize_email
  before_save :normalize_name

  # Soft delete method
  def soft_delete!
    update!(deleted_at: Time.current)
  end

  # Restore soft deleted user
  def restore!
    update!(deleted_at: nil)
  end

  # Check if user is soft deleted
  def deleted?
    deleted_at.present?
  end

  # Helper methods
  def full_name
    name
  end

  def admin?
    role == 'admin'
  end

  def moderator?
    role == 'moderator'
  end

  def regular_user?
    role == 'user'
  end

  def can_manage_users?
    admin? || moderator?
  end

  def active_for_authentication?
    super && !deleted?
  end

  # Send password reset email
  def send_password_reset_email
    # Implementation would go here
    # UserMailer.password_reset(self).deliver_later
  end

  # Generate password reset token
  def generate_password_reset_token!
    update(password_reset_token: SecureRandom.hex(10), password_reset_sent_at: Time.current)
  end

  # Check if password reset token is valid
  def password_reset_token_valid?
    password_reset_token.present? && password_reset_sent_at.present? &&
    password_reset_sent_at > 2.hours.ago
  end

  # Clear password reset token
  def clear_password_reset_token!
    update(password_reset_token: nil, password_reset_sent_at: nil)
  end

  private

  def password_required?
    new_record? || password_digest.present?
  end

  def normalize_email
    self.email = email&.downcase&.strip
  end

  def normalize_name
    self.name = name&.strip&.split.map(&:capitalize).join(' ')
  end
end