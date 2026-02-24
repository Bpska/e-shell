import { GraduationCap, Briefcase, Users, TrendingUp, Palette } from 'lucide-react';

export default function Stakeholders() {
  const stakeholders = [
    {
      icon: <GraduationCap size={48} />,
      title: 'Students & Innovators',
      description: 'Future entrepreneurs ready to make their mark'
    },
    {
      icon: <Briefcase size={48} />,
      title: 'Startups & Entrepreneurs',
      description: 'Early-stage ventures seeking growth opportunities'
    },
    {
      icon: <Users size={48} />,
      title: 'Industry Experts',
      description: 'Seasoned professionals sharing knowledge and experience'
    },
    {
      icon: <TrendingUp size={48} />,
      title: 'Investors & Mentors',
      description: 'Supporting the next generation of innovators'
    },
    {
      icon: <Palette size={48} />,
      title: 'Artisans & Creators',
      description: 'Traditional craftspeople embracing entrepreneurship'
    }
  ];

  return (
    <section id="stakeholders" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F7E7C6] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter">
            Who's Invited?
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-400 font-black uppercase tracking-widest italic leading-none">The ecosystem is waiting for you</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
          {stakeholders.map((stakeholder, index) => (
            <div
              key={index}
              className="p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] bg-[#F7E7C6]/20 border-2 border-[#7A1F1F]/5 hover:bg-white hover:shadow-3xl transition-all duration-500 group text-center"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#7A1F1F] mb-8 group-hover:bg-[#7A1F1F] group-hover:text-white transition-all shadow-lg mx-auto transform group-hover:rotate-6">
                {stakeholder.icon}
              </div>
              <h3 className="text-base sm:text-xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tight italic leading-tight">
                {stakeholder.title}
              </h3>
              <p className="text-gray-600 font-bold text-sm leading-relaxed">
                {stakeholder.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
