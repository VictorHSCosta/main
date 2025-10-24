import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import Footer from './components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BenefitsSection />

      {/* Additional sections that are referenced but not detailed in the original ERB */}
      <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sobre Nós
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Esta seção pode ser expandida com mais informações sobre sua empresa.
            </p>
          </div>
        </div>
      </section>

      <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Entre em Contato
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Esta seção pode ser expandida com formulário de contato ou informações de contato.
            </p>
          </div>
        </div>
      </section>

      <section id="login" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Área de Login
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Esta seção pode ser expandida com formulário de login.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}