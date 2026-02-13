import { Download } from 'lucide-react';

export default function DownloadBrochure() {
  const handleDownload = () => {
    alert('Brochure will be available soon!');
  };

  return (
    <section className="py-16 bg-[#D9B68C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-[#7A1F1F] mb-6">
          Want to know more?
        </h3>
        <p className="text-lg text-[#000000] mb-8">
          Download our detailed brochure for complete information about the fest, events, and opportunities
        </p>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#7A1F1F] text-[#F7E7C6] rounded-lg font-bold text-lg hover:bg-[#D4A017] hover:text-[#000000] transition-all duration-300 transform hover:scale-105 shadow-xl border-4 border-[#D4A017]"
        >
          <Download size={24} />
          Download Brochure
        </button>
      </div>
    </section>
  );
}
