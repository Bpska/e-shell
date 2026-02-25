import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function Countdown() {
  const targetDate = new Date('2026-03-21T09:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-24 bg-[#D4A017] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#7A1F1F]/5 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4 px-6 py-2 bg-[#7A1F1F] text-white rounded-full shadow-lg">
            <Clock size={24} className="animate-pulse" />
            <h3 className="text-2xl font-black uppercase tracking-widest italic">
              Event Starts In
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-white transform transition-all hover:scale-105 active:scale-95 group"
            >
              <div className="text-5xl md:text-7xl font-black text-[#7A1F1F] mb-2 tracking-tighter italic group-hover:text-[#D4A017] transition-colors">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-gray-400 font-black text-xs md:text-sm uppercase tracking-[0.3em]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
