
import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT } from '../constants';
import TextReveal from './TextReveal';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        <div className="relative order-2 md:order-1">
          <motion.div 
            className="absolute -inset-4 bg-primary/20 rounded-3xl opacity-30 blur-2xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Product Team Collaboration" 
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 text-white leading-tight">
            <TextReveal text={ABOUT_CONTENT.headlineStart} />
            <span className="block mt-2">
                <TextReveal text={ABOUT_CONTENT.headlineEnd} theme="primary" delay={0.4} />
            </span>
          </h2>
          
          <motion.p
            className="text-lg text-gray-400 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {ABOUT_CONTENT.p1}
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {ABOUT_CONTENT.p2}
          </motion.p>

          <motion.a
            href="#contact"
            className="inline-flex items-center space-x-2 text-primary font-bold hover:text-white transition-colors cursor-pointer group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span>Let's talk product</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;
