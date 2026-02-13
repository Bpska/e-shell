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
      answer: 'The event will be held at Nalanda Institute of Technology, Bhubaneswar, Odisha on 7th and 8th March 2026.'
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
    <section className="py-20 bg-[#F7E7C6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7A1F1F] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border-2 border-[#D9B68C] overflow-hidden hover:border-[#7A1F1F] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-[#7A1F1F] text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`text-[#D4A017] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-[#000000] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
