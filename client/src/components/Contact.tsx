import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#7A1F1F] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/10 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-[#D4A017] uppercase tracking-tighter italic">
            Get In Touch
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-[#F7E7C6] font-medium opacity-80">
            Have questions? Our team is ready to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-black text-[#D4A017] mb-10 tracking-tight uppercase italic">Contact Info</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#D4A017] group-hover:text-[#7A1F1F] transition-all shadow-lg">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#F7E7C6] mb-1 uppercase text-sm tracking-widest">Venue</h4>
                    <p className="text-xl font-bold">Nalanda Institute of Technology</p>
                    <p className="text-white/60">Bhubaneswar, Odisha</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#D4A017] group-hover:text-[#7A1F1F] transition-all shadow-lg">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#F7E7C6] mb-1 uppercase text-sm tracking-widest">Email</h4>
                    <p className="text-base sm:text-xl font-bold break-all">utkalpreneurefest2k26@gmail.com</p>
                    <p className="text-white/60">ecell@nalanda.ac.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#D4A017] group-hover:text-[#7A1F1F] transition-all shadow-lg">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#F7E7C6] mb-1 uppercase text-sm tracking-widest">Support</h4>
                    <p className="text-xl font-bold">+91 97770 82740</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-[#D4A017] mb-6 tracking-[0.4em] uppercase">Join Our Community</h3>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-[#D4A017] hover:text-[#7A1F1F] hover:-translate-y-2 transition-all shadow-xl border border-white/5">
                    <Icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-4 shadow-3xl border border-white/10 relative group">
            <div className="absolute inset-0 bg-[#D4A017]/5 rounded-[3rem] group-hover:bg-[#D4A017]/10 transition-colors"></div>
            <div className="bg-black/20 h-full min-h-[300px] sm:min-h-[400px] rounded-[2.5rem] flex items-center justify-center p-2 border border-white/5 relative z-10 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.783301531729!2d85.75926857523866!3d20.365902981122638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19060462635441%3A0x2697f0bcc78c2240!2sNalanda%20Institute%20of%20Technology%20%5BNIT%5D%2C%20Bhubaneswar!5e1!3m2!1sen!2sin!4v1772442752672!5m2!1sen!2sin"
                className="w-full h-full min-h-[300px] sm:min-h-[400px] rounded-[2rem]"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
