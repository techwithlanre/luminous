import React from 'react';
import { motion } from 'framer-motion';
import { TEAM } from '../constants';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-dark">
      <div className="container mx-auto px-6">
        <motion.div 
            className="mb-20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white">The Visionaries</h2>
          <div className="w-20 h-1 bg-primary"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-gray-300 text-xs mb-4 line-clamp-2">{member.bio}</p>
                  <div className="flex space-x-4 text-white">
                    <a href="#" className="hover:text-primary transition-colors"><Linkedin size={18} /></a>
                    <a href="#" className="hover:text-primary transition-colors"><Twitter size={18} /></a>
                    <a href="#" className="hover:text-primary transition-colors"><Instagram size={18} /></a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;