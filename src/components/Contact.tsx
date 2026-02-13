import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4A017]">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="text-xl text-[#F7E7C6]">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#D4A017] mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#D4A017] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-[#F7E7C6] mb-1">Venue</h4>
                    <p className="text-white">Nalanda Institute of Technology</p>
                    <p className="text-white">Bhubaneswar, Odisha</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-[#D4A017] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-[#F7E7C6] mb-1">Email</h4>
                    <p className="text-white">utkalpreneur@nalanda.ac.in</p>
                    <p className="text-white">ecell@nalanda.ac.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-[#D4A017] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-[#F7E7C6] mb-1">Phone</h4>
                    <p className="text-white">+91 XXX XXX XXXX</p>
                    <p className="text-white">+91 XXX XXX XXXX</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#D4A017] mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-[#D4A017] rounded-full flex items-center justify-center hover:bg-[#F7E7C6] transition-colors">
                  <Facebook className="text-[#7A1F1F]" size={24} />
                </a>
                <a href="#" className="w-12 h-12 bg-[#D4A017] rounded-full flex items-center justify-center hover:bg-[#F7E7C6] transition-colors">
                  <Twitter className="text-[#7A1F1F]" size={24} />
                </a>
                <a href="#" className="w-12 h-12 bg-[#D4A017] rounded-full flex items-center justify-center hover:bg-[#F7E7C6] transition-colors">
                  <Instagram className="text-[#7A1F1F]" size={24} />
                </a>
                <a href="#" className="w-12 h-12 bg-[#D4A017] rounded-full flex items-center justify-center hover:bg-[#F7E7C6] transition-colors">
                  <Linkedin className="text-[#7A1F1F]" size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#F7E7C6] rounded-2xl p-1 shadow-2xl border-4 border-[#D4A017]">
            <div className="bg-[#D9B68C] h-full rounded-xl flex items-center justify-center p-8">
              <div className="text-center text-[#7A1F1F]">
                <MapPin size={64} className="mx-auto mb-4" />
                <p className="font-semibold text-lg">Map will be embedded here</p>
                <p className="text-sm mt-2">Nalanda Institute of Technology, Bhubaneswar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
