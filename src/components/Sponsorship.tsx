import { Crown, Award, Gem, ArrowRight } from 'lucide-react';

export default function Sponsorship() {
  const tiers = [
    {
      icon: <Award size={48} />,
      name: 'GOLD',
      price: '₹30,000 – ₹50,000',
      color: 'from-yellow-400 to-yellow-600',
      borderColor: 'border-yellow-500',
      benefits: [
        'Logo on creatives & website',
        'Mention in closing ceremony',
        'Social media acknowledgement',
        'Branding on select banners'
      ]
    },
    {
      icon: <Crown size={48} />,
      name: 'PLATINUM',
      price: '₹50,000 – ₹1,00,000',
      color: 'from-slate-300 to-slate-500',
      borderColor: 'border-slate-400',
      benefits: [
        'Prominent logo on posters, banners, PPTs',
        'Branding on standees',
        'Mention during key sessions',
        'Social media mentions',
        'Co-branding on selected activities'
      ]
    },
    {
      icon: <Gem size={48} />,
      name: 'DIAMOND',
      price: '₹1,00,000+',
      color: 'from-blue-300 to-blue-600',
      borderColor: 'border-blue-500',
      benefits: [
        'Title Partner with maximum visibility',
        'Logo on stage backdrop & certificates',
        'Dedicated opening mention',
        'Exclusive branding booth',
        'Social media shoutouts',
        '2–3 min stage speech opportunity'
      ]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="sponsorship" className="py-24 bg-gradient-to-br from-[#F7E7C6] via-white to-[#F7E7C6] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-24 bg-[#D9B68C]/20 -skew-y-2 origin-top-right"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter">
            Partnership
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-bold tracking-tight">
            Empower the next generation of innovators and gain unmatched brand visibility
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mb-20">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-[3rem] shadow-2xl overflow-hidden transform hover:-translate-y-4 transition-all duration-500 border-2 ${tier.borderColor} group`}
            >
              <div className={`bg-gradient-to-br ${tier.color} p-12 text-white text-center relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform">
                  {tier.icon}
                </div>
                <h3 className="text-4xl font-black mb-2 tracking-tighter italic uppercase">{tier.name}</h3>
                <div className="w-12 h-1 bg-white/40 mx-auto mb-4"></div>
                <p className="text-xl font-black tracking-tight">{tier.price}</p>
              </div>
              <div className="p-10">
                <h4 className="font-black text-[#7A1F1F] mb-8 text-xs tracking-[0.3em] uppercase">Member Benefits</h4>
                <ul className="space-y-6">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#D4A017]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#D4A017] text-sm font-black">✓</span>
                      </div>
                      <span className="text-gray-700 font-bold text-sm leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={scrollToContact}
            className="premium-button group inline-flex items-center gap-4 px-12 py-6 bg-[#7A1F1F] text-[#F7E7C6] rounded-3xl font-black text-2xl border-b-8 border-[#5A1515]"
          >
            BECOME A PARTNER
            <ArrowRight className="group-hover:translate-x-3 transition-transform" size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}
