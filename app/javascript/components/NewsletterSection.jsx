import React, { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [interests, setInterests] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const interestOptions = [
    { id: 'marketing', label: 'Marketing Digital' },
    { id: 'vendas', label: 'Técnicas de Vendas' },
    { id: 'ecommerce', label: 'E-commerce Tips' },
    { id: 'produtos', label: 'Lançamentos' },
    { id: 'cases', label: 'Cases de Sucesso' }
  ]

  const benefits = [
    {
      icon: '📚',
      title: 'E-books Exclusivos',
      description: 'Guias completos sobre e-commerce e marketing digital'
    },
    {
      icon: '🎯',
      title: 'Ofertas Especiais',
      description: 'Descontos exclusivos para assinantes da newsletter'
    },
    {
      icon: '📊',
      title: 'Relatórios de Mercado',
      description: 'Análises detalhadas sobre tendências do e-commerce'
    },
    {
      icon: '🚀',
      title: 'Acesso Antecipado',
      description: 'Teste novos recursos antes do lançamento oficial'
    }
  ]

  const stats = [
    { value: '50K+', label: 'Assinantes Ativos' },
    { value: '95%', label: 'Taxa de Abertura' },
    { value: '4.8/5', label: 'Avaliação dos Conteúdos' }
  ]

  const handleInterestToggle = (interestId) => {
    setInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubscribed(true)
    setIsSubmitting(false)
    setEmail('')
    setName('')
    setInterests([])
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Parabéns! Você está inscrito!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Enviamos um e-mail de confirmação para {email}. Verifique sua caixa de entrada e pasta de spam.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                O que acontece agora?
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Confirmação</h4>
                    <p className="text-sm text-gray-600">Confirme seu e-mail em 24h</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📦</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Bem-vindo</h4>
                    <p className="text-sm text-gray-600">Receba nosso kit de boas-vindas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🚀</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Conteúdo</h4>
                    <p className="text-sm text-gray-600">Receba dicas semanais</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Receba Dicas Exclusivas de E-commerce
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Junte-se a mais de 50.000 empreendedores e receba conteúdo exclusivo para crescer seu negócio
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-purple-100 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-purple-100 mb-2">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="João Silva"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur text-white placeholder-purple-200 border border-purple-300 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-2">
                    Melhor E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joao@exemplo.com"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur text-white placeholder-purple-200 border border-purple-300 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-100 mb-3">
                    Seus Interesses
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={interests.includes(option.id)}
                          onChange={() => handleInterestToggle(option.id)}
                          className="w-4 h-4 text-yellow-400 bg-purple-600 border-purple-400 rounded focus:ring-yellow-400"
                        />
                        <span className="text-sm text-purple-100">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Inscrevendo...
                    </span>
                  ) : (
                    'Quero Receber Dicas Exclusivas'
                  )}
                </button>

                <p className="text-xs text-purple-100 text-center">
                  Respeitamos sua privacidade. Cancele a qualquer momento. Sem spam.
                </p>
              </form>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                O que você ganha ao se inscrever:
              </h3>
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{benefit.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-purple-100">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Proof */}
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">Junte-se à comunidade</h4>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-purple-400"></div>
                    <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-purple-400"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-purple-400"></div>
                    <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-purple-400"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-purple-400 flex items-center justify-center text-xs font-semibold text-white">
                      +50K
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-purple-100 ml-2">
                    4.8/5 de nossos assinantes recomendam
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}