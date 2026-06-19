import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const FloatingHireBtn = () => {
  return (
    <motion.button
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-24 sm:bottom-40 right-4 sm:right-6 bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full flex items-center gap-2 shadow-xl z-[40] hidden md:flex group"
      onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
    >
      <div className="relative">
        <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
      </div>
      <span className="font-medium text-xs sm:text-sm">Hire Me</span>
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-primary/50 -z-10"
      />
    </motion.button>
  );
};

export default FloatingHireBtn;
