import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6 group w-fit">
               <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-white font-heading font-bold text-lg">C</span>
               </div>
               <span className="text-2xl font-heading font-bold text-white">CLOUDOM</span>
            </a>
            <p className="text-gray-400 max-w-sm mb-8">
              Crafting digital experiences that transcend the ordinary. We merge technology and art to build the future of the web.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              {['Services', 'Work', 'Process', 'About', 'Careers'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-primary transition-colors relative group cursor-pointer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest digital trends.</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors text-sm text-white"
              />
              <button className="bg-primary text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Cloudom Systems. All rights reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <div className="p-1 bg-white/10 rounded-full">
                <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;