import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { personal } from '../../data/personal';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center"
    >
      <div className="relative w-32 h-32 mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M20,50 L50,20 L80,50 L50,80 Z"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white font-heading"
        >
          {personal.name.split(" ").map(n => n[0]).join("")}
        </motion.div>
      </div>

      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <span className="text-white font-medium">Loading</span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="text-white text-xl"
            >
              .
            </motion.span>
          ))}
        </div>
        <span className="ml-2 text-white/50">{progress}%</span>
      </div>
    </motion.div>
  );
};

export default Preloader;
