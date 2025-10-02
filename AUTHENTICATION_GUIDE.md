# 🔐 Sistema de Autenticação - Market Place

## 📋 Visão Geral

Este projeto implementa um sistema completo de autenticação utilizando **Devise** com interface moderna estilizada em **Tailwind CSS**.

## ✨ Funcionalidades Implementadas

- ✅ **Login e Logout** de usuários
- ✅ **Cadastro** de novos usuários
- ✅ **Recuperação de senha**
- ✅ **Edição de perfil**
- ✅ **Sistema de permissões** (Admin/Usuário)
- ✅ **Flash messages** estilizadas
- ✅ **Navbar responsiva** com links de autenticação
- ✅ **Interface moderna** com Tailwind CSS

## 🚀 Como Usar

### 1️⃣ Instalar Dependências

Primeiro, certifique-se de instalar todas as dependências:

```bash
bundle install
```

### 2️⃣ Configurar o Banco de Dados

Execute as migrations para criar as tabelas necessárias:

```bash
rails db:migrate
```

### 3️⃣ Popular com Dados de Teste

Execute os seeds para criar usuários de exemplo:

```bash
rails db:seed
```

### 4️⃣ Iniciar o Servidor

```bash
rails server
```

Acesse: `http://localhost:3000`

## 🔑 Credenciais de Teste

Após executar `rails db:seed`, você terá acesso às seguintes contas:

### 👑 Administrador
- **Email:** admin@example.com
- **Senha:** password123
- **Permissões:** Admin (acesso total)

### 👤 Usuário Comum 1
- **Email:** user@example.com
- **Senha:** password123
- **Permissões:** Usuário normal

### 👤 Usuário Comum 2
- **Email:** teste@example.com
- **Senha:** password123
- **Permissões:** Usuário normal

## 📁 Estrutura de Arquivos

### Models
- `app/models/user.rb` - Model do usuário com Devise

### Views
```
app/views/
├── devise/
│   ├── sessions/
│   │   └── new.html.erb          # Tela de login
│   ├── registrations/
│   │   ├── new.html.erb          # Tela de cadastro
│   │   └── edit.html.erb         # Editar perfil
│   ├── passwords/
│   │   └── new.html.erb          # Recuperação de senha
│   └── shared/
│       ├── _links.html.erb       # Links compartilhados
│       └── _error_messages.html.erb
├── layouts/
│   ├── application.html.erb      # Layout principal
│   └── _navbar.html.erb          # Navbar com autenticação
└── pages/
    └── home.html.erb             # Página inicial
```

### Configurações
- `config/initializers/devise.rb` - Configuração do Devise
- `config/routes.rb` - Rotas da aplicação
- `db/migrate/[timestamp]_devise_create_users.rb` - Migration do User
- `db/seeds.rb` - Seeds com usuários de exemplo

## 🎨 Design

### Paleta de Cores
- **Primary:** Gradiente Blue (500-600) → Indigo (600-700)
- **Success:** Verde
- **Error:** Vermelho
- **Admin Badge:** Roxo

### Componentes
- Cards com sombras e bordas arredondadas
- Botões com efeitos hover e gradientes
- Flash messages com ícones SVG
- Navbar responsiva
- Formulários com validação visual

## 🛡️ Segurança

O Devise oferece:
- ✅ Senhas criptografadas com bcrypt
- ✅ Proteção contra CSRF
- ✅ Tokens de recuperação de senha
- ✅ Remember me seguro
- ✅ Validações de email e senha

### Senha Mínima
- Mínimo de **6 caracteres**

## 📱 Rotas Disponíveis

### Autenticação
```
GET    /users/sign_in          # Página de login
POST   /users/sign_in          # Processar login
DELETE /users/sign_out         # Logout
GET    /users/sign_up          # Página de cadastro
POST   /users                  # Criar usuário
GET    /users/edit             # Editar perfil
PATCH  /users                  # Atualizar perfil
GET    /users/password/new     # Recuperar senha
```

### Outras
```
GET    /                       # Página inicial (Home)
```

## 🔧 Personalizações

### Adicionar Novos Campos ao User

1. Criar migration:
```bash
rails generate migration AddFieldsToUsers nome:string telefone:string
rails db:migrate
```

2. Permitir os parâmetros no controller:
```ruby
# app/controllers/application_controller.rb
before_action :configure_permitted_parameters, if: :devise_controller?

protected

def configure_permitted_parameters
  devise_parameter_sanitizer.permit(:sign_up, keys: [:nome, :telefone])
  devise_parameter_sanitizer.permit(:account_update, keys: [:nome, :telefone])
end
```

3. Adicionar campos nas views de registro e edição

### Proteger Rotas

Para proteger uma rota, adicione no controller:

```ruby
before_action :authenticate_user!
```

Para verificar se é admin:

```ruby
before_action :require_admin

private

def require_admin
  redirect_to root_path, alert: "Acesso negado" unless current_user&.admin?
end
```

## 🎯 Métodos Úteis

### No Controller/View
```ruby
user_signed_in?           # Verifica se há usuário logado
current_user              # Retorna o usuário atual
current_user.admin?       # Verifica se é admin
authenticate_user!        # Redireciona se não estiver logado
```

### No Model User
```ruby
user.admin?               # Verifica se é admin
User.admins               # Retorna todos os admins
User.regular_users        # Retorna usuários comuns
```

## 📚 Documentação

- [Devise Official Documentation](https://github.com/heartcombo/devise)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Rails Guides](https://guides.rubyonrails.org/)

## 🐛 Troubleshooting

### Erro: "Email has already been taken"
- Este email já está cadastrado. Use outro email ou faça login.

### Erro: "Password is too short"
- A senha deve ter no mínimo 6 caracteres.

### Flash messages não aparecem
- Verifique se `<%= render "layouts/navbar" %>` e o código de flash estão no `application.html.erb`

### Styles não carregam
- Execute: `rails tailwindcss:build`
- Reinicie o servidor

## 🤝 Contribuindo

Para adicionar novas funcionalidades ao sistema de autenticação:

1. Consulte a documentação do Devise
2. Crie migrations se necessário
3. Atualize as views mantendo o padrão Tailwind
4. Teste todas as funcionalidades
5. Atualize este README

---

**Desenvolvido com ❤️ usando Rails 8.0.2 + Devise + Tailwind CSS**
