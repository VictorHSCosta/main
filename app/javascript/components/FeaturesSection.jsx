import React, { useState } from 'react'

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: '🛒',
      title: 'Gestão de Produtos',
      description: 'Controle completo do seu catálogo com estoque em tempo real, variações de produtos e organização por categorias.',
      details: ['Controle de estoque automatizado', 'Múltiplas variações de produtos', 'Categorias ilimitadas', 'Importação em massa'],
      color: 'bg-blue-500'
    },
    {
      icon: '📊',
      title: 'Analytics Avançado',
      description: 'Relatórios detalhados e insights valiosos para tomar decisões inteligentes e crescer seu negócio.',
      details: ['Dashboard em tempo real', 'Relatórios personalizados', 'Análise de conversão', 'Previsões de vendas'],
      color: 'bg-green-500'
    },
    {
      icon: '💳',
      title: 'Pagamentos Seguros',
      description: 'Múltiplas formas de pagamento com segurança garantida e taxas competitivas para maximizar suas vendas.',
      details: ['Cartão de crédito', 'Pix', 'Boleto bancário', 'Pagamento parcelado'],
      color: 'bg-purple-500'
    },
    {
      icon: '🚚',
      title: 'Logística Integrada',
      description: 'Calculadora de frete automática, integração com transportadoras e rastreamento em tempo real.',
      details: ['Cálculo automático de frete', 'Integração com Correios', 'Múltiplas transportadoras', 'Rastreamento de pedidos'],
      color: 'bg-orange-500'
    },
    {
      icon: '🎯',
      title: 'Marketing Digital',
      description: 'Ferramentas de marketing integradas para atrair, converter e reter clientes de forma automatizada.',
      details: ['E-mails marketing', 'Cupons de desconto', 'Programa de afiliados', 'Redirecionamento inteligente'],
      color: 'bg-red-500'
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Plataforma totalmente responsiva e otimizada para dispositivos móveis com app dedicado.',
      details: ['App para iOS e Android', 'Notificações push', 'Checkout otimizado', 'Design responsivo'],
      color: 'bg-indigo-500'
    }
  ]

  const handleFeatureClick = (index) => {
    setActiveFeature(activeFeature === index ? -1 : index)
  }

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos Poderosos para Seu Negócio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para gerenciar, crescer e escalar seu e-commerce em uma única plataforma
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setActiveFeature(index)}
              onFocus={() => setActiveFeature(index)}
            >
              <div className="bg-white rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                {/* Icon */}
                <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>

                {/* Expandable Details */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeFeature === index ? 'max-h-64' : 'max-h-0'
                }`}>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Button */}
                <button
                  onClick={() => handleFeatureClick(index)}
                  className="text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors duration-200 flex items-center mt-4"
                >
                  {activeFeature === index ? 'Ver menos' : 'Ver mais'}
                  <svg
                    className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
                      activeFeature === index ? 'rotate-180' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Comece em Minutos, Não em Meses
              </h3>
              <p className="text-xl text-indigo-100 mb-6">
                Interface intuitiva que qualquer pessoa pode usar. Sem necessidade de conhecimento técnico.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Setup em menos de 5 minutos
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Suporte 24/7 em português
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Integração com ferramentas populares
                </li>
              </ul>
              <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200">
                Testar Gratuitamente
              </button>
            </div>
            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
                <div className="aspect-video bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">⚡</div>
                    <p className="text-lg font-medium">Performance Superior</p>
                    <p className="text-sm opacity-75">99.9% de uptime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}