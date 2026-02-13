import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#7A1F1F] text-white border-t-4 border-[#D4A017]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[#D4A017] rounded-full flex items-center justify-center border-2 border-[#F7E7C6]">
                <span className="text-[#7A1F1F] font-bold text-xl">U</span>
              </div>
              <div>
                <h3 className="text-[#F7E7C6] font-bold text-lg leading-tight">UTKALPRENEUR</h3>
                <p className="text-[#D4A017] text-xs">E-FEST 2026</p>
              </div>
            </div>
            <p className="text-[#F7E7C6] italic text-sm mb-4">
              "Where Tradition Meets Innovation"
            </p>
            <p className="text-[#D9B68C] text-sm">
              7th - 8th March 2026<br />
              Nalanda Institute of Technology
            </p>
          </div>

          <div>
            <h4 className="text-[#D4A017] font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Events', 'Schedule', 'Sponsorship', 'Register'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-[#F7E7C6] hover:text-[#D4A017] transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4A017] font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[#F7E7C6] text-sm">
                <Mail size={16} className="text-[#D4A017]" />
                <span>utkalpreneur@nalanda.ac.in</span>
              </li>
              <li className="flex items-center gap-2 text-[#F7E7C6] text-sm">
                <Phone size={16} className="text-[#D4A017]" />
                <span>+91 XXX XXX XXXX</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4A017] font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-10 h-10 bg-[#D4A017] rounded-full flex items-center justify-center hover:bg-[#F7E7C6] transition-colors">
                <Facebook className="text-[#7A1F1F]" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-[#D4A017] rounded-full flex items-center justify-center hover:bg-[#F7E7C6] transition-colors">
                <Twitter className="text-[#7A1F1F]" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-[#D4A017] rounded-full flex items-center justify-center hover:bg-[#F7E7C6] transition-colors">
                <Instagram className="text-[#7A1F1F]" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-[#D4A017] rounded-full flex items-center justify-center hover:bg-[#F7E7C6] transition-colors">
                <Linkedin className="text-[#7A1F1F]" size={20} />
              </a>
            </div>
            <p className="text-[#D9B68C] text-xs">
              Organized by<br />
              <span className="text-[#F7E7C6] font-semibold">UEC & E-Cell Nalanda</span>
            </p>
          </div>
        </div>

        <div className="border-t border-[#D4A017] pt-6">
          <p className="text-center text-[#F7E7C6] text-sm">
            © 2026 UTKALPRENEUR E-FEST. All rights reserved. | Powered by Entrepreneurship Cell, Nalanda Institute of Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
