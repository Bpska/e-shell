export default function About() {
  return (
    <section id="about" className="py-20 bg-[#F7E7C6] border-t-4 border-b-4 border-[#7A1F1F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7A1F1F] mb-4">
            About the Fest
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-[#D9B68C] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7A1F1F] opacity-5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4A017] opacity-5 rounded-full -ml-20 -mb-20"></div>

          <div className="relative z-10">
            <p className="text-lg md:text-xl text-[#000000] leading-relaxed mb-6">
              <span className="text-[#7A1F1F] font-bold text-2xl">Utkalpreneur E-Fest</span> is a two-day celebration of entrepreneurship, innovation, and cultural identity, bringing together the vibrant energy of startups, students, creators, and artisans under one roof.
            </p>

            <p className="text-lg md:text-xl text-[#000000] leading-relaxed mb-6">
              This fest is more than just an event—it's a movement to blend the rich heritage of Odisha with the dynamic spirit of modern entrepreneurship. We believe that true innovation is rooted in tradition, and that the future of business lies in honoring our past while building boldly for tomorrow.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-[#F7E7C6] p-6 rounded-lg border-2 border-[#7A1F1F]">
                <div className="text-[#D4A017] text-4xl font-bold mb-2">2</div>
                <p className="text-[#7A1F1F] font-semibold">Days of Innovation</p>
              </div>
              <div className="bg-[#F7E7C6] p-6 rounded-lg border-2 border-[#7A1F1F]">
                <div className="text-[#D4A017] text-4xl font-bold mb-2">10+</div>
                <p className="text-[#7A1F1F] font-semibold">Events & Activities</p>
              </div>
              <div className="bg-[#F7E7C6] p-6 rounded-lg border-2 border-[#7A1F1F]">
                <div className="text-[#D4A017] text-4xl font-bold mb-2">1500+</div>
                <p className="text-[#7A1F1F] font-semibold">Expected Participants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
