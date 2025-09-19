
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';

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
        <header className="fixed top-0 left-0 right-0 z-40 p-8">
          <div className="flex justify-between items-center">
            <motion.button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6" />
              <span className="text-sm font-light tracking-wider">MENU</span>
            </motion.button>

            <motion.div
              className="floating-animation"
              whileHover={{ scale: 1.1 }}
            >
              <a href="/">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI1MCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TSUxWQVI8L3RleHQ+Cjwvc3ZnPgo=" 
                  alt="SILVAR" 
                  className="h-12"
                />
              </a>
            </motion.div>

            <motion.button 
              onClick={user ? () => window.location.href = '/MemberDashboard' : handleLogin}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
              <span className="text-sm font-light tracking-wider">{user ? 'ACCOUNT' : 'FIND A DEALER'}</span>
            </motion.button>
          </div>
        </header>

        {/* Overlay Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-50"
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
              
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-white/80 transition-colors z-10"
              >
                <X className="w-6 h-6" />
                <span className="text-sm font-light tracking-wider">CLOSE</span>
              </button>

              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <nav className="text-center space-y-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <a
                        href={item.anchor ? `/${item.anchor}` : `/${item.path}`}
                        className="block text-2xl md:text-3xl font-light tracking-[0.2em] text-white hover:text-white/70 transition-colors"
                        onClick={(e) => handleNavClick(e, item)}
                      >
                        {item.name}
                        {item.comingSoon && <span className="text-sm ml-4 text-white/40">COMING SOON</span>}
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
