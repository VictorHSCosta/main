import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Início', href: '#home' },
    { name: 'Recursos', href: '#features' },
    { name: 'Preços', href: '#pricing' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contato', href: '#contact' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className={`text-2xl font-bold ${
                isScrolled ? 'text-indigo-600' : 'text-white'
              }`}>
                MarketPlace
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                      : 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isScrolled
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white text-indigo-600 hover:bg-gray-100'
            }`}>
              Começar Gratuitamente
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
              isScrolled ? 'bg-white' : 'bg-indigo-600'
            }`}>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                      : 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <button className={`w-full mt-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                isScrolled
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-white text-indigo-600 hover:bg-gray-100'
              }`}>
                Começar Gratuitamente
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}