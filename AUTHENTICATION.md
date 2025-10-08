# Sistema de Autenticação - Market Place

## Visão Geral

Este projeto agora inclui um sistema completo de autenticação de usuários com funcionalidade de alteração de senha.

## Funcionalidades Implementadas

### 1. Autenticação de Usuário
- **Cadastro**: Usuários podem criar uma conta com nome, email e senha
- **Login**: Autenticação via email e senha
- **Logout**: Encerramento seguro da sessão
- **Proteção de rotas**: Páginas que requerem autenticação

### 2. Perfil do Usuário
- **Visualização**: Página de perfil mostrando informações do usuário
- **Alteração de Senha**: Formulário dedicado para mudança de senha com validações de segurança

### 3. Segurança
- Senhas criptografadas com `bcrypt`
- Validação de senha atual antes de permitir alteração
- Confirmação de senha em cadastros e alterações
- Proteção CSRF automática do Rails
- Validação de formato de email
- Senha mínima de 6 caracteres

## Rotas Disponíveis

```ruby
# Autenticação
GET    /login          # Página de login
POST   /login          # Processar login
DELETE /logout         # Sair da conta

# Cadastro
GET    /signup         # Página de cadastro
POST   /signup         # Criar nova conta

# Perfil
GET    /profile        # Ver perfil do usuário
GET    /profile/edit   # Página de alteração de senha
PATCH  /profile        # Atualizar senha
```

## Estrutura de Arquivos

### Models
- `app/models/user.rb` - Model de usuário com validações e `has_secure_password`

### Controllers
- `app/controllers/application_controller.rb` - Helpers de autenticação (`current_user`, `logged_in?`, `require_login`)
- `app/controllers/sessions_controller.rb` - Login e logout
- `app/controllers/users_controller.rb` - Cadastro, perfil e alteração de senha

### Views
- `app/views/sessions/new.html.erb` - Formulário de login
- `app/views/users/new.html.erb` - Formulário de cadastro
- `app/views/users/show.html.erb` - Página de perfil
- `app/views/users/edit.html.erb` - **Formulário de alteração de senha**
- `app/views/layouts/_navbar.html.erb` - Barra de navegação com links de autenticação
- `app/views/layouts/_flash.html.erb` - Mensagens de feedback

### Database
- `db/migrate/20251008000001_create_users.rb` - Migração da tabela de usuários

### Tests
- `test/models/user_test.rb` - Testes do model User
- `test/controllers/users_controller_test.rb` - Testes do controller de usuários
- `test/controllers/sessions_controller_test.rb` - Testes de autenticação

## Como Usar

### 1. Instalar Dependências
```bash
bundle install
```

### 2. Executar Migrações
```bash
rails db:migrate
```

### 3. Iniciar o Servidor
```bash
bin/dev
```

### 4. Acessar o Sistema
- Visite `http://localhost:3000`
- Clique em "Cadastrar" para criar uma conta
- Após o login, acesse seu perfil clicando em "Perfil"
- Na página de perfil, clique em "Alterar Senha" para mudar sua senha

## Fluxo de Alteração de Senha

1. Usuário acessa `/profile/edit`
2. Preenche o formulário com:
   - Senha atual (para verificação de segurança)
   - Nova senha (mínimo 6 caracteres)
   - Confirmação da nova senha
3. Sistema valida:
   - Se a senha atual está correta
   - Se a nova senha atende aos requisitos
   - Se a confirmação corresponde à nova senha
4. Se tudo estiver correto, a senha é atualizada
5. Usuário é redirecionado ao perfil com mensagem de sucesso

## Validações

### User Model
- **Nome**: obrigatório
- **Email**: obrigatório, único e formato válido
- **Senha**: mínimo 6 caracteres (apenas na criação/alteração)

## Recursos de UI

- Design responsivo com Tailwind CSS
- Mensagens flash auto-dispensáveis (5 segundos)
- Feedback visual para erros de validação
- Navbar dinâmica mostrando estado de autenticação
- Interface em português (pt-BR)

## Testes

Execute os testes com:
```bash
rails test
```

Os testes cobrem:
- Validações do model User
- Autenticação (login/logout)
- Criação de usuários
- Alteração de senha
- Proteção de rotas

## Tecnologias Utilizadas

- Rails 8.0
- PostgreSQL
- Tailwind CSS
- Hotwire (Turbo + Stimulus)
- BCrypt para criptografia de senhas
