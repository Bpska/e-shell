import { MapPin, ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7E7C6] via-[#D9B68C] to-[#F7E7C6] pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-4 border-[#7A1F1F]/10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full border-4 border-[#7A1F1F]/5 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 border-4 border-[#D4A017]/10 rotate-45 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-fadeIn">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold text-[#7A1F1F] mb-6 tracking-tighter uppercase leading-none italic">
            UTKALPRENEUR
            <span className="block text-[#D4A017] not-italic">E-FEST 2026</span>
          </h1>

          <div className="mb-12 space-y-4 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg sm:text-2xl md:text-4xl text-[#000000] font-bold tracking-tight">
              "Rooted in Tradition, Rising with Enterprise"
            </p>
            <p className="text-base sm:text-xl md:text-2xl text-[#7A1F1F] font-medium opacity-80">
              Where Odisha's Heritage Meets Global Innovation
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-4 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#7A1F1F]/10 shadow-sm">
              <MapPin className="text-[#7A1F1F]" size={28} />
              <div className="text-left">
                <p className="text-xs text-[#7A1F1F] font-bold uppercase tracking-wider">Location</p>
                <p className="font-bold text-[#000000]">NIT Bhubaneswar</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#7A1F1F]/10 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#D4A017] animate-ping"></div>
              <div className="text-left">
                <p className="text-xs text-[#7A1F1F] font-bold uppercase tracking-wider">Date</p>
                <p className="font-bold text-[#000000]">March 21 - 22, 2026</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={() => { window.location.hash = '#/registration'; }}
              className="premium-button group px-6 sm:px-10 py-4 sm:py-5 bg-[#7A1F1F] text-[#F7E7C6] rounded-2xl font-black text-base sm:text-xl hover:bg-[#D4A017] hover:text-[#000000] transition-all flex items-center gap-3 border-b-4 border-[#5A1515]"
            >
              REGISTER NOW
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('sponsorship')}
              className="premium-button px-6 sm:px-10 py-4 sm:py-5 bg-white text-[#7A1F1F] rounded-2xl font-black text-base sm:text-xl hover:bg-[#F7E7C6] transition-all border-b-4 border-gray-200"
            >
              SPONSOR US
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F7E7C6] to-transparent"></div>
    </section>
  );
}
