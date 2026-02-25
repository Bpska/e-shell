export default function About() {
  return (
    <section id="about" className="py-24 bg-[#F7E7C6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter">
            About the Fest
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full"></div>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-16 border-2 border-[#7A1F1F]/10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#7A1F1F]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D4A017]/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-8">
            <p className="text-2xl md:text-3xl text-[#000000] leading-tight font-bold">
              <span className="text-[#7A1F1F]">Utkalpreneur E-Fest</span> is a two-day celebration of entrepreneurship, innovation, and cultural identity.
            </p>

            <p className="text-xl sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl font-medium">
              This fest is more than just an event—it's a movement to blend the rich heritage of Odisha with the dynamic spirit of modern entrepreneurship. We believe that true innovation is rooted in tradition, and that the future of business lies in honoring our past while building boldly for tomorrow.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { label: 'Days of Innovation', value: '2', color: 'text-[#7A1F1F]' },
                { label: 'Events & Activities', value: '10+', color: 'text-[#D4A017]' },
                { label: 'Expected Participants', value: '1500+', color: 'text-[#7A1F1F]' }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white/50 rounded-2xl border border-[#7A1F1F]/5 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`${stat.color} text-6xl font-black mb-2 tracking-tighter`}>{stat.value}</div>
                  <p className="text-[#7A1F1F] font-bold uppercase text-sm tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
