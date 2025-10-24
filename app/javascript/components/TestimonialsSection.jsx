import React, { useState, useEffect } from 'react'

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: 'Ana Silva',
      role: 'Fundadora, Moda Express',
      company: 'Loja de Roupas',
      avatar: '👩‍💼',
      content: 'A plataforma transformou completamente meu negócio. Em 3 meses minhas vendas aumentaram 150% e a gestão ficou muito mais simples. O suporte é incrível!',
      rating: 5,
      results: '+150% Vendas',
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Carlos Santos',
      role: 'CEO, TechStore Brasil',
      company: 'Eletrônicos',
      avatar: '👨‍💻',
      content: 'A melhor plataforma de e-commerce que já usei. A integração com os marketplaces e as ferramentas de marketing fizeram toda a diferença para nosso crescimento.',
      rating: 5,
      results: '+300% ROI',
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Mariana Costa',
      role: 'Gerente, Beauty Shop',
      company: 'Cosméticos',
      avatar: '👩‍🎨',
      content: 'Comecei pequena e a plataforma cresceu junto comigo. Os relatórios detalhados me ajudam a tomar decisões inteligentes todos os dias.',
      rating: 5,
      results: '+200% Clientes',
      image: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'Roberto Mendes',
      role: 'Dono, Sports Plus',
      company: 'Artigos Esportivos',
      avatar: '🏃‍♂️',
      content: 'A automação de marketing e a gestão de estoque economizaram horas do meu tempo. Posso focar no que realmente importa: meus clientes.',
      rating: 5,
      results: '-50h/mês Tempo',
      image: '/api/placeholder/80/80'
    },
    {
      id: 5,
      name: 'Juliana Ramos',
      role: 'Fundadora, Kids World',
      company: 'Brinquedos',
      avatar: '🧸',
      content: 'O checkout otimizado aumentou minha taxa de conversão significativamente. Meus clientes amam a experiência de compra!',
      rating: 5,
      results: '+80% Conversão',
      image: '/api/placeholder/80/80'
    }
  ]

  const stats = [
    { value: '5.000+', label: 'Empresas Ativas' },
    { value: '99.9%', label: 'Uptime Garantido' },
    { value: '4.9/5', label: 'Satisfação dos Clientes' },
    { value: '24/7', label: 'Suporte Técnico' }
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isAutoPlaying, testimonials.length])

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Milhares de empresários confiam em nossa plataforma para crescer seus negócios
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Content */}
              <div className="md:col-span-2">
                <div className="mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="mb-6">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonials[currentTestimonial].results}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="text-4xl mr-4">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="hidden md:block">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-8 text-center">
                  <div className="text-8xl mb-4">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    Cliente Satisfeito
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
              aria-label="Depoimento anterior"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'w-8 bg-indigo-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
              aria-label="Próximo depoimento"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => goToTestimonial(index)}
            >
              <div className="mb-3">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-2xl mr-2">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                  {testimonial.results}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Junte-se a Milhares de Empreendedores de Sucesso
            </h3>
            <p className="text-xl text-indigo-100 mb-6">
              Comece seu teste gratuito de 14 dias hoje mesmo
            </p>
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200">
              Começar Teste Grátis
            </button>
            <p className="text-sm text-indigo-100 mt-3">
              ✓ Sem cartão de crédito necessário ✓ Cancelamento a qualquer momento
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}