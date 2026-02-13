import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function Countdown() {
  const targetDate = new Date('2026-03-07T09:00:00').getTime();

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
    <section className="py-16 bg-gradient-to-r from-[#7A1F1F] via-[#D4A017] to-[#7A1F1F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="text-white" size={32} />
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Event Starts In
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-4 border-[#F7E7C6] transform hover:scale-105 transition-transform"
            >
              <div className="text-4xl md:text-6xl font-bold text-[#7A1F1F] mb-2">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[#D4A017] font-semibold text-lg md:text-xl uppercase">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
