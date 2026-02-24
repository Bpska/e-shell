import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Events', id: 'events' },
    { name: 'Schedule', id: 'schedule' },
    { name: 'Sponsorship', id: 'sponsorship' },
    { name: 'Register', id: 'register' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-2xl py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="relative">
              <img src="/logo.png" alt="UTKALPRENEUR" className="h-16 md:h-20 w-auto transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute -inset-2 bg-[#7A1F1F]/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[#000000] hover:text-[#7A1F1F] font-black uppercase text-sm tracking-widest transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#7A1F1F] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('register')}
              className="premium-button px-8 py-3 bg-[#7A1F1F] text-[#F7E7C6] rounded-2xl font-black uppercase text-sm tracking-widest border-b-4 border-[#5A1515]"
            >
              REGISTER
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#7A1F1F] shadow-lg border border-gray-100 transition-all active:scale-90"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 bg-[#F7E7C6] z-[-1] transition-all duration-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-4xl font-black text-[#7A1F1F] uppercase tracking-tighter italic hover:text-[#D4A017] transition-all transform hover:scale-110 animate-slideInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('register')}
            className="premium-button px-12 py-5 bg-[#7A1F1F] text-[#F7E7C6] rounded-[2rem] font-black text-2xl border-b-8 border-[#5A1515] animate-bounce-slow"
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </nav>
  );
}
