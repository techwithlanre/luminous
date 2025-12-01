import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE } from '../constants';

const Timeline: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="py-32 bg-dark relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">Our Journey</h2>
        </div>

        {/* Central Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-40 bottom-20 w-px bg-white/10 hidden md:block">
            <motion.div 
                className="w-full bg-primary origin-top"
                style={{ scaleY, height: '100%' }}
            />
        </div>

        <div className="space-y-24">
          {TIMELINE.map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full md:w-5/12"></div>
              
              <div className="z-10 bg-dark border-4 border-surface w-12 h-12 rounded-full flex items-center justify-center mb-6 md:mb-0 shadow-[0_0_20px_rgba(255,77,0,0.4)]">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>

              <div className="w-full md:w-5/12 text-center md:text-left">
                <div className={`p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/50 transition-colors ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <span className="text-5xl font-bold text-white/5 absolute -mt-12 ml-4 md:-ml-8 pointer-events-none select-none">
                        {item.year}
                    </span>
                    <h3 className="text-2xl font-bold mb-2 text-primary relative z-10">{item.title}</h3>
                    <p className="text-gray-400 relative z-10">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;