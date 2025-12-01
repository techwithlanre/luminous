import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Users, Code2, PenTool } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Stars */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col items-center gap-2"
        >
             <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF4D00" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                    </motion.div>
                ))}
             </div>
             <p className="text-orange-500/80 text-sm font-medium">Loved by 100+ Businesses</p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-[1.1] tracking-tight max-w-5xl"
          style={{ y: y1 }}
        >
          <div className="overflow-hidden p-2">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              Bringing Your Digital
            </motion.div>
          </div>
          <div className="overflow-hidden p-2">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            >
              Vision to <span className="text-primary italic">Life</span>
            </motion.div>
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          We create Custom Digital Solutions that Transform Businesses. From Web Development to AI integrations, Mobile app Development, and Custom Software Solutions, We're your Full-stack Partners.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <a href="#contact" className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-[0_0_30px_rgba(255,77,0,0.3)] flex items-center gap-2 group">
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Illuminate your project
          </a>
          <a href="#portfolio" className="px-8 py-4 border border-primary/30 text-white rounded-full font-medium hover:bg-primary/10 transition-colors">
            Recent Work
          </a>
        </motion.div>

        {/* Features Row */}
        <motion.div 
            className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-300 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <div className="flex items-center gap-2">
                <Users className="text-primary" size={20} />
                <span>Expert Team</span>
            </div>
            <div className="flex items-center gap-2">
                <Code2 className="text-primary" size={20} />
                <span>Clean Code</span>
            </div>
            <div className="flex items-center gap-2">
                <PenTool className="text-primary" size={20} />
                <span>Stunning Design</span>
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

      </div>
    </section>
  );
};

export default Hero;