
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Users, Code2, PenTool } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute -top-[30%] -left-[10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-40"></div>
        <div className="hidden md:block absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center will-change-transform"
        // Disable parallax effect on mobile to prevent jitter
        style={{ y: isMobile ? 0 : y1 }}
      >
        
        {/* Tagline */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col items-center gap-2"
        >
             <p className="px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm bg-primary/5 uppercase tracking-wider font-semibold">
                Digital Product Agency
             </p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-tight tracking-tight max-w-6xl text-balance"
        >
          <div className="overflow-hidden p-2">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              {HERO_CONTENT.headlineStart}
            </motion.div>
          </div>
          <div className="overflow-hidden p-2">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            >
              <span className="text-primary italic">{HERO_CONTENT.headlineEnd}</span>
            </motion.div>
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {HERO_CONTENT.subheadline}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <a 
            href="https://calendly.com/techwithlanre/product"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary-dark text-white rounded-full font-bold transition-all duration-300 md:shadow-[0_0_20px_rgba(255,77,0,0.4)] md:hover:shadow-[0_0_60px_rgba(255,77,0,0.7)] hover:scale-105 hover:bg-primary-dark/90 active:scale-95 flex items-center gap-2 group"
          >
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            {HERO_CONTENT.ctaPrimary}
          </a>
          <a 
            href="#portfolio" 
            className="px-8 py-4 border border-primary/30 text-white rounded-full font-medium transition-all duration-300 hover:bg-primary/10 hover:scale-105 active:scale-95 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(255,77,0,0.2)]"
          >
            {HERO_CONTENT.ctaSecondary}
          </a>
        </motion.div>

        {/* Features Row */}
        <motion.div 
            className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-300 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            role="list"
            aria-label="Key features"
        >
            <div className="flex items-center gap-2" role="listitem">
                <Users className="text-primary" size={20} aria-hidden="true" />
                <span>Agile Squads</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
                <Code2 className="text-primary" size={20} aria-hidden="true" />
                <span>Scalable Architecture</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
                <PenTool className="text-primary" size={20} aria-hidden="true" />
                <span>Product Thinking</span>
            </div>
        </motion.div>

        {/* Decorative Line connection to next section */}
        <motion.div 
            className="absolute bottom-0 left-20 hidden lg:block"
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 1.5, duration: 1 }}
        >
            <div className="w-px h-full bg-gradient-to-b from-transparent via-primary to-primary"></div>
            <div className="w-32 h-[1px] bg-primary absolute bottom-0 left-0"></div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
