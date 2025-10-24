import React, { useState } from 'react'

export default function FAQSection() {
  const [openItems, setOpenItems] = useState(new Set([0]))
  const [searchTerm, setSearchTerm] = useState('')

  const faqItems = [
    {
      category: 'Começando',
      question: 'Como funciona o período de teste gratuito?',
      answer: 'Nosso período de teste gratuito de 14 dias dá acesso completo a todos os recursos do plano Profissional. Você pode cadastrar produtos, configurar pagamentos e vender normalmente. Não exigimos cartão de crédito para começar, e você pode cancelar a qualquer momento sem custos.',
      tags: ['teste', 'gratuito', '14 dias']
    },
    {
      category: 'Começando',
      question: 'Quanto tempo leva para configurar minha loja?',
      answer: 'A maioria dos nossos usuários configura sua loja em menos de 30 minutos. Nossa interface intuitiva guia você passo a passo no cadastro de produtos, configuração de pagamentos e personalização da loja. Também oferecemos templates prontos para acelerar ainda mais o processo.',
      tags: ['configuração', 'setup', 'rápido']
    },
    {
      category: 'Planos e Preços',
      question: 'Posso mudar de plano a qualquer momento?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se fazer upgrade para um plano superior, você paga apenas a diferença proporcional ao período restante. Se fazer downgrade, o crédito fica disponível para uso futuro.',
      tags: ['mudar plano', 'upgrade', 'downgrade']
    },
    {
      category: 'Planos e Preços',
      question: 'Quais formas de pagamento vocês aceitam?',
      answer: 'Aceitamos cartão de crédito (Visa, Mastercard, American Express), boleto bancário, Pix e transferência bancária. Para planos anuais, também oferecemos opções de pagamento parcelado sem juros.',
      tags: ['pagamento', 'cartão', 'boleto', 'pix']
    },
    {
      category: 'Recursos',
      question: 'Posso usar meu próprio domínio?',
      answer: 'Sim! A partir do plano Profissional você pode usar seu próprio domínio personalizado. Oferecemos SSL gratuito e ajudamos na configuração do DNS. O processo é simples e nossa equipe de suporte está disponível para ajudar se necessário.',
      tags: ['domínio', 'domínio próprio', 'SSL']
    },
    {
      category: 'Recursos',
      question: 'A plataforma integra com marketplaces?',
      answer: 'Sim! No plano Profissional e Enterprise você pode integrar com principais marketplaces brasileiros como Mercado Livre, Magazine Luiza, Americanas.com e outros. As sincronizações de estoque e pedidos são automáticas.',
      tags: ['marketplace', 'integração', 'ML']
    },
    {
      category: 'Recursos',
      question: 'Como funciona o controle de estoque?',
      answer: 'Nosso sistema de controle de estoque é inteligente e automático. Ele atualiza as quantidades em tempo real sempre que uma venda é realizada, sincroniza com marketplaces integrados, e oferece alertas de baixo estoque. Você também pode importar produtos em massa via planilha.',
      tags: ['estoque', 'controle', 'automático']
    },
    {
      category: 'Suporte',
      question: 'Que tipo de suporte vocês oferecem?',
      answer: 'Oferecemos suporte 24/7 por email e chat para todos os planos. No plano Profissional você tem suporte prioritário, e no plano Enterprise um gerente de conta dedicado. Também temos uma base de conhecimento completa e video tutoriais.',
      tags: ['suporte', '24/7', 'ajuda']
    },
    {
      category: 'Suporte',
      question: 'Vocês oferecem treinamento?',
      answer: 'Sim! Oferecemos video tutoriais gratuitos, webinars semanais e uma base de conhecimento completa. Para planos Enterprise, oferecemos treinamento personalizado para sua equipe e consultoria estratégica.',
      tags: ['treinamento', 'tutorial', 'webinar']
    },
    {
      category: 'Técnico',
      question: 'Minha loja é segura? Protegem meus dados?',
      answer: 'Sim! Utilizamos criptografia SSL em todas as transações, seguimos as melhores práticas de segurança da indústria e estamos em conformidade com a LGPD. Nossos servidores são protegidos 24/7 e realizamos backups automáticos diários.',
      tags: ['segurança', 'SSL', 'LGPD', 'backup']
    },
    {
      category: 'Técnico',
      question: 'A plataforma funciona no celular?',
      answer: 'Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em qualquer dispositivo. Também oferecemos aplicativos móveis para iOS e Android com notificações push de novos pedidos e gestão simplificada.',
      tags: ['mobile', 'celular', 'app']
    },
    {
      category: 'Técnico',
      question: 'O que acontece se eu quiser cancelar?',
      answer: 'Você pode cancelar sua conta a qualquer momento sem multas ou penalidades. Seus dados ficam disponíveis para exportação por 30 dias após o cancelamento. Não há fidelidade ou contratos de longo prazo.',
      tags: ['cancelar', 'encerrar', 'sem multa']
    }
  ]

  const categories = [...new Set(faqItems.map(item => item.category))]

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = searchTerm === '' ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesSearch
  })

  const handleCategoryFilter = (category) => {
    setSearchTerm(category)
  }

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Tudo que você precisa saber sobre nossa plataforma
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar perguntas..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSearchTerm('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                searchTerm === ''
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas as Categorias
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  searchTerm === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma pergunta encontrada
              </h3>
              <p className="text-gray-600 mb-4">
                Tente buscar com outros termos ou navegue pelas categorias acima.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-indigo-600 font-medium hover:text-indigo-700"
              >
                Limpar busca
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item, index) => {
                const originalIndex = faqItems.indexOf(item)
                const isOpen = openItems.has(originalIndex)

                return (
                  <div
                    key={originalIndex}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <button
                      onClick={() => toggleItem(originalIndex)}
                      className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="flex-shrink-0 w-2 h-2 bg-indigo-600 rounded-full"></span>
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.question}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                          <svg
                            className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-4">
                        <div className="pl-5 text-gray-600 leading-relaxed">
                          {item.answer}
                        </div>
                        {item.tags.length > 0 && (
                          <div className="mt-3 pl-5 flex flex-wrap gap-2">
                            {item.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe de suporte está pronta para ajudar você a começar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200">
                Falar com Suporte
              </button>
              <button className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200">
                Ver Base de Conhecimento
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}