import React from 'react';

export default function HeroSection() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Desenvolva Aplicações Web
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Poderosas e Escaláveis
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossa plataforma Rails oferece todas as ferramentas necessárias para construir,
            escalar e manter aplicações modernas com agilidade e segurança.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('produtos')}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Nossos Produtos
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition font-semibold text-lg shadow-md"
            >
              Saiba Mais
            </button>
          </div>

          {/* Hero Illustration */}
          <div className="pt-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
              <svg className="w-full h-48" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="80" width="700" height="40" rx="20" fill="#E0E7FF"/>
                <rect x="50" y="80" width="500" height="40" rx="20" fill="#818CF8"/>
                <circle cx="100" cy="100" r="15" fill="#4F46E5"/>
                <circle cx="300" cy="100" r="15" fill="#4F46E5"/>
                <circle cx="500" cy="100" r="15" fill="#4F46E5"/>
                <circle cx="700" cy="100" r="15" fill="#C7D2FE"/>
                <path d="M100 100L300 100L500 100L700 100" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}