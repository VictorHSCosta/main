import React from 'react'
import Navigation from './Components/Navigation'
import HeroSection from './Components/HeroSection'
import BenefitsSection from './Components/BenefitsSection'
import Footer from './Components/Footer'

export default function Home({ appName, hero, benefits, navigation, current_year }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation appName={appName} navigation={navigation} />
      <HeroSection hero={hero} />
      <BenefitsSection benefits={benefits} />
      <Footer appName={appName} current_year={current_year} />
    </div>
  )
}