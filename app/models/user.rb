class User < ApplicationRecord
  validates :name, presence: true, length: { maximum: 100 }
  validates :email, presence: true,
                   format: { with: URI::MailTo::EMAIL_REGEXP },
                   uniqueness: { case_sensitive: false }
  validates :role, presence: true, inclusion: { in: %w[admin manager user] }
  validates :status, presence: true, inclusion: { in: %w[active inactive suspended] }
  validates :phone, format: { with: /\A\+?[\d\s\-\(\)]+\z/, message: "invalid phone format" }, allow_blank: true

  before_save :normalize_email

  scope :active, -> { where(status: 'active') }
  scope :by_role, ->(role) { where(role: role) if role.present? }
  scope :search, ->(query) {
    where("name ILIKE ? OR email ILIKE ?", "%#{query}%", "%#{query}%")
    if query.present?
  }

  def display_name
    name.present? ? name : email
  end

  def active?
    status == 'active'
  end

  def admin?
    role == 'admin'
  end

  def manager?
    role == 'manager'
  end

  def deactivate!
    update!(status: 'inactive')
  end

  def activate!
    update!(status: 'active')
  end

  private

  def normalize_email
    self.email = email&.downcase&.strip
  end

  # Class methods for select options
  def self.roles_for_select
    [
      { value: 'admin', label: 'Administrator' },
      { value: 'manager', label: 'Manager' },
      { value: 'user', label: 'User' }
    ]
  end

  def self.statuses_for_select
    [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'suspended', label: 'Suspended' }
    ]
  end
end