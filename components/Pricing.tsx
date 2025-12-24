
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { PRICING_SECTIONS } from '../constants';

const Pricing: React.FC = () => {
  return (
    <section className="py-32 bg-dark pt-40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                 <span className="px-4 py-1 rounded-full border border-primary/30 text-primary text-sm bg-primary/5 uppercase tracking-wider mb-4 inline-block">
                    Services Catalog
                </span>
                <h2 className="text-4xl md:text-7xl font-heading font-bold mb-6 text-white">Our Service Offerings</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">Comprehensive digital solutions specifically tailored to scale your business.</p>
            </motion.div>
        </div>

        <div className="space-y-32">
          {PRICING_SECTIONS.map((section, sectionIndex) => (
            <div key={section.id} id={section.id} className="relative scroll-mt-32">
              {/* Section Header */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-white">
                  {section.title} <span className="text-primary">{section.highlightWord}</span>
                </h3>
              </motion.div>

              {/* Cards Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-2 ${section.cards.length === 1 ? 'lg:grid-cols-1 max-w-4xl' : 'lg:grid-cols-2'} gap-8 mx-auto`}>
                {section.cards.map((card, index) => (
                  <motion.div
                    key={index}
                    className="relative p-8 rounded-2xl border border-white/10 bg-surface flex flex-col group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,77,0,0.1)]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Header */}
                    <div className="mb-8">
                      <p className="text-primary text-sm font-bold uppercase tracking-wider mb-2">{card.title}</p>
                      <h4 className="text-3xl font-bold text-white mb-2">{card.price}</h4>
                      {card.subtitle && (
                        <p className="text-gray-400 text-sm">{card.subtitle}</p>
                      )}
                    </div>

                    {/* CTA */}
                    <a
                      href="https://calendly.com/techwithlanre/product"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="w-full bg-white/5 border border-white/10 text-white font-bold py-3 rounded-full mb-8 hover:bg-primary-dark hover:border-primary-dark transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                    >
                      <ArrowUpRight size={16} />
                      {card.buttonText}
                    </a>

                    {/* Features */}
                    <ul className="space-y-4 flex-grow">
                      {card.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3 text-gray-300">
                           <Check size={18} className="text-primary flex-shrink-0 mt-1" />
                           <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
