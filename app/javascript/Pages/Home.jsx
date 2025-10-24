import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import PricingSection from '../components/PricingSection'
import TestimonialsSection from '../components/TestimonialsSection'
import FAQSection from '../components/FAQSection'
import NewsletterSection from '../components/NewsletterSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}