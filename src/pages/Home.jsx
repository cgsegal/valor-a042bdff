
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, Check } from 'lucide-react';
import ContactForm from '../components/revamp/ContactForm';

const fleet = [
  { name: 'Rolls-Royce Cullinan', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center', category: 'SUV' },
  { name: 'Mercedes-AMG G 63', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center', category: 'SUV' },
  { name: 'Rolls-Royce Ghost', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center', category: 'Sedan' },
  { name: 'Ferrari 296 GTB', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&crop=center', category: 'Supercar' },
  { name: 'Cadillac Escalade V', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center', category: 'SUV' },
  { name: 'Lamborghini Urus', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&crop=center', category: 'SUV'},
  { name: 'Range Rover SV', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center', category: 'SUV'},
  { name: 'McLaren 720S', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&crop=center', category: 'Supercar'},
];

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

const FleetCard = ({ car, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -20, 
          rotateX: 5,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="group relative bg-black border border-white/10 rounded-lg overflow-hidden glow-border"
    >
        <div className="h-64 flex items-center justify-center p-8 relative overflow-hidden">
            <motion.img 
              src={car.image} 
              alt={car.name} 
              className="max-h-full max-w-full object-contain"
              whileHover={{ scale: 1.15, rotate: 2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <motion.div 
          className="p-6 bg-white/5 backdrop-blur-sm"
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
            <motion.p 
              className="text-xs text-white/50 uppercase tracking-widest"
              whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              {car.category}
            </motion.p>
            <motion.h3 
              className="font-display text-2xl text-white"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {car.name}
            </motion.h3>
        </motion.div>
    </motion.div>
);

const TierCard = ({ tier, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ 
          scale: 1.05, 
          y: -10,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
        className={`relative rounded-2xl p-8 border ${tier.bgClass} flex flex-col h-full shadow-2xl glow-border floating-animation`}
        style={{ animationDelay: `${index * 0.5}s` }}
    >
        {tier.popular && (
          <motion.div 
            className="absolute top-0 right-8 -mt-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(147, 51, 234, 0.5)',
                '0 0 40px rgba(147, 51, 234, 0.8)',
                '0 0 20px rgba(147, 51, 234, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            FOUNDER'S PICK
          </motion.div>
        )}
        
        <motion.h3 
          className="text-3xl font-display"
          whileHover={{ scale: 1.1, y: -5 }}
        >
          {tier.name}
        </motion.h3>
        <p className="text-white/60 mb-6 font-light">{tier.title}</p>

        <motion.p 
          className="text-4xl font-light mb-4"
          whileHover={{ scale: 1.2, y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {tier.price}
        </motion.p>
        <p className="text-white/80 font-light mb-8 flex-grow">{tier.description}</p>

        <div className="space-y-4 mb-10">
            {tier.features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="w-5 h-5 text-purple-400 mt-1" />
                    </motion.div>
                    <span className="font-light">{feature}</span>
                </motion.div>
            ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button size="lg" className={`w-full mt-auto font-bold ${tier.buttonClass} shimmer-effect`}>
            {tier.cta}
          </Button>
        </motion.div>
    </motion.div>
);

export default function HomePage() {
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
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <motion.p 
              className="text-sm font-light tracking-[0.3em] uppercase mb-4 text-white/80"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="silvar-glow">SILVAR</span> PRESENTS
            </motion.p>
            <motion.h1 
              className="text-5xl md:text-7xl font-light tracking-[0.1em] uppercase mb-6"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255, 255, 255, 0.5)',
                  '0 0 40px rgba(255, 255, 255, 0.8)',
                  '0 0 20px rgba(255, 255, 255, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              A WORLD BEYOND ACCESS
            </motion.h1>
            <motion.p 
              className="text-lg font-light mb-8 max-w-md mx-auto text-white/90"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Membership by invitation only
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white text-black hover:bg-white/90 border-white font-light tracking-wider px-8 glow-border"
              >
                RESERVE NOW
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-8">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <motion.h1 
                  className="text-5xl md:text-7xl font-display mb-4"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Our Fleet
                </motion.h1>
                <motion.p 
                  className="text-white/70 text-xl font-light max-w-2xl mx-auto"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  A curated collection of the world's most desirable automobiles.
                </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fleet.map((car, index) => (
                    <FleetCard key={car.name} car={car} index={index} />
                ))}
            </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <motion.h1 
                  className="text-5xl md:text-7xl font-display mb-4"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Membership
                </motion.h1>
                <motion.p 
                  className="text-white/70 text-xl font-light max-w-2xl mx-auto"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  An invitation to a world beyond access, tailored to your desires.
                </motion.p>
            </motion.div>
            
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
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <motion.h1 
                  className="text-5xl md:text-7xl font-display mb-4"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Contact
                </motion.h1>
                <motion.p 
                  className="text-white/70 text-xl font-light max-w-2xl mx-auto"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Our global concierge team is at your service, 24/7.
                </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <motion.h2 
                      className="text-3xl font-display mb-4"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      Get in Touch
                    </motion.h2>
                    {contactMethods.map((method, index) => (
                    <motion.div
                        key={method.title}
                        initial={{ opacity: 0, x: -30, rotateY: -15 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        whileHover={{ 
                          scale: 1.05, 
                          x: 10,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          rotateY: 5
                        }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-6 flex items-start gap-6 glow-border"
                    >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <method.icon className="w-8 h-8 text-white/70 mt-1" />
                        </motion.div>
                        <div>
                        <motion.h3 
                          className="font-semibold text-lg"
                          whileHover={{ y: -2, scale: 1.05 }}
                        >
                          {method.title}
                        </motion.h3>
                        <p className="text-white/60 text-sm mb-2">{method.description}</p>
                        <motion.p 
                          className="text-white font-mono text-sm"
                          whileHover={{ scale: 1.05, y: -1 }}
                        >
                          {method.value}
                        </motion.p>
                        </div>
                    </motion.div>
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
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TSUxWQVI8L3RleHQ+Cjwvc3ZnPgo=" 
              alt="SILVAR" 
              className="h-16 mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

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
              <motion.p 
                className="text-sm text-white/40 font-light"
                whileHover={{ scale: 1.05 }}
              >
                © <span className="silvar-glow">SILVAR</span> {new Date().getFullYear()}. A world beyond access.
              </motion.p>
              <div className="flex items-center gap-8">
                <motion.a 
                  href="/PrivacyPolicy" 
                  className="text-sm text-white/60 hover:text-white transition-colors font-light"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  PRIVACY POLICY
                </motion.a>
                <motion.a 
                  href="/Terms" 
                  className="text-sm text-white/60 hover:text-white transition-colors font-light"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  TERMS OF SERVICE
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="text-sm text-white/60 hover:text-white transition-colors font-light"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  CONTACT
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
