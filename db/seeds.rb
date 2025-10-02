# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Criação de usuários de exemplo
puts "Criando usuários..."

# Usuário Admin
admin = User.find_or_create_by!(email: "admin@example.com") do |user|
  user.password = "senha123"
  user.password_confirmation = "senha123"
  user.admin = true
end
puts "✓ Usuário admin criado: #{admin.email} (senha: senha123)"

# Usuário Exemplo 1
user1 = User.find_or_create_by!(email: "user1@example.com") do |user|
  user.password = "senha123"
  user.password_confirmation = "senha123"
  user.admin = false
end
puts "✓ Usuário exemplo 1 criado: #{user1.email} (senha: senha123)"

# Usuário Exemplo 2
user2 = User.find_or_create_by!(email: "user2@example.com") do |user|
  user.password = "senha123"
  user.password_confirmation = "senha123"
  user.admin = false
end
puts "✓ Usuário exemplo 2 criado: #{user2.email} (senha: senha123)"

puts "\nSeeds finalizadas com sucesso!"
puts "Total de usuários: #{User.count}"
