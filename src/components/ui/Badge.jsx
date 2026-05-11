import React from 'react';

const Badge = ({ children, className = '' }) => {
  return (
    <span className={`px-4 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
