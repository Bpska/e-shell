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
    <section className="py-20 bg-[#F7E7C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7A1F1F] mb-4">
            Who Should Attend?
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="text-xl text-[#000000] max-w-3xl mx-auto">
            This fest brings together diverse stakeholders in the entrepreneurship ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stakeholders.map((stakeholder, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border-4 border-[#D9B68C] hover:border-[#D4A017]"
            >
              <div className="text-[#7A1F1F] mb-4 flex justify-center">
                {stakeholder.icon}
              </div>
              <h3 className="text-lg font-bold text-[#7A1F1F] mb-2">{stakeholder.title}</h3>
              <p className="text-[#000000] text-sm leading-relaxed">{stakeholder.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
