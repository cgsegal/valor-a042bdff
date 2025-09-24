
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import ContactForm from '../components/revamp/ContactForm';
import CarDetailModal from '../components/revamp/CarDetailModal';

// Complete fleet based on footer cars, organized by brand alphabetically
const fleet = [
  // BMW
  { 
    name: 'BMW 7 Series', 
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center', 
    category: 'Sedan', 
    brand: 'BMW',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$95,000',
    year: '2024',
    engine: '4.4L V8 Twin-Turbo',
    horsepower: '523 HP',
    acceleration: '4.1s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Luxury Interior', 'Advanced Safety', 'Premium Audio', 'Heated Seats', 'Navigation'],
    description: 'The BMW 7 Series represents the pinnacle of luxury and performance, combining cutting-edge technology with unparalleled comfort.'
  },
  
  // CADILLAC
  { 
    name: 'Cadillac Escalade V', 
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center', 
    category: 'SUV', 
    brand: 'Cadillac',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$150,000',
    year: '2024',
    engine: '6.2L V8 Supercharged',
    horsepower: '682 HP',
    acceleration: '4.4s 0-60 mph',
    topSpeed: '120 mph',
    features: ['Third Row Seating', 'Premium Leather', 'Advanced AWD', 'Towing Package', 'Entertainment System'],
    description: 'The Cadillac Escalade V delivers uncompromising luxury and performance in a full-size SUV package.'
  },
  
  // FERRARI
  { 
    name: 'Ferrari 296 GTB', 
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&crop=center', 
    category: 'Supercar', 
    brand: 'Ferrari',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$320,000',
    year: '2024',
    engine: '3.0L V6 Hybrid',
    horsepower: '819 HP',
    acceleration: '2.9s 0-60 mph',
    topSpeed: '205 mph',
    features: ['Hybrid Technology', 'Carbon Fiber Body', 'Racing Seats', 'Track Mode', 'Active Aero'],
    description: 'The Ferrari 296 GTB represents the future of supercars with its revolutionary hybrid powertrain and stunning performance.'
  },
  
  // LAMBORGHINI
  { 
    name: 'Lamborghini Urus', 
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&crop=center', 
    category: 'SUV', 
    brand: 'Lamborghini',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$230,000',
    year: '2024',
    engine: '4.0L V8 Twin-Turbo',
    horsepower: '641 HP',
    acceleration: '3.6s 0-60 mph',
    topSpeed: '190 mph',
    features: ['All-Wheel Drive', 'Adaptive Suspension', 'Sport Mode', 'Premium Interior', 'Advanced Safety'],
    description: 'The Lamborghini Urus combines the soul of a supercar with the versatility of an SUV.'
  },
  { 
    name: 'Lamborghini Huracan', 
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&crop=center', 
    category: 'Supercar', 
    brand: 'Lamborghini',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$200,000',
    year: '2024',
    engine: '5.2L V10',
    horsepower: '610 HP',
    acceleration: '3.2s 0-60 mph',
    topSpeed: '201 mph',
    features: ['Naturally Aspirated V10', 'Carbon Fiber', 'Racing Heritage', 'Active Aero', 'Track Focused'],
    description: 'The Lamborghini Huracan delivers pure driving emotion with its naturally aspirated V10 engine.'
  },
  
  // MCLAREN
  { 
    name: 'McLaren 720S', 
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&crop=center', 
    category: 'Supercar', 
    brand: 'McLaren',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$300,000',
    year: '2024',
    engine: '4.0L V8 Twin-Turbo',
    horsepower: '710 HP',
    acceleration: '2.8s 0-60 mph',
    topSpeed: '212 mph',
    features: ['Carbon Fiber Monocage', 'Active Aero', 'Racing DNA', 'Lightweight Design', 'Track Performance'],
    description: 'The McLaren 720S represents the perfect balance of performance, technology, and everyday usability.'
  },
  
  // MERCEDES
  { 
    name: 'Mercedes-AMG G 63', 
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center', 
    category: 'SUV', 
    brand: 'Mercedes',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$180,000',
    year: '2024',
    engine: '4.0L V8 Biturbo',
    horsepower: '577 HP',
    acceleration: '4.5s 0-60 mph',
    topSpeed: '149 mph',
    features: ['Three Locking Diffs', 'AMG Performance', 'Luxury Interior', 'Off-Road Capable', 'Premium Audio'],
    description: 'The Mercedes-AMG G 63 combines legendary off-road capability with AMG performance and luxury.'
  },
  { 
    name: 'Mercedes S-Class', 
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center', 
    category: 'Sedan', 
    brand: 'Mercedes',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$120,000',
    year: '2024',
    engine: '3.0L I6 Turbo',
    horsepower: '429 HP',
    acceleration: '4.8s 0-60 mph',
    topSpeed: '155 mph',
    features: ['MBUX Hyperscreen', 'E-Active Body Control', 'Burmester Audio', 'Rear Executive Seats', 'Advanced Safety'],
    description: 'The Mercedes S-Class sets the standard for luxury sedans with cutting-edge technology and comfort.'
  },
  
  // PORSCHE
  { 
    name: 'Porsche 911 Turbo', 
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&crop=center', 
    category: 'Supercar', 
    brand: 'Porsche',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$180,000',
    year: '2024',
    engine: '3.8L H6 Twin-Turbo',
    horsepower: '572 HP',
    acceleration: '2.7s 0-60 mph',
    topSpeed: '205 mph',
    features: ['All-Wheel Drive', 'Active Aero', 'PASM Suspension', 'Sport Chrono', 'Track Precision'],
    description: 'The Porsche 911 Turbo delivers exceptional performance with everyday drivability and legendary reliability.'
  },
  
  // RANGE ROVER
  { 
    name: 'Range Rover SV', 
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center', 
    category: 'SUV', 
    brand: 'Range Rover',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$200,000',
    year: '2024',
    engine: '5.0L V8 Supercharged',
    horsepower: '557 HP',
    acceleration: '4.6s 0-60 mph',
    topSpeed: '140 mph',
    features: ['Luxury Interior', 'Terrain Response', 'Air Suspension', 'Premium Audio', 'Off-Road Capable'],
    description: 'The Range Rover SV represents the ultimate in luxury SUV refinement and capability.'
  },
  
  // ROLLS-ROYCE
  { 
    name: 'Rolls-Royce Cullinan', 
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center', 
    category: 'SUV', 
    brand: 'Rolls-Royce',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$350,000',
    year: '2024',
    engine: '6.75L V12 Twin-Turbo',
    horsepower: '563 HP',
    acceleration: '5.0s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Bespoke Interior', 'Magic Carpet Ride', 'Suicide Doors', 'Starlight Headliner', 'Custom Options'],
    description: 'The Rolls-Royce Cullinan is the world\'s most luxurious SUV, offering unparalleled refinement and bespoke craftsmanship.'
  },
  { 
    name: 'Rolls-Royce Ghost', 
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center', 
    category: 'Sedan', 
    brand: 'Rolls-Royce',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$350,000',
    year: '2024',
    engine: '6.75L V12 Twin-Turbo',
    horsepower: '563 HP',
    acceleration: '4.6s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Bespoke Interior', 'Magic Carpet Ride', 'Suicide Doors', 'Starlight Headliner', 'Custom Options'],
    description: 'The Rolls-Royce Ghost embodies the pinnacle of luxury motoring with whisper-quiet refinement and bespoke personalization.'
  },
  { 
    name: 'Rolls-Royce Phantom', 
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center', 
    category: 'Sedan', 
    brand: 'Rolls-Royce',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop&crop=center&auto=format&q=80'
    ],
    price: '$500,000',
    year: '2024',
    engine: '6.75L V12 Twin-Turbo',
    horsepower: '563 HP',
    acceleration: '5.4s 0-60 mph',
    topSpeed: '155 mph',
    features: ['Bespoke Interior', 'Magic Carpet Ride', 'Suicide Doors', 'Starlight Headliner', 'Custom Options'],
    description: 'The Rolls-Royce Phantom is the ultimate expression of luxury, representing the pinnacle of automotive craftsmanship and personalization.'
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
        bgClass: 'from-gray-500/10 to-gray-800/10 border-gray-600',
        buttonClass: 'bg-white/80 text-black hover:bg-white',
        popular: false,
    },
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
        bgClass: 'from-purple-900/20 to-black/20 border-purple-700 shadow-purple-500/20',
        buttonClass: 'bg-purple-600 text-white hover:bg-purple-500',
        popular: true,
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
        className="group relative bg-black border border-white/10 rounded-lg overflow-hidden glow-border flex-shrink-0 w-72 sm:w-80 h-80 sm:h-96 cursor-pointer"
    >
        <div className="h-64 flex items-center justify-center p-8 relative overflow-hidden">
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
        <div className="p-6 bg-white/5 backdrop-blur-sm">
            <p className="text-xs text-white/50 uppercase tracking-widest">
              {car.category}
            </p>
            <h3 className="font-display text-2xl text-white">
              {car.name}
            </h3>
            <p className="text-sm text-white/60 mt-1">
              Click to view details
            </p>
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

