import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { NavButton } from './navigation/NavButton';
import { MobileNavButton } from './navigation/MobileNavButton';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-4">
          <a href="tel:+41797356059" className="flex items-center space-x-2 hover:text-blue-200">
            <Phone size={16} />
            <span>+41 79 735 60 59</span>
          </a>
          <a href="mailto:info@h-i-s.ch" className="flex items-center space-x-2 hover:text-blue-200">
            <Mail size={16} />
            <span>info@h-i-s.ch</span>
          </a>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="text-2xl font-bold text-blue-900"
          >
            Hofmann-Immo-Service
          </button>
          
          <div className="hidden md:flex space-x-6">
            <NavButton onClick={() => scrollToSection('hero')}>Home</NavButton>
            <NavButton onClick={() => scrollToSection('services')}>Dienstleistungen</NavButton>
            <NavButton onClick={() => scrollToSection('why-choose-us')}>Über uns</NavButton>
            <NavButton onClick={() => scrollToSection('contact')}>Kontakt</NavButton>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <MobileNavButton onClick={() => scrollToSection('hero')}>Home</MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection('services')}>Dienstleistungen</MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection('why-choose-us')}>Über uns</MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection('contact')}>Kontakt</MobileNavButton>
          </div>
        )}
      </nav>
    </header>
  );
}
