import React, { useState } from 'react';
import Navbar from '../../components/LandingPage/Navbar';
import Hero from '../../components/LandingPage/Hero';
import Benefits from '../../components/LandingPage/Benefits';
import Footer from '../../components/LandingPage/Footer';

export default function LandingPage({ current_year, app_name }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <Hero />
      <Benefits />
      <Footer currentYear={current_year} appName={app_name} />
    </div>
  );
}