import { Trophy, Star, TrendingUp, Presentation } from 'lucide-react';

export default function Prizes() {
    const prizes = [
        {
            title: 'Techspaire 1.0',
            subtitle: 'Innovation Hackathon',
            amount: '₹30,000',
            label: 'PRIZE POOL',
            icon: <Trophy size={48} />,
            gradient: 'from-[#7A1F1F] to-[#5A1515]',
            benefits: ['Cash Rewards', 'Direct Mentorship', 'Incubation Support', 'Certificates']
        },
        {
            title: 'Mock Shark Tank',
            subtitle: 'Pitch Competition',
            amount: '₹6,000',
            label: 'TOP PRIZE',
            icon: <Presentation size={48} />,
            gradient: 'from-[#D4A017] to-[#B8860B]',
            benefits: ['Seed Funding Opportunity', 'Investor Networking', 'Startup Mentorship', 'Certificates']
        }
    ];

    return (
        <section id="prizes" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-24 bg-gradient-to-b from-[#F7E7C6]/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter italic">
                        Win Big Rewards
                    </h2>
                    <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6 shadow-sm"></div>
                    <p className="text-xl text-gray-500 font-bold uppercase tracking-widest italic">Innovation Meets Recognition</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
                    {prizes.map((prize, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#F7E7C6]/20 rounded-[3rem] p-8 sm:p-12 border-2 border-[#7A1F1F]/5 hover:border-[#7A1F1F]/20 transition-all duration-500 hover:shadow-2xl overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${prize.gradient}`}></div>

                            <div className="flex items-start justify-between mb-10">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black text-[#7A1F1F] tracking-tighter uppercase italic">{prize.title}</h3>
                                    <p className="text-[#D4A017] font-black text-sm tracking-widest uppercase">{prize.subtitle}</p>
                                </div>
                                <div className={`p-4 bg-white rounded-2xl shadow-xl border-b-4 border-gray-100 text-[#7A1F1F] group-hover:scale-110 transition-transform duration-500`}>
                                    {prize.icon}
                                </div>
                            </div>

                            <div className="mb-10 text-center sm:text-left">
                                <span className="text-xs font-black text-gray-400 tracking-[0.3em] uppercase block mb-2">{prize.label}</span>
                                <div className="flex flex-col sm:flex-row items-baseline gap-2">
                                    <span className="text-6xl lg:text-7xl font-black text-[#7A1F1F] tracking-tighter leading-none italic animate-pulse">
                                        {prize.amount}
                                    </span>
                                    <span className="text-2xl font-black text-[#7A1F1F]/40 italic">/-</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {prize.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-[#D4A017] flex items-center justify-center flex-shrink-0">
                                            <Star size={12} className="text-[#7A1F1F] fill-[#7A1F1F]" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative Background Elements */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#D4A017]/5 rounded-full -mr-16 -mb-16 blur-2xl group-hover:bg-[#D4A017]/10 transition-colors"></div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-4 p-6 bg-[#7A1F1F] rounded-3xl text-white shadow-2xl border-b-8 border-[#5A1515]">
                        <TrendingUp size={32} className="text-[#D4A017]" />
                        <p className="text-lg sm:text-xl font-black italic uppercase tracking-tight">
                            Total Prize Pool exceeds <span className="text-[#D4A017] text-2xl">₹50,000+</span> for the entire fest!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
