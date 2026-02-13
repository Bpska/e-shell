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
    <section id="sponsorship" className="py-20 bg-gradient-to-br from-[#F7E7C6] to-[#D9B68C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7A1F1F] mb-4">
            Sponsorship Opportunities
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="text-xl text-[#000000] max-w-3xl mx-auto">
            Partner with us to support entrepreneurship and gain maximum visibility
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-4 ${tier.borderColor}`}
            >
              <div className={`bg-gradient-to-r ${tier.color} p-6 text-white text-center`}>
                <div className="flex justify-center mb-3">
                  {tier.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
                <p className="text-lg font-semibold">{tier.price}</p>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-[#7A1F1F] mb-4 text-lg">Benefits Include:</h4>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D4A017] text-xl font-bold">✓</span>
                      <span className="text-[#000000]">{benefit}</span>
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
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[#7A1F1F] text-[#F7E7C6] rounded-lg font-bold text-xl hover:bg-[#D4A017] hover:text-[#000000] transition-all duration-300 transform hover:scale-105 shadow-2xl border-4 border-[#D4A017]"
          >
            Become a Sponsor
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
