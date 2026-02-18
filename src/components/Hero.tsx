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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-[#7A1F1F]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full border-4 border-[#7A1F1F]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-[#D4A017] rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-fadeIn">


          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#7A1F1F] mb-6 tracking-tight">
            UTKALPRENEUR
            <span className="block text-[#D4A017] text-4xl md:text-6xl lg:text-7xl mt-2">E-FEST 2026</span>
          </h1>

          <div className="mb-8 space-y-2">
            <p className="text-2xl md:text-3xl lg:text-4xl text-[#000000] font-semibold italic">
              "Rooted in Tradition, Rising with Enterprise"
            </p>
            <p className="text-xl md:text-2xl text-[#7A1F1F] font-medium">
              Where Tradition Meets Innovation
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 text-lg">

            <div className="hidden sm:block w-2 h-2 rounded-full bg-[#7A1F1F]"></div>
            <div className="flex items-center gap-2 text-[#000000]">
              <MapPin className="text-[#7A1F1F]" size={24} />
              <span className="font-medium">NIT Bhubaneswar</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => scrollToSection('register')}
              className="group px-8 py-4 bg-[#7A1F1F] text-[#F7E7C6] rounded-lg font-bold text-lg hover:bg-[#D4A017] hover:text-[#000000] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 border-2 border-[#D4A017]"
            >
              Register Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('sponsorship')}
              className="px-8 py-4 bg-[#D4A017] text-[#000000] rounded-lg font-bold text-lg hover:bg-[#7A1F1F] hover:text-[#F7E7C6] transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-[#7A1F1F]"
            >
              Become a Sponsor
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="px-8 py-4 bg-transparent text-[#7A1F1F] rounded-lg font-bold text-lg hover:bg-[#7A1F1F] hover:text-[#F7E7C6] transition-all duration-300 border-2 border-[#7A1F1F]"
            >
              View Schedule
            </button>
          </div>

          <div className="pt-8">
            <p className="text-sm text-[#7A1F1F] font-medium">Organized by</p>
            <p className="text-lg font-bold text-[#000000]">Entrepreneurship Cell (UEC & E-Cell Nalanda)</p>
            <p className="text-md text-[#7A1F1F]">Nalanda Institute of Technology, Bhubaneswar</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F7E7C6] to-transparent"></div>
    </section>
  );
}
