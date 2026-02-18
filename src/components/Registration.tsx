import { useState } from 'react';

import { CheckCircle, AlertCircle } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // Mock submission - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form submitted:', formData);

      setStatus('success');
      setMessage('Registration successful! We will contact you soon.');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        college_company: '',
        role: '',
        event_type: ''
      });
    } catch (error) {
      setStatus('error');
      setMessage('Registration failed. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="register" className="py-20 bg-[#F7E7C6] border-t-4 border-[#7A1F1F]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7A1F1F] mb-4">
            Register Now
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="text-xl text-[#000000]">
            Join us for UTKALPRENEUR E-FEST 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border-4 border-[#D9B68C]">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
              <h3 className="text-2xl font-bold text-[#7A1F1F] mb-2">Registration Successful!</h3>
              <p className="text-[#000000] mb-6">{message}</p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-3 bg-[#7A1F1F] text-[#F7E7C6] rounded-lg font-semibold hover:bg-[#D4A017] hover:text-[#000000] transition-colors"
              >
                Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#7A1F1F] font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#D9B68C] rounded-lg focus:outline-none focus:border-[#7A1F1F] transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-[#7A1F1F] font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#D9B68C] rounded-lg focus:outline-none focus:border-[#7A1F1F] transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-[#7A1F1F] font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#D9B68C] rounded-lg focus:outline-none focus:border-[#7A1F1F] transition-colors"
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <label className="block text-[#7A1F1F] font-semibold mb-2">College/Company Name *</label>
                <input
                  type="text"
                  name="college_company"
                  value={formData.college_company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#D9B68C] rounded-lg focus:outline-none focus:border-[#7A1F1F] transition-colors"
                  placeholder="Your institution or organization"
                />
              </div>

              <div>
                <label className="block text-[#7A1F1F] font-semibold mb-2">Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#D9B68C] rounded-lg focus:outline-none focus:border-[#7A1F1F] transition-colors"
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
                <label className="block text-[#7A1F1F] font-semibold mb-2">Event Selection *</label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#D9B68C] rounded-lg focus:outline-none focus:border-[#7A1F1F] transition-colors"
                >
                  <option value="">Select event</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Pitch Competition">Pitch Competition</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Networking">Networking</option>
                  <option value="Full Fest Pass">Full Fest Pass</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                  <AlertCircle size={20} />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-[#7A1F1F] text-[#F7E7C6] rounded-lg font-bold text-lg hover:bg-[#D4A017] hover:text-[#000000] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#D4A017]"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Registration'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
