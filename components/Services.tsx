import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-dark relative">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-4">
            <span className="px-4 py-1 rounded-full border border-primary/30 text-primary text-sm bg-primary/5 uppercase tracking-wider">
                Services
            </span>
        </div>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">Software Solutions</h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            
            {/* Large Card */}
            <motion.div 
                className="relative overflow-hidden rounded-[2rem] bg-surface border border-white/5 p-8 md:p-12 flex flex-col justify-between min-h-[400px] group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none group-hover:bg-primary/40 transition-colors duration-500"></div>

                <div className="relative z-10">
                    <h3 className="text-5xl md:text-6xl font-heading font-medium leading-tight mb-6">
                        Speed <br/> meets <br/> <span className="font-bold">precision</span>
                    </h3>
                    <p className="text-gray-400 text-lg max-w-sm">
                        Your project, delivered swiftly and seamlessly.
                    </p>
                </div>

                <div className="relative z-10 mt-8">
                     <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
                        <ArrowUpRight size={18} />
                        Get timely results
                     </button>
                </div>

                <div className="absolute top-12 right-12 text-white/5 bg-primary rounded-xl p-4 rotate-12 hidden md:block">
                     <span className="text-4xl font-bold text-white">L</span>
                </div>
            </motion.div>

            {/* Right Column Cards */}
            <div className="flex flex-col gap-6">
                
                {/* Web Dev Card */}
                <motion.div 
                    className="flex-1 bg-surface border border-white/5 rounded-[2rem] p-8 flex items-center justify-between group hover:border-white/10 transition-colors"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex flex-col">
                        <h3 className="text-3xl md:text-4xl font-heading font-medium mb-2">Web</h3>
                        <h3 className="text-3xl md:text-4xl font-heading font-medium">Development</h3>
                    </div>
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                        <ArrowUpRight size={24} className="text-white" />
                    </div>
                </motion.div>

                {/* Mobile App Card */}
                <motion.div 
                    className="flex-1 bg-surface border border-white/5 rounded-[2rem] p-8 flex items-center justify-between group hover:border-white/10 transition-colors"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex flex-col">
                        <h3 className="text-3xl md:text-4xl font-heading font-medium mb-2">Mobile App</h3>
                        <h3 className="text-3xl md:text-4xl font-heading font-medium">Development</h3>
                    </div>
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                        <ArrowUpRight size={24} className="text-white" />
                    </div>
                </motion.div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;