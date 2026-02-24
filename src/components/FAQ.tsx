import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Who can attend UTKALPRENEUR E-FEST 2026?',
      answer: 'Students, entrepreneurs, startups, mentors, investors, artisans, and anyone interested in entrepreneurship and innovation are welcome to attend.'
    },
    {
      question: 'Is there a registration fee?',
      answer: 'Registration fees vary by event type. Full Fest Pass provides access to all events. Individual event registrations are also available. Contact us for detailed pricing.'
    },
    {
      question: 'What is the venue for the event?',
      answer: 'The event will be held at Nalanda Institute of Technology, Bhubaneswar, Odisha on 22nd and 23rd March 2026.'
    },
    {
      question: 'Can I participate in multiple events?',
      answer: 'Yes! You can register for multiple events or get a Full Fest Pass to access all activities, workshops, and networking sessions.'
    },
    {
      question: 'Are accommodation facilities available?',
      answer: 'Limited accommodation support may be available for outstation participants. Please mention your requirement during registration.'
    },
    {
      question: 'How can I become a sponsor?',
      answer: 'We offer Gold, Platinum, and Diamond sponsorship tiers. Contact us through the registration form or reach out directly to discuss partnership opportunities.'
    },
    {
      question: 'Will certificates be provided?',
      answer: 'Yes, all registered participants will receive certificates of participation. Winners of competitions will receive special recognition certificates.'
    },
    {
      question: 'What should I bring to the hackathon?',
      answer: 'Bring your laptop, chargers, and any required hardware. Internet and workspace will be provided. Team formation can be done on-site if needed.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#F7E7C6] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A1F1F]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter">
            Common Queries
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-[#000000]/60 font-bold uppercase tracking-widest italic">Everything you need to know</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-[2rem] border-2 border-[#7A1F1F]/5 overflow-hidden transition-all duration-300 hover:border-[#7A1F1F]/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 sm:p-8 text-left"
              >
                <span className="font-black text-[#7A1F1F] text-base sm:text-xl tracking-tight uppercase italic pr-4">{faq.question}</span>
                <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-[#7A1F1F] text-[#F7E7C6] rotate-180' : 'bg-[#D4A017]/10 text-[#7A1F1F]'}`}>
                  <ChevronDown size={28} />
                </div>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-8 animate-fadeIn">
                  <div className="w-full h-px bg-gray-100 mb-6"></div>
                  <p className="text-base sm:text-xl text-gray-700 font-bold leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
