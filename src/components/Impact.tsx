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
    <section className="py-20 bg-gradient-to-br from-[#D4A017] to-[#B8860B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Expected Impact
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Creating a lasting impact on Odisha's entrepreneurship ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-2xl text-center transform hover:scale-105 transition-all duration-300 border-4 border-[#7A1F1F]"
            >
              <div className="text-[#7A1F1F] mb-4 flex justify-center">
                {impact.icon}
              </div>
              <div className="text-5xl font-bold text-[#7A1F1F] mb-2">
                <AnimatedNumber target={impact.number} />
                {impact.suffix}
              </div>
              <p className="text-[#000000] font-semibold">{impact.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 border-4 border-[#7A1F1F] shadow-2xl">
          <h3 className="text-2xl font-bold text-[#7A1F1F] mb-4 text-center">Additional Impact</h3>
          <ul className="grid md:grid-cols-2 gap-4 text-[#000000]">
            <li className="flex items-start gap-3">
              <span className="text-[#D4A017] text-2xl">✓</span>
              <span>Promotion of Odisha's cultural economy and heritage businesses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4A017] text-2xl">✓</span>
              <span>Building sustainable entrepreneurship culture on campus</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4A017] text-2xl">✓</span>
              <span>Creating employment opportunities through new ventures</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4A017] text-2xl">✓</span>
              <span>Fostering collaboration between traditional and modern sectors</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
