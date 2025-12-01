import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">Client Stories</h2>
        </motion.div>

        <div className="relative bg-dark border border-white/5 p-8 md:p-16 rounded-3xl shadow-2xl">
          <Quote className="absolute top-8 left-8 text-primary/20 w-16 h-16" />
          
          <div className="relative overflow-hidden min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center w-full"
              >
                <div className="flex justify-center mb-6 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < TESTIMONIALS[current].rating ? 'text-primary fill-primary' : 'text-gray-800'}
                    />
                  ))}
                </div>
                <p className="text-xl md:text-2xl italic text-gray-200 mb-8 leading-relaxed font-light">
                  "{TESTIMONIALS[current].content}"
                </p>
                <div className="flex flex-col items-center">
                  <img
                    src={TESTIMONIALS[current].avatar}
                    alt={TESTIMONIALS[current].name}
                    className="w-16 h-16 rounded-full border-2 border-primary mb-4 object-cover"
                  />
                  <h4 className="font-bold text-lg text-white">{TESTIMONIALS[current].name}</h4>
                  <p className="text-primary text-sm">{TESTIMONIALS[current].role} at {TESTIMONIALS[current].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-6">
            <button onClick={prev} className="p-3 bg-dark border border-white/10 rounded-full hover:bg-white hover:text-dark transition-colors cursor-pointer text-white">
              <ChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-6">
            <button onClick={next} className="p-3 bg-dark border border-white/10 rounded-full hover:bg-white hover:text-dark transition-colors cursor-pointer text-white">
              <ChevronRight />
            </button>
          </div>
        </div>
        
        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
            {TESTIMONIALS.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${current === idx ? 'w-8 bg-primary' : 'w-2 bg-gray-800'}`}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;