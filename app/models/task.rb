class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 255 }
  validates :status, presence: true, inclusion: { in: %w[pending in_progress completed] }
  validates :priority, presence: true, inclusion: { in: %w[low medium high urgent] }
  validates :due_date, presence: false

  enum status: {
    pending: 'pending',
    in_progress: 'in_progress',
    completed: 'completed'
  }

  enum priority: {
    low: 'low',
    medium: 'medium',
    high: 'high',
    urgent: 'urgent'
  }

  scope :by_status, ->(status) { where(status: status) if status.present? }
  scope :by_priority, ->(priority) { where(priority: priority) if priority.present? }
  scope :search, ->(term) { where('title ILIKE ? OR description ILIKE ?', "%#{term}%", "%#{term}%") if term.present? }
  scope :due_soon, -> { where('due_date <= ?', 7.days.from_now) }
  scope :overdue, -> { where('due_date < ?', Date.current) }

  def priority_color
    case priority
    when 'low'
      'bg-gray-100 text-gray-800'
    when 'medium'
      'bg-blue-100 text-blue-800'
    when 'high'
      'bg-orange-100 text-orange-800'
    when 'urgent'
      'bg-red-100 text-red-800'
    end
  end

  def status_color
    case status
    when 'pending'
      'bg-yellow-100 text-yellow-800'
    when 'in_progress'
      'bg-blue-100 text-blue-800'
    when 'completed'
      'bg-green-100 text-green-800'
    end
  end

  def overdue?
    due_date.present? && due_date < Date.current && status != 'completed'
  end
end