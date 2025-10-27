# Landing Page com Inertia.js e React

Este projeto implementa uma landing page moderna utilizando Inertia.js com React no framework Rails.

## 🚀 Features Implementadas

### 1. Layout Principal (`Shared/AuthenticatedLayout.jsx`)
- **Navegação Responsiva**: Menu desktop e mobile com Links do Inertia.js
- **Header com Logo**: Branding da aplicação
- **Botões de Autenticação**: Login e Registro
- **Footer Completo**: Links organizados e informações da empresa

### 2. Página de Login (`Pages/Auth/Login.jsx`)
- **Formulário Moderno**: Campos de email e senha com validação
- **Botões Sociais**: Login com Google e GitHub
- **Navegação SPA**: Links do Inertia.js para registro
- **Feedback Visual**: Estados de loading e validação
- **Design Responsivo**: Adapta-se a diferentes telas

### 3. Página de Registro (`Pages/Auth/Register.jsx`)
- **Formulário Completo**: Nome, email, senha e confirmação
- **Validação Client-Side**: Validação em tempo real
- **Requisitos de Senha**: Uppercase, lowercase, números
- **Social Registration**: Opções de cadastro com redes sociais
- **Termos de Serviço**: Links para política de privacidade

### 4. Landing Page Principal (`Pages/Welcome/Index.jsx`)
- **Hero Section**: Título impactante com CTA
- **Features Grid**: 6 features principais com ícones
- **Testimonials**: Depoimentos de clientes com fotos
- **Pricing Plans**: 3 planos com highlight no mais popular
- **Email Capture**: Formulário de newsletter
- **Multiple CTAs**: Botões estratégicos para conversão

## 🛠️ Estrutura do Projeto

```
app/javascript/
├── Pages/
│   ├── Welcome/
│   │   └── Index.jsx           # Landing page principal
│   ├── Auth/
│   │   ├── Login.jsx           # Página de login
│   │   └── Register.jsx        # Página de registro
│   └── Example.jsx             # Página de exemplo existente
├── Shared/
│   └── AuthenticatedLayout.jsx # Layout principal da aplicação
├── entrypoints/
│   └── application.js          # Ponto de entrada do Inertia.js
└── stylesheets/
    └── application.tailwind.css # Estilos personalizados
```

## 🎨 Estilos e Design

### Componentes CSS Personalizados
- `.btn-primary`: Botões primários com hover effects
- `.btn-secondary`: Botões secundários
- `.card`: Cards com sombra e bordas
- `.input-field`: Campos de formulário padronizados
- `.input-error`: Estados de erro de validação

### Design System
- **Cores Primárias**: Indigo (#4F46E5)
- **Cores de Sucesso**: Verde
- **Cores de Erro**: Vermelho
- **Tipografia**: Inter (via Tailwind)
- **Spacing**: Baseado no sistema do Tailwind

## 🔧 Configuração do Backend

### Rotas (`config/routes.rb`)
```ruby
# Landing page e marketing pages
root "pages#home"
get "/features", to: "pages#features"
get "/about", to: "pages#about"
get "/contact", to: "pages#contact"

# Authentication pages
get "/login", to: "pages#login"
get "/register", to: "pages#register"
get "/dashboard", to: "pages#dashboard"
```

### Controller (`app/controllers/pages_controller.rb`)
- Métodos para cada página
- Renderização com Inertia.js
- Props configuráveis para cada página

### Configuração Inertia.js
- Layout: `inertia.html.erb`
- Versioning com ViteRuby
- Configuração padrão já aplicada

## 🚀 Como Usar

### 1. Instalação das Dependências
```bash
bundle install    # Ruby dependencies
npm install       # Node.js dependencies
```

### 2. Iniciar o Servidor de Desenvolvimento
```bash
rails server      # Inicia servidor Rails (porta 3000)
```

### 3. Navegação
- **Home**: `http://localhost:3000/`
- **Login**: `http://localhost:3000/login`
- **Registro**: `http://localhost:3000/register`
- **Features**: `http://localhost:3000/features`
- **About**: `http://localhost:3000/about`
- **Contact**: `http://localhost:3000/contact`

## 📱 Responsividade

- **Mobile First**: Design adaptativo para todos dispositivos
- **Breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **Menu Mobile**: Hamburguer menu para navegação em telas pequenas

## 🔄 Navegação SPA

A aplicação utiliza Links do Inertia.js para:
- Navegação sem recarregar a página
- Transições suaves entre páginas
- Manutenção do estado da aplicação
- Histórico de navegação do browser

## 🎯 Próximos Passos

### Funcionalidades Adicionais
- [ ] Integração com autenticação real (Devise/Sorcery)
- [ ] Formulários funcionais com API backend
- [ ] Dashboard do usuário
- [ ] Sistema de notificações
- [ ] Upload de imagens
- [ ] Pagamentos integrados

### Melhorias Técnicas
- [ ] Testes automatizados (RSpec + Jest)
- [ ] Otimização de performance
- [ ] SEO com Server-Side Rendering
- [ ] PWA capabilities
- [ ] Internacionalização (i18n)

## 📚 Tecnologias Utilizadas

- **Frontend**: React 18, Inertia.js, Tailwind CSS
- **Backend**: Ruby on Rails 7
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x
- **Icons**: Heroicons (inline SVG)

## 🎨 Design Decisions

1. **Single Page Application**: Navegação fluida sem reloads
2. **Component-Based**: Código reutilizável e manutenível
3. **Mobile First**: Experiência otimizada para dispositivos móveis
4. **Modern UI**: Design limpo e profissional
5. **Accessibility**: Semântica HTML e ARIA labels

---

**Nota**: Esta landing page está pronta para uso e pode ser facilmente estendida com funcionalidades adicionais conforme necessário.