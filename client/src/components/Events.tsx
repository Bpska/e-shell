import { Code, Presentation, Store, TrendingUp, Award } from 'lucide-react';
import img1 from '../image/1.png';
import img2 from '../image/2.png';
import img3 from '../image/3.png';
import img4 from '../image/4.png';
import img5 from '../image/5.png';

export default function Events() {
  const events = [
    {
      icon: <Code size={40} />,
      title: 'Techspaire 1.0',
      duration: 'Day 1 & Day 2',
      image: img1,
      description: 'A flagship technical event to demonstrate your innovative technical prowess.',
      registerUrl: '#/registration/techspaire'
    },
    {
      icon: <Presentation size={40} />,
      title: 'Local 2 Vocal',
      duration: 'Day 1',
      image: img2,
      description: 'Highlighting local ideas and taking them to a larger stage.',
      registerUrl: '#/registration/local2vocal'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Mock Shark Tank',
      duration: 'Day 2',
      image: img5,
      description: 'Experience the thrill of pitching your ideas to a panel of experts and investors.',
      registerUrl: '#/registration/sharktank'
    },
    {
      icon: <Store size={40} />,
      title: 'Idea 2 Impact',
      duration: 'Day 1',
      image: img4,
      description: 'Transform your raw ideas into impactful solutions for the modern world.',
      registerUrl: '#/registration/idea2impact'
    },
    {
      icon: <Award size={40} />,
      title: 'Sponsorship',
      duration: 'Both Days',
      image: img3,
      description: 'Connect with stakeholders and explore impactful sponsorship opportunities.',
      registerUrl: '#/sponsorship'
    }
  ];

  return (
    <section id="events" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F7E7C6] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter">
            Events & Activities
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-[#000000]/60 max-w-3xl mx-auto font-medium">
            Two days of high-octane competitions, networking, and cultural exhibitions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="group rounded-3xl bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/5 hover:border-[#7A1F1F]/20 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col h-full"
            >
              {event.image && (
                <div className="h-48 overflow-hidden relative shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-4 right-4 text-[10px] font-black text-white bg-[#D4A017] px-3 py-1 rounded-full tracking-widest uppercase">
                    {event.duration}
                  </span>
                </div>
              )}
              <div className="p-6 sm:p-8 flex flex-col grow">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 bg-white rounded-2xl text-[#7A1F1F] group-hover:bg-[#7A1F1F] group-hover:text-white transition-all duration-500 shadow-sm ${event.image ? '-mt-12 relative z-10' : ''}`}>
                    {event.icon}
                  </div>
                  {!event.image && (
                    <span className="text-xs font-black text-white bg-[#D4A017] px-4 py-2 rounded-full tracking-widest uppercase">
                      {event.duration}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-[#7A1F1F] mb-4 tracking-tight uppercase leading-tight">
                  {event.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium mb-8 grow md:text-lg">
                  {event.description}
                </p>
                <div className="mt-auto pt-4 border-t border-[#7A1F1F]/10">
                  <a
                    href={event.registerUrl}
                    className="block w-full text-center py-3 bg-[#7A1F1F] text-white font-bold rounded-xl hover:bg-[#D4A017] transition-colors uppercase tracking-wider text-sm md:text-base"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
