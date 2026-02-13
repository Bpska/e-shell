import { Eye, Target } from 'lucide-react';

export default function VisionMission() {
  return (
    <section className="py-20 bg-[#F7E7C6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-4 border-[#7A1F1F] hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#7A1F1F] rounded-full flex items-center justify-center">
                <Eye className="text-[#D4A017]" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-[#7A1F1F]">Our Vision</h3>
            </div>
            <p className="text-lg text-[#000000] leading-relaxed">
              To establish <span className="font-bold text-[#7A1F1F]">Odisha</span> as a hub of culturally rooted entrepreneurship, where innovation is inspired by heritage and businesses are built on the foundation of our rich traditions.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-4 border-[#D4A017] hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#D4A017] rounded-full flex items-center justify-center">
                <Target className="text-[#7A1F1F]" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-[#D4A017]">Our Mission</h3>
            </div>
            <ul className="space-y-3 text-lg text-[#000000]">
              <li className="flex items-start gap-3">
                <span className="text-[#D4A017] font-bold text-xl">•</span>
                <span>Blend heritage with startup innovation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4A017] font-bold text-xl">•</span>
                <span>Provide learning and networking platforms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4A017] font-bold text-xl">•</span>
                <span>Encourage ethical, inclusive entrepreneurship</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
