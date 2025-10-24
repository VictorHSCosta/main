# Landing Page com Inertia.js e React

Este projeto implementa uma landing page moderna usando Inertia.js, React e Tailwind CSS em uma aplicação Ruby on Rails.

## ✅ Funcionalidades Implementadas

### 🎯 Correções das Falhas Críticas
- ✅ **Controller com Inertia.js**: `PagesController` agora renderiza componentes React com props dinâmicas
- ✅ **Componente Principal Home**: Estrutura completa da landing page em React
- ✅ **Configuração ViteRuby**: Fallback robusto para versionamento e cache
- ✅ **Remoção de Conflitos**: Layout estático removido para usar apenas Inertia.js

### 🚀 Landing Page Moderna
- ✅ **Navegação Responsiva**: Menu desktop e mobile com animações suaves
- ✅ **Hero Section Animada**: Título principal com gradientes e ilustração SVG animada
- ✅ **Seção de Benefícios**: Cards interativos com ícones e efeitos hover
- ✅ **Footer Completo**: Links úteis, newsletter e redes sociais
- ✅ **Design Responsivo**: Adaptação perfeita para todos os dispositivos

### ⚡ Funcionalidades Interativas
- ✅ **Animações Suaves**: Fade-in, slide-up e efeitos de hover
- ✅ **Scroll Spy**: Navegação que acompanha o scroll
- ✅ **Mobile Menu**: Menu hambúrguer animado
- ✅ **Intersection Observer**: Animações ativadas pelo scroll
- ✅ **Formulário de Newsletter**: Captura de e-mails integrada

## 🛠️ Tecnologias Utilizadas

- **Backend**: Ruby on Rails 7.x
- **Frontend**: React 18.x com Inertia.js
- **Estilos**: Tailwind CSS 3.x
- **Build Tool**: Vite + ViteRuby
- **Icons**: SVG inline otimizados

## 📦 Instalação

### 1. Instalar Dependências do Rails
```bash
bundle install
```

### 2. Instalar Dependências do Node.js
```bash
npm install
```

### 3. Configurar Base de Dados (se necessário)
```bash
rails db:create db:migrate
```

### 4. Iniciar Servidor de Desenvolvimento
```bash
# Terminal 1: Servidor Rails
bundle exec rails server

# Terminal 2: Servidor Vite (se necessário)
npm run dev
```

## 🚀 Como Usar

### Acessar a Aplicação
1. Inicie o servidor Rails: `bundle exec rails server`
2. Abra o navegador: `http://localhost:3000`
3. A landing page será carregada automaticamente

### Estrutura dos Componentes

```
app/javascript/Pages/
├── Home.jsx                 # Componente principal
└── Components/
    ├── Navigation.jsx       # Barra de navegação
    ├── HeroSection.jsx      # Seção principal
    ├── BenefitsSection.jsx  # Cards de benefícios
    └── Footer.jsx          # Rodapé completo
```

### Personalização

#### 1. Alterar Conteúdo
Edite `app/controllers/pages_controller.rb` para modificar:
- Títulos e textos
- Cards de benefícios
- Links de navegação

#### 2. Customizar Estilos
Modifique `app/javascript/stylesheets/application.tailwind.css`:
- Cores e gradientes
- Animações
- Componentes customizados

#### 3. Adicionar Novas Seções
1. Crie componentes em `app/javascript/Pages/Components/`
2. Importe em `Home.jsx`
3. Adicione props no controller se necessário

## 🎨 Personalização Visual

### Cores Principais
- **Primária**: Indigo 600 (#2563eb)
- **Gradiente**: Indigo → Purple
- **Background**: Blue → Indigo → Purple

### Animações
- **Fade-in**: Aparência suave dos elementos
- **Slide-up**: Animação de baixo para cima
- **Hover effects**: Interações com mouse

## 📱 Responsividade

A landing page é totalmente responsiva:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configurações Importantes

### Inertia.js
```ruby
# config/initializers/inertia_rails.rb
config.version = -> { ViteRuby.digest rescue Time.current.to_i.to_s }
config.layout = "inertia"
```

### Vite
```javascript
// app/javascript/entrypoints/application.js
createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('../Pages/**/*.jsx', { eager: true })
    return pages[`../Pages/${name}.jsx`]
  }
})
```

### Tailwind CSS
```javascript
// tailwind.config.js
content: [
  "./app/views/**/*.{erb,html}",
  "./app/javascript/**/*.{js,jsx,ts,tsx}"
]
```

## 🚀 Deploy

### Produção
1. Build dos assets: `npm run build`
2. Precompile Rails: `rails assets:precompile`
3. Deploy conforme sua estratégia

### Variáveis de Ambiente
- `RAILS_ENV=production`
- `NODE_ENV=production`

## 🔍 Debug e Testes

### Verificar Instalação
```bash
# Verificar gems
bundle check

# Verificar packages
npm list

# Testar servidor
rails server -e development
```

### Issues Comuns
1. **Inertia não carrega**: Verifique se `inertia_rails.rb` está configurado
2. **CSS não aplica**: Confira se Tailwind está instalado e configurado
3. **Componentes não encontrados**: Verifique paths em `application.js`

## 📈 Performance

Otimizações implementadas:
- ✅ **Code splitting**: Componentes carregados sob demanda
- ✅ **Lazy loading**: Animações ativadas por scroll
- ✅ **CSS otimizado**: Tailwind purgado em produção
- ✅ **Cache**: Versionamento automático de assets

## 🤝 Contribuição

1. Fork do projeto
2. Create feature branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m "Add: Nova funcionalidade"`
4. Push: `git push origin feature/nova-funcionalidade`
5. Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License.

---

**Resultado Final**: Uma landing page profissional, moderna e totalmente funcional com Inertia.js + React + Rails! 🎉