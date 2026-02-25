import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from '../image/logo.jpeg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setCurrentRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', hash: '#/' },
    { name: 'About', hash: '#about' },
    { name: 'Events', hash: '#events' },
    { name: 'Schedule', hash: '#schedule' },
    { name: 'Sponsorship', hash: '#sponsorship' },
    { name: 'Gallery', hash: '#gallery' },
    { name: 'Contact', hash: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${scrolled
        ? 'py-4 px-4 sm:px-6 lg:px-8'
        : 'py-6 px-4 sm:px-6 lg:px-8'
        }`}
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-700 ease-out border-2 ${scrolled
          ? 'bg-white/70 backdrop-blur-2xl shadow-[0_15px_50px_-15px_rgba(122,31,31,0.2)] rounded-[2.5rem] border-[#7A1F1F]/10 px-6 lg:px-10 py-2'
          : 'bg-transparent border-transparent px-2 py-0'
          }`}
      >
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => navigateTo('#/')}>
            <div className="relative">
              <img
                src={logo}
                alt="UTKALPRENEUR"
                className={`transition-all duration-500 group-hover:scale-105 ${scrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'}`}
              />
              <div className="absolute -inset-4 bg-[#7A1F1F]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center bg-[#7A1F1F]/5 p-1.5 rounded-full border border-[#7A1F1F]/5 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.hash}
                  onClick={() => navigateTo(link.hash)}
                  className={`px-5 py-2.5 rounded-full font-black uppercase text-[11px] tracking-[0.2em] transition-all duration-300 relative group overflow-hidden ${currentRoute === link.hash
                    ? 'text-white bg-[#7A1F1F] shadow-lg shadow-[#7A1F1F]/20'
                    : 'text-[#7A1F1F]/70 hover:text-[#7A1F1F] hover:bg-white/50'
                    }`}
                >
                  <span className="relative z-10">{link.name}</span>
                </button>
              ))}
            </div>

            <div className="ml-4 pl-4 border-l-2 border-[#7A1F1F]/10">
              <button
                onClick={() => navigateTo('#/registration')}
                className="premium-button px-8 py-3 bg-[#D4A017] text-[#000000] rounded-full font-black uppercase text-[11px] tracking-[0.25em] transition-all hover:bg-[#7A1F1F] hover:text-[#F7E7C6] border-b-4 border-[#B8860B] active:border-b-0 active:translate-y-1"
              >
                Join Now
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${scrolled ? 'bg-[#7A1F1F] text-white shadow-xl' : 'bg-white text-[#7A1F1F] shadow-lg'
              }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[-1] transition-all duration-700 ease-in-out ${isOpen
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 translate-x-full pointer-events-none'
        }`}>
        <div className="absolute inset-0 bg-[#F7E7C6]/95 backdrop-blur-3xl"></div>
        <div className="relative h-full flex flex-col items-center justify-center p-8">
          <div className="absolute top-12 left-10 opacity-20 transform -rotate-12">
            <img src="/logo.png" alt="Logo" className="w-32" />
          </div>

          <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
            {navLinks.map((link, i) => (
              <button
                key={link.hash}
                onClick={() => navigateTo(link.hash)}
                className={`w-full py-4 text-3xl font-black uppercase tracking-tighter italic transition-all transform flex items-center justify-between group ${currentRoute === link.hash ? 'text-[#D4A017]' : 'text-[#7A1F1F]'
                  }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  borderBottom: '2px solid rgba(122, 31, 31, 0.05)'
                }}
              >
                <span>{link.name}</span>
                <ArrowRight size={24} className={`opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${currentRoute === link.hash ? 'opacity-100 translate-x-0' : ''
                  }`} />
              </button>
            ))}

            <button
              onClick={() => navigateTo('#/registration')}
              className="w-full mt-10 px-8 py-6 bg-[#7A1F1F] text-[#F7E7C6] rounded-[2.5rem] font-black text-2xl uppercase tracking-tighter border-b-8 border-[#5A1515] active:border-b-0 active:translate-y-2 transition-all shadow-2xl"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
