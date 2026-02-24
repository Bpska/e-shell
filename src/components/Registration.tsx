import { useState } from 'react';

import { CheckCircle, AlertCircle } from 'lucide-react';
import { saveRegistration, generateId } from '../store/registrationStore';

export default function Registration() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    college_company: '',
    role: '',
    event_type: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');

  const getFee = (type: string) => {
    switch (type) {
      case 'Hackathon': return '₹100';
      case 'Pitch Competition': return '₹100';
      case 'Exhibition': return '₹200';
      case 'Networking': return '₹50';
      case 'Full Fest Pass': return '₹300';
      default: return '₹0';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentConfirm = async () => {
    setStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      saveRegistration({
        id: generateId(),
        ...formData,
        fee: getFee(formData.event_type),
        payment_status: 'paid',
        timestamp: new Date().toISOString(),
      });
      setStatus('success');
      setStep('success');
    } catch (error) {
      setStatus('error');
      setMessage('Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="register" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F7E7C6] to-transparent"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter italic">
            {step === 'payment' ? 'Complete Payment' : step === 'success' ? 'Confirmed!' : 'Register Now'}
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-base sm:text-xl text-gray-400 font-bold uppercase tracking-widest italic leading-none">
            {step === 'payment' ? 'Secure your spot for the E-Fest' : 'Join us for UTKALPRENEUR E-FEST 2026'}
          </p>
        </div>

        <div className="glass-card rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-12 border-2 border-[#7A1F1F]/5 shadow-2xl relative bg-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

          {step === 'success' ? (
            <div className="text-center py-12 animate-fadeIn">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner rotate-12">
                <CheckCircle className="text-green-500" size={64} />
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#7A1F1F] mb-4 tracking-tighter uppercase italic">Registration Successful!</h3>
              <p className="text-base sm:text-xl text-gray-600 font-bold mb-10 leading-tight">Thank you, {formData.full_name}! We've received your registration for {formData.event_type}.</p>
              <button
                onClick={() => {
                  setStep('form');
                  setFormData({
                    full_name: '',
                    email: '',
                    phone: '',
                    college_company: '',
                    role: '',
                    event_type: ''
                  });
                }}
                className="premium-button px-8 sm:px-12 py-4 sm:py-6 bg-[#7A1F1F] text-[#F7E7C6] rounded-2xl font-black text-lg sm:text-2xl border-b-8 border-[#5A1515]"
              >
                BACK TO HOME
              </button>
            </div>
          ) : step === 'payment' ? (
            <div className="animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="p-8 bg-[#F7E7C6]/20 rounded-[2rem] border-2 border-[#7A1F1F]/5">
                    <h4 className="text-[#7A1F1F] font-black uppercase text-xs tracking-[0.3em] mb-4">Selected Event</h4>
                    <p className="text-3xl font-black text-[#7A1F1F] italic leading-none mb-2">{formData.event_type}</p>
                    <p className="text-6xl font-black text-[#D4A017] tracking-tighter italic">{getFee(formData.event_type)}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[#7A1F1F] font-black uppercase text-xs tracking-[0.3em]">Payment Instructions</h4>
                    <ul className="space-y-4">
                      {[
                        "Scan the QR code with any UPI app",
                        "Verify the amount and recipient (Canara Bank)",
                        "Complete the transaction",
                        "Click 'I HAVE PAID' to confirm"
                      ].map((text, i) => (
                        <li key={i} className="flex items-center gap-4">
                          <div className="w-6 h-6 rounded-full bg-[#7A1F1F] text-[#F7E7C6] flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</div>
                          <p className="text-gray-700 font-bold">{text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="relative inline-block p-6 bg-white rounded-[4rem] shadow-4xl border-2 border-[#D4A017]/20 transform rotate-2 transition-all duration-700 group-hover:rotate-0 group-hover:scale-105">
                    <div className="w-64 h-64 bg-gray-50 rounded-[3rem] flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-[#7A1F1F]/20 relative">
                      {/* Stylized QR Placeholder */}
                      <div className="grid grid-cols-3 gap-2 opacity-10 mb-4 transition-opacity group-hover:opacity-20">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="w-12 h-12 bg-[#7A1F1F] rounded-lg"></div>
                        ))}
                      </div>
                      <img src="/logo.png" alt="Canara Bank" className="w-20 h-auto mb-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl bg-white p-2 rounded-xl" />
                      <div className="text-[#7A1F1F] font-black text-center px-4 leading-tight absolute bottom-8">
                        <p className="text-[10px] tracking-[0.3em] mb-1">SCAN & PAY</p>
                        <p className="text-[8px] opacity-70">324141776436629@cnrb</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-8 text-[#7A1F1F] font-black uppercase text-[10px] tracking-[0.4em] opacity-50">Official Payment QR</p>
                </div>
              </div>

              <div className="mt-12 flex flex-col md:flex-row gap-6">
                <button
                  onClick={() => setStep('form')}
                  className="w-full md:w-1/3 py-5 text-[#7A1F1F] rounded-2xl font-black text-xl border-2 border-[#7A1F1F]/10 hover:bg-gray-50 transition-all uppercase italic"
                >
                  BACK
                </button>
                <button
                  onClick={handlePaymentConfirm}
                  disabled={status === 'loading'}
                  className="premium-button w-full md:w-2/3 py-5 bg-[#D4A017] text-[#7A1F1F] rounded-2xl font-black text-xl disabled:opacity-50 border-b-8 border-[#B8860B]"
                >
                  {status === 'loading' ? 'VERIFYING...' : 'I HAVE PAID'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[#7A1F1F] font-black uppercase text-xs tracking-widest mb-3">Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#7A1F1F] focus:bg-white transition-all font-medium"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-[#7A1F1F] font-black uppercase text-xs tracking-widest mb-3">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#7A1F1F] focus:bg-white transition-all font-medium"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[#7A1F1F] font-black uppercase text-xs tracking-widest mb-3">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#7A1F1F] focus:bg-white transition-all font-medium"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <label className="block text-[#7A1F1F] font-black uppercase text-xs tracking-widest mb-3">College/Company *</label>
                  <input
                    type="text"
                    name="college_company"
                    value={formData.college_company}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#7A1F1F] focus:bg-white transition-all font-medium"
                    placeholder="Your institution"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[#7A1F1F] font-black uppercase text-xs tracking-widest mb-3">Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#7A1F1F] focus:bg-white transition-all font-medium appearance-none"
                  >
                    <option value="">Select your role</option>
                    <option value="Student">Student</option>
                    <option value="Startup Founder">Startup Founder</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Investor">Investor</option>
                    <option value="Visitor">Visitor</option>
                    <option value="Sponsor">Sponsor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#7A1F1F] font-black uppercase text-xs tracking-widest mb-3">Event Selection *</label>
                  <select
                    name="event_type"
                    value={formData.event_type}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#7A1F1F] focus:bg-white transition-all font-medium appearance-none"
                  >
                    <option value="">Select event</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Pitch Competition">Pitch Competition</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Networking">Networking</option>
                    <option value="Full Fest Pass">Full Fest Pass</option>
                  </select>
                </div>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 text-red-600 bg-red-50 p-6 rounded-2xl animate-bounce-slow">
                  <AlertCircle size={24} />
                  <span className="font-bold">{message}</span>
                </div>
              )}

              <button
                type="submit"
                className="premium-button w-full py-5 bg-[#7A1F1F] text-[#F7E7C6] rounded-2xl font-black text-xl border-b-8 border-[#5A1515]"
              >
                PROCEED TO PAYMENT
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
