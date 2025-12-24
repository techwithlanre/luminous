
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../constants';
import TextReveal from './TextReveal';

interface ServicesProps {
    onNavigate: (page: string, hash?: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <section id="services" className="py-24 bg-dark relative">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-4">
            <span className="px-4 py-1 rounded-full border border-primary/30 text-primary text-sm bg-primary/5 uppercase tracking-wider">
                Expertise
            </span>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white max-w-5xl mx-auto flex flex-col items-center gap-2">
            <TextReveal text="End-to-End Product Development —" />
            <TextReveal text="Done Right" theme="primary" delay={0.4} />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {SERVICES.map((service, index) => {
             const Icon = service.icon;
             return (
                <motion.div
                  key={service.id}
                  className={`relative overflow-hidden rounded-[2rem] bg-surface border border-white/5 p-8 flex flex-col justify-between group cursor-pointer hover:border-primary/30 transition-all duration-300 ${index === 0 || index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  onClick={() => onNavigate('services')}
                  role="button"
                  aria-label={`Learn more about our ${service.title} services`}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate('services'); }}
                >
                    <div>
                        <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                             <Icon size={28} />
                        </div>
                        <h3 className="text-2xl font-heading font-bold mb-4 text-white group-hover:text-primary transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            {service.description}
                        </p>
                    </div>
                    <div className="flex items-center text-sm font-bold text-white mt-auto">
                         <span className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Learn more</span>
                         <ArrowUpRight size={16} className="group-hover:text-primary transition-colors" aria-hidden="true" />
                    </div>
                </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
