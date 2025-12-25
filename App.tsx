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
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import { initAnalytics, trackPageview, trackClick } from './src/lib/analytics';

type ViewType = 'home' | 'services' | 'privacy' | 'terms' | 'blog' | 'blog-post';

function getRouteFromPathname(pathname: string): { view: ViewType; blogSlug: string | null } {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/privacy') return { view: 'privacy', blogSlug: null };
  if (normalized === '/terms') return { view: 'terms', blogSlug: null };
  if (normalized === '/blog') return { view: 'blog', blogSlug: null };
  if (normalized.startsWith('/blog/')) {
    const rawSlug = normalized.slice('/blog/'.length).trim();
    if (!rawSlug) return { view: 'blog', blogSlug: null };
    try {
      return { view: 'blog-post', blogSlug: decodeURIComponent(rawSlug) };
    } catch (e) {
      return { view: 'blog-post', blogSlug: rawSlug };
    }
  }
  if (normalized === '/services') return { view: 'services', blogSlug: null };
  return { view: 'home', blogSlug: null };
}

function getPathnameForView(view: ViewType, blogSlug: string | null): string {
  if (view === 'privacy') return '/privacy';
  if (view === 'terms') return '/terms';
  if (view === 'services') return '/services';
  if (view === 'blog') return '/blog';
  if (view === 'blog-post') return blogSlug ? `/blog/${encodeURIComponent(blogSlug)}` : '/blog';
  return '/';
}

const App: React.FC = () => {
  // Loader enabled (temporarily deactivated)
  const [loading, setLoading] = useState(false); 
  const [view, setView] = useState<ViewType>('home');
  const [blogSlug, setBlogSlug] = useState<string | null>(null);

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

  useEffect(() => {
    const initial = getRouteFromPathname(window.location.pathname);
    setView(initial.view);
    setBlogSlug(initial.blogSlug);

    const handlePopState = () => {
      const next = getRouteFromPathname(window.location.pathname);
      setView(next.view);
      setBlogSlug(next.blogSlug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Send pageview events when SPA "view" changes
  useEffect(() => {
    const path = view === 'blog-post' && blogSlug ? `/blog/${blogSlug}` : `/${view}`;
    trackPageview(path);
  }, [view, blogSlug]);

  const navigateTo = (page: string, hash?: string) => {
    // Cast string to view type safely
    const targetView = (['home', 'services', 'privacy', 'terms', 'blog'].includes(page)) ? page as ViewType : 'home';
    
    setView(targetView);
    setBlogSlug(null);

    const pathname = getPathnameForView(targetView, null);
    try {
      window.history.pushState(null, '', hash ? `${pathname}${hash}` : pathname);
    } catch (e) {}
    
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

  const navigateToBlogPost = (slug: string) => {
    setView('blog-post');
    setBlogSlug(slug);
    try {
      window.history.pushState(null, '', getPathnameForView('blog-post', slug));
    } catch (e) {}
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
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

          {view === 'blog' && (
            <Blog onOpenPost={navigateToBlogPost} />
          )}

          {view === 'blog-post' && blogSlug && (
            <BlogPost slug={blogSlug} onBack={() => navigateTo('blog')} />
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
