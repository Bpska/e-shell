import { Code, Presentation, Store, Users, TrendingUp, MessageCircle, Award } from 'lucide-react';

export default function Events() {
  const events = [
    {
      icon: <Code size={40} />,
      title: 'Innovation Hackathon',
      duration: '24-hour',
      description: 'Build solutions that blend technology with Odisha\'s cultural heritage. Teams compete to create impactful innovations.'
    },
    {
      icon: <Presentation size={40} />,
      title: 'Startup Pitch Competition',
      duration: 'Full Day',
      description: 'Present your startup idea to investors and industry experts. Win funding and mentorship opportunities.'
    },
    {
      icon: <Store size={40} />,
      title: 'Heritage & Handloom Showcase',
      duration: 'Both Days',
      description: 'Explore traditional crafts and artisan products. Connect heritage with modern markets.'
    },
    {
      icon: <Users size={40} />,
      title: 'Networking Evenings',
      duration: 'Evening',
      description: 'Connect with entrepreneurs, investors, mentors, and fellow innovators in an informal setting.'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Mock Shark Tank',
      duration: 'Day 2',
      description: 'Experience the thrill of pitching to a panel of successful entrepreneurs and investors.'
    },
    {
      icon: <MessageCircle size={40} />,
      title: 'Mentor Interactions',
      duration: 'Both Days',
      description: 'One-on-one sessions with industry veterans and successful founders to guide your journey.'
    },
    {
      icon: <Award size={40} />,
      title: 'Cultural + Startup Exhibition',
      duration: 'Both Days',
      description: 'A unique exhibition showcasing the intersection of tradition and innovation.'
    }
  ];

  return (
    <section id="events" className="py-20 bg-[#F7E7C6] border-t-4 border-[#7A1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7A1F1F] mb-4">
            Events & Activities
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="text-xl text-[#000000] max-w-3xl mx-auto">
            Two days packed with exciting events, competitions, and networking opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#D4A017] group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-[#7A1F1F] group-hover:text-[#D4A017] transition-colors">
                  {event.icon}
                </div>
                <span className="text-xs font-semibold text-white bg-[#7A1F1F] px-3 py-1 rounded-full">
                  {event.duration}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#7A1F1F] mb-2">{event.title}</h3>
              <p className="text-[#000000] leading-relaxed text-sm">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
