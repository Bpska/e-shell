import { Sparkles, Trophy, Lightbulb, Users, Zap } from 'lucide-react';

export default function WhyAttend() {
  const reasons = [
    {
      icon: <Sparkles size={48} />,
      title: 'Promote Innovation Culture',
      description: 'Be part of a movement that cultivates an entrepreneurial mindset rooted in Odisha\'s heritage'
    },
    {
      icon: <Trophy size={48} />,
      title: 'Connect with Investors & Mentors',
      description: 'Network with 50+ mentors, investors, and industry leaders who support startups'
    },
    {
      icon: <Lightbulb size={48} />,
      title: 'Learn from Leaders',
      description: 'Gain insights from keynote talks and leadership sessions by successful entrepreneurs'
    },
    {
      icon: <Users size={48} />,
      title: 'Showcase Your Startup',
      description: 'Present your ideas at the startup expo alongside 50+ exhibitors and artisans'
    },
    {
      icon: <Zap size={48} />,
      title: 'Experience Culture & Tech',
      description: 'Enjoy cultural performances, artisan workshops, traditional food stalls, and cutting-edge innovation'
    }
  ];

  return (
    <section id="why-attend" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F7E7C6] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter">
            Why Attend?
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-400 font-black uppercase tracking-widest italic leading-none">
            Experience the Extraordinary
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="p-6 sm:p-10 rounded-[2.5rem] bg-[#F7E7C6]/20 border-2 border-[#7A1F1F]/5 hover:bg-white hover:shadow-3xl transition-all duration-500 group"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#7A1F1F] mb-10 group-hover:bg-[#7A1F1F] group-hover:text-white transition-all shadow-lg transform group-hover:scale-110">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tight italic leading-tight">
                {reason.title}
              </h3>
              <p className="text-gray-600 font-bold leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
