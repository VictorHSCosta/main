#!/bin/bash

echo "================================================"
echo "🔐 Setup do Sistema de Autenticação"
echo "================================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para exibir mensagens de sucesso
success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Função para exibir mensagens de info
info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Função para exibir mensagens de aviso
warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# 1. Instalar dependências
info "Instalando dependências..."
bundle install
if [ $? -eq 0 ]; then
    success "Dependências instaladas com sucesso!"
else
    warning "Erro ao instalar dependências. Verifique seu Gemfile."
    exit 1
fi
echo ""

# 2. Executar migrations
info "Executando migrations..."
rails db:migrate
if [ $? -eq 0 ]; then
    success "Migrations executadas com sucesso!"
else
    warning "Erro ao executar migrations. Verifique o banco de dados."
    exit 1
fi
echo ""

# 3. Executar seeds
info "Criando usuários de exemplo..."
rails db:seed
if [ $? -eq 0 ]; then
    success "Seeds executados com sucesso!"
else
    warning "Erro ao executar seeds."
    exit 1
fi
echo ""

# 4. Build do Tailwind
info "Compilando Tailwind CSS..."
rails tailwindcss:build
if [ $? -eq 0 ]; then
    success "Tailwind CSS compilado com sucesso!"
else
    warning "Erro ao compilar Tailwind CSS."
fi
echo ""

echo "================================================"
echo "✅ Setup Completo!"
echo "================================================"
echo ""
echo "🔑 Credenciais de Teste:"
echo ""
echo "👑 Admin:"
echo "   Email: admin@example.com"
echo "   Senha: password123"
echo ""
echo "👤 Usuário 1:"
echo "   Email: user@example.com"
echo "   Senha: password123"
echo ""
echo "👤 Usuário 2:"
echo "   Email: teste@example.com"
echo "   Senha: password123"
echo ""
echo "================================================"
echo ""
echo "Para iniciar o servidor, execute:"
echo "  rails server"
echo ""
echo "Depois acesse: http://localhost:3000"
echo ""
echo "================================================"
