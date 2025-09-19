import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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

export default function ComingSoonPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center text-center"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-display mb-4 silvar-glow">Coming Soon</h1>
        <p className="text-white/70 text-lg mb-12">
          We are currently crafting a new dimension of luxury. <br/> This experience will be unveiled shortly.
        </p>
        <Link to={createPageUrl('Home')}>
            <Button variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white hover:text-black group">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Return Home
            </Button>
        </Link>
      </div>
    </motion.div>
  );
}