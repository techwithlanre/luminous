
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
          className="pointer-events-auto relative bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
          layout
          initial={{ borderRadius: 32, width: 'auto' }}
          animate={{
            borderRadius: mobileOpen ? 24 : 50,
            width: mobileOpen ? '95vw' : 'auto',
            height: mobileOpen ? 'auto' : 'auto',
            padding: mobileOpen ? '20px' : scrolled ? '8px 12px' : '12px 24px',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
                >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12">
                        <span className="text-white font-heading font-bold text-sm">C</span>
                    </div>
                    <AnimatePresence>
                        {(!scrolled || mobileOpen) && (
                            <motion.span 
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
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
                    const isActive = currentPage === link.page && window.location.hash === link.hash;
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
                     <button
                        onClick={() => onNavigate(currentPage, '#contact')}
                        className={`group flex items-center gap-2 rounded-full text-white text-sm font-bold transition-all duration-300 ${
                            scrolled ? 'w-10 h-10 p-0 justify-center bg-primary' : 'px-5 py-2.5 bg-primary hover:bg-orange-600'
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
                    </button>
                </div>
            )}

            {/* Mobile Menu Content (Expanded Island) */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full flex flex-col gap-2 pt-4 lg:hidden"
                    >
                        <div className="w-full h-px bg-white/10 mb-2"></div>
                        {navLinks.map((link, i) => {
                            const Icon = link.icon;
                            const isActive = currentPage === link.page && window.location.hash === link.hash;
                            return (
                                <motion.button
                                    key={link.name}
                                    onClick={(e) => handleLinkClick(e, link)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all ${
                                        isActive ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-gray-300'
                                    }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-heading font-bold text-lg">{link.name}</span>
                                    {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-primary" />}
                                </motion.button>
                            );
                        })}
                        <motion.button
                            onClick={() => { setMobileOpen(false); onNavigate(currentPage, '#contact'); }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="w-full mt-4 p-4 bg-primary rounded-xl text-white font-bold flex justify-center items-center gap-2"
                        >
                            Let's Talk <ArrowUpRight size={18} />
                        </motion.button>
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
