import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Theme from './components/Theme';
import VisionMission from './components/VisionMission';
import WhyAttend from './components/WhyAttend';
import Events from './components/Events';
import Prizes from './components/Prizes';
import Countdown from './components/Countdown';
import Schedule from './components/Schedule';
import HackathonRules from './components/HackathonRules';
import Stakeholders from './components/Stakeholders';
import Impact from './components/Impact';
import Sponsorship from './components/Sponsorship';
import Registration from './components/Registration';
import BecomePartner from './components/BecomePartner';
import DownloadBrochure from './components/DownloadBrochure';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';

const VISITOR_PASS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfQQdwplOOcglZXYFIcv2PNBT8Gth1pETiFM2DjRNn2av4HRw/viewform?usp=header';

const eventNameMap: Record<string, string> = {
  techspaire: 'Techspaire 1.0',
  local2vocal: 'Local 2 Vocal',
  sharktank: 'Mock Shark Tank',
  idea2impact: 'Idea 2 Impact',
};

/* ── Visitor Pass Popup ── */
function VisitorPassPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('visitor_pass_dismissed')) return;
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('visitor_pass_dismissed', '1');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={dismiss}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />

      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden animate-slideInUp border-2 border-[#D4A017]/30"
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors text-gray-600 hover:text-gray-900 font-bold text-lg z-10"
        >
          ✕
        </button>

        {/* Golden Header */}
        <div className="bg-gradient-to-br from-[#D4A017] via-[#E8B830] to-[#D4A017] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
          <div className="text-5xl mb-3">🎟️</div>
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Visitor Pass
          </h3>
          <p className="text-white/80 font-bold mt-2 text-sm">FREE ENTRY</p>
        </div>

        {/* Body */}
        <div className="p-8 text-center">
          <p className="text-gray-600 font-medium text-base leading-relaxed mb-6">
            Not competing? Get your <span className="text-[#7A1F1F] font-black">free Visitor Pass</span> to experience all the excitement at <span className="text-[#7A1F1F] font-black">UTKALPRENEUR E-FEST 2026</span>!
          </p>
          <p className="text-sm text-gray-400 font-medium mb-8">March 21-22, 2026 • NIT Bhubaneswar</p>
          <a
            href={VISITOR_PASS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-[#7A1F1F] text-white rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-[#D4A017] hover:text-[#000] transition-all border-b-4 border-[#5A1515] hover:border-[#B8860B]"
          >
            🎫 Get Your Visitor Pass
          </a>
          <button
            onClick={dismiss}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 font-bold transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Track page visit (once per session)
  useEffect(() => {
    if (!sessionStorage.getItem('visit_tracked')) {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      fetch(`${apiBase}/visit`, { method: 'POST' }).catch(() => { });
      sessionStorage.setItem('visit_tracked', '1');
    }
  }, []);

  // Scroll to section when hash changes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#/' && !hash.startsWith('#/registration') && hash !== '#/admin' && hash !== '#/partner') {
      const id = hash.replace('#/', '').replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [route]);

  if (route === '#/admin') {
    return <AdminPanel />;
  }

  // Handle registration routes like #/registration/techspaire
  if (route.startsWith('#/registration')) {
    const eventSlug = route.split('/')[2] || '';
    const eventName = eventNameMap[eventSlug] || '';
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Registration eventName={eventName} />
          <HackathonRules />
        </main>
        <Footer />
      </div>
    );
  }

  // Handle partner route
  if (route === '#/partner') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <BecomePartner />
        </main>
        <Footer />
      </div>
    );
  }

  const isHomePage = route === '#/' || route === '';

  const renderPage = () => {
    // If we are not on a special page (Admin or Registration), render the full landing page
    return (
      <>
        <Hero />
        <Countdown />
        <About />
        <Theme />
        <VisionMission />
        <WhyAttend />
        <Prizes />
        <Schedule />
        <Stakeholders />
        <Impact />
        <Gallery />
        <Sponsorship />
        <FAQ />
        <DownloadBrochure />
        <Contact />
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      {isHomePage && <VisitorPassPopup />}
    </div>
  );
}

export default App;

