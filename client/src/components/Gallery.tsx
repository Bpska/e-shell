import img1 from '../image/image.png';
import img2 from '../image/image copy.png';
import img3 from '../image/image copy 2.png';
import img4 from '../image/image copy 3.png';
import img5 from '../image/image copy 4.png';
import img6 from '../image/image copy 5.png';
import img7 from '../image/WhatsApp Image 2026-02-27 at 9.29.50 PM.jpeg';

export default function Gallery() {
  const images = [img1, img2, img3, img4, img5, img6, img7];

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
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative h-64 sm:h-80 bg-[#F7E7C6]/50 rounded-[2.5rem] sm:rounded-[3.3rem] overflow-hidden border-2 border-[#7A1F1F]/5 shadow-xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-[#7A1F1F] opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 translate-y-4 group-hover:translate-y-0">
                <p className="text-2xl font-black uppercase tracking-widest italic">Fest Moment {i + 1}</p>
              </div>
              <div className="w-full h-full">
                <img
                  src={img}
                  alt={`Snapshot ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
