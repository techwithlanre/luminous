import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <section id="about" className="py-32 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        <div className="relative">
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
              src="https://picsum.photos/seed/office/800/1000" 
              alt="Our Creative Studio" 
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>

        <div>
          <motion.h2
            className="text-4xl md:text-6xl font-heading font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            We define the <span className="text-primary">new standard</span> of digital.
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-400 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Founded in 2018, Cloudom Systems has rapidly grown from a garage startup to a global agency. We believe in the power of design to transform businesses. Our approach combines data-driven strategy with world-class aesthetics.
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We don't just build websites; we create immersive ecosystems that captivate your audience and drive real growth.
          </motion.p>

          <motion.a
            href="#team"
            className="inline-flex items-center space-x-2 text-primary font-bold hover:text-white transition-colors cursor-pointer group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span>Meet the team</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;