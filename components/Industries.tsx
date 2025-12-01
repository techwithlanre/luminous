
import React from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../constants';
import TextReveal from './TextReveal';

const Industries: React.FC = () => {
  return (
    <section id="industries" className="py-24 bg-surface border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-wider uppercase mb-4 block"
          >
            Sectors
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white flex justify-center">
            <TextReveal text="Solutions Tailored for Your Industry" delay={0.2} />
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {INDUSTRIES.map((industry, index) => {
                const Icon = industry.icon;
                return (
                    <motion.div
                        key={industry.id}
                        className="flex flex-col items-center justify-center p-6 bg-dark border border-white/5 rounded-2xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 text-center group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                    >
                        <div className="mb-4 text-gray-500 group-hover:text-primary transition-colors">
                            <Icon size={32} />
                        </div>
                        <h3 className="font-bold text-sm md:text-base text-white">{industry.name}</h3>
                    </motion.div>
                )
            })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
