import { useState } from 'react';
import { ChevronDown, ChevronUp, Users, ClipboardList, Palette, ShieldCheck, Code2, FileCheck, Award, Presentation, Lightbulb, AlertTriangle, BookOpen, UserCheck } from 'lucide-react';

interface RuleSection {
    icon: React.ReactNode;
    title: string;
    items: string[];
}

export default function HackathonRules() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    const sections: RuleSection[] = [
        {
            icon: <UserCheck size={20} />,
            title: '1. Eligibility',
            items: [
                'Any student currently enrolled in any college/university.',
                'Participants must register before the deadline.',
                'Valid college ID cards are mandatory during the event.',
            ],
        },
        {
            icon: <Users size={20} />,
            title: '2. Team Formation',
            items: [
                'Each team must have 3 to 4 members.',
                'Cross-department teams are promoted.',
                'No participant can be part of more than one team.',
                'All team members should be from the same college/university.',
                'One girl student is mandatory.',
            ],
        },
        {
            icon: <ClipboardList size={20} />,
            title: '3. Registration',
            items: [
                'Registration must be completed through the official form/link.',
                'Team details must be accurate.',
                'Any false information may lead to disqualification.',
            ],
        },
        {
            icon: <Palette size={20} />,
            title: '4. Hackathon Theme',
            items: [
                'Projects must be based on the declared theme.',
                'Solutions should be innovative, practical, and original.',
            ],
        },
        {
            icon: <ShieldCheck size={20} />,
            title: '5. Code of Conduct',
            items: [
                'Maintain discipline and respectful behavior.',
                'No use of offensive language or inappropriate content.',
                'Any misconduct may lead to immediate disqualification.',
                'Follow instructions given by coordinators and judges.',
            ],
        },
        {
            icon: <Code2 size={20} />,
            title: '6. Project Development Rules',
            items: [
                'Teams must build their solution during the hackathon time only.',
                'Use of open-source libraries and APIs is allowed.',
                'Plagiarism is strictly prohibited.',
                'Hardware components must be approved.',
            ],
        },
        {
            icon: <FileCheck size={20} />,
            title: '7. Submission Guidelines',
            items: [
                'Final submission must include: Project title, Problem statement, Solution explanation, Technology used, Source code (GitHub link if required).',
                'Late submissions will not be accepted.',
            ],
        },
        {
            icon: <Award size={20} />,
            title: '8. Judging Criteria',
            items: [
                'Innovation & Creativity',
                'Technical Implementation',
                'Practical Usefulness',
                'User Experience & Design',
                'Presentation & Demonstration',
                "Judges' decisions will be final and binding.",
            ],
        },
        {
            icon: <Presentation size={20} />,
            title: '9. Presentation Rules',
            items: [
                'Each team will get 5–10 minutes for presentation.',
                '2–3 minutes for Q&A session.',
                'All team members must be present during the presentation.',
            ],
        },
        {
            icon: <Lightbulb size={20} />,
            title: '10. Intellectual Property',
            items: ['The project belongs to the team.'],
        },
        {
            icon: <AlertTriangle size={20} />,
            title: '11. Disqualification Conditions',
            items: [
                'Plagiarism or copied project',
                'Rule violation',
                'Misbehavior',
                'Late submission',
            ],
        },
        {
            icon: <BookOpen size={20} />,
            title: '12. General Rules',
            items: [
                'Participants must bring their own laptops and chargers.',
                'Organizers are not responsible for personal belongings.',
                'Follow safety guidelines if hardware components are used.',
            ],
        },
    ];

    return (
        <section id="hackathon-rules" className="py-24 bg-[#1a0a0a] text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4A017]/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#7A1F1F]/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[#D4A017] font-bold text-sm tracking-[0.3em] uppercase">📌 College Hackathon</span>
                    <h2 className="text-4xl md:text-6xl font-black mt-3 mb-4 text-[#D4A017] uppercase tracking-tighter italic">
                        Rules & Regulations
                    </h2>
                    <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-[#F7E7C6] font-medium opacity-80">
                        Please read all rules carefully before participating
                    </p>
                </div>

                <div className="space-y-4">
                    {sections.map((section, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`rounded-2xl border transition-all duration-300 ${isOpen
                                        ? 'bg-white/10 border-[#D4A017]/40 shadow-lg shadow-[#D4A017]/5'
                                        : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
                                    }`}
                            >
                                <button
                                    onClick={() => toggle(i)}
                                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-[#D4A017] text-[#7A1F1F]' : 'bg-white/10 text-[#D4A017]'
                                                }`}
                                        >
                                            {section.icon}
                                        </div>
                                        <span className="font-bold text-base sm:text-lg tracking-tight">{section.title}</span>
                                    </div>
                                    <div className="text-[#D4A017] flex-shrink-0">
                                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="px-5 sm:px-6 pb-6">
                                        <div className="border-t border-white/10 pt-4">
                                            <ul className="space-y-3">
                                                {section.items.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-3">
                                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#D4A017] flex-shrink-0"></span>
                                                        <span className="text-[#F7E7C6] text-sm sm:text-base leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
