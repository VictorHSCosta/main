import React, { useState } from 'react'

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Iniciante',
      description: 'Perfeito para quem está começando',
      price: { monthly: 29, annual: 290 },
      originalPrice: { monthly: 39, annual: 390 },
      icon: '🚀',
      features: [
        'Até 50 produtos',
        '1 usuário',
        'Relatórios básicos',
        'Suporte por email',
        'Integração com gateways de pagamento',
        'SSL gratuito'
      ],
      notIncluded: [
        'API avançada',
        'Relatórios personalizados',
        'Integração com marketplaces'
      ],
      popular: false,
      color: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      name: 'Profissional',
      description: 'Ideal para negócios em crescimento',
      price: { monthly: 79, annual: 790 },
      originalPrice: { monthly: 99, annual: 990 },
      icon: '💼',
      features: [
        'Até 500 produtos',
        'Até 5 usuários',
        'Relatórios avançados',
        'Suporte prioritário 24/7',
        'API completa',
        'Integração com marketplaces',
        'SSL gratuito',
        'Domínio personalizado',
        'Cupons de desconto'
      ],
      notIncluded: [
        'Gestão de afiliados',
        'Consulta dedicada'
      ],
      popular: true,
      color: 'border-indigo-500',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      name: 'Enterprise',
      description: 'Para grandes empresas',
      price: { monthly: 199, annual: 1990 },
      originalPrice: { monthly: 249, annual: 2490 },
      icon: '🏢',
      features: [
        'Produtos ilimitados',
        'Usuários ilimitados',
        'Relatórios personalizados',
        'Gerente de conta dedicado',
        'API avançada',
        'Integrações personalizadas',
        'White label',
        'Treinamento para equipe',
        'SLA garantido',
        'Consultoria estratégica'
      ],
      notIncluded: [],
      popular: false,
      color: 'border-purple-200',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ]

  const toggleBilling = () => {
    setIsAnnual(!isAnnual)
  }

  const handlePlanSelect = (planName) => {
    alert(`Plano ${planName} selecionado! Redirecionando para checkout...`)
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Planos que Crescem com Seu Negócio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Escolha o plano perfeito para suas necessidades. Mude quando quiser.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-lg font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Mensal
            </span>
            <button
              onClick={toggleBilling}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Alternar cobrança anual"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Anual
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Economize 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 ${plan.color} ${
                plan.popular ? 'shadow-xl transform scale-105' : 'shadow-lg'
              } hover:shadow-2xl transition-all duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">
                      R${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-gray-500 ml-2">
                      /{isAnnual ? 'ano' : 'mês'}
                    </span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-gray-500 line-through mt-1">
                      R${plan.originalPrice.annual}/ano
                    </div>
                  )}
                  {!isAnnual && (
                    <div className="text-sm text-gray-500 line-through mt-1">
                      R${plan.originalPrice.monthly}/mês
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}

                {plan.notIncluded.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-400 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200 ${plan.buttonColor}`}
              >
                {plan.name === 'Enterprise' ? 'Falar com Consultor' : 'Começar Teste Grátis'}
              </button>

              {/* Trust Indicators */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  ✓ 14 dias grátis ✓ Sem cartão ✓ Cancelamento a qualquer momento
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Recursos Inclusos em Todos os Planos
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-2">Segurança Avançada</h4>
              <p className="text-sm text-gray-600">SSL gratuito e proteção contra fraudes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-900 mb-2">Otimizado para Mobile</h4>
              <p className="text-sm text-gray-600">Experiência perfeita em todos os dispositivos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <h4 className="font-semibold text-gray-900 mb-2">Infraestrutura Global</h4>
              <p className="text-sm text-gray-600">CDN worldwide e 99.9% de uptime</p>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
          <a
            href="#faq"
            className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors duration-200"
          >
            Veja nosso FAQ →
          </a>
        </div>
      </div>
    </section>
  )
}