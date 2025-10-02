# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Criar usuários de exemplo
puts "Criando usuários de exemplo..."

# Usuário Administrador
admin = User.find_or_create_by!(email: "admin@example.com") do |user|
  user.password = "password123"
  user.password_confirmation = "password123"
  user.admin = true
end
puts "✓ Usuário Admin criado: #{admin.email}"

# Usuário comum 1
user1 = User.find_or_create_by!(email: "user@example.com") do |user|
  user.password = "password123"
  user.password_confirmation = "password123"
  user.admin = false
end
puts "✓ Usuário comum criado: #{user1.email}"

# Usuário comum 2
user2 = User.find_or_create_by!(email: "teste@example.com") do |user|
  user.password = "password123"
  user.password_confirmation = "password123"
  user.admin = false
end
puts "✓ Usuário comum criado: #{user2.email}"

puts "\n========================================"
puts "Seeds concluídos com sucesso!"
puts "========================================"
puts "\nCredenciais de acesso:"
puts "\nAdmin:"
puts "  Email: admin@example.com"
puts "  Senha: password123"
puts "\nUsuário 1:"
puts "  Email: user@example.com"
puts "  Senha: password123"
puts "\nUsuário 2:"
puts "  Email: teste@example.com"
puts "  Senha: password123"
puts "========================================"
