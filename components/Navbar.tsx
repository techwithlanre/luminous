
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Home, Layers, Briefcase, Mail, Cpu, Globe } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, hash?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeHash, setActiveHash] = useState<string | null>(null); // currently visible section hash

  // Observe sections to keep the nav state in sync while scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ids = ['hero','about','services','industries','portfolio','contact'];
    const observer = new IntersectionObserver((entries) => {
      // find the entry most in view
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))[0];

      if (visible && visible.target && visible.target.id) {
        setActiveHash(`#${visible.target.id}`);
        // also keep the URL hash in sync without scrolling
        try { window.history.replaceState(null, '', `#${visible.target.id}`); } catch (e) {}
      }
    }, { root: null, threshold: [0.35, 0.5, 0.65], rootMargin: '-25% 0px -40% 0px' });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Add hysteresis to prevent flickering at the threshold
      if (window.scrollY > 50 && !scrolled) {
        setScrolled(true);
      } else if (window.scrollY < 30 && scrolled) {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Lock body scroll when mobile menu is open using a fixed-position technique to prevent layout shift
  useEffect(() => {
    let scrollY = 0;
    if (mobileOpen) {
      // store current scroll, then lock the body with fixed positioning
      scrollY = window.scrollY || window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // restore scroll position and clear styles
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (top) {
        const restoredY = -parseInt(top || '0');
        window.scrollTo(0, restoredY);
      }
    }

    // cleanup if unmounted while locked
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { name: 'Home', page: 'home', hash: '#hero', icon: Home },
    { name: 'About', page: 'home', hash: '#about', icon: UsersIcon },
    { name: 'Services', page: 'home', hash: '#services', icon: Layers },
    { name: 'Industries', page: 'home', hash: '#industries', icon: Globe },
    { name: 'Work', page: 'home', hash: '#portfolio', icon: Briefcase },
    { name: 'Contact', page: 'home', hash: '#contact', icon: Mail },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(link.page, link.hash);
  };

  return (
    <>
      <motion.nav
        className="fixed top-6 left-0 right-0 z-[100] flex justify-center items-start px-4 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', damping: 20 }}
        role="navigation"
        aria-label="Main Navigation"
      >
        <motion.div
          className={`pointer-events-auto relative bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden ${mobileOpen ? 'p-5 w-[95vw]' : scrolled ? 'py-2 px-3' : 'py-3 px-6'}`}
          initial={false}
          animate={{ borderRadius: mobileOpen ? 24 : 50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ willChange: 'transform, border-radius' }}
        >
          <div className={`flex items-center justify-between gap-4 ${mobileOpen ? 'flex-col items-stretch' : ''}`}>
            
            {/* Header Row (Logo + Toggle) */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-8">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); onNavigate('home', '#hero'); }}
                    className="flex items-center gap-2 group relative z-[101] shrink-0"
                    aria-label="Cloudom Systems Homepage"
                    title="Home"
                >
                    <motion.div layout="position" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12" aria-hidden="true">
                        <span className="text-white font-heading font-bold text-sm">C</span>
                    </motion.div>
                    <AnimatePresence mode="popLayout">
                        {(!scrolled || mobileOpen) && (
                            <motion.span 
                                layout="position"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-white font-heading font-bold text-lg whitespace-nowrap overflow-hidden"
                            >
                                Cloudom
                            </motion.span>
                        )}
                    </AnimatePresence>
                </a>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white p-1 relative z-[101] hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle Menu"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Desktop Links */}
            {!mobileOpen && (
                <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                    const effectiveHash = activeHash ?? window.location.hash;
                    const isActive = currentPage === link.page && effectiveHash === link.hash;
                    return (
                    <button
                        key={link.name}
                        onClick={(e) => handleLinkClick(e, link)}
                        onMouseEnter={() => setHoveredTab(link.name)}
                        onMouseLeave={() => setHoveredTab(null)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {hoveredTab === link.name && (
                            <motion.div
                                layoutId="nav-hover"
                                className="absolute inset-0 bg-white/10 rounded-full"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {isActive && (
                            <motion.div
                                layoutId="nav-active"
                                className="absolute inset-x-2 bottom-1 h-0.5 bg-primary rounded-full"
                            />
                        )}
                        <span className="relative z-10">{link.name}</span>
                    </button>
                    );
                })}
                </div>
            )}

            {/* CTA Button (Desktop) */}
            {!mobileOpen && (
                <div className="hidden lg:block">
                     <a
                        href="https://calendly.com/techwithlanre/product"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-2 rounded-full text-white text-sm font-bold transition-all duration-300 ${
                            scrolled ? 'w-10 h-10 p-0 justify-center bg-primary-dark' : 'px-5 py-2.5 bg-primary-dark hover:bg-primary-dark/90'
                        }`}
                        aria-label="Start a Project"
                    >
                        {scrolled ? (
                             <ArrowUpRight size={18} />
                        ) : (
                            <>
                                <span>Let's Talk</span>
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </>
                        )}
                    </a>
                </div>
            )}

            {/* Mobile Menu Content (Expanded Island) */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{ transformOrigin: 'top', willChange: 'transform, opacity' }}
                        className="w-full flex flex-col gap-2 pt-4 lg:hidden"
                    >
                        <div className="w-full h-px bg-white/10 mb-2"></div>
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const effectiveHash = activeHash ?? window.location.hash;
                            const isActive = currentPage === link.page && effectiveHash === link.hash;
                            return (
                                <button
                                    key={link.name}
                                    onClick={(e) => handleLinkClick(e, link)}
                                    className={`flex items-center gap-4 w-full p-4 rounded-xl transition-colors duration-200 ${
                                        isActive ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-gray-300'
                                    }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-heading font-bold text-lg">{link.name}</span>
                                    {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-primary" />}
                                </button>
                            );
                        })}
                        <motion.a
                            href="https://calendly.com/techwithlanre/product"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="w-full mt-4 p-4 bg-primary-dark rounded-xl text-white font-bold flex justify-center items-center gap-2"
                        >
                            Let's Talk <ArrowUpRight size={18} />
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>

          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

// Helper icon for About since it wasn't imported
const UsersIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default Navbar;
