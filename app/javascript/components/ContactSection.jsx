import React, { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    plan: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const plans = [
    { value: '', label: 'Selecione um plano' },
    { value: 'starter', label: 'Iniciante' },
    { value: 'professional', label: 'Profissional' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'custom', label: 'Necessito uma solução personalizada' }
  ]

  const contactMethods = [
    {
      icon: '💬',
      title: 'Chat ao Vivo',
      description: 'Suporte em tempo real durante horário comercial',
      action: 'Iniciar Chat',
      hours: 'Seg-Sex: 9h-18h'
    },
    {
      icon: '📧',
      title: 'E-mail',
      description: 'Resposta em até 24 horas úteis',
      action: 'Enviar E-mail',
      contact: 'suporte@marketplace.com.br'
    },
    {
      icon: '📞',
      title: 'Telefone',
      description: 'Suporte prioritário para planos Profissional e Enterprise',
      action: 'Ligar Agora',
      contact: '0800 123 4567'
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      description: 'Suporte rápido via WhatsApp',
      action: 'Conversar no WhatsApp',
      contact: '(11) 98765-4321'
    }
  ]

  const locations = [
    {
      city: 'São Paulo',
      address: 'Av. Paulista, 1000 - Bela Vista',
      hours: 'Seg-Sex: 9h-18h'
    },
    {
      city: 'Rio de Janeiro',
      address: 'Rua Vice-Presidente Costa, 30 - Centro',
      hours: 'Seg-Sex: 9h-18h'
    },
    {
      city: 'Belo Horizonte',
      address: 'Av. Afonso Pena, 2000 - Centro',
      hours: 'Seg-Sex: 9h-18h'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mensagem Enviada com Sucesso!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Obrigado pelo contato! Nossa equipe irá responder em até 24 horas úteis.
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
                    <p className="text-sm text-gray-600">Você receberá um e-mail de confirmação</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">👥</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Análise</h4>
                    <p className="text-sm text-gray-600">Nossa equipe analisará sua solicitação</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Contato</h4>
                    <p className="text-sm text-gray-600">Retornaremos em até 24h úteis</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  phone: '',
                  subject: '',
                  message: '',
                  plan: ''
                })
              }}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Enviar Nova Mensagem
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato Conosco
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aqui para ajudar! Fale conosco e descubra como podemos transformar seu negócio
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {method.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {method.description}
              </p>
              <button className="text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors duration-200">
                {method.action}
              </button>
              {method.contact && (
                <p className="text-xs text-gray-500 mt-2">
                  {method.contact}
                </p>
              )}
              {method.hours && (
                <p className="text-xs text-gray-500 mt-1">
                  {method.hours}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Envie-nos uma Mensagem
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Sua empresa"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <div>
                  <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-2">
                    Plano de Interesse
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {plans.map((plan) => (
                      <option key={plan.value} value={plan.value}>
                        {plan.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Nos conte mais sobre suas necessidades..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Office Locations */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Nossos Escritórios
              </h3>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div key={index} className="border-l-4 border-indigo-600 pl-4">
                    <h4 className="font-semibold text-gray-900">
                      {location.city}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {location.address}
                    </p>
                    <p className="text-xs text-gray-500">
                      {location.hours}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">
                Informações Rápidas
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-indigo-100">Horário de Atendimento</p>
                  <p className="font-medium">Segunda a Sexta: 9h - 18h</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-100">Tempo Médio de Resposta</p>
                  <p className="font-medium">Até 24 horas úteis</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-100">Suporte Emergencial</p>
                  <p className="font-medium">Planos Enterprise</p>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gray-100 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">❓</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dúvidas Frequentes?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Encontre respostas rápidas em nosso FAQ
              </p>
              <a
                href="#faq"
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Ver FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}