import React from 'react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

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

export default function MemberDashboardPage() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Placeholder for future authentication implementation
        setUser({ full_name: 'Member' });
        setLoading(false);
    }, []);

    const handleLogout = () => {
        // Placeholder for future authentication implementation
        window.location.href = createPageUrl('Home');
    };

    if (loading) {
        return (
             <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent"></div>
            </div>
        )
    }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-black text-white p-8 pt-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-5xl font-display mb-2">Welcome, {user?.full_name}</h1>
                <p className="text-white/70 text-lg">Manage your SILVAR membership.</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white hover:text-black">
                Logout
            </Button>
        </div>
        <div className="text-center py-20 border border-dashed border-white/20 rounded-lg">
          <p className="text-white/50">Member dashboard coming soon.</p>
        </div>
      </div>
    </motion.div>
  );
}