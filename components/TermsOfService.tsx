import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService: React.FC = () => {
  return (
    <section className="pt-40 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8">Terms of Service</h1>
          <p className="text-gray-400 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            <h2 className="text-white font-bold text-2xl mt-12 mb-6">1. Agreement to Terms</h2>
            <p className="mb-6">
              By accessing our website at Cloudom Systems, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-white font-bold text-2xl mt-12 mb-6">2. Use License</h2>
            <p className="mb-6">
              Permission is granted to temporarily download one copy of the materials (information or software) on Cloudom Systems' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on Cloudom Systems' website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h2 className="text-white font-bold text-2xl mt-12 mb-6">3. Disclaimer</h2>
            <p className="mb-6">
              The materials on Cloudom Systems' website are provided on an 'as is' basis. Cloudom Systems makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-white font-bold text-2xl mt-12 mb-6">4. Limitations</h2>
            <p className="mb-6">
              In no event shall Cloudom Systems or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Cloudom Systems' website, even if Cloudom Systems or a Cloudom Systems authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-white font-bold text-2xl mt-12 mb-6">5. Governing Law</h2>
            <p className="mb-6">
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOfService;