import React from 'react';
import { motion } from 'framer-motion';

const fleet = [
  { name: 'Rolls-Royce Cullinan', image: '/media/cullinan.jpg' },
  { name: 'Mercedes G-Wagon', image: '/media/g63.jpg' },
  { name: 'Rolls-Royce Phantom', image: '/media/phantom.webp' },
  { name: 'Ferrari Purosangue', image: '/media/red_perusangue.jpeg' },
  { name: 'Lamborghini Urus', image: '/media/urus.png' },
];

const duplicatedFleet = [...fleet, ...fleet];

export default function FleetCarousel() {
  const marqueeVariants = {
    animate: {
      x: [0, -1280],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex"
        variants={marqueeVariants}
        animate="animate"
      >
        {duplicatedFleet.map((car, index) => (
          <div key={index} className="flex-shrink-0 w-64 h-32 mx-8 group relative flex items-center justify-center">
             <img src={car.image} alt={car.name} className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" />
             <div className="absolute bottom-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-white/80 bg-black/50 px-2 py-1 rounded">{car.name}</p>
             </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}