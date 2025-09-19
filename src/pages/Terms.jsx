import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8,
};

export default function TermsPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-black text-white p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-display mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-lg font-light space-y-4">
            <p>By accessing the website at SILVAR, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            <p>Permission is granted to temporarily download one copy of the materials on SILVAR's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
            <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by SILVAR at any time.</p>
            <p>The materials on SILVAR's website are provided on an 'as is' basis. SILVAR makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p>In no event shall SILVAR or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SILVAR's website.</p>
        </div>
      </div>
    </motion.div>
  );
}