import { Eye, Target } from 'lucide-react';

export default function VisionMission() {
  return (
    <section id="vision-mission" className="py-24 bg-[#F7E7C6] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A1F1F]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="glass-card rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 border-2 border-[#7A1F1F]/10 hover:shadow-3xl transition-all duration-500 group">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-20 h-20 bg-[#7A1F1F]/10 rounded-3xl flex items-center justify-center text-[#7A1F1F] group-hover:bg-[#7A1F1F] group-hover:text-white transition-all transform rotate-3">
                <Eye size={40} />
              </div>
              <h3 className="text-4xl font-black text-[#7A1F1F] uppercase tracking-tighter italic">Our Vision</h3>
            </div>
            <p className="text-xl text-gray-700 font-bold leading-relaxed">
              To establish <span className="text-[#7A1F1F]">Odisha</span> as a hub of culturally rooted entrepreneurship, where tradition fuels innovation and yields sustainable local economic growth.
            </p>
          </div>

          <div className="glass-card rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 border-2 border-[#D4A017]/20 hover:shadow-3xl transition-all duration-500 group md:scale-105 bg-white">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-20 h-20 bg-[#D4A017]/10 rounded-3xl flex items-center justify-center text-[#D4A017] group-hover:bg-[#D4A017] group-hover:text-white transition-all transform -rotate-3">
                <Target size={40} />
              </div>
              <h3 className="text-4xl font-black text-[#D4A017] uppercase tracking-tighter italic">Our Mission</h3>
            </div>
            <div className="space-y-6">
              {[
                "Blend cultural heritage with startup innovation",
                "Provide platforms for learning, showcasing, and networking",
                "Encourage ethical, inclusive, and impactful entrepreneurship"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4A017]/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-[#D4A017] rounded-full"></div>
                  </div>
                  <p className="text-lg text-gray-700 font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
