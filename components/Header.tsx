import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';
import { NAV_LINKS } from '../constants';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'glass border-b border-white/10 py-3 shadow-lg' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group relative z-50"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5 md:w-6 md:h-6 transform -rotate-45" />
          </div>
          <div className="font-black text-base md:text-lg tracking-wider leading-none text-right">
            <span className="block text-white group-hover:text-blue-400 transition-colors">שגיא</span>
            <span className="block text-slate-400 text-xs md:text-sm">אברהמי</span>
          </div>
        </a>

        {/* Desktop Nav - Glassmorphism Effect */}
        <nav className="hidden md:flex items-center p-1.5 bg-slate-950/20 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl shadow-black/20">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="
                px-6 py-2.5 rounded-full text-sm font-medium text-slate-300 
                transition-all duration-300 ease-out
                hover:text-white hover:bg-white/5 hover:backdrop-blur-md
                hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-white/10 border border-transparent
                cursor-pointer
              "
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
             <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-white text-black hover:bg-blue-500 hover:text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer block"
          >
            תיאום אימון
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors relative z-50 border border-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`
          fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-40 transition-all duration-500 md:hidden flex flex-col justify-center items-center
          ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        `}
      >
        <nav className="flex flex-col items-center gap-8 w-full px-8">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`
                text-2xl font-bold text-white hover:text-blue-500 transition-all duration-300 cursor-pointer w-full text-center py-2 border-b border-white/5
                ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
           <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`
              bg-blue-600 text-white w-full py-4 rounded-2xl font-bold text-lg mt-8 text-center shadow-lg shadow-blue-600/30
              ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
            style={{ transitionDelay: '400ms' }}
          >
            תיאום אימון
          </a>
        </nav>
      </div>
    </header>
  );
};