const TierCard = ({ tier, index }) => (
    <div
        className={`relative rounded-2xl p-8 border ${tier.bgClass} flex flex-col h-full shadow-2xl glow-border`}
    >
        {tier.popular && (
          <div className="absolute top-0 right-8 -mt-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            FOUNDER'S PICK
          </div>
        )}
        
        <h3 className="text-3xl font-display">
          {tier.name}
        </h3>
        <p className="text-white/60 mb-6 font-light">{tier.title}</p>

        <p className="text-4xl font-light mb-4">
          {tier.price}
        </p>
        <p className="text-white/80 font-light mb-8 flex-grow">{tier.description}</p>

        <div className="space-y-4 mb-10">
            {tier.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                    <div>
                      <Check className="w-5 h-5 text-purple-400 mt-1" />
                    </div>
                    <span className="font-light">{feature}</span>
                </div>
            ))}
        </div>

        <div>
          <Button 
            size="lg" 
            className={`w-full mt-auto font-bold ${tier.buttonClass} shimmer-effect`}
            onClick={() => window.location.href = '/AuthPage'}
          >
            {tier.cta}
          </Button>
        </div>
    </div>
);

export default function HomePage() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/src/media/Night_Drive_Rolls_Royce_Ghost_BB_Cinematic_8k_Short_Film.mp4" type="video/mp4" />
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
                  Membership
                </h1>
                <p className="text-white/70 text-xl font-light max-w-2xl mx-auto">
                  An invitation to a world beyond access, tailored to your desires.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {tiers.map((tier, index) => (
                    <TierCard key={tier.name} tier={tier} index={index} />
                ))}
            </div>
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
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">ROLLS-ROYCE</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">CULLINAN</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">GHOST</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">PHANTOM</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">MERCEDES</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">G WAGON</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">S CLASS</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">FERRARI</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">296 GTB</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">LAMBORGHINI</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">URUS</a>
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">HURACAN</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">MCLAREN</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">720S</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">CADILLAC</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">ESCALADE V</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">RANGE ROVER</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">SV</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">BMW</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">7 SERIES</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-light tracking-wider text-white mb-4 uppercase">PORSCHE</h4>
              <div className="space-y-2">
                <a href="#fleet" className="block text-sm text-white/60 hover:text-white transition-colors font-light">911 TURBO</a>
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
    </div>
  );
}
