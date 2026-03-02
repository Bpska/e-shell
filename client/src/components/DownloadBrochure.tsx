import { Download } from 'lucide-react';
import brochureImg from '../image/WhatsApp Image 2026-02-28 at 3.15.31 PM.jpeg';

export default function DownloadBrochure() {
  return (
    <section className="py-24 bg-[#7A1F1F] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[#D4A017]/10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="glass-card bg-white/10 backdrop-blur-3xl rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-12 md:p-20 border-2 border-white/20 shadow-4xl transform hover:scale-[1.02] transition-all">
          <div className="w-24 h-24 bg-[#D4A017] rounded-3xl flex items-center justify-center text-[#7A1F1F] mb-10 mx-auto shadow-2xl rotate-12">
            <Download size={48} />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter italic leading-none">Get the Details</h2>
          <p className="text-base sm:text-2xl text-[#F7E7C6] font-bold mb-12 opacity-80 max-w-2xl mx-auto leading-tight italic uppercase tracking-widest">
            Download our complete 2026 brochure for full event insights.
          </p>
          <a
            href={brochureImg}
            download="Utkalpreneur_E-Fest_2026_Brochure.jpeg"
            className="premium-button inline-block px-8 sm:px-12 py-4 sm:py-6 bg-[#D4A017] text-[#7A1F1F] rounded-3xl font-black text-lg sm:text-2xl border-b-8 border-[#B8860B] hover:scale-105 transition-transform"
          >
            DOWNLOAD BROCHURE
          </a>
        </div>
      </div>
    </section>
  );
}
