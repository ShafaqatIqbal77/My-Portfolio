import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ subtitle, title, description, center = false }) => {
  return (
    <div className={`mb-16 ${center ? 'text-center flex flex-col items-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-3"
      >
        <div className="w-10 h-[2px] bg-gradient-to-r from-primary to-accent rounded-full" />
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
          {subtitle}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[var(--text-muted)] text-lg max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
