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
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { initAnalytics, trackPageview, trackClick } from './src/lib/analytics';

type ViewType = 'home' | 'services' | 'privacy' | 'terms';

const App: React.FC = () => {
  // Loader enabled (temporarily deactivated)
  const [loading, setLoading] = useState(false); 
  const [view, setView] = useState<ViewType>('home');

  // Smooth scroll behavior is handled by CSS (html { scroll-behavior: smooth })
  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  // Initialize analytics and register global click tracking once
  useEffect(() => {
    initAnalytics();
    // send initial pageview for the current view
    trackPageview(`/${view}`);

    const handleClick = (e: MouseEvent) => trackClick(e);
    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  // Send pageview events when SPA "view" changes
  useEffect(() => {
    trackPageview(`/${view}`);
  }, [view]);

  const navigateTo = (page: string, hash?: string) => {
    // Cast string to view type safely
    const targetView = (['home', 'services', 'privacy', 'terms'].includes(page)) ? page as ViewType : 'home';
    
    setView(targetView);
    
    // Allow React to render the new view before scrolling
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        // update the URL hash without causing a jump
        try { window.history.replaceState(null, '', `#${id}`); } catch (e) {}
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // clear hash but don't reload
        try { window.history.replaceState(null, '', window.location.pathname); } catch (e) {}
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
          
          {view === 'home' && (
            <>
              <Hero />
              <About />
              <Services onNavigate={navigateTo} />
              <Industries />
              <Portfolio />
              <Timeline />
              <Stats />
              {/* <Team /> */}
              <Testimonials />
            </>
          )}

          {view === 'services' && (
            <Pricing />
          )}

          {view === 'privacy' && (
            <PrivacyPolicy />
          )}

          {view === 'terms' && (
            <TermsOfService />
          )}

          {/* Contact and Footer are on all pages */}
          <Contact />
          <Footer onNavigate={navigateTo} />
        </main>
      )}
    </>
  );
};

export default App;