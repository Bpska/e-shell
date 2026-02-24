import { Clock } from 'lucide-react';

export default function Schedule() {
  const schedule = {
    day1: [
      { time: '09:00 AM', event: 'Inauguration Ceremony', description: 'Welcome address and lamp lighting' },
      { time: '10:30 AM', event: 'Keynote & Leadership Talks', description: 'Industry leaders share their journey' },
      { time: '12:00 PM', event: 'Hackathon Begins', description: '24-hour innovation challenge kickoff' },
      { time: '02:00 PM', event: 'Startup & Cultural Exhibition Opens', description: 'Explore startups and heritage crafts' },
      { time: '06:00 PM', event: 'Networking Evening', description: 'Connect with entrepreneurs and investors' }
    ],
    day2: [
      { time: '10:00 AM', event: 'Hackathon Presentations', description: 'Teams present their solutions' },
      { time: '12:00 PM', event: 'Mock Shark Tank', description: 'Pitch your ideas to investor panel' },
      { time: '02:00 PM', event: 'Mentor Interaction Sessions', description: 'One-on-one guidance from experts' },
      { time: '04:00 PM', event: 'Awards & Felicitation', description: 'Recognizing outstanding participants' },
      { time: '06:00 PM', event: 'Closing Ceremony', description: 'Vote of thanks and cultural performance' }
    ]
  };

  return (
    <section id="schedule" className="py-24 bg-[#7A1F1F] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-[#D4A017] uppercase tracking-tighter italic">
            Event Schedule
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-[#F7E7C6] font-medium opacity-80">
            Two days of inspiration, innovation, and incredible experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Day 1 */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-[#D4A017] rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
                <span className="text-[#7A1F1F] font-black text-3xl">01</span>
              </div>
              <div>
                <h3 className="text-4xl font-black text-[#D4A017] tracking-tight uppercase italic">Day 1</h3>
                <span className="text-[#F7E7C6] font-bold tracking-widest uppercase text-sm">March 22nd</span>
              </div>
            </div>
            <div className="space-y-6">
              {schedule.day1.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-2 text-[#D4A017] font-bold sm:min-w-[100px]">
                    <Clock size={18} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-base sm:text-lg mb-1 group-hover:text-[#D4A017] transition-colors">{item.event}</h4>
                    <p className="text-xs sm:text-sm text-[#F7E7C6] opacity-70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Day 2 */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-[#F7E7C6] rounded-2xl flex items-center justify-center -rotate-3 shadow-lg">
                <span className="text-[#7A1F1F] font-black text-3xl">02</span>
              </div>
              <div>
                <h3 className="text-4xl font-black text-[#F7E7C6] tracking-tight uppercase italic">Day 2</h3>
                <span className="text-[#D4A017] font-bold tracking-widest uppercase text-sm">March 23rd</span>
              </div>
            </div>
            <div className="space-y-6">
              {schedule.day2.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-2 text-[#F7E7C6] font-bold sm:min-w-[100px]">
                    <Clock size={18} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-base sm:text-lg mb-1 group-hover:text-[#F7E7C6] transition-colors">{item.event}</h4>
                    <p className="text-xs sm:text-sm text-[#D4A017] opacity-70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
