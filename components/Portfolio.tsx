import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO } from '../constants';
import { X, ArrowUpRight } from 'lucide-react';

const categories = ['all', 'web', 'mobile', 'branding', 'marketing'];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = PORTFOLIO.filter(
    (project) => filter === 'all' || project.category === filter
  );

  return (
    <section id="portfolio" className="py-32 bg-dark">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <span className="text-primary font-medium tracking-wider uppercase mb-2 block">Our Work</span>
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">Selected Projects</h2>
            </motion.div>
            
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2 rounded-full border text-sm transition-all duration-300 capitalize cursor-pointer ${
                        filter === cat
                        ? 'bg-primary text-white border-primary'
                        : 'bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white'
                    }`}
                    >
                    {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-surface"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                    <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold mb-1 text-white group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 text-sm capitalize">
                                {project.category}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-all">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-surface border border-white/10 p-2 rounded-2xl max-w-5xl w-full relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={32} />
                </button>
                {(() => {
                  const proj = PORTFOLIO.find(p => p.id === selectedProject);
                  if (!proj) return null;
                  return (
                    <div className="grid md:grid-cols-2 gap-8 bg-black p-8 rounded-xl">
                      <img src={proj.image} alt={proj.title} className="w-full h-64 md:h-full object-cover rounded-xl" />
                      <div className="flex flex-col justify-center">
                        <h3 className="text-4xl font-heading font-bold mb-4">{proj.title}</h3>
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary w-fit text-sm font-bold mb-6 capitalize">{proj.category}</span>
                        <p className="text-gray-300 leading-relaxed mb-8 text-lg">{proj.description}</p>
                        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors w-fit flex items-center gap-2">
                          View Live Project
                          <ArrowUpRight size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;