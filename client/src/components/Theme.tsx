import { Lightbulb, Heart, TrendingUp } from 'lucide-react';

export default function Theme() {
  const points = [
    {
      icon: <Lightbulb size={40} />,
      title: 'Innovation Inspired by Local Culture',
      description: 'Drawing from Odisha\'s rich heritage to create groundbreaking solutions'
    },
    {
      icon: <Heart size={40} />,
      title: 'Entrepreneurship from Heritage',
      description: 'Transforming handlooms, crafts, and traditions into sustainable business models'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Youth-Led Transformation',
      description: 'Empowering young entrepreneurs to scale cultural ventures into global markets'
    }
  ];

  return (
    <section id="theme" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F7E7C6] to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter">
            Our Theme
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-2xl md:text-3xl font-black text-[#000000] italic tracking-tight uppercase leading-none">
            "Where Tradition Meets Innovation"
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {points.map((point, index) => (
            <div
              key={index}
              className="group p-10 bg-[#F7E7C6]/20 rounded-[3rem] border-2 border-[#7A1F1F]/5 hover:bg-white hover:shadow-2xl hover:border-[#7A1F1F]/20 transition-all duration-500"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#7A1F1F] mb-8 group-hover:bg-[#7A1F1F] group-hover:text-white transition-all shadow-lg transform -rotate-3 group-hover:rotate-3">
                {point.icon}
              </div>
              <h3 className="text-2xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tight italic leading-tight">
                {point.title}
              </h3>
              <p className="text-gray-600 font-bold leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
