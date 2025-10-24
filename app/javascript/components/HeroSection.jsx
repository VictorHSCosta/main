import React, { useState, useEffect } from 'react'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [email, setEmail] = useState('')

  const slides = [
    {
      title: "Transforme Suas Vendas Online",
      subtitle: "A plataforma completa para quem quer sucesso no e-commerce",
      description: "Gerencie produtos, clientes e vendas em um único lugar. Comece hoje mesmo!",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Cresça Sua Marca",
      subtitle: "Ferramentas poderosas para seu negócio",
      description: "Analytics, marketing e automação para alavancar suas vendas",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Conecte-se com Clientes",
      subtitle: "Experiência de compra excepcional",
      description: "Interface intuitiva e processos simplificados para máximo aproveitamento",
      image: "/api/placeholder/600/400"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      alert(`Obrigado por se inscrever com o email: ${email}`)
      setEmail('')
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse delay-150"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left text-white">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block transform transition-all duration-500 hover:scale-105">
                  {slides[currentSlide].title}
                </span>
              </h1>

              <h2 className="text-xl md:text-2xl text-purple-100 font-medium">
                {slides[currentSlide].subtitle}
              </h2>

              <p className="text-lg text-purple-50 max-w-lg mx-auto lg:mx-0">
                {slides[currentSlide].description}
              </p>

              {/* Email Signup Form */}
              <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor email"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  >
                    Começar Agora
                  </button>
                </div>
                <p className="text-sm text-purple-100 mt-3">
                  ✓ 14 dias grátis ✓ Sem cartão de crédito ✓ Cancelamento a qualquer momento
                </p>
              </form>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-purple-100">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-300 border-2 border-purple-500"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-purple-500"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-300 border-2 border-purple-500"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-purple-500"></div>
                </div>
                <span className="text-sm">
                  +5.000 empresas já confiam em nós
                </span>
              </div>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative">
            <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 transform transition-all duration-500 hover:scale-105">
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-lg font-medium">Dashboard Interativo</p>
                  <p className="text-sm opacity-75">Visualize seus dados em tempo real</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                Novo!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                Popular
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}