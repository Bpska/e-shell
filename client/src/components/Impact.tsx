import { Users, Building, Award, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

function AnimatedNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}</span>;
}

export default function Impact() {
  const impacts = [
    {
      icon: <Users size={48} />,
      number: 1500,
      suffix: '+',
      label: 'Student Participants'
    },
    {
      icon: <Building size={48} />,
      number: 50,
      suffix: '+',
      label: 'Startups & Artisan Exhibitors'
    },
    {
      icon: <Award size={48} />,
      number: 50,
      suffix: '+',
      label: 'Mentors, Investors & Speakers'
    },
    {
      icon: <TrendingUp size={48} />,
      number: 100,
      suffix: '%',
      label: 'Long-term Startup Culture Impact'
    }
  ];

  return (
    <section id="impact" className="py-24 bg-[#7A1F1F] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-[#D4A017] uppercase tracking-tighter italic">
            The Impact
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-2xl md:text-3xl font-black text-[#F7E7C6] opacity-80 uppercase tracking-widest italic">Changing the Game</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 mb-24">
          {impacts.map((impact, index) => (
            <div key={index} className="text-center group">
              <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center text-[#D4A017] mx-auto mb-8 group-hover:bg-[#D4A017] group-hover:text-[#7A1F1F] transition-all shadow-2xl rotate-3">
                {impact.icon}
              </div>
              <div className="text-4xl sm:text-6xl font-black mb-2 tracking-tighter italic">
                <AnimatedNumber target={impact.number} />
                {impact.suffix}
              </div>
              <div className="text-[#D4A017] font-black uppercase text-xs tracking-[0.3em]">
                {impact.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/5 backdrop-blur-3xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
            <h3 className="text-3xl font-black text-[#D4A017] mb-8 uppercase tracking-tight italic">Ecosystem Growth</h3>
            <div className="space-y-6">
              {[
                "Promotion of Odisha's cultural economy and heritage businesses",
                "Building sustainable entrepreneurship culture on campus"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4A017]/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-[#D4A017] rounded-full"></div>
                  </div>
                  <p className="text-lg text-[#F7E7C6] font-bold opacity-80 group-hover:opacity-100 transition-opacity">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
            <h3 className="text-3xl font-black text-[#D4A017] mb-8 uppercase tracking-tight italic">Social Impact</h3>
            <div className="space-y-6">
              {[
                "Creating employment opportunities through new ventures",
                "Fostering collaboration between traditional and modern sectors"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#D4A017]/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-[#D4A017] rounded-full"></div>
                  </div>
                  <p className="text-lg text-[#F7E7C6] font-bold opacity-80 group-hover:opacity-100 transition-opacity">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
