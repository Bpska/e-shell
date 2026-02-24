export default function Gallery() {

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F7E7C6] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-[#7A1F1F] mb-4 uppercase tracking-tighter">
            Snapshots
          </h2>
          <div className="w-32 h-2 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-400 font-black uppercase tracking-widest italic">Capturing the Spirit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="group relative h-80 bg-[#F7E7C6]/50 rounded-[3rem] overflow-hidden border-2 border-[#7A1F1F]/5 shadow-xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-[#7A1F1F] opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 translate-y-4 group-hover:translate-y-0">
                <p className="text-2xl font-black uppercase tracking-widest italic">Moment {i}</p>
              </div>
              <div className="w-full h-full flex items-center justify-center opacity-30 group-hover:scale-125 transition-transform duration-700">
                <img src="/logo.png" alt="Snapshot" className="h-24 w-auto grayscale contrast-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
