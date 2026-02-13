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
    <section className="py-20 bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4A017]">
            Where Tradition Meets Innovation
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="text-xl text-[#F7E7C6] max-w-3xl mx-auto">
            Our theme celebrates the perfect blend of Odisha's cultural richness with modern entrepreneurial spirit
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-[#F7E7C6] text-[#000000] p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-4 border-[#D4A017]"
            >
              <div className="text-[#7A1F1F] mb-4">{point.icon}</div>
              <h3 className="text-xl font-bold text-[#7A1F1F] mb-3">{point.title}</h3>
              <p className="text-[#000000] leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
