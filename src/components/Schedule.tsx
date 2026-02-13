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
    <section id="schedule" className="py-20 bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4A017]">
            Event Schedule
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="text-xl text-[#F7E7C6]">
            Two days of inspiration, innovation, and incredible experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#F7E7C6] text-[#000000] rounded-2xl p-8 shadow-2xl border-4 border-[#D4A017]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#7A1F1F] rounded-full flex items-center justify-center">
                <span className="text-[#D4A017] font-bold text-xl">1</span>
              </div>
              <h3 className="text-3xl font-bold text-[#7A1F1F]">Day 1</h3>
              <span className="ml-auto text-sm font-semibold text-[#7A1F1F]">7th March</span>
            </div>
            <div className="space-y-4">
              {schedule.day1.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-[#D4A017] hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-[#7A1F1F] font-bold min-w-[90px]">
                    <Clock size={16} />
                    <span className="text-sm">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#7A1F1F] mb-1">{item.event}</h4>
                    <p className="text-sm text-[#000000]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F7E7C6] text-[#000000] rounded-2xl p-8 shadow-2xl border-4 border-[#D4A017]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#D4A017] rounded-full flex items-center justify-center">
                <span className="text-[#7A1F1F] font-bold text-xl">2</span>
              </div>
              <h3 className="text-3xl font-bold text-[#D4A017]">Day 2</h3>
              <span className="ml-auto text-sm font-semibold text-[#D4A017]">8th March</span>
            </div>
            <div className="space-y-4">
              {schedule.day2.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-[#7A1F1F] hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-[#D4A017] font-bold min-w-[90px]">
                    <Clock size={16} />
                    <span className="text-sm">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#D4A017] mb-1">{item.event}</h4>
                    <p className="text-sm text-[#000000]">{item.description}</p>
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
