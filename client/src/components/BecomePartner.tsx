import { useState } from 'react';
import { ArrowLeft, Building2, User, Mail, Phone, Crown, MessageSquare, CheckCircle, AlertCircle, Send } from 'lucide-react';

export default function BecomePartner() {
    const [formData, setFormData] = useState({
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        partnershipTier: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiBase}/partner`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Submission failed');
            }

            setStatus('success');
            setStatusMessage(data.message || 'Thank you! Your partnership inquiry has been submitted.');
        } catch (err: unknown) {
            setStatus('error');
            setStatusMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        }
    };

    const inputClass = "w-full pl-12 pr-4 py-4 bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/10 rounded-2xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] focus:ring-2 focus:ring-[#7A1F1F]/10 transition-all md:text-lg";
    const labelClass = "block text-[#7A1F1F] font-black uppercase text-xs md:text-sm tracking-[0.2em] mb-3";
    const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F]/30";

    return (
        <section className="py-24 bg-gradient-to-br from-[#F7E7C6] via-white to-[#F7E7C6] relative overflow-hidden min-h-screen">
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
                        Become a Partner
                    </h2>
                    <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
                    <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto font-bold tracking-tight">
                        Partner with UTKALPRENEUR E-FEST 2026 and gain unmatched brand visibility
                    </p>
                </div>

                {/* Status Messages */}
                {status === 'error' && (
                    <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-3xl flex items-center gap-4 animate-fadeIn">
                        <AlertCircle className="text-red-500 flex-shrink-0" size={28} />
                        <span className="text-red-700 font-bold">{statusMessage}</span>
                    </div>
                )}

                {status === 'success' ? (
                    <div className="bg-white rounded-[2rem] shadow-2xl p-10 md:p-16 border-2 border-[#7A1F1F]/5 text-center animate-fadeIn">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <CheckCircle className="text-green-500" size={48} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-[#7A1F1F] uppercase tracking-tight mb-4">
                            Inquiry Submitted!
                        </h3>
                        <div className="w-16 h-1.5 bg-[#D4A017] mx-auto rounded-full mb-8"></div>
                        <p className="text-lg text-gray-600 font-medium mb-10 max-w-md mx-auto">
                            Thank you for your interest in partnering with us. Our team will reach out to you shortly.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => { window.location.hash = '#/'; }}
                                className="w-full sm:w-auto px-8 py-4 bg-[#7A1F1F] text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#D4A017] hover:scale-105 transition-all shadow-lg"
                            >
                                Back to Home
                            </button>
                            <button
                                onClick={() => {
                                    setStatus('idle');
                                    setFormData({ organizationName: '', contactPerson: '', email: '', phone: '', partnershipTier: '', message: '' });
                                }}
                                className="w-full sm:w-auto px-8 py-4 border-2 border-[#7A1F1F] text-[#7A1F1F] rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#7A1F1F]/5 transition-all"
                            >
                                Submit Another
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-2xl p-6 sm:p-10 md:p-12 border-2 border-[#7A1F1F]/5 space-y-10">

                        {/* Organization Info */}
                        <div>
                            <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-8 flex items-center gap-3">
                                <Building2 size={24} className="text-[#D4A017]" />
                                Organization Details
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}>Organization / Company Name</label>
                                    <div className="relative">
                                        <Building2 className={iconClass} size={20} />
                                        <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} required placeholder="Your organization name" className={inputClass} />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass}>Contact Person</label>
                                        <div className="relative">
                                            <User className={iconClass} size={20} />
                                            <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required placeholder="Full name" className={inputClass} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Phone Number</label>
                                        <div className="relative">
                                            <Phone className={iconClass} size={20} />
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXX XXX XXXX" className={inputClass} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Email Address</label>
                                    <div className="relative">
                                        <Mail className={iconClass} size={20} />
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="business@example.com" className={inputClass} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Partnership Tier */}
                        <div className="border-t-2 border-[#7A1F1F]/5 pt-10">
                            <h3 className="text-2xl font-black text-[#7A1F1F] uppercase tracking-tight mb-8 flex items-center gap-3">
                                <Crown size={24} className="text-[#D4A017]" />
                                Partnership Interest
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}>Partnership Tier</label>
                                    <div className="relative">
                                        <Crown className={iconClass} size={20} />
                                        <select name="partnershipTier" value={formData.partnershipTier} onChange={handleChange} required className={`${inputClass} appearance-none`}>
                                            <option value="" disabled>Select a partnership tier</option>
                                            <option value="Gold">Gold (₹30,000 – ₹50,000)</option>
                                            <option value="Diamond">Diamond (₹50,000 – ₹1,00,000)</option>
                                            <option value="Platinum">Platinum (₹1,00,000+)</option>
                                            <option value="Custom">Custom / Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Message / How would you like to partner?</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-6 text-[#7A1F1F]/30" size={20} />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Tell us about your brand and how you'd like to collaborate..."
                                            className="w-full pl-12 pr-4 py-4 bg-[#F7E7C6]/30 border-2 border-[#7A1F1F]/10 rounded-2xl font-bold text-[#000] placeholder:text-gray-400 focus:outline-none focus:border-[#7A1F1F] focus:ring-2 focus:ring-[#7A1F1F]/10 transition-all resize-none md:text-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="premium-button w-full py-5 bg-[#7A1F1F] text-[#F7E7C6] rounded-2xl font-black text-xl uppercase tracking-widest border-b-4 border-[#5A1515] hover:bg-[#D4A017] hover:text-[#000] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                <Send size={22} />
                                {status === 'submitting' ? 'SUBMITTING...' : 'SUBMIT INQUIRY'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
