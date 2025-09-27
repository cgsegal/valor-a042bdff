import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Settings, CheckCircle, ArrowRight } from 'lucide-react';

const ProcessFlowDiagram = () => {
  const steps = [
    {
      id: 1,
      icon: MessageCircle,
      title: "Client Request",
      description: "You tell us exactly what you need",
      example: "Rolls Royce Phantom for 3 hours tomorrow at 6pm with two security staff",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400"
    },
    {
      id: 2,
      icon: Settings,
      title: "SILVAR Processing",
      description: "We analyze your requirements instantly",
      example: "Checking availability & curating options",
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400"
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Instant Response",
      description: "You receive pricing & availability",
      example: "Multiple options with transparent pricing",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const arrowVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    }
  };

  return (
    <div className="relative py-20 bg-black">
      <div className="max-w-7xl mx-auto px-8 pb-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-display mb-4">
              How We Work
            </h2>
            <p className="text-white/70 text-xl font-light max-w-2xl mx-auto">
              A seamless process designed for your convenience and luxury.
            </p>
          </motion.div>
        </div>

        {/* Flow Diagram */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step Card */}
                <motion.div
                  variants={stepVariants}
                  className="relative group"
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-80 h-96 flex flex-col items-center text-center glow-border hover:bg-white/10 transition-all duration-500 group-hover:scale-105">
                    {/* Icon */}
                    <div className={`${step.iconBg} rounded-full p-6 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className={`w-12 h-12 ${step.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-2xl font-display mb-4 text-white">
                        {step.title}
                      </h3>
                      <p className="text-white/70 text-lg font-light mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-sm text-white/60 italic">
                          "{step.example}"
                        </p>
                      </div>
                    </div>

                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
                  </div>
                </motion.div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    variants={arrowVariants}
                    className="flex items-center"
                  >
                    <div className="relative">
                      {/* Animated Arrow */}
                      <ArrowRight className="w-12 h-12 text-white/40" />
                      
                      {/* Glowing Arrow Effect */}
                      <motion.div
                        animate={{
                          x: [0, 10, 0],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0"
                      >
                        <ArrowRight className="w-12 h-12 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-12">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  variants={stepVariants}
                  className="relative group"
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 glow-border hover:bg-white/10 transition-all duration-500">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      {/* Icon */}
                      <div className={`${step.iconBg} rounded-full p-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <step.icon className={`w-12 h-12 ${step.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-2xl font-display mb-3 text-white">
                          {step.title}
                        </h3>
                        <p className="text-white/70 text-lg font-light mb-4 leading-relaxed">
                          {step.description}
                        </p>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <p className="text-sm text-white/60 italic">
                            "{step.example}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
                  </div>
                </motion.div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    variants={arrowVariants}
                    className="flex justify-center"
                  >
                    <div className="relative">
                      {/* Static Arrow pointing down */}
                      <div className="transform rotate-90">
                        <ArrowRight className="w-8 h-8 text-white/40" />
                      </div>
                      
                      {/* Animated Arrow Effect */}
                      <motion.div
                        animate={{
                          y: [0, 8, 0],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 transform rotate-90"
                      >
                        <ArrowRight className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10">
            {/* Subtle grid pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}
            />
            
            {/* Gradient overlays */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProcessFlowDiagram;
