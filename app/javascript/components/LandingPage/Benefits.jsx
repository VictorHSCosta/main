import React from 'react';

const benefits = [
  {
    id: 1,
    title: "Desenvolvimento Rápido",
    description: "Framework Convention over Configuration que acelera o desenvolvimento com código limpo e reutilizável.",
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600"
  },
  {
    id: 2,
    title: "Escalabilidade",
    description: "Arquitetura preparada para crescer com seu negócio, desde startups até aplicações enterprise.",
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
      </svg>
    ),
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    id: 3,
    title: "Comunidade Ativa",
    description: "Milhares de desenvolvedores contribuindo com gems, tutoriais e suporte constante.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    ),
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: 4,
    title: "Segurança Robusta",
    description: "Proteção integrada contra SQL injection, XSS, CSRF e outras vulnerabilidades comuns.",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: 5,
    title: "API Moderna",
    description: "Criação rápida de APIs RESTful e GraphQL para integração com apps mobile e SPAs.",
    icon: (
      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    id: 6,
    title: "Suporte Completo",
    description: "Documentação extensa, ferramentas de debugging e ecossistema maduro para todos os desafios.",
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    bgColor: "bg-red-100",
    iconColor: "text-red-600"
  }
];

export default function Benefits() {
  return (
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
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1 border border-gray-100"
            >
              <div className={`w-14 h-14 ${benefit.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}