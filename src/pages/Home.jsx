
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, Check, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ContactForm from '../components/revamp/ContactForm';
import CarDetailModal from '../components/revamp/CarDetailModal';

// Complete fleet based on real data from the table
const fleet = [
  // ROLLS ROYCE
  { 
    name: 'Rolls Royce Cullinan Series 2', 
    image: '/media/cullinan3.jpg', 
    category: 'SUV', 
    brand: 'Rolls Royce',
    images: [
      '/media/cullinan3.jpg',
      '/media/cullinan3.jpg',
      '/media/cullinan3.jpg'
    ],
    marketHourlyPrice: 160,
    marketDailyPrice: 1015,
    minimumUseTime: '3 hours',
    year: '2025',
    engine: '6.75L V12 Twin-Turbo',
    horsepower: '563 HP',
    acceleration: '5.0s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Bespoke Interior', 'Magic Carpet Ride', 'Suicide Doors', 'Starlight Headliner', 'Custom Options'],
    description: 'The Rolls Royce Cullinan Series 2 is the world\'s most luxurious SUV, offering unparalleled refinement and bespoke craftsmanship.'
  },
  { 
    name: 'Rolls Royce Cullinan Silver Badge', 
    image: '/media/cullinan2.jpg', 
    category: 'SUV', 
    brand: 'Rolls Royce',
    images: [
      '/media/cullinan2.jpg',
      '/media/cullinan2.jpg',
      '/media/cullinan2.jpg'
    ],
    marketHourlyPrice: 160,
    marketDailyPrice: 1015,
    minimumUseTime: '3 hours',
    year: '2025',
    engine: '6.75L V12 Twin-Turbo',
    horsepower: '563 HP',
    acceleration: '5.0s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Bespoke Interior', 'Magic Carpet Ride', 'Suicide Doors', 'Starlight Headliner', 'Custom Options'],
    description: 'The Rolls Royce Cullinan Silver Badge offers the ultimate in luxury SUV refinement with exclusive silver accents.'
  },
  { 
    name: 'Rolls Royce Cullinan Black Badge', 
    image: '/media/cullinan.jpg', 
    category: 'SUV', 
    brand: 'Rolls Royce',
    images: [
      '/media/cullinan.jpg',
      '/media/cullinan.jpg',
      '/media/cullinan.jpg'
    ],
    marketHourlyPrice: 160,
    marketDailyPrice: 1015,
    minimumUseTime: '3 hours',
    year: '2022',
    engine: '6.75L V12 Twin-Turbo',
    horsepower: '563 HP',
    acceleration: '5.0s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Bespoke Interior', 'Magic Carpet Ride', 'Suicide Doors', 'Starlight Headliner', 'Custom Options'],
    description: 'The Rolls Royce Cullinan Black Badge represents the pinnacle of luxury with its exclusive black accents and enhanced performance.'
  },
  { 
    name: 'Rolls Royce Cullinan Black Badge', 
    image: '/media/cullinan.jpg', 
    category: 'SUV', 
    brand: 'Rolls Royce',
    images: [
      '/media/cullinan.jpg',
      '/media/cullinan.jpg',
      '/media/cullinan.jpg'
    ],
    marketHourlyPrice: 160,
    marketDailyPrice: 1015,
    minimumUseTime: '3 hours',
    year: '2023',
    engine: '6.75L V12 Twin-Turbo',
    horsepower: '563 HP',
    acceleration: '5.0s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Bespoke Interior', 'Magic Carpet Ride', 'Suicide Doors', 'Starlight Headliner', 'Custom Options'],
    description: 'The Rolls Royce Cullinan Black Badge represents the pinnacle of luxury with its exclusive black accents and enhanced performance.'
  },
  
  // MERCEDES
  { 
    name: 'Mercedes S Class Maybach', 
    image: '/media/sclass.avif', 
    category: 'Sedan', 
    brand: 'Mercedes',
    images: [
      '/media/sclass.avif',
      '/media/sclass.avif',
      '/media/sclass.avif'
    ],
    marketHourlyPrice: 136,
    marketDailyPrice: 1000,
    minimumUseTime: '3 hours',
    year: '2024',
    engine: '4.0L V8 Biturbo',
    horsepower: '496 HP',
    acceleration: '4.5s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Maybach Luxury', 'Executive Seating', 'Premium Audio', 'Advanced Safety', 'Chauffeur Package'],
    description: 'The Mercedes S Class Maybach represents the pinnacle of luxury sedans with unparalleled comfort and refinement.'
  },
  { 
    name: 'Mercedes GLS Maybach', 
    image: '/media/glsmaybach.jpg', 
    category: 'SUV', 
    brand: 'Mercedes',
    images: [
      '/media/glsmaybach.jpg',
      '/media/glsmaybach.jpg',
      '/media/glsmaybach.jpg'
    ],
    marketHourlyPrice: 120,
    marketDailyPrice: 1050,
    minimumUseTime: '3 hours',
    year: '2024',
    engine: '4.0L V8 Biturbo',
    horsepower: '496 HP',
    acceleration: '4.9s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Maybach Luxury', 'Third Row Seating', 'Premium Audio', 'Advanced Safety', 'Chauffeur Package'],
    description: 'The Mercedes GLS Maybach combines the versatility of an SUV with the luxury of a Maybach sedan.'
  },
  
  // FERRARI
  { 
    name: 'Ferrari Purosangue Red', 
    image: '/media/red_perusangue.jpeg', 
    category: 'SUV', 
    brand: 'Ferrari',
    images: [
      '/media/red_perusangue.jpeg',
      '/media/red_perusangue.jpeg',
      '/media/red_perusangue.jpeg'
    ],
    marketHourlyPrice: 149.5,
    marketDailyPrice: 1046.5,
    minimumUseTime: '3 hours',
    year: '2025',
    engine: '6.5L V12',
    horsepower: '715 HP',
    acceleration: '3.3s 0-60 mph',
    topSpeed: '193 mph',
    features: ['Ferrari Performance', 'Luxury SUV', 'V12 Engine', 'Active Aero', 'Racing Heritage'],
    description: 'The Ferrari Purosangue Red represents Ferrari\'s first SUV, combining supercar performance with SUV practicality.'
  },
  { 
    name: 'Ferrari Purosangue Grey', 
    image: '/media/grey_perusangue.webp', 
    category: 'SUV', 
    brand: 'Ferrari',
    images: [
      '/media/grey_perusangue.webp',
      '/media/grey_perusangue.webp',
      '/media/grey_perusangue.webp'
    ],
    marketHourlyPrice: 149.5,
    marketDailyPrice: 1046.5,
    minimumUseTime: '3 hours',
    year: '2024',
    engine: '6.5L V12',
    horsepower: '715 HP',
    acceleration: '3.3s 0-60 mph',
    topSpeed: '193 mph',
    features: ['Ferrari Performance', 'Luxury SUV', 'V12 Engine', 'Active Aero', 'Racing Heritage'],
    description: 'The Ferrari Purosangue Grey represents Ferrari\'s first SUV, combining supercar performance with SUV practicality.'
  },
  
  // ROLLS ROYCE PHANTOM
  { 
    name: 'Rolls Royce Phantom', 
    image: '/media/phantom.webp', 
    category: 'Sedan', 
    brand: 'Rolls Royce',
    images: [
      '/media/phantom.webp',
      '/media/phantom.webp',
      '/media/phantom.webp'
    ],
    marketHourlyPrice: 156,
    marketDailyPrice: 1330,
    minimumUseTime: '3 hours',
    year: '2024',
    engine: '6.75L V12 Twin-Turbo',
    horsepower: '563 HP',
    acceleration: '5.4s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Bespoke Interior', 'Magic Carpet Ride', 'Suicide Doors', 'Starlight Headliner', 'Custom Options'],
    description: 'The Rolls Royce Phantom is the ultimate expression of luxury, representing the pinnacle of automotive craftsmanship and personalization.'
  },
  
  // MERCEDES G63
  { 
    name: 'Mercedes G63', 
    image: '/media/g63.jpg', 
    category: 'SUV', 
    brand: 'Mercedes',
    images: [
      '/media/g63.jpg',
      '/media/g63.jpg',
      '/media/g63.jpg'
    ],
    marketHourlyPrice: 100,
    marketDailyPrice: 700,
    minimumUseTime: '4 hours',
    year: '2025',
    engine: '4.0L V8 Biturbo',
    horsepower: '577 HP',
    acceleration: '4.5s 0-60 mph',
    topSpeed: '149 mph',
    features: ['Three Locking Diffs', 'AMG Performance', 'Luxury Interior', 'Off-Road Capable', 'Premium Audio'],
    description: 'The Mercedes G63 combines legendary off-road capability with AMG performance and luxury.'
  },
  { 
    name: 'Mercedes G63', 
    image: '/media/g63.jpg', 
    category: 'SUV', 
    brand: 'Mercedes',
    images: [
      '/media/g63.jpg',
      '/media/g63.jpg',
      '/media/g63.jpg'
    ],
    marketHourlyPrice: 100,
    marketDailyPrice: 700,
    minimumUseTime: '4 hours',
    year: '2023',
    engine: '4.0L V8 Biturbo',
    horsepower: '577 HP',
    acceleration: '4.5s 0-60 mph',
    topSpeed: '149 mph',
    features: ['Three Locking Diffs', 'AMG Performance', 'Luxury Interior', 'Off-Road Capable', 'Premium Audio'],
    description: 'The Mercedes G63 combines legendary off-road capability with AMG performance and luxury.'
  },
  
  // LAMBORGHINI
  { 
    name: 'Lamborghini Urus', 
    image: '/media/urus.png', 
    category: 'SUV', 
    brand: 'Lamborghini',
    images: [
      '/media/urus.png',
      '/media/urus.png',
      '/media/urus.png'
    ],
    marketHourlyPrice: 120,
    marketDailyPrice: 626.5,
    minimumUseTime: '3 hours',
    year: '2024',
    engine: '4.0L V8 Twin-Turbo',
    horsepower: '641 HP',
    acceleration: '3.6s 0-60 mph',
    topSpeed: '190 mph',
    features: ['All-Wheel Drive', 'Adaptive Suspension', 'Sport Mode', 'Premium Interior', 'Advanced Safety'],
    description: 'The Lamborghini Urus combines the soul of a supercar with the versatility of an SUV.'
  },
  
  // LAND ROVER
  { 
    name: 'Land Rover Defender V6', 
    image: '/media/defenderv6.jpg', 
    category: 'SUV', 
    brand: 'Land Rover',
    images: [
      '/media/defenderv6.jpg',
      '/media/defenderv6.jpg',
      '/media/defenderv6.jpg'
    ],
    marketHourlyPrice: 80,
    marketDailyPrice: 665,
    minimumUseTime: '3 hours',
    year: '2025',
    engine: '3.0L I6 Turbo',
    horsepower: '296 HP',
    acceleration: '7.0s 0-60 mph',
    topSpeed: '119 mph',
    features: ['Terrain Response', 'Air Suspension', 'Premium Interior', 'Off-Road Capable', 'Advanced Safety'],
    description: 'The Land Rover Defender V6 combines legendary off-road capability with modern luxury and comfort.'
  },
  { 
    name: 'Land Rover Defender V8', 
    image: '/media/defenderv8.avif', 
    category: 'SUV', 
    brand: 'Land Rover',
    images: [
      '/media/defenderv8.avif',
      '/media/defenderv8.avif',
      '/media/defenderv8.avif'
    ],
    marketHourlyPrice: 80,
    marketDailyPrice: 665,
    minimumUseTime: '3 hours',
    year: '2024',
    engine: '5.0L V8 Supercharged',
    horsepower: '518 HP',
    acceleration: '5.1s 0-60 mph',
    topSpeed: '149 mph',
    features: ['Terrain Response', 'Air Suspension', 'Premium Interior', 'Off-Road Capable', 'Advanced Safety'],
    description: 'The Land Rover Defender V8 combines legendary off-road capability with V8 power and modern luxury.'
  },
  
  // MERCEDES S CLASS
  { 
    name: 'Mercedes S Class', 
    image: '/media/sclass.avif', 
    category: 'Sedan', 
    brand: 'Mercedes',
    images: [
      '/media/sclass.avif',
      '/media/sclass.avif',
      '/media/sclass.avif'
    ],
    marketHourlyPrice: 52,
    marketDailyPrice: 420,
    minimumUseTime: '3 hours',
    year: '2025',
    engine: '3.0L I6 Turbo',
    horsepower: '429 HP',
    acceleration: '4.8s 0-60 mph',
    topSpeed: '155 mph',
    features: ['MBUX Hyperscreen', 'E-Active Body Control', 'Burmester Audio', 'Rear Executive Seats', 'Advanced Safety'],
    description: 'The Mercedes S Class sets the standard for luxury sedans with cutting-edge technology and comfort.'
  },
  
  // LAND ROVER RANGE ROVER
  { 
    name: 'Land Rover Range Rover', 
    image: '/media/rangerover.avif', 
    category: 'SUV', 
    brand: 'Land Rover',
    images: [
      '/media/rangerover.avif',
      '/media/rangerover.avif',
      '/media/rangerover.avif'
    ],
    marketHourlyPrice: 76,
    marketDailyPrice: 630,
    minimumUseTime: '3 hours',
    year: '2024',
    engine: '3.0L I6 Turbo',
    horsepower: '395 HP',
    acceleration: '5.8s 0-60 mph',
    topSpeed: '140 mph',
    features: ['Luxury Interior', 'Terrain Response', 'Air Suspension', 'Premium Audio', 'Off-Road Capable'],
    description: 'The Land Rover Range Rover represents the ultimate in luxury SUV refinement and capability.'
  },
  
  // MERCEDES SPRINTER
  { 
    name: 'Mercedes Sprinter 16 Seater', 
    image: '/media/sprinter.png', 
    category: 'Van', 
    brand: 'Mercedes',
    images: [
      '/media/sprinter.png',
      '/media/sprinter.png',
      '/media/sprinter.png'
    ],
    marketHourlyPrice: 120,
    marketDailyPrice: 693,
    minimumUseTime: '3 hours',
    year: '2025',
    engine: '2.0L I4 Turbo',
    horsepower: '190 HP',
    acceleration: '12.0s 0-60 mph',
    topSpeed: '100 mph',
    features: ['16 Passenger Seating', 'Premium Interior', 'Advanced Safety', 'Climate Control', 'Entertainment System'],
    description: 'The Mercedes Sprinter 16 Seater provides luxury transportation for large groups with premium comfort and safety features.'
  },
  
  // MERCEDES V CLASS
  { 
    name: 'Mercedes V Class', 
    image: '/media/vclass.avif', 
    category: 'Van', 
    brand: 'Mercedes',
    images: [
      '/media/vclass.avif',
      '/media/vclass.avif',
      '/media/vclass.avif'
    ],
    marketHourlyPrice: 52,
    marketDailyPrice: 364,
    minimumUseTime: '3 hours',
    year: '2024',
    engine: '2.0L I4 Turbo',
    horsepower: '190 HP',
    acceleration: '10.5s 0-60 mph',
    topSpeed: '120 mph',
    features: ['Luxury Interior', 'Premium Seating', 'Advanced Safety', 'Climate Control', 'Entertainment System'],
    description: 'The Mercedes V Class offers luxury van transportation with premium comfort and advanced safety features.'
  },
  { 
    name: 'Mercedes V Class', 
    image: '/media/vclass.avif', 
    category: 'Van', 
    brand: 'Mercedes',
    images: [
      '/media/vclass.avif',
      '/media/vclass.avif',
      '/media/vclass.avif'
    ],
    marketHourlyPrice: 20,
    marketDailyPrice: 160,
    minimumUseTime: '3 hours',
    year: '2019',
    engine: '2.1L I4 Turbo',
    horsepower: '163 HP',
    acceleration: '11.0s 0-60 mph',
    topSpeed: '110 mph',
    features: ['Luxury Interior', 'Premium Seating', 'Advanced Safety', 'Climate Control', 'Entertainment System'],
    description: 'The Mercedes V Class offers luxury van transportation with premium comfort and advanced safety features.'
  },
  
  // MERCEDES SENZATI
  { 
    name: 'Mercedes Senzati', 
    image: '/media/senzati.webp', 
    category: 'Sedan', 
    brand: 'Mercedes',
    images: [
      '/media/senzati.webp',
      '/media/senzati.webp',
      '/media/senzati.webp'
    ],
    marketHourlyPrice: 104,
    marketDailyPrice: 553,
    minimumUseTime: '3 hours',
    year: '2025',
    engine: '3.0L I6 Turbo',
    horsepower: '362 HP',
    acceleration: '5.2s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Luxury Interior', 'Premium Audio', 'Advanced Safety', 'Executive Seating', 'Climate Control'],
    description: 'The Mercedes Senzati offers luxury sedan comfort with advanced technology and premium features.'
  },
  { 
    name: 'Mercedes Sezati', 
    image: '/media/senzati.webp', 
    category: 'Sedan', 
    brand: 'Mercedes',
    images: [
      '/media/senzati.webp',
      '/media/senzati.webp',
      '/media/senzati.webp'
    ],
    marketHourlyPrice: 104,
    marketDailyPrice: 553,
    minimumUseTime: '3 hours',
    year: '2019',
    engine: '3.0L I6 Turbo',
    horsepower: '362 HP',
    acceleration: '5.2s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Luxury Interior', 'Premium Audio', 'Advanced Safety', 'Executive Seating', 'Climate Control'],
    description: 'The Mercedes Sezati offers luxury sedan comfort with advanced technology and premium features.'
  },
  
  // MERCEDES E CLASS
  { 
    name: 'Mercedes E Class', 
    image: '/media/eclass.jpg', 
    category: 'Sedan', 
    brand: 'Mercedes',
    images: [
      '/media/eclass.jpg',
      '/media/eclass.jpg',
      '/media/eclass.jpg'
    ],
    marketHourlyPrice: 44,
    marketDailyPrice: 350,
    minimumUseTime: '3 hours',
    year: '2025',
    engine: '2.0L I4 Turbo',
    horsepower: '255 HP',
    acceleration: '6.0s 0-60 mph',
    topSpeed: '130 mph',
    features: ['Luxury Interior', 'Premium Audio', 'Advanced Safety', 'Executive Seating', 'Climate Control'],
    description: 'The Mercedes E Class offers luxury sedan comfort with advanced technology and premium features.'
  },
  
  // ESCALADE
  { 
    name: 'Cadillac Escalade', 
    image: '/media/escalade.webp', 
    category: 'SUV', 
    brand: 'Cadillac',
    images: [
      '/media/escalade.webp',
      '/media/escalade.webp',
      '/media/escalade.webp'
    ],
    marketHourlyPrice: 150,
    marketDailyPrice: 1000,
    minimumUseTime: '3 hours',
    year: '2025',
    engine: '6.2L V8',
    horsepower: '420 HP',
    acceleration: '5.9s 0-60 mph',
    topSpeed: '120 mph',
    features: ['Third Row Seating', 'Premium Leather', 'Advanced AWD', 'Towing Package', 'Entertainment System'],
    description: 'The Escalade delivers uncompromising luxury and performance in a full-size SUV package.'
  },
];

// Organize fleet by brand
const fleetByBrand = fleet.reduce((acc, car) => {
  if (!acc[car.brand]) {
    acc[car.brand] = [];
  }
  acc[car.brand].push(car);
  return acc;
}, {});

const tiers = [
    {
        name: 'Black',
        title: 'Founder\'s Edition',
        description: 'The definitive luxury experience with unparalleled access to our most exclusive assets.',
        price: '$10,000 / year',
        features: [
            'Access to entire fleet, including off-market vehicles',
            'Dedicated 24/7 Private Concierge',
            'Priority booking & guaranteed availability',
            'Invitations to exclusive Founder events',
            'Global partnership benefits'
        ],
        cta: 'Request Invitation',
        bgClass: 'bg-black',
        buttonClass: 'bg-purple-600 text-white hover:bg-white hover:text-black shadow-lg',
        zIndex: 2,
        rotation: 0,
        translateX: 0,
        translateY: 0,
    },
    {
        name: 'Silver',
        title: 'SILVAR Complimentary',
        description: 'The essential membership for accessing our core collection of luxury vehicles.',
        price: 'Complimentary',
        features: [
            'Access to standard luxury fleet',
            '24/7 Standard Concierge',
            'Member-only events',
            'Seamless booking process'
        ],
        cta: 'Become a Member',
        bgClass: 'bg-gradient-to-br from-gray-500 to-gray-600',
        buttonClass: 'bg-white text-black hover:bg-white/90 shadow-lg',
        zIndex: 1,
        rotation: -3,
        translateX: -30,
        translateY: 20,
    }
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'For instant inquiries & bookings.',
    value: 'wa.me/15551234567',
    cta: 'Message Us',
    isLink: true,
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Speak directly with our concierge.',
    value: '+1 (555) 123-4567',
    cta: 'Call Now',
    isLink: false,
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'For detailed requests & support.',
    value: 'concierge@silvar.com',
    cta: 'Email Us',
    isLink: false,
  },
];

const FleetCard = ({ car, index, onCarClick }) => (
    <div
        onClick={() => onCarClick(car)}
        className="group relative bg-black border border-white/10 rounded-lg overflow-hidden glow-border flex-shrink-0 w-72 sm:w-80 h-96 sm:h-[28rem] cursor-pointer flex flex-col"
    >
        <div className="h-60 flex items-center justify-center p-6 relative overflow-hidden">
            <img 
              src={car.image} 
              alt={car.name} 
              className="max-h-full max-w-full object-contain"
            />
            <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover overlay with expand icon */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
        </div>
        <div className="flex-1 p-4 bg-white/5 backdrop-blur-sm flex flex-col justify-center">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-white/50 uppercase tracking-widest">
                      {car.category}
                    </p>
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                      {car.year}
                    </span>
                </div>
                <h3 className="font-display text-xl text-white mb-3 line-clamp-2">
                  {car.name}
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-white/80">
                    ${car.marketHourlyPrice}/hour • ${car.marketDailyPrice}/day
                  </p>
                  <p className="text-xs text-white/60">
                    Min: {car.minimumUseTime}
                  </p>
                </div>
            </div>
        </div>
    </div>
);

const FleetCarousel = ({ fleet, onCarClick }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
      return () => scrollElement.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 304 : 336; // Responsive scroll amount
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const scrollAmount = window.innerWidth < 640 ? 304 : 336; // Responsive scroll amount
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY > 0 ? scrollAmount : -scrollAmount;
    }
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm transition-all duration-300 ${
          canScrollLeft 
            ? 'text-white hover:bg-white/20 hover:scale-110' 
            : 'text-white/30 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm transition-all duration-300 ${
          canScrollRight 
            ? 'text-white hover:bg-white/20 hover:scale-110' 
            : 'text-white/30 cursor-not-allowed'
        }`}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-2 sm:px-4 py-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {fleet.map((car, index) => (
          <FleetCard key={car.name} car={car} index={index} onCarClick={onCarClick} />
        ))}
      </div>
    </div>
  );
};

const TierCard = ({ tier, index, isActive, onClick }) => (
    <div 
        className={`absolute w-80 h-96 cursor-pointer transition-all duration-700 ease-in-out ${
            isActive ? 'scale-105' : 'scale-100'
        }`}
        style={{
            zIndex: isActive ? 3 : tier.zIndex,
            transform: `rotate(${tier.rotation}deg) translate(${tier.translateX}px, ${tier.translateY}px)`,
            transformOrigin: 'center center',
            opacity: isActive ? 1 : 0.7,
        }}
        onClick={onClick}
    >
        <div
            className={`relative rounded-2xl p-6 border border-white/20 ${tier.bgClass} flex flex-col h-full shadow-2xl transition-all duration-700 ease-in-out ${
                isActive ? 'shadow-purple-500/30 shadow-2xl' : 'shadow-xl'
            }`}
        >
            <div className="flex-grow flex flex-col justify-center text-center">
                <h3 className="text-3xl font-display mb-2 text-white transition-all duration-700">
                  {tier.name}
                </h3>
                <p className="text-white/80 mb-4 font-light text-sm transition-all duration-700">{tier.title}</p>

                <p className="text-2xl font-light mb-4 text-white transition-all duration-700">
                  {tier.price}
                </p>
                <p className="text-white/70 font-light text-xs leading-relaxed mb-4 transition-all duration-700">{tier.description}</p>
            </div>

            {/* Features List */}
            <div className="space-y-2 mb-4">
                {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 transition-all duration-700" style={{ transitionDelay: `${i * 100}ms` }}>
                        <div>
                          <Check className="w-4 h-4 text-green-400 mt-0.5" />
                        </div>
                        <span className="font-light text-white/80 text-xs">{feature}</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto">
              <Button 
                size="sm" 
                className={`w-full font-bold ${tier.buttonClass} text-xs transition-all duration-700`}
                onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = '/AuthPage';
                }}
              >
                {tier.cta}
              </Button>
            </div>
        </div>
    </div>
);

const MembershipCarousel = ({ tiers }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % tiers.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + tiers.length) % tiers.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const selectCard = (index) => {
    if (isTransitioning || activeIndex === index) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={prevCard}
        disabled={isTransitioning}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm transition-all duration-500 text-white hover:bg-white/20 hover:scale-110 ${
          isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextCard}
        disabled={isTransitioning}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm transition-all duration-500 text-white hover:bg-white/20 hover:scale-110 ${
          isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Card Indicators */}
      <div className="flex justify-center gap-2 mb-8">
        {tiers.map((tier, index) => (
          <button
            key={tier.name}
            onClick={() => selectCard(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              activeIndex === index 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          />
        ))}
      </div>

      {/* Stacked Cards Container */}
      <div className="relative flex justify-center items-center min-h-[500px]">
        <div className="relative w-80 h-96">
          {tiers.map((tier, index) => (
            <TierCard 
              key={tier.name} 
              tier={tier} 
              index={index} 
              isActive={activeIndex === index}
              onClick={() => selectCard(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Navigation Indicator Component
const NavigationIndicator = ({ activeSection, onSectionClick }) => {
  const sections = [
    { id: 'home' },
    { id: 'fleet' },
    { id: 'membership' },
    { id: 'contact' }
  ];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`group transition-all duration-300 ${
            activeSection === section.id ? 'text-white' : 'text-white/40 hover:text-white/70'
          }`}
        >
          {/* Dot */}
          <div
            className={`w-2 h-2 rounded-full border transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-white border-white scale-125'
                : 'bg-transparent border-white/40 group-hover:border-white/70 group-hover:scale-110'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default function HomePage() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const handleReserveNowClick = () => {
    setIsContactPopupOpen(true);
  };

  const handleCloseContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  // Scroll detection for navigation indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'fleet', 'membership', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation clicks
  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Navigation Indicator */}
      <NavigationIndicator 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick} 
      />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/media/0924.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <div>
            <p className="text-sm font-light tracking-[0.3em] uppercase mb-4 text-white/80">
              <span className="silvar-glow">SILVAR</span> PRESENTS
            </p>
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.1em] uppercase mb-6">
              A WORLD BEYOND ACCESS
            </h1>
            <p className="text-lg font-light mb-8 max-w-md mx-auto text-white/90">
              Membership by invitation only
            </p>
            <div>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white text-black hover:bg-white/90 border-white font-light tracking-wider px-8 glow-border"
                onClick={handleReserveNowClick}
              >
                RESERVE NOW
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
                <h1 className="text-5xl md:text-7xl font-display mb-4">
                  Our Fleet
                </h1>
                <p className="text-white/70 text-xl font-light max-w-2xl mx-auto">
                  A curated collection of the world's most desirable automobiles.
                </p>
            </div>
            
            <FleetCarousel fleet={fleet} onCarClick={handleCarClick} />
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
                <h1 className="text-5xl md:text-7xl font-display mb-4">
                  Exclusive Membership
                </h1>
                <p className="text-white/70 text-xl font-light max-w-2xl mx-auto">
                  An invitation to a world beyond access, tailored to your desires.
                </p>
            </div>
            
            <MembershipCarousel tiers={tiers} />
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
                <h1 className="text-5xl md:text-7xl font-display mb-4">
                  Contact
                </h1>
                <p className="text-white/70 text-xl font-light max-w-2xl mx-auto">
                  Our global concierge team is at your service, 24/7.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-3xl font-display mb-4">
                      Get in Touch
                    </h2>
                    {contactMethods.map((method, index) => (
                    <div
                        key={method.title}
                        className="bg-white/5 border border-white/10 rounded-lg p-6 flex items-start gap-6 glow-border"
                    >
                        <div>
                          <method.icon className="w-8 h-8 text-white/70 mt-1" />
                        </div>
                        <div>
                        <h3 className="font-semibold text-lg">
                          {method.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-2">{method.description}</p>
                        <p className="text-white font-mono text-sm">
                          {method.value}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                <ContactForm />
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          {/* SILVAR Logo */}
          <div className="text-center mb-16">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TSUxWQVI8L3RleHQ+Cjwvc3ZnPgo=" 
              alt="SILVAR" 
              className="h-16 mx-auto mb-4"
            />
          </div>

          {/* Car Fleet Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">ROLLS ROYCE</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">CULLINAN SERIES 2</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">CULLINAN SILVER BADGE</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">CULLINAN BLACK BADGE</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">PHANTOM</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">MERCEDES</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">S CLASS MAYBACH</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">GLS MAYBACH</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">G63</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">S CLASS</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">SPRINTER 16 SEATER</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">V CLASS</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">SENZATI</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">E CLASS</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">FERRARI</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">PUROSANGUE RED</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">PUROSANGUE GREY</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">LAMBORGHINI</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">URUS</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">LAND ROVER</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">DEFENDER V6</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">DEFENDER V8</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">RANGE ROVER</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">ESCALADE</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">ESCALADE</a>
              </div>
            </div>
          </div>

          {/* Services & Membership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">SERVICES</h4>
              <div className="space-y-2">
                <a href="#contact" className="block text-sm text-white/60 hover:text-white transition-colors font-light">CHAUFFEUR</a>
                <a href="#contact" className="block text-sm text-white/60 hover:text-white transition-colors font-light">CONCIERGE</a>
                <a href="#contact" className="block text-sm text-white/60 hover:text-white transition-colors font-light">PRIVATE JETS</a>
                <a href="#contact" className="block text-sm text-white/60 hover:text-white transition-colors font-light">YACHT CHARTER</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">MEMBERSHIP</h4>
              <div className="space-y-2">
                <a href="#membership" className="block text-sm text-white/60 hover:text-white transition-colors font-light">SILVER TIER</a>
                <a href="#membership" className="block text-sm text-white/60 hover:text-white transition-colors font-light">BLACK TIER</a>
                <a href="#contact" className="block text-sm text-white/60 hover:text-white transition-colors font-light">APPLY NOW</a>
                <a href="/MemberDashboard" className="block text-sm text-white/60 hover:text-white transition-colors font-light">MEMBER LOGIN</a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
              <p className="text-sm text-white/40 font-light">
                © <span className="silvar-glow">SILVAR</span> {new Date().getFullYear()}. A world beyond access.
              </p>
              <div className="flex items-center gap-8">
                <a 
                  href="/PrivacyPolicy" 
                  className="text-sm text-white/60 hover:text-white transition-colors font-light"
                >
                  PRIVACY POLICY
                </a>
                <a 
                  href="/Terms" 
                  className="text-sm text-white/60 hover:text-white transition-colors font-light"
                >
                  TERMS OF SERVICE
                </a>
                <a 
                  href="#contact" 
                  className="text-sm text-white/60 hover:text-white transition-colors font-light"
                >
                  CONTACT
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Car Detail Modal */}
      <CarDetailModal 
        car={selectedCar} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

      {/* Contact Popup Modal */}
      <Dialog open={isContactPopupOpen} onOpenChange={setIsContactPopupOpen}>
        <DialogContent className="bg-black border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-center mb-4">
              Contact Us
            </DialogTitle>
            <p className="text-white/70 text-center mb-6">
              Get in touch with us on WhatsApp or via email for immediate assistance
            </p>
          </DialogHeader>
          
          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                className="bg-white/5 border border-white/10 rounded-lg p-6 flex items-center gap-6 glow-border hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => {
                  if (method.title === 'WhatsApp') {
                    window.open(`https://${method.value}`, '_blank');
                  } else if (method.title === 'Email') {
                    window.open(`mailto:${method.value}`, '_blank');
                  } else if (method.title === 'Phone') {
                    window.open(`tel:${method.value}`, '_blank');
                  }
                }}
              >
                <div>
                  <method.icon className="w-8 h-8 text-white/70" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {method.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-2">{method.description}</p>
                  <p className="text-white font-mono text-sm">
                    {method.value}
                  </p>
                </div>
                <div className="text-white/40">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
