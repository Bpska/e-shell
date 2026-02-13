import { Sparkles, Trophy, Lightbulb, Users, Zap } from 'lucide-react';

export default function WhyAttend() {
  const reasons = [
    {
      icon: <Sparkles size={48} />,
      title: 'Celebrate Entrepreneurship',
      description: 'Be part of a movement that honors innovation rooted in tradition'
    },
    {
      icon: <Trophy size={48} />,
      title: 'Unlock Opportunities',
      description: 'Connect with investors, mentors, and industry leaders'
    },
    {
      icon: <Lightbulb size={48} />,
      title: 'Learn & Innovate',
      description: 'Gain insights from successful entrepreneurs and experts'
    },
    {
      icon: <Users size={48} />,
      title: 'Showcase Your Vision',
      description: 'Present your startup or idea to a diverse audience'
    },
    {
      icon: <Zap size={48} />,
      title: 'Be Inspired',
      description: 'Experience the fusion of culture and cutting-edge technology'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#D9B68C] to-[#F7E7C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7A1F1F] mb-4">
            Why Attend?
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="text-xl text-[#000000] max-w-3xl mx-auto">
            Join us for an unforgettable experience that blends culture, innovation, and entrepreneurship
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-[#D4A017] group"
            >
              <div className="text-[#7A1F1F] mb-4 group-hover:text-[#D4A017] transition-colors">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#7A1F1F] mb-3">{reason.title}</h3>
              <p className="text-[#000000] leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
