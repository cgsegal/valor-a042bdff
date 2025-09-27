
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const navItems = [
  { name: 'FLEET', anchor: '#fleet' },
  { name: 'MEMBERSHIP', anchor: '#membership' },
  { name: 'CONTACT', anchor: '#contact' },
  { name: 'YACHTS', path: 'ComingSoon', comingSoon: true },
  { name: 'JETS', path: 'ComingSoon', comingSoon: true },
];

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = React.useState(null);
  const { getTotalItems } = useCart();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    // Placeholder for future authentication implementation
    window.location.href = '/MemberDashboard';
  };

  const handleNavClick = (e, item) => {
    setIsMenuOpen(false);
    if (item.anchor) {
        if (currentPageName !== 'Home') {
            window.location.href = `/${item.anchor}`;
        } else {
            e.preventDefault();
            const targetElement = document.querySelector(item.anchor);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
  };

  const menuVariants = {
    closed: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.3 } })
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&family=Montserrat:wght@300;400&display=swap');

          html {
            scroll-behavior: smooth;
          }

          body, html {
            background-color: #000;
            color: #fff;
            font-family: 'Montserrat', sans-serif;
            font-weight: 300;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            margin: 0;
            padding: 0;
          }

          .font-display {
            font-family: 'Cormorant', serif;
          }
          
          .silvar-glow {
            color: #ffffff !important;
            text-shadow: 
              0 0 5px rgba(255, 255, 255, 0.8),
              0 0 10px rgba(255, 255, 255, 0.6),
              0 0 20px rgba(255, 255, 255, 0.4),
              0 0 40px rgba(255, 255, 255, 0.2);
            animation: intense-glow-pulse 3s ease-in-out infinite;
            font-weight: 400 !important;
          }

          @keyframes intense-glow-pulse {
            0%, 100% { 
              text-shadow: 
                0 0 5px rgba(255, 255, 255, 0.8),
                0 0 10px rgba(255, 255, 255, 0.6),
                0 0 20px rgba(255, 255, 255, 0.4),
                0 0 40px rgba(255, 255, 255, 0.2);
              transform: scale(1);
            }
            50% { 
              text-shadow: 
                0 0 10px rgba(255, 255, 255, 1),
                0 0 20px rgba(255, 255, 255, 0.8),
                0 0 30px rgba(255, 255, 255, 0.6),
                0 0 50px rgba(255, 255, 255, 0.4),
                0 0 70px rgba(255, 255, 255, 0.2);
              transform: scale(1.02);
            }
          }

          .floating-animation {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          .shimmer-effect {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            background-size: 200% 100%;
            animation: shimmer 3s infinite;
          }

          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          .glow-border {
            position: relative;
            overflow: hidden;
          }

          .glow-border::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(45deg, 
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0.3),
              rgba(255, 255, 255, 0.1)
            );
            border-radius: inherit;
            animation: border-glow 4s linear infinite;
            z-index: -1;
          }

          @keyframes border-glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
        `}
      </style>
      <div className="relative min-h-screen bg-black text-white">
        {/* Navigation Header - Always Present */}
        <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4">
          {/* Black background bar that moves with scroll */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-between max-w-4xl mx-auto">
            {/* Menu Button - Mobile: icon only, Desktop: icon + text */}
            <motion.button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors w-1/3 sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6" />
              <span className="hidden sm:inline text-sm font-light tracking-wider">MENU</span>
            </motion.button>

            {/* Centered Silvar Logo - Mobile: 1/3 width, Desktop: centered */}
            <div className="w-1/3 sm:w-auto sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex justify-center">
              <motion.div
                className="floating-animation"
                whileHover={{ scale: 1.1 }}
              >
                <a href="/">
                  <h1 className="text-lg sm:text-xl font-display tracking-wider text-white silvar-glow">
                    SILVAR
                  </h1>
                </a>
              </motion.div>
            </div>

            {/* Cart and Reserve Buttons */}
            <div className="flex items-center gap-2 sm:gap-4 w-1/3 sm:w-auto justify-end">
              {/* Cart Icon - Hidden on Home page */}
              {currentPageName !== 'Home' && (
                <motion.button
                  onClick={() => window.location.href = '/checkout'}
                  className="relative text-white hover:text-white/80 transition-colors p-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {getTotalItems()}
                    </span>
                  )}
                </motion.button>
              )}

              {/* Member Dashboard Button */}
              <motion.button
                onClick={() => window.location.href = '/MemberDashboard'}
                className="text-white border border-white/20 hover:bg-white/10 px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-light tracking-wider rounded transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline">Member Dashboard</span>
                <span className="sm:hidden">Dashboard</span>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Overlay Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
              onClick={closeMenu}
            >
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeMenu();
                }}
                className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-white/80 transition-colors z-20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
                <span className="text-sm font-light tracking-wider">CLOSE</span>
              </motion.button>

              <div 
                className="relative z-10 flex flex-col items-center justify-center h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="text-center space-y-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 50, scale: 0.8 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.2 + (index * 0.1),
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href={item.anchor ? `/${item.anchor}` : `/${item.path}`}
                        className="block text-2xl md:text-3xl font-light tracking-[0.2em] text-white hover:text-white/70 transition-colors"
                        onClick={(e) => handleNavClick(e, item)}
                      >
                        {item.name}
                        {item.comingSoon && (
                          <motion.span 
                            className="text-sm ml-4 text-white/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + (index * 0.1) }}
                          >
                            COMING SOON
                          </motion.span>
                        )}
                      </a>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          {React.cloneElement(children, { key: currentPageName })}
        </AnimatePresence>
      </div>
    </>
  );
}
