import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO } from '../constants';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const categories = ['all', 'saas', 'fintech', 'ecommerce', 'enterprise'];

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
                <span className="text-primary font-medium tracking-wider uppercase mb-2 block">Case Studies</span>
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">From Startups to Scale-Ups</h2>
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
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-surface h-full flex flex-col"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="aspect-[16/9] overflow-hidden">
                    <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">
                                {project.category}
                            </p>
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-all">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">{project.description}</p>
                    
                    {project.outcome && (
                         <div className="mt-auto pt-4 border-t border-white/5">
                            <p className="text-xs text-gray-500 font-bold uppercase">Outcome</p>
                            <p className="text-white text-sm font-medium">{project.outcome}</p>
                        </div>
                    )}
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
                className="bg-surface border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:text-primary transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={24} />
                </button>
                
                {(() => {
                  const proj = PORTFOLIO.find(p => p.id === selectedProject);
                  if (!proj) return null;
                  return (
                    <div className="flex flex-col">
                        <div className="h-64 md:h-80 w-full relative">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                            <div className="absolute bottom-6 left-6 md:left-10">
                                <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wide mb-2 inline-block">{proj.category}</span>
                                <h3 className="text-4xl md:text-5xl font-heading font-bold text-white">{proj.title}</h3>
                            </div>
                        </div>
                        
                        <div className="p-6 md:p-10 grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-8">
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">The Challenge</h4>
                                    <p className="text-gray-400 leading-relaxed">{proj.problem || proj.description}</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Our Solution</h4>
                                    <p className="text-gray-400 leading-relaxed">{proj.solution || "We implemented a scalable solution."}</p>
                                </div>
                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                                     <h4 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                                        <CheckCircle2 size={20} />
                                        The Outcome
                                     </h4>
                                     <p className="text-white font-medium">{proj.outcome || "Significant improvement in metrics."}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-sm font-bold text-gray-500 uppercase mb-3">Tech Stack</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {proj.techStack?.map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-gray-300">
                                                {tech}
                                            </span>
                                        )) || <span className="text-gray-500">Various Technologies</span>}
                                    </div>
                                </div>
                                
                                <button className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                  View Live Project
                                  <ArrowUpRight size={18} />
                                </button>
                            </div>
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