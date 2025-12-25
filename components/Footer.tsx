import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp, Loader2, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, hash?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    const LOOPS_ENDPOINT = "https://app.loops.so/api/newsletter-form/clpimip6z0151ia0o1q2uyg7d";

    try {
      const formBody = `userGroup=Newsletter&email=${encodeURIComponent(email)}`;
      
      const response = await fetch(LOOPS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
  };

  const handleNavClick = (e: React.MouseEvent, page: string, hash?: string) => {
    e.preventDefault();
    onNavigate(page, hash);
  };

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 relative" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="/" onClick={(e) => handleNavClick(e, 'home', '#hero')} className="flex items-center gap-2 mb-6 group w-fit" aria-label="Cloudom Systems Home" title="Home">
               <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center" aria-hidden="true">
                    <span className="text-white font-heading font-bold text-lg">C</span>
               </div>
               <span className="text-2xl font-heading font-bold text-white">CLOUDOM</span>
            </a>
            <p className="text-gray-400 max-w-sm mb-8">
              We design, develop, and launch powerful solutions that scale with your vision. Your product partner from idea to impact.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/cloudomsystems' },
                { Icon: Twitter, label: 'Twitter', href: 'https://twitter.com/cloudomsystems' },
                { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/cloudomsystems' },
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/cloudomsystems' }
              ].map(({ Icon, label, href }, i) => (
                <a 
                  key={i} 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-dark hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label={`Visit our ${label} page`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Services', page: 'services', hash: undefined },
                { name: 'About', page: 'home', hash: '#about' },
                { name: 'Blog', page: 'blog', hash: undefined },
                { name: 'Contact', page: 'home', hash: '#contact' },
                { name: 'Work', page: 'home', hash: '#portfolio' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.hash ? `/${link.hash}` : `/${link.page}`}
                    onClick={(e) => handleNavClick(e, link.page, link.hash)}
                    className="text-gray-400 hover:text-primary transition-colors relative group cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest tech insights.</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <div className="relative">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm text-white disabled:opacity-50"
                />
                {status === 'success' && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                    <Check size={18} />
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className={`bg-primary-dark text-white font-bold py-2 rounded-lg transition-all duration-300 text-sm cursor-pointer flex items-center justify-center gap-2 ${
                  status === 'success' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-primary-dark/90'
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : status === 'success' ? (
                  <span>Subscribed!</span>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-red-500 text-xs mt-1">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-4">
               <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Cloudom Systems.</p>
               <div className="flex gap-4 text-xs text-gray-400">
                    <a 
                      href="/privacy" 
                      onClick={(e) => handleNavClick(e, 'privacy')}
                      className="hover:text-white"
                    >
                      Privacy Policy
                    </a>
                    <a 
                      href="/terms" 
                      onClick={(e) => handleNavClick(e, 'terms')}
                      className="hover:text-white"
                    >
                      Terms of Service
                    </a>
               </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to top of page"
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
