# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create sample users for testing
puts "Creating sample users..."

# Create admin user
User.find_or_create_by!(email: 'admin@example.com') do |user|
  user.name = 'Administrator'
  user.role = 'admin'
  user.status = 'active'
  user.phone = '+1 (555) 123-4567'
end

# Create manager users
manager_emails = [
  'john.manager@example.com',
  'sarah.manager@example.com'
]

manager_emails.each_with_index do |email, index|
  User.find_or_create_by!(email: email) do |user|
    user.name = "Manager #{index + 1}"
    user.role = 'manager'
    user.status = 'active'
    user.phone = "+1 (555) 234-567#{index}"
  end
end

# Create regular users
user_data = [
  { name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 (555) 345-6789', status: 'active' },
  { name: 'Bob Smith', email: 'bob@example.com', phone: '+1 (555) 456-7890', status: 'active' },
  { name: 'Carol Williams', email: 'carol@example.com', phone: '+1 (555) 567-8901', status: 'inactive' },
  { name: 'David Brown', email: 'david@example.com', phone: '+1 (555) 678-9012', status: 'active' },
  { name: 'Emma Davis', email: 'emma@example.com', phone: '+1 (555) 789-0123', status: 'suspended' },
  { name: 'Frank Miller', email: 'frank@example.com', phone: '+1 (555) 890-1234', status: 'active' },
  { name: 'Grace Wilson', email: 'grace@example.com', phone: '+1 (555) 901-2345', status: 'active' },
  { name: 'Henry Moore', email: 'henry@example.com', phone: '+1 (555) 012-3456', status: 'inactive' }
]

user_data.each do |data|
  User.find_or_create_by!(email: data[:email]) do |user|
    user.name = data[:name]
    user.role = 'user'
    user.status = data[:status]
    user.phone = data[:phone]
  end
end

puts "Created #{User.count} users:"
puts "- #{User.where(role: 'admin').count} admin(s)"
puts "- #{User.where(role: 'manager').count} manager(s)"
puts "- #{User.where(role: 'user').count} user(s)"
puts "- #{User.where(status: 'active').count} active"
puts "- #{User.where(status: 'inactive').count} inactive"
puts "- #{User.where(status: 'suspended').count} suspended"
