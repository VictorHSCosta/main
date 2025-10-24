import React from 'react'

export default function Footer({ appName, current_year }) {
  const handleSocialClick = (platform) => {
    console.log(`Redirecionando para ${platform}...`)
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
              </svg>
              <span className="text-xl font-bold text-white">{appName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Plataforma completa para desenvolvimento de aplicações web modernas, escaláveis e seguras com Ruby on Rails.
            </p>
            <div className="mt-4 flex space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3"/>
                </svg>
                Status: Online
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                v2.0.1
              </span>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-white font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <a href="#sobre" className="hover:text-indigo-400 transition duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-4 h-0.5 bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-indigo-400 transition duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-4 h-0.5 bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Produtos
                </a>
              </li>
              <li>
                <a href="#termos" className="hover:text-indigo-400 transition duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-4 h-0.5 bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#privacidade" className="hover:text-indigo-400 transition duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-4 h-0.5 bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-white font-bold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="hover:text-indigo-400 transition duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-4 h-0.5 bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-indigo-400 transition duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-4 h-0.5 bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Contato
                </a>
              </li>
              <li>
                <a href="#documentacao" className="hover:text-indigo-400 transition duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-4 h-0.5 bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Documentação
                </a>
              </li>
              <li>
                <a href="#status" className="hover:text-indigo-400 transition duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-4 h-0.5 bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-white font-bold mb-2">Fique por dentro das novidades</h3>
            <p className="text-gray-400 mb-4">Receba atualizações sobre novos recursos e lançamentos</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {current_year} {appName}. Todos os direitos reservados.
          </p>

          <div className="flex space-x-6">
            <button
              onClick={() => handleSocialClick('github')}
              className="text-gray-400 hover:text-indigo-400 transition duration-200 transform hover:scale-110"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
            </button>
            <button
              onClick={() => handleSocialClick('twitter')}
              className="text-gray-400 hover:text-indigo-400 transition duration-200 transform hover:scale-110"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </button>
            <button
              onClick={() => handleSocialClick('linkedin')}
              className="text-gray-400 hover:text-indigo-400 transition duration-200 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}