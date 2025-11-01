import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import Footer from '../Components/Footer';

export default function Home({ current_year }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Footer currentYear={current_year} />
    </div>
  );
}