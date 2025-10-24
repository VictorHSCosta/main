import React, { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
            </svg>
            <span className="text-xl font-bold text-gray-900">RailsApp</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('produtos')}
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              Contato
            </button>
            <button
              onClick={() => scrollToSection('login')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition font-medium w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('produtos')}
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition font-medium w-full text-left"
              >
                Produtos
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition font-medium w-full text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition font-medium w-full text-left"
              >
                Contato
              </button>
              <button
                onClick={() => scrollToSection('login')}
                className="block px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium w-full text-left"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}