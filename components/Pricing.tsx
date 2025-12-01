import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { PRICING_SECTIONS } from '../constants';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-white">Investment</h2>
          <p className="text-gray-400">Transparent pricing for world-class results.</p>
        </div>

        <div className="space-y-32">
          {PRICING_SECTIONS.map((section, sectionIndex) => (
            <div key={section.id} className="relative">
              {/* Section Header */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-white">
                  {section.title} <span className="bg-primary px-2 text-white transform -skew-x-6 inline-block">{section.highlightWord}</span>
                </h3>
              </motion.div>

              {/* Cards Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-2 ${section.cards.length === 1 ? 'lg:grid-cols-1 max-w-4xl' : 'lg:grid-cols-3'} gap-8 mx-auto`}>
                {section.cards.map((card, index) => (
                  <motion.div
                    key={index}
                    className="relative p-8 rounded-2xl border border-white/10 bg-surface flex flex-col group hover:border-primary/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Header */}
                    <div className="mb-8">
                      <p className="text-gray-400 text-sm mb-2">{card.title}</p>
                      <h4 className="text-3xl font-bold text-white mb-2">{card.price}</h4>
                      {card.subtitle && (
                        <p className="text-gray-500 text-sm">{card.subtitle}</p>
                      )}
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-primary text-white font-bold py-3 rounded-full mb-8 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 group-hover:scale-[1.02] duration-300">
                      <ArrowUpRight size={16} />
                      {card.buttonText}
                    </button>

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