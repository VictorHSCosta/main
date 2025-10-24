import React, { useState } from 'react';
import Navbar from '../Shared/Navbar';
import FeatureCard from '../Shared/FeatureCard';
import Footer from '../Shared/Footer';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      bgColor: "bg-indigo-100",
      title: "Desenvolvimento Rápido",
      description: "Framework Convention over Configuration que acelera o desenvolvimento com código limpo e reutilizável."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
        </svg>
      ),
      bgColor: "bg-purple-100",
      title: "Escalabilidade",
      description: "Arquitetura preparada para crescer com seu negócio, desde startups até aplicações enterprise."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      bgColor: "bg-blue-100",
      title: "Comunidade Ativa",
      description: "Milhares de desenvolvedores contribuindo com gems, tutoriais e suporte constante."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      ),
      bgColor: "bg-green-100",
      title: "Segurança Robusta",
      description: "Proteção integrada contra SQL injection, XSS, CSRF e outras vulnerabilidades comuns."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      ),
      bgColor: "bg-yellow-100",
      title: "API Moderna",
      description: "Criação rápida de APIs RESTful e GraphQL para integração com apps mobile e SPAs."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      ),
      bgColor: "bg-red-100",
      title: "Suporte Completo",
      description: "Documentação extensa, ferramentas de debugging e ecossistema maduro para todos os desafios."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Hero Section */}
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
              <a href="#produtos" className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Explore Nossos Produtos
              </a>
              <a href="#sobre" className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition font-semibold text-lg shadow-md">
                Saiba Mais
              </a>
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

      {/* Benefits Section */}
      <section id="produtos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por Que Escolher Nossa Plataforma?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recursos poderosos que aceleram seu desenvolvimento e garantem a qualidade do seu projeto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                bgColor={feature.bgColor}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}