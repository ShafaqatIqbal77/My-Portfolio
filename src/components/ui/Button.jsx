import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  icon: Icon,
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20',
    outline: 'border border-primary/30 text-[var(--text-primary)] hover:bg-primary/10',
    ghost: 'text-[var(--text-primary)] hover:bg-white/5',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon size={18} />}
    </motion.button>
  );
};

export default Button;
