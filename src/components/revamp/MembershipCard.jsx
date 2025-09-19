
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

const tiers = {
  silver: {
    name: 'Silver',
    title: 'SILVAR Complimentary',
    description: 'Entry tier providing access to our standard luxury fleet.',
    cardClass: 'bg-gradient-to-br from-[#c0c0c0] to-[#8d8d8d] silver-texture',
    buttonClass: 'bg-white/20 text-white hover:bg-white/30 border border-white/30',
  },
  black: {
    name: 'Black',
    title: "Founder's Edition",
    description: 'Premium tier unlocking rare, exotic, and off-market vehicles.',
    cardClass: 'bg-gradient-to-br from-[#1a1a1a] to-[#000000] black-texture',
    buttonClass: 'bg-white text-black hover:bg-white/90',
  },
};

export default function MembershipCard({ tier }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const tierData = tiers[tier];

  const handleLogin = () => {
    // Placeholder for future authentication implementation
    window.location.href = '/MemberDashboard';
  };

  return (
    <>
     <style>{`
        .silver-texture {
            background-image: radial-gradient(circle at top left, rgba(255,255,255,0.2), transparent),
                              radial-gradient(circle at bottom right, rgba(255,255,255,0.1), transparent);
        }
        .black-texture {
            background-image: radial-gradient(circle at top right, rgba(255,255,255,0.05), transparent),
                              url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
        }
        .card-container {
            perspective: 1000px;
        }
        .card {
            transform-style: preserve-3d;
            transition: transform 0.7s;
        }
        .card-face {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }
        .card-back {
            transform: rotateY(180deg);
        }
        .silvar-text-glow {
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.4);
        }
     `}</style>
    <div 
      className="card-container group w-full max-w-sm"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className="card w-full h-52 rounded-2xl relative"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Card Front */}
        <div className={`card-face absolute w-full h-full rounded-2xl p-6 flex flex-col justify-between ${tierData.cardClass} border border-white/20`}>
          <div className="flex justify-between items-start">
            <span className="font-display text-2xl">{tierData.name}</span>
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TSUxWQVI8L3RleHQ+Cjwvc3ZnPgo=" alt="SILVAR icon" className="w-14 -mt-2"/>
          </div>
          <span className="text-xl font-light tracking-widest silvar-text-glow">S I L V A R</span>
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white opacity-0 group-hover:opacity-50 transition-opacity duration-500"
            animate={{
              borderColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.3)'],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Card Back */}
        <div className={`card-face card-back absolute w-full h-full rounded-2xl p-6 flex flex-col justify-between items-center text-center ${tierData.cardClass} border border-white/20`}>
           <h3 className="font-display text-xl">{tierData.title}</h3>
           <p className="text-sm font-light text-white/80">{tierData.description}</p>
            <Button onClick={handleLogin} className={`w-full ${tierData.buttonClass}`}>
                {tier === 'black' ? 'Request Invitation' : 'Become a Member'}
            </Button>
        </div>
      </div>
    </div>
    </>
  );
}
