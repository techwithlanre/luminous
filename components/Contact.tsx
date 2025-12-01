import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <section id="contact" className="py-32 bg-dark relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <motion.h2
            className="text-4xl md:text-6xl font-heading font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's create something <span className="text-primary">extraordinary</span>.
          </motion.h2>
          
          <motion.div 
            className="space-y-8 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-surface border border-white/10 rounded-full text-primary">
                <MapPin />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">Visit Us</h4>
                <p className="text-gray-400">100 Future Way, Tech City, TC 90210</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-surface border border-white/10 rounded-full text-primary">
                <Mail />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">Email Us</h4>
                <p className="text-gray-400">hello@luminous.vision</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-4 bg-surface border border-white/10 rounded-full text-primary">
                <Phone />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">Call Us</h4>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-surface p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle2 size={80} className="text-primary mb-6" />
              </motion.div>
              <h3 className="text-3xl font-bold mb-4 text-white">Message Sent!</h3>
              <p className="text-gray-400">We'll get back to you within 24 hours.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-8 px-6 py-2 text-sm text-primary hover:text-white underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-primary transition-colors">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:border-primary text-white transition-all placeholder:text-gray-700"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-primary transition-colors">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:border-primary text-white transition-all placeholder:text-gray-700"
                  placeholder="john@example.com"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-primary transition-colors">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:border-primary text-white transition-all placeholder:text-gray-700"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;