import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Overview', href: '#services' },
    { name: 'Case studies', href: '#portfolio' },
    { name: 'Blog', href: '#about' }, // Mapping 'Blog' to About for now based on available sections
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] py-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-heading font-bold text-xl">C</span>
          </div>
        </a>

        {/* Desktop Menu - Centered Pill */}
        <div className={`hidden md:flex items-center space-x-1 px-2 py-2 rounded-full transition-all duration-300 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:block">
           <a
            href="#contact"
            className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            <span>Book a Call</span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-dark z-50 flex flex-col items-center justify-center space-y-8 md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button
                className="absolute top-8 right-6"
                onClick={() => setMobileOpen(false)}
            >
                <X size={32} />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-3xl font-heading font-bold hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {link.name}
              </motion.a>
            ))}
             <motion.a
                href="#contact"
                className="px-8 py-3 bg-primary text-white font-bold rounded-full mt-4"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Book a Call
              </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;