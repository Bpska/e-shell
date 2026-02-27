import { useState } from 'react';
import { ArrowLeft, ArrowRight, Users, Building2, MapPin, Phone, Mail, Lightbulb, FileText, Upload, UserPlus, CheckCircle, AlertCircle, Trash2, Video, User, Rocket, Megaphone, Presentation } from 'lucide-react';

interface RegistrationProps {
    eventName?: string;
}

interface TeamMember {
    name: string;
    email: string;
    phone: string;
}

const emptyMember = (): TeamMember => ({ name: '', email: '', phone: '' });

export default function Registration({ eventName }: RegistrationProps) {
    const events = [
        { id: 'techspire', name: 'TECHSPIRE 1.0', desc: 'National Level Hackathon. Innovating Odisha\'s Future through Technology.', icon: <Rocket size={24} className="text-[#D4A017]" /> },
        { id: 'local2vocal', name: 'LOCAL TO VOCAL', desc: 'Theme-Based Business Exhibition. From Roots to Revenue.', icon: <Megaphone size={24} className="text-[#D4A017]" /> },
        { id: 'sharktank', name: 'MOCK SHARK TANK', desc: 'Startup Pitch Competition. Pitch Your Vision. Impress the Investors.', icon: <Presentation size={24} className="text-[#D4A017]" /> },
        { id: 'idea2impact', name: 'IDEAZIMPACT', desc: 'Student Startup & Prototype Expo. From Idea to Real-World Impact.', icon: <Lightbulb size={24} className="text-[#D4A017]" /> },
    ];

    const [formData, setFormData] = useState({
        teamName: '',
        college: '',
        state: '',
        contact: '',
        email: '',
        theme: '',
        idea: '',
        event: eventName || '',
        focusArea: '',
    });

    const [members, setMembers] = useState<TeamMember[]>([
        emptyMember(),
        emptyMember(),
        emptyMember(),
    ]);
    const [optionalMember, setOptionalMember] = useState<TeamMember | null>(null);
    const [secondMember, setSecondMember] = useState<TeamMember | null>(null);
    const [pptFile, setPptFile] = useState<File | null>(null);
    const [videoLink, setVideoLink] = useState('');
    const [brandName, setBrandName] = useState('');
    const [memberCount, setMemberCount] = useState('');
    const [utrNumber, setUtrNumber] = useState('');
    const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'qr' | 'utr'>('qr');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const isIdea2Impact = formData.event === 'IDEAZIMPACT';
    const isMockSharkTank = formData.event === 'MOCK SHARK TANK';
    const isLocal2Vocal = formData.event === 'LOCAL TO VOCAL';
    const isTechspaire = formData.event === 'TECHSPIRE 1.0';
    const isTeamOfTwo = isIdea2Impact || isMockSharkTank;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
        const updated = [...members];
        updated[index] = { ...updated[index], [field]: value };
        setMembers(updated);
    };

    const handleOptionalMemberChange = (field: keyof TeamMember, value: string) => {
        if (optionalMember) {
            setOptionalMember({ ...optionalMember, [field]: value });
        }
    };

    const addOptionalMember = () => {
        setOptionalMember(emptyMember());
    };

    const removeOptionalMember = () => {
        setOptionalMember(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPptFile(e.target.files[0]);
        }
    };

    const handleSecondMemberChange = (field: keyof TeamMember, value: string) => {
        if (secondMember) {
            setSecondMember({ ...secondMember, [field]: value });
        }
    };

    const addSecondMember = () => {
        setSecondMember(emptyMember());
    };

    const removeSecondMember = () => {
        setSecondMember(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const body = new FormData();
            body.append('teamName', formData.teamName);
            body.append('college', formData.college);
            body.append('state', formData.state);
            body.append('contact', formData.contact);
            body.append('email', formData.email);
            body.append('event', formData.event);

            if (isLocal2Vocal) {
                body.append('brandName', brandName);
                body.append('memberCount', memberCount);
                body.append('focusArea', formData.focusArea);
                if (utrNumber) body.append('utrNumber', utrNumber);
                if (paymentScreenshot) body.append('payment_screenshot', paymentScreenshot);
            } else if (isTeamOfTwo) {
                body.append('videoLink', videoLink);
                if (isMockSharkTank) {
                    body.append('theme', formData.theme);
                    if (utrNumber) body.append('utrNumber', utrNumber);
                    if (paymentScreenshot) body.append('payment_screenshot', paymentScreenshot);
                } else {
                    body.append('idea', formData.idea);
                }
                if (secondMember && secondMember.name) {
                    body.append('members', JSON.stringify([secondMember]));
                }
            } else {
                body.append('theme', formData.theme);
                body.append('idea', formData.idea);
                if (pptFile) {
                    body.append('ppt', pptFile);
                }
                // Payment proof for Techspaire
                if (isTechspaire) {
                    if (utrNumber) body.append('utrNumber', utrNumber);
                    if (paymentScreenshot) body.append('payment_screenshot', paymentScreenshot);
                }
                const allMembers = [...members];
                if (optionalMember && optionalMember.name && optionalMember.email && optionalMember.phone) {
                    allMembers.push(optionalMember);
                }
                body.append('members', JSON.stringify(allMembers));
            }

            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiBase}/register`, {
                method: 'POST',
                body,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            setStatus('success');
            setMessage(data.message || 'Registration successful!');
            setFormData({ teamName: '', college: '', state: '', contact: '', email: '', theme: '', idea: '', event: '', focusArea: '' });
            setShowForm(false);
            setMembers([emptyMember(), emptyMember(), emptyMember()]);
            setOptionalMember(null);
            setSecondMember(null);
            setPptFile(null);
            setVideoLink('');
            setBrandName('');
            setMemberCount('');
            setUtrNumber('');
            setPaymentScreenshot(null);
            setPaymentMethod('qr');
        } catch (err: unknown) {
            setStatus('error');
            setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        }
    };

    const inputClass = "w-full pl-12 pr-4 py-4 bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/10 rounded-2xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] focus:ring-2 focus:ring-[#7A1F1F]/10 transition-all md:text-lg";
    const labelClass = "block text-[#7A1F1F] font-black uppercase text-xs md:text-sm tracking-[0.2em] mb-3";
    const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F]/30";

    const eventDetailsData: Record<string, any> = {
        'TECHSPIRE 1.0': {
            subtitle: "National Level Hackathon",
            description: "Innovating Odisha's Future through Technology",
            sections: [
                { title: "Problem Domains", items: ["Odisha Tourism", "Cultural Heritage", "Art & Handicrafts", "Mining & Natural Resources", "Green Energy & Sustainability"] },
                { title: "Eligibility", items: ["Open to UG/PG students from any recognized institution", "Team members must be currently enrolled students", "All members must be from the same college", "One participant can be part of only one team"] },
                { title: "Format", items: ["Duration: 24 Hours", "Team Size: 3-4 Members", "Mode: Offline"] },
                { title: "Judging Criteria", items: ["Innovation | Implementation | Scalability | Impact | Technical Strength"] },
                { title: "Rewards", items: ["Cash Prize (30,000/-)", "Certificates", "Mentorship", "Incubation Support"] }
            ]
        },
        'MOCK SHARK TANK': {
            subtitle: "Startup Pitch Competition",
            description: "Pitch Your Vision. Impress the Investors.",
            sections: [
                { title: "About", items: ["Platform for students to present startup ideas to industry experts and founders"] },
                { title: "Format", items: ["10 Min Pitch + 3 Min Q&A", "PPT/Demo Allowed"] },
                { title: "Eligibility", items: ["Open to UG/PG students", "Individual or Team (Max 2 Members)", "Idea/Startup must be original", "Existing early-stage startups may apply"] },
                { title: "Evaluation", items: ["Business Model | Market | Revenue | Team | Innovation"] },
                { title: "Benefits", items: ["Cash Prize (6000/-)", "Funding Exposure", "Feedback", "Networking", "Incubation Support"] }
            ]
        },
        'IDEAZIMPACT': {
            subtitle: "Student Startup & Prototype Expo",
            description: "From Idea to Real-World Impact",
            sections: [
                { title: "About", items: ["Showcase working models, MVPs, and innovative prototypes."] },
                { title: "Format", items: ["Exhibition Booths", "Live Demonstration", "Jury Visit"] },
                { title: "Eligibility", items: ["Open to UG and PG students", "Must have a working prototype/MVP/demo", "Individual or Team (Max 2 Members)", "Project must be developed by participants"] },
                { title: "Judging Focus", items: ["Technical Depth", "Innovation", "User Value", "Scalability"] },
                { title: "Outcomes", items: ["Cash Prize (6000/-)", "Recognition", "Mentorship", "Startup Support"] }
            ]
        },
        'LOCAL TO VOCAL': {
            subtitle: "Theme-Based Business Exhibition",
            description: "From Roots to Revenue",
            sections: [
                { title: "About", items: ["Showcase Odisha-based businesses, artisans, and cultural enterprises"] },
                { title: "Focus Areas", items: ["Handloom", "Crafts", "Organic", "D2C", "Local Brands"] },
                { title: "Eligibility", items: ["Open to local Entrepreneurs, Artisans, SHGs, Startups, and MSMEs", "Products must be original/locally produced", "Limited stalls"] },
                { title: "Benefits", items: ["Direct Sales", "Branding", "Partnerships"] }
            ]
        }
    };

    return (
        <section id="register" className="py-24 bg-gradient-to-br from-[#F7E7C6] via-white to-[#F7E7C6] relative overflow-hidden min-h-screen">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#D9B68C]/30 to-transparent"></div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => { window.location.hash = '#/'; }}
                    className="inline-flex items-center gap-2 text-[#7A1F1F] font-bold mb-8 hover:gap-4 transition-all group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>

                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter">
                        Register Now
                    </h2>
                    <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
                    <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto font-bold tracking-tight">
                        {eventName ? `Register for ${eventName}` : 'Sign up for UTKALPRENEUR E-FEST 2026 events'}
                    </p>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                    <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-3xl flex items-center gap-4 animate-fadeIn">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={28} />
                        <span className="text-green-700 font-bold">{message}</span>
                    </div>
                )}
                {status === 'error' && (
                    <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-3xl flex items-center gap-4 animate-fadeIn">
                        <AlertCircle className="text-red-500 flex-shrink-0" size={28} />
                        <span className="text-red-700 font-bold">{message}</span>
                    </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-2xl p-6 sm:p-10 md:p-12 border-2 border-[#7A1F1F]/5 space-y-10">

                    {/* ────── EVENT SELECTION CARDS ────── */}
                    {!formData.event ? (
                        <div className="space-y-6">
                            <h3 className="text-xl font-black text-[#7A1F1F] uppercase tracking-tight text-center mb-8">
                                Select A Competition
                            </h3>
                            <div className="flex flex-col gap-6">
                                {events.map((ev) => (
                                    <div
                                        key={ev.id}
                                        onClick={() => {
                                            setFormData({ ...formData, event: ev.name });
                                            setShowForm(false);
                                        }}
                                        className="bg-[#F7E7C6]/20 border-2 border-[#7A1F1F]/10 rounded-3xl p-6 sm:p-8 cursor-pointer hover:bg-[#F7E7C6]/60 hover:border-[#D4A017] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-6"
                                    >
                                        <div className="p-4 bg-white rounded-2xl shadow-md border border-[#7A1F1F]/5 group-hover:bg-[#7A1F1F]/5 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                                            {ev.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl sm:text-2xl font-black text-[#7A1F1F] mb-2">{ev.name}</h4>
                                            <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                                                {ev.desc}
                                            </p>
                                        </div>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300 hidden sm:block text-[#D4A017]">
                                            <ArrowRight size={24} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : !showForm ? (
                        <div className="space-y-8 animate-fadeIn">
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({ ...formData, event: '' });
                                    setShowForm(false);
                                }}
                                className="inline-flex items-center gap-2 text-[#7A1F1F] font-bold mb-4 hover:gap-4 transition-all group"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Competitions
                            </button>

                            <div className="text-center mb-10">
                                <h3 className="text-3xl md:text-5xl font-black text-[#7A1F1F] uppercase tracking-tighter mb-4">
                                    {formData.event}
                                </h3>
                                <div className="w-24 h-1.5 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
                                <p className="text-xl md:text-2xl text-[#D4A017] font-black italic tracking-wide">
                                    {eventDetailsData[formData.event]?.subtitle}
                                </p>
                                <p className="text-lg text-gray-600 font-medium mt-3">
                                    {eventDetailsData[formData.event]?.description}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                {eventDetailsData[formData.event]?.sections.map((sec: any, idx: number) => (
                                    <div key={idx} className="bg-[#F7E7C6]/20 border-2 border-[#7A1F1F]/10 rounded-3xl p-6 sm:p-8">
                                        <h4 className="text-lg font-black text-[#7A1F1F] uppercase tracking-widest mb-6 flex items-center gap-3">
                                            <div className="w-2 h-2 bg-[#D4A017] rounded-full"></div>
                                            {sec.title}
                                        </h4>
                                        <ul className="space-y-4">
                                            {sec.items.map((item: string, i: number) => (
                                                <li key={i} className="flex items-start gap-4 text-gray-700 font-medium leading-relaxed">
                                                    <CheckCircle size={20} className="text-[#D4A017] flex-shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center pt-8 border-t-2 border-[#7A1F1F]/5">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(true)}
                                    className="px-10 py-5 bg-[#7A1F1F] text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-[#D4A017] hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl"
                                >
                                    Proceed to Register
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/20 rounded-2xl gap-4">
                                <div>
                                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Selected Event</p>
                                    <h3 className="text-2xl font-black text-[#7A1F1F]">{formData.event}</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 border-2 border-[#7A1F1F] text-[#7A1F1F] rounded-xl text-sm font-bold hover:bg-[#7A1F1F] hover:text-[#F7E7C6] transition-all whitespace-nowrap"
                                >
                                    View Details
                                </button>
                            </div>

                            {/* ══════════════════════════════════════════ */}
                            {/* LOCAL 2 VOCAL FORM */}
                            {/* ══════════════════════════════════════════ */}
                            {isLocal2Vocal && (
                                <>
                                    <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-8 flex items-center gap-3">
                                            <Megaphone size={24} className="text-[#D4A017]" />
                                            Brand & Contact Details
                                        </h3>

                                        <div className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className={labelClass}>Lead Name</label>
                                                    <div className="relative">
                                                        <User className={iconClass} size={20} />
                                                        <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} required placeholder="John Doe" className={inputClass} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Brand Name</label>
                                                    <div className="relative">
                                                        <Building2 className={iconClass} size={20} />
                                                        <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} required placeholder="Your Startup/Brand Name" className={inputClass} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className={labelClass}>Email Address</label>
                                                    <div className="relative">
                                                        <Mail className={iconClass} size={20} />
                                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className={inputClass} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Contact Number</label>
                                                    <div className="relative">
                                                        <Phone className={iconClass} size={20} />
                                                        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required placeholder="+91 9876543210" className={inputClass} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className={labelClass}>Focus Area</label>
                                                    <div className="relative">
                                                        <Lightbulb className={iconClass} size={20} />
                                                        <select name="focusArea" value={formData.focusArea} onChange={handleChange} required className={`${inputClass} appearance-none`}>
                                                            <option value="" disabled>Select Focus Area</option>
                                                            <option value="Handloom">Handloom</option>
                                                            <option value="Crafts">Crafts</option>
                                                            <option value="Organic">Organic</option>
                                                            <option value="D2C">D2C</option>
                                                            <option value="Local Brands">Local Brands</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Number of Members</label>
                                                    <div className="relative">
                                                        <Users className={iconClass} size={20} />
                                                        <input type="number" min="1" max="50" value={memberCount} onChange={(e) => setMemberCount(e.target.value)} required placeholder="e.g. 4" className={inputClass} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PAYMENT for Local 2 Vocal */}
                                    <div className="border-t-2 border-[#D4A017]/30 pt-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">💳</span>
                                            <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight">Payment</h3>
                                        </div>
                                        <p className="text-gray-500 font-medium text-sm md:text-base mb-8">
                                            Registration fee for Local 2 Vocal is <span className="text-[#7A1F1F] font-black">₹5,000 per team</span>. Please complete the payment and upload proof below.
                                        </p>

                                        <div className="bg-[#F7E7C6]/40 border-2 border-[#D4A017]/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
                                            <div className="flex-shrink-0">
                                                <img src="/qr.jpeg" alt="Payment QR Code" className="w-44 h-44 rounded-2xl object-cover border-4 border-white shadow-lg" />
                                            </div>
                                            <div>
                                                <p className="text-[#7A1F1F] font-black text-lg mb-1">Scan & Pay ₹5,000</p>
                                                <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                                                    Scan the QR code using any UPI app (PhonePe, GPay, Paytm, etc.) and pay exactly <strong>₹5,000</strong>. After successful payment, submit your proof below.
                                                </p>
                                                <div className="mt-4 flex gap-3 flex-wrap">
                                                    <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">PhonePe ✓</span>
                                                    <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">GPay ✓</span>
                                                    <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">Paytm ✓</span>
                                                    <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">Any UPI ✓</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mb-6">
                                            <button type="button" onClick={() => setPaymentMethod('qr')} className={`flex-1 py-3 rounded-2xl font-black text-sm border-2 transition-all ${paymentMethod === 'qr' ? 'bg-[#7A1F1F] text-white border-[#7A1F1F]' : 'bg-white text-[#7A1F1F] border-[#7A1F1F]/20 hover:border-[#7A1F1F]/50'}`}>
                                                📸 Upload Screenshot
                                            </button>
                                            <button type="button" onClick={() => setPaymentMethod('utr')} className={`flex-1 py-3 rounded-2xl font-black text-sm border-2 transition-all ${paymentMethod === 'utr' ? 'bg-[#7A1F1F] text-white border-[#7A1F1F]' : 'bg-white text-[#7A1F1F] border-[#7A1F1F]/20 hover:border-[#7A1F1F]/50'}`}>
                                                🔢 Enter UTR Number
                                            </button>
                                        </div>

                                        {paymentMethod === 'qr' ? (
                                            <div>
                                                <label className={labelClass}>Payment Screenshot</label>
                                                <label className="flex items-center gap-4 w-full px-6 py-5 bg-[#F7E7C6]/30 border-2 border-dashed border-[#7A1F1F]/20 rounded-2xl cursor-pointer hover:border-[#D4A017] hover:bg-[#F7E7C6]/50 transition-all group">
                                                    <Upload className="text-[#7A1F1F]/40 group-hover:text-[#D4A017] transition-colors flex-shrink-0" size={24} />
                                                    <div>
                                                        <p className="font-bold text-[#7A1F1F]/60 group-hover:text-[#7A1F1F] transition-colors text-sm">
                                                            {paymentScreenshot ? paymentScreenshot.name : 'Click to upload payment screenshot'}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — Max 10MB</p>
                                                    </div>
                                                    <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => { if (e.target.files?.[0]) setPaymentScreenshot(e.target.files[0]); }} className="hidden" />
                                                </label>
                                            </div>
                                        ) : (
                                            <div>
                                                <label className={labelClass}>UTR / Transaction Number</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F]/30 font-black text-sm">#</span>
                                                    <input type="text" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} placeholder="e.g. 412345678901" className="w-full pl-10 pr-4 py-4 bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/10 rounded-2xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] focus:ring-2 focus:ring-[#7A1F1F]/10 transition-all" />
                                                </div>
                                                <p className="text-xs text-gray-400 font-medium mt-2">You can find the UTR/Transaction ID in your bank or UPI app payment history.</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* ══════════════════════════════════════════ */}
                            {/* TEAMS OF TWO EVENTS: IDEAZIMPACT / MOCK SHARK TANK */}
                            {/* ══════════════════════════════════════════ */}
                            {isTeamOfTwo && (
                                <>
                                    <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-8 flex items-center gap-3">
                                            <User size={24} className="text-[#D4A017]" />
                                            Lead Details
                                        </h3>

                                        <div className="space-y-6">
                                            {/* Lead Name */}
                                            <div>
                                                <label className={labelClass}>Full Name</label>
                                                <div className="relative">
                                                    <User className={iconClass} size={20} />
                                                    <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
                                                </div>
                                            </div>

                                            {/* College / University */}
                                            <div>
                                                <label className={labelClass}>College / University</label>
                                                <div className="relative">
                                                    <Building2 className={iconClass} size={20} />
                                                    <input type="text" name="college" value={formData.college} onChange={handleChange} required placeholder="Your college or university" className={inputClass} />
                                                </div>
                                            </div>

                                            {/* State */}
                                            <div>
                                                <label className={labelClass}>State</label>
                                                <div className="relative">
                                                    <MapPin className={iconClass} size={20} />
                                                    <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="e.g. Odisha" className={inputClass} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-8 flex items-center gap-3">
                                            <Phone size={24} className="text-[#D4A017]" />
                                            Contact Details
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelClass}>Contact Number</label>
                                                <div className="relative">
                                                    <Phone className={iconClass} size={20} />
                                                    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required placeholder="+91 XXX XXX XXXX" className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Email Address</label>
                                                <div className="relative">
                                                    <Mail className={iconClass} size={20} />
                                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pitch / Idea + Video */}
                                    <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-8 flex items-center gap-3">
                                            <Lightbulb size={24} className="text-[#D4A017]" />
                                            {isMockSharkTank ? 'Theme & Video Pitch' : 'Idea & Prototype Video'}
                                        </h3>

                                        <div className="space-y-6">
                                            {isMockSharkTank ? (
                                                /* Theme for Mock Shark Tank */
                                                <div>
                                                    <label className={labelClass}>Business Theme</label>
                                                    <div className="relative">
                                                        <Lightbulb className={iconClass} size={20} />
                                                        <input type="text" name="theme" value={formData.theme} onChange={handleChange} required placeholder="Your business model theme" className={inputClass} />
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Idea for Idea 2 Impact */
                                                <div>
                                                    <label className={labelClass}>Idea Description</label>
                                                    <div className="relative">
                                                        <FileText className="absolute left-4 top-6 text-[#7A1F1F]/30" size={20} />
                                                        <textarea
                                                            name="idea"
                                                            value={formData.idea}
                                                            onChange={handleChange}
                                                            required
                                                            rows={4}
                                                            placeholder="Describe your startup idea or prototype..."
                                                            className="w-full pl-12 pr-4 py-4 bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/10 rounded-2xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] focus:ring-2 focus:ring-[#7A1F1F]/10 transition-all resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Video Demo Link */}
                                            <div>
                                                <label className={labelClass}>Video Pitch (Google Drive Link)</label>
                                                <div className="relative">
                                                    <Video className={iconClass} size={20} />
                                                    <input
                                                        type="url"
                                                        name="videoLink"
                                                        value={videoLink}
                                                        onChange={(e) => setVideoLink(e.target.value)}
                                                        required
                                                        placeholder="https://drive.google.com/..."
                                                        className={inputClass}
                                                    />
                                                    <p className="text-xs text-gray-400 font-medium mt-2 ml-2">Please ensure the Google Drive link is set to "Anyone with the link can view".</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Team Member 2 (Optional) */}
                                    <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-2 flex items-center gap-3">
                                            <UserPlus size={24} className="text-[#D4A017]" />
                                            Team Member 2
                                        </h3>
                                        <p className="text-gray-500 font-medium text-sm md:text-base mb-8">
                                            Optional. Max team size is 2.
                                        </p>
                                        <div className="space-y-8">
                                            {secondMember ? (
                                                <div className="p-5 sm:p-6 bg-[#D4A017]/5 rounded-2xl border border-[#D4A017]/20 relative">
                                                    <div className="flex items-center justify-between mb-5">
                                                        <h4 className="font-black text-[#7A1F1F] uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                                                            <span className="w-7 h-7 bg-[#D4A017] text-white rounded-lg flex items-center justify-center text-xs font-black">2</span>
                                                            Member 2
                                                            <span className="text-gray-400 text-[10px]">(Optional)</span>
                                                        </h4>
                                                        <button type="button" onClick={removeSecondMember} className="text-red-400 hover:text-red-600 transition-colors p-1" title="Remove member">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                    <div className="grid sm:grid-cols-3 gap-4">
                                                        <input type="text" value={secondMember.name} onChange={(e) => handleSecondMemberChange('name', e.target.value)} required placeholder="Full Name" className="w-full px-4 py-3 bg-white border-2 border-[#D4A017]/20 rounded-xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#D4A017] transition-all text-sm" />
                                                        <input type="email" value={secondMember.email} onChange={(e) => handleSecondMemberChange('email', e.target.value)} required placeholder="Email" className="w-full px-4 py-3 bg-white border-2 border-[#D4A017]/20 rounded-xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#D4A017] transition-all text-sm" />
                                                        <input type="tel" value={secondMember.phone} onChange={(e) => handleSecondMemberChange('phone', e.target.value)} required placeholder="Phone" className="w-full px-4 py-3 bg-white border-2 border-[#D4A017]/20 rounded-xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#D4A017] transition-all text-sm" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={addSecondMember}
                                                    className="w-full py-4 border-2 border-dashed border-[#D4A017]/40 rounded-2xl text-[#D4A017] font-black uppercase text-sm tracking-widest hover:border-[#D4A017] hover:bg-[#D4A017]/5 transition-all flex items-center justify-center gap-3"
                                                >
                                                    <UserPlus size={20} />
                                                    Add 2nd Member (Optional)
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* PAYMENT for Mock Shark Tank */}
                                    {isMockSharkTank && (
                                        <div className="border-t-2 border-[#D4A017]/30 pt-10">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-2xl">💳</span>
                                                <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight">Payment</h3>
                                            </div>
                                            <p className="text-gray-500 font-medium text-sm md:text-base mb-8">
                                                Registration fee for Mock Shark Tank is <span className="text-[#7A1F1F] font-black">₹199 per participant</span>. Please complete the payment and upload proof below.
                                            </p>

                                            <div className="bg-[#F7E7C6]/40 border-2 border-[#D4A017]/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
                                                <div className="flex-shrink-0">
                                                    <img src="/qr.jpeg" alt="Payment QR Code" className="w-44 h-44 rounded-2xl object-cover border-4 border-white shadow-lg" />
                                                </div>
                                                <div>
                                                    <p className="text-[#7A1F1F] font-black text-lg mb-1">Scan & Pay ₹199</p>
                                                    <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                                                        Scan the QR code using any UPI app (PhonePe, GPay, Paytm, etc.) and pay exactly <strong>₹199</strong>. After successful payment, submit your proof below.
                                                    </p>
                                                    <div className="mt-4 flex gap-3 flex-wrap">
                                                        <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">PhonePe ✓</span>
                                                        <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">GPay ✓</span>
                                                        <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">Paytm ✓</span>
                                                        <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">Any UPI ✓</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 mb-6">
                                                <button type="button" onClick={() => setPaymentMethod('qr')} className={`flex-1 py-3 rounded-2xl font-black text-sm border-2 transition-all ${paymentMethod === 'qr' ? 'bg-[#7A1F1F] text-white border-[#7A1F1F]' : 'bg-white text-[#7A1F1F] border-[#7A1F1F]/20 hover:border-[#7A1F1F]/50'}`}>
                                                    📸 Upload Screenshot
                                                </button>
                                                <button type="button" onClick={() => setPaymentMethod('utr')} className={`flex-1 py-3 rounded-2xl font-black text-sm border-2 transition-all ${paymentMethod === 'utr' ? 'bg-[#7A1F1F] text-white border-[#7A1F1F]' : 'bg-white text-[#7A1F1F] border-[#7A1F1F]/20 hover:border-[#7A1F1F]/50'}`}>
                                                    🔢 Enter UTR Number
                                                </button>
                                            </div>

                                            {paymentMethod === 'qr' ? (
                                                <div>
                                                    <label className={labelClass}>Payment Screenshot</label>
                                                    <label className="flex items-center gap-4 w-full px-6 py-5 bg-[#F7E7C6]/30 border-2 border-dashed border-[#7A1F1F]/20 rounded-2xl cursor-pointer hover:border-[#D4A017] hover:bg-[#F7E7C6]/50 transition-all group">
                                                        <Upload className="text-[#7A1F1F]/40 group-hover:text-[#D4A017] transition-colors flex-shrink-0" size={24} />
                                                        <div>
                                                            <p className="font-bold text-[#7A1F1F]/60 group-hover:text-[#7A1F1F] transition-colors text-sm">
                                                                {paymentScreenshot ? paymentScreenshot.name : 'Click to upload payment screenshot'}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — Max 10MB</p>
                                                        </div>
                                                        <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => { if (e.target.files?.[0]) setPaymentScreenshot(e.target.files[0]); }} className="hidden" />
                                                    </label>
                                                </div>
                                            ) : (
                                                <div>
                                                    <label className={labelClass}>UTR / Transaction Number</label>
                                                    <div className="relative">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F]/30 font-black text-sm">#</span>
                                                        <input type="text" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} placeholder="e.g. 412345678901" className="w-full pl-10 pr-4 py-4 bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/10 rounded-2xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] focus:ring-2 focus:ring-[#7A1F1F]/10 transition-all" />
                                                    </div>
                                                    <p className="text-xs text-gray-400 font-medium mt-2">You can find the UTR/Transaction ID in your bank or UPI app payment history.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}

                            {/* ══════════════════════════════════════════ */}
                            {/* TEAM-BASED EVENTS (Techspire) */}
                            {/* ══════════════════════════════════════════ */}
                            {!isTeamOfTwo && !isLocal2Vocal && formData.event && (
                                <>
                                    {/* GROUP / TEAM INFO */}
                                    <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-8 flex items-center gap-3">
                                            <Users size={24} className="text-[#D4A017]" />
                                            Group / Team Info
                                        </h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className={labelClass}>Team / Group Name</label>
                                                <div className="relative">
                                                    <Users className={iconClass} size={20} />
                                                    <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} required placeholder="Enter your team name" className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>College / University</label>
                                                <div className="relative">
                                                    <Building2 className={iconClass} size={20} />
                                                    <input type="text" name="college" value={formData.college} onChange={handleChange} required placeholder="Your college or university" className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>State</label>
                                                <div className="relative">
                                                    <MapPin className={iconClass} size={20} />
                                                    <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="e.g. Odisha" className={inputClass} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CONTACT DETAILS */}
                                    <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-8 flex items-center gap-3">
                                            <Phone size={24} className="text-[#D4A017]" />
                                            Contact Details
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelClass}>Contact Number</label>
                                                <div className="relative">
                                                    <Phone className={iconClass} size={20} />
                                                    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required placeholder="+91 XXX XXX XXXX" className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Email Address</label>
                                                <div className="relative">
                                                    <Mail className={iconClass} size={20} />
                                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="team@email.com" className={inputClass} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* THEME / IDEA / PPT */}
                                    <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-8 flex items-center gap-3">
                                            <Lightbulb size={24} className="text-[#D4A017]" />
                                            Theme / Idea / PPT
                                        </h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className={labelClass}>Problem Domain</label>
                                                <div className="relative">
                                                    <Lightbulb className={iconClass} size={20} />
                                                    <select name="theme" value={formData.theme} onChange={handleChange} required className={`${inputClass} appearance-none`}>
                                                        <option value="" disabled>Select Problem Domain</option>
                                                        <option value="Odisha Tourism">Odisha Tourism</option>
                                                        <option value="Cultural Heritage">Cultural Heritage</option>
                                                        <option value="Art & Handicrafts">Art & Handicrafts</option>
                                                        <option value="Mining & Natural Resources">Mining & Natural Resources</option>
                                                        <option value="Green Energy & Sustainability">Green Energy & Sustainability</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Idea Description</label>
                                                <div className="relative">
                                                    <FileText className="absolute left-4 top-6 text-[#7A1F1F]/30" size={20} />
                                                    <textarea
                                                        name="idea"
                                                        value={formData.idea}
                                                        onChange={handleChange}
                                                        required
                                                        rows={4}
                                                        placeholder="Briefly describe your idea..."
                                                        className="w-full pl-12 pr-4 py-4 bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/10 rounded-2xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] focus:ring-2 focus:ring-[#7A1F1F]/10 transition-all resize-none"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Upload PPT / Presentation</label>
                                                <div className="relative">
                                                    <label className="flex items-center gap-4 w-full px-6 py-5 bg-[#F7E7C6]/30 border-2 border-dashed border-[#7A1F1F]/20 rounded-2xl cursor-pointer hover:border-[#7A1F1F]/40 hover:bg-[#F7E7C6]/50 transition-all group">
                                                        <Upload className="text-[#7A1F1F]/40 group-hover:text-[#7A1F1F] transition-colors" size={24} />
                                                        <div>
                                                            <p className="font-bold text-[#7A1F1F]/60 group-hover:text-[#7A1F1F] transition-colors text-sm">
                                                                {pptFile ? pptFile.name : 'Click to upload PPT, PPTX, or PDF'}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">Max file size: 10MB</p>
                                                        </div>
                                                        <input type="file" accept=".ppt,.pptx,.pdf" onChange={handleFileChange} className="hidden" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* TEAM MEMBERS */}
                                    <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-2 flex items-center gap-3">
                                            <UserPlus size={24} className="text-[#D4A017]" />
                                            Team Members
                                        </h3>
                                        <p className="text-gray-500 font-medium text-sm md:text-base mb-8">
                                            Minimum 3 members required. 1 optional member allowed.
                                        </p>
                                        <div className="space-y-8">
                                            {members.map((member, index) => (
                                                <div key={index} className="p-5 sm:p-6 bg-[#F7E7C6]/20 rounded-2xl border border-[#7A1F1F]/5">
                                                    <h4 className="font-black text-[#7A1F1F] uppercase text-xs tracking-[0.2em] mb-5 flex items-center gap-2">
                                                        <span className="w-7 h-7 bg-[#7A1F1F] text-white rounded-lg flex items-center justify-center text-xs font-black">{index + 1}</span>
                                                        Member {index + 1}
                                                        <span className="text-[#D4A017] text-[10px]">(Required)</span>
                                                    </h4>
                                                    <div className="grid sm:grid-cols-3 gap-4">
                                                        <input type="text" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)} required placeholder="Full Name" className="w-full px-4 py-3 bg-white border-2 border-[#7A1F1F]/10 rounded-xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] transition-all text-sm" />
                                                        <input type="email" value={member.email} onChange={(e) => handleMemberChange(index, 'email', e.target.value)} required placeholder="Email" className="w-full px-4 py-3 bg-white border-2 border-[#7A1F1F]/10 rounded-xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] transition-all text-sm" />
                                                        <input type="tel" value={member.phone} onChange={(e) => handleMemberChange(index, 'phone', e.target.value)} required placeholder="Phone" className="w-full px-4 py-3 bg-white border-2 border-[#7A1F1F]/10 rounded-xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] transition-all text-sm" />
                                                    </div>
                                                </div>
                                            ))}

                                            {optionalMember ? (
                                                <div className="p-5 sm:p-6 bg-[#D4A017]/5 rounded-2xl border border-[#D4A017]/20 relative">
                                                    <div className="flex items-center justify-between mb-5">
                                                        <h4 className="font-black text-[#7A1F1F] uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                                                            <span className="w-7 h-7 bg-[#D4A017] text-white rounded-lg flex items-center justify-center text-xs font-black">4</span>
                                                            Member 4
                                                            <span className="text-gray-400 text-[10px]">(Optional)</span>
                                                        </h4>
                                                        <button type="button" onClick={removeOptionalMember} className="text-red-400 hover:text-red-600 transition-colors p-1" title="Remove member">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                    <div className="grid sm:grid-cols-3 gap-4">
                                                        <input type="text" value={optionalMember.name} onChange={(e) => handleOptionalMemberChange('name', e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 bg-white border-2 border-[#D4A017]/20 rounded-xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#D4A017] transition-all text-sm" />
                                                        <input type="email" value={optionalMember.email} onChange={(e) => handleOptionalMemberChange('email', e.target.value)} placeholder="Email" className="w-full px-4 py-3 bg-white border-2 border-[#D4A017]/20 rounded-xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#D4A017] transition-all text-sm" />
                                                        <input type="tel" value={optionalMember.phone} onChange={(e) => handleOptionalMemberChange('phone', e.target.value)} placeholder="Phone" className="w-full px-4 py-3 bg-white border-2 border-[#D4A017]/20 rounded-xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#D4A017] transition-all text-sm" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={addOptionalMember}
                                                    className="w-full py-4 border-2 border-dashed border-[#D4A017]/40 rounded-2xl text-[#D4A017] font-black uppercase text-sm tracking-widest hover:border-[#D4A017] hover:bg-[#D4A017]/5 transition-all flex items-center justify-center gap-3"
                                                >
                                                    <UserPlus size={20} />
                                                    Add 4th Member (Optional)
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* PAYMENT SECTION (Techspaire only) */}
                            {isTechspaire && (
                                <div className="border-t-2 border-[#D4A017]/30 pt-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl">💳</span>
                                        <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight">Payment</h3>
                                    </div>
                                    <p className="text-gray-500 font-medium text-sm md:text-base mb-8">
                                        Registration fee for Techspaire 1.0 is <span className="text-[#7A1F1F] font-black">₹299 per team</span>. Please complete the payment and upload proof below.
                                    </p>

                                    {/* QR Code + Info */}
                                    <div className="bg-[#F7E7C6]/40 border-2 border-[#D4A017]/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
                                        <div className="flex-shrink-0">
                                            <img
                                                src="/qr.jpeg"
                                                alt="Payment QR Code"
                                                className="w-44 h-44 rounded-2xl object-cover border-4 border-white shadow-lg"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[#7A1F1F] font-black text-lg mb-1">Scan & Pay ₹299</p>
                                            <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                                                Scan the QR code using any UPI app (PhonePe, GPay, Paytm, etc.) and pay exactly <strong>₹299</strong>. After successful payment, submit your proof below.
                                            </p>
                                            <div className="mt-4 flex gap-3 flex-wrap">
                                                <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">PhonePe ✓</span>
                                                <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">GPay ✓</span>
                                                <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">Paytm ✓</span>
                                                <span className="px-3 py-1 bg-white border border-[#D4A017]/30 rounded-xl text-xs font-black text-[#7A1F1F]">Any UPI ✓</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Method Toggle */}
                                    <div className="flex gap-3 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('qr')}
                                            className={`flex-1 py-3 rounded-2xl font-black text-sm border-2 transition-all ${paymentMethod === 'qr' ? 'bg-[#7A1F1F] text-white border-[#7A1F1F]' : 'bg-white text-[#7A1F1F] border-[#7A1F1F]/20 hover:border-[#7A1F1F]/50'}`}
                                        >
                                            📸 Upload Screenshot
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('utr')}
                                            className={`flex-1 py-3 rounded-2xl font-black text-sm border-2 transition-all ${paymentMethod === 'utr' ? 'bg-[#7A1F1F] text-white border-[#7A1F1F]' : 'bg-white text-[#7A1F1F] border-[#7A1F1F]/20 hover:border-[#7A1F1F]/50'}`}
                                        >
                                            🔢 Enter UTR Number
                                        </button>
                                    </div>

                                    {paymentMethod === 'qr' ? (
                                        <div>
                                            <label className={labelClass}>Payment Screenshot</label>
                                            <label className="flex items-center gap-4 w-full px-6 py-5 bg-[#F7E7C6]/30 border-2 border-dashed border-[#7A1F1F]/20 rounded-2xl cursor-pointer hover:border-[#D4A017] hover:bg-[#F7E7C6]/50 transition-all group">
                                                <Upload className="text-[#7A1F1F]/40 group-hover:text-[#D4A017] transition-colors flex-shrink-0" size={24} />
                                                <div>
                                                    <p className="font-bold text-[#7A1F1F]/60 group-hover:text-[#7A1F1F] transition-colors text-sm">
                                                        {paymentScreenshot ? paymentScreenshot.name : 'Click to upload payment screenshot'}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — Max 10MB</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png,.webp"
                                                    onChange={(e) => { if (e.target.files?.[0]) setPaymentScreenshot(e.target.files[0]); }}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <div>
                                            <label className={labelClass}>UTR / Transaction Number</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F]/30 font-black text-sm">#</span>
                                                <input
                                                    type="text"
                                                    value={utrNumber}
                                                    onChange={(e) => setUtrNumber(e.target.value)}
                                                    placeholder="e.g. 412345678901"
                                                    className="w-full pl-10 pr-4 py-4 bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/10 rounded-2xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] focus:ring-2 focus:ring-[#7A1F1F]/10 transition-all"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-400 font-medium mt-2">You can find the UTR/Transaction ID in your bank or UPI app payment history.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ────── SUBMIT ────── */}
                            {formData.event && (
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="premium-button w-full py-5 bg-[#7A1F1F] text-[#F7E7C6] rounded-2xl font-black text-xl uppercase tracking-widest border-b-4 border-[#5A1515] hover:bg-[#D4A017] hover:text-[#000] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? 'SUBMITTING...' : 'REGISTER NOW'}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </form>
            </div>
        </section>
    );
}
