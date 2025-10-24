class PagesController < ApplicationController
  def home
    render inertia: 'Home', props: {
      appName: 'Market Place',
      hero: {
        title: 'Desenvolva Aplicações Web',
        subtitle: 'Poderosas e Escaláveis',
        description: 'Nossa plataforma Rails oferece todas as ferramentas necessárias para construir, escalar e manter aplicações modernas com agilidade e segurança.',
        primary_cta: 'Explore Nossos Produtos',
        secondary_cta: 'Saiba Mais'
      },
      benefits: [
        {
          title: 'Desenvolvimento Rápido',
          description: 'Framework Convention over Configuration que acelera o desenvolvimento com código limpo e reutilizável.',
          icon: 'lightning',
          color: 'indigo'
        },
        {
          title: 'Escalabilidade',
          description: 'Arquitetura preparada para crescer com seu negócio, desde startups até aplicações enterprise.',
          icon: 'arrows',
          color: 'purple'
        },
        {
          title: 'Comunidade Ativa',
          description: 'Milhares de desenvolvedores contribuindo com gems, tutoriais e suporte constante.',
          icon: 'users',
          color: 'blue'
        },
        {
          title: 'Segurança Robusta',
          description: 'Proteção integrada contra SQL injection, XSS, CSRF e outras vulnerabilidades comuns.',
          icon: 'shield',
          color: 'green'
        },
        {
          title: 'API Moderna',
          description: 'Criação rápida de APIs RESTful e GraphQL para integração com apps mobile e SPAs.',
          icon: 'code',
          color: 'yellow'
        },
        {
          title: 'Suporte Completo',
          description: 'Documentação extensa, ferramentas de debugging e ecossistema maduro para todos os desafios.',
          icon: 'support',
          color: 'red'
        }
      ],
      navigation: [
        { name: 'Home', href: '#home' },
        { name: 'Produtos', href: '#produtos' },
        { name: 'Sobre', href: '#sobre' },
        { name: 'Contato', href: '#contato' }
      ],
      current_year: Time.current.year
    }
  end
end