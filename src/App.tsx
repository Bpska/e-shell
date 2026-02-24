import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Theme from './components/Theme';
import VisionMission from './components/VisionMission';
import WhyAttend from './components/WhyAttend';
import Events from './components/Events';
import Countdown from './components/Countdown';
import Schedule from './components/Schedule';
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

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === '#/admin') {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Theme />
      <VisionMission />
      <WhyAttend />
      <Events />
      <Countdown />
      <Schedule />
      <Stakeholders />
      <Impact />
      <Sponsorship />
      <Registration />
      <DownloadBrochure />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
