import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import WhyChooseUs from './components/WhyChooseUs';
import References from './components/References';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-[104px]">
        <Hero />
        <ServicesSection />
        <WhyChooseUs />
        <References />
      </main>

      <Footer />
    </div>
  );
}