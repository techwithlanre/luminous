
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
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Product Team Collaboration" 
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-xl sm:text-4xl md:text-6xl font-heading font-bold mb-8 text-white leading-tight flex flex-col gap-2 text-balance">
            <TextReveal text={ABOUT_CONTENT.headlineStart} />
            <TextReveal text={ABOUT_CONTENT.headlineEnd} theme="primary" delay={0.4} />
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
            href="https://calendly.com/techwithlanre/product"
            target="_blank"
            rel="noopener noreferrer"
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
