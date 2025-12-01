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
import Pricing from './components/Pricing'; // Detailed Services List
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Industries from './components/Industries';

const App: React.FC = () => {
  // Loader enabled
  const [loading, setLoading] = useState(true); 
  const [view, setView] = useState<'home' | 'services'>('home');

  // Smooth scroll behavior is handled by CSS (html { scroll-behavior: smooth })
  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  const navigateTo = (page: string, hash?: string) => {
    // Cast string to view type safely
    const targetView = (page === 'home' || page === 'services') ? page : 'home';
    
    setView(targetView);
    
    // Allow React to render the new view before scrolling
    setTimeout(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="min-h-screen bg-dark text-white selection:bg-accent selection:text-white">
          <Navbar currentPage={view} onNavigate={navigateTo} />
          
          {view === 'home' ? (
            <>
              <Hero />
              <About />
              <Services onNavigate={navigateTo} />
              <Industries />
              <Portfolio />
              <Timeline />
              <Stats />
              <Testimonials />
            </>
          ) : (
            <>
              <Pricing /> {/* This contains the Services Detailed List */}
            </>
          )}

          {/* Contact and Footer are on both pages */}
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
};

export default App;