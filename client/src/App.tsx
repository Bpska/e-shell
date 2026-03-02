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
import DownloadBrochure from './components/DownloadBrochure';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';

const eventNameMap: Record<string, string> = {
  techspaire: 'Techspaire 1.0',
  local2vocal: 'Local 2 Vocal',
  sharktank: 'Mock Shark Tank',
  idea2impact: 'Idea 2 Impact',
};

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Scroll to section when hash changes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#/' && !hash.startsWith('#/registration') && hash !== '#/admin') {
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
        <Events />
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
    </div>
  );
}

export default App;
