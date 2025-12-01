import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Timeline from './components/Timeline';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Smooth scroll behavior is handled by CSS (html { scroll-behavior: smooth })
  // But we want to ensure we start at top on reload
  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="min-h-screen bg-dark text-white selection:bg-accent selection:text-white">
          <Navbar />
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <Timeline />
          <Stats />
          <Testimonials />
          <Team />
          <Pricing />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
};

export default App;