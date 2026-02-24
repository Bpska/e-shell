import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#7A1F1F] text-white border-t-8 border-[#D4A017] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="UTKALPRENEUR E-FEST 2026" className="h-24 w-auto grayscale brightness-200" />
            </div>
            <p className="text-[#F7E7C6] text-lg font-black italic tracking-tight leading-tight uppercase">
              "Where Tradition Meets Innovation"
            </p>
            <div className="space-y-1">
              <p className="text-[#D4A017] font-black uppercase text-xs tracking-[0.2em]">Our Base</p>
              <p className="text-white/60 font-medium">Nalanda Institute of Technology, Bhubaneswar</p>
            </div>
          </div>

          <div>
            <h4 className="text-[#D4A017] font-black text-xs tracking-[0.4em] uppercase mb-10 italic">Quick Access</h4>
            <ul className="grid grid-cols-1 gap-4">
              {['Home', 'About', 'Events', 'Schedule', 'Sponsorship', 'Register'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-[#F7E7C6] hover:text-white font-bold text-sm tracking-widest uppercase transition-all hover:translate-x-2"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4A017] font-black text-xs tracking-[0.4em] uppercase mb-10 italic">Get Help</h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#D4A017] group-hover:text-[#7A1F1F] transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-white/60 font-medium text-xs sm:text-sm transition-colors group-hover:text-white break-all">utkalpreneurefest2k26@gmail.com</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#D4A017] group-hover:text-[#7A1F1F] transition-all">
                  <Phone size={18} />
                </div>
                <span className="text-white/60 font-medium text-sm transition-colors group-hover:text-white">+91 XXX XXX XXXX</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4A017] font-black text-xs tracking-[0.4em] uppercase mb-10 italic">Our Pulse</h4>
            <div className="flex gap-4 mb-10">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#D4A017] hover:text-[#7A1F1F] hover:-translate-y-2 transition-all shadow-xl">
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-2 font-black">Organized by</p>
              <p className="text-[#D4A017] font-black text-lg tracking-tighter uppercase italic leading-none">UEC & E-Cell Nalanda</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase text-center md:text-left">
            © 2026 UTKALPRENEUR E-FEST. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase hover:text-[#D4A017] transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase hover:text-[#D4A017] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
