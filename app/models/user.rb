class User < ApplicationRecord
  # Validations
  validates :name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :email, presence: true,
                    uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :role, presence: true,
                   inclusion: { in: %w[user admin manager] }
  validates :status, presence: true,
                     inclusion: { in: %w[active inactive] }

  # Callbacks
  before_validation :normalize_email

  # Scopes
  scope :active, -> { where(status: 'active') }
  scope :inactive, -> { where(status: 'inactive') }
  scope :by_role, ->(role) { where(role: role) }
  scope :recent, -> { order(created_at: :desc) }

  # Class methods
  def self.roles
    %w[user admin manager]
  end

  def self.statuses
    %w[active inactive]
  end

  # Instance methods
  def active?
    status == 'active'
  end

  def inactive?
    status == 'inactive'
  end

  def admin?
    role == 'admin'
  end

  def manager?
    role == 'manager'
  end

  def regular_user?
    role == 'user'
  end

  private

  def normalize_email
    self.email = email.downcase.strip if email.present?
  end
end
