import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, hash?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    { name: 'Home', page: 'home', hash: '#hero' },
    { name: 'About', page: 'home', hash: '#about' },
    { name: 'Services', page: 'home', hash: '#services' },
    { name: 'Industries', page: 'home', hash: '#industries' },
    { name: 'Work', page: 'home', hash: '#portfolio' },
    { name: 'Contact', page: 'home', hash: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(link.page, link.hash);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] py-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); onNavigate('home', '#hero'); }}
          className="flex items-center gap-2 group relative z-[101]"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-heading font-bold text-xl">C</span>
          </div>
          <span className="text-white font-heading font-bold text-xl hidden sm:block">Cloudom</span>
        </a>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center space-x-1 px-2 py-2 rounded-full transition-all duration-300 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleLinkClick(e, link)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                (currentPage === link.page && window.location.hash === link.hash) 
                  ? 'text-white bg-white/10' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:block">
           <button
            onClick={() => onNavigate(currentPage, '#contact')}
            className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 relative z-[101]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center space-y-8 md:hidden"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
             <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
             
            {navLinks.map((link, i) => {
               const isActive = currentPage === link.page && window.location.hash === link.hash;
               return (
                <motion.button
                    key={link.name}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`text-4xl font-heading font-bold transition-all duration-300 py-2 px-4 ${
                        isActive ? 'text-primary' : 'text-white hover:text-primary/70'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                >
                    {link.name}
                </motion.button>
               )
            })}
             <motion.button
                onClick={() => { setMobileOpen(false); onNavigate(currentPage, '#contact'); }}
                className="px-8 py-4 bg-primary text-white font-bold rounded-full mt-8 text-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                Start a Project
              </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;