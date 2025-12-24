import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { INDUSTRIES } from '../constants';
import TextReveal from './TextReveal';

const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative border border-white/10 bg-surface overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 77, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const Industries: React.FC = () => {
  return (
    <section id="industries" className="py-32 bg-dark relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium tracking-wide uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary motion-safe:animate-pulse"></span>
            Industries
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white max-w-4xl">
            <TextReveal text="Solutions Tailored for" />
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
               <TextReveal text="Your Specific Sector" delay={0.3} />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard className="rounded-2xl h-full p-8 hover:border-primary/50 transition-colors duration-500">
                  <div className="flex flex-col h-full items-start">
                    <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-primary group-hover:scale-110 group-hover:bg-primary-dark group-hover:text-white transition-all duration-300">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                      {industry.name}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed text-sm mb-6 group-hover:text-gray-300 transition-colors">
                      {industry.description}
                    </p>

                    <div className="mt-auto pt-6 w-full border-t border-white/5 flex items-center justify-between text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">
                      <span>View Solutions</span>
                      <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
