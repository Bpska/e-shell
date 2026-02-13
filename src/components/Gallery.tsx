export default function Gallery() {
  const images = Array(6).fill(null);

  return (
    <section className="py-20 bg-gradient-to-br from-[#D9B68C] to-[#F7E7C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7A1F1F] mb-4">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="text-xl text-[#000000]">
            Glimpses from previous events and celebrations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden border-4 border-[#7A1F1F] hover:border-[#D4A017] transition-colors group"
            >
              <div className="w-full h-full bg-gradient-to-br from-[#7A1F1F] to-[#D4A017] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-[#F7E7C6] text-6xl font-bold opacity-30">U</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
