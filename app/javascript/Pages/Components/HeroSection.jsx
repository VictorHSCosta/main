import React, { useState, useEffect } from 'react'

export default function HeroSection({ hero }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="hero-gradient py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {hero.title}
            <span className="gradient-text block mt-2">
              {hero.subtitle}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a
              href="#produtos"
              className="btn-primary animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              {hero.primary_cta}
            </a>
            <a
              href="#sobre"
              className="btn-secondary animate-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              {hero.secondary_cta}
            </a>
          </div>

          {/* Hero Illustration */}
          <div className="pt-8 animate-slide-up" style={{ animationDelay: '600ms' }}>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
              <svg className="w-full h-48" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="80" width="700" height="40" rx="20" fill="#E0E7FF"/>
                <rect x="50" y="80" width="500" height="40" rx="20" fill="#818CF8">
                  <animate attributeName="width" from="50" to="500" dur="2s" fill="freeze"/>
                </rect>
                <circle cx="100" cy="100" r="15" fill="#4F46E5">
                  <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5s" fill="freeze"/>
                </circle>
                <circle cx="300" cy="100" r="15" fill="#4F46E5">
                  <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1s" fill="freeze"/>
                </circle>
                <circle cx="500" cy="100" r="15" fill="#4F46E5">
                  <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.5s" fill="freeze"/>
                </circle>
                <circle cx="700" cy="100" r="15" fill="#C7D2FE">
                  <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2s" fill="freeze"/>
                </circle>
                <path d="M100 100L300 100L500 100L700 100" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round">
                  <animate attributeName="stroke-dasharray" from="0 600" to="600 0" dur="2s" begin="0.5s" fill="freeze"/>
                </path>
              </svg>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-bounce-soft"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce-soft" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-bounce-soft" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  )
}