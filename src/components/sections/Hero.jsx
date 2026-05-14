import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, ArrowRight, Download, MousePointer2 } from 'lucide-react';
import ParticlesBg from '../animations/ParticlesBg';
import TypingEffect from '../animations/TypingEffect';
import { personal } from '../../data/personal';
import Button from '../ui/Button';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      <ParticlesBg />
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium mb-6"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)"
              }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                👋 Hello World! I'm
              </motion.span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 relative"
              whileHover={{ scale: 1.02 }}
            >
              {personal.name.split(" ").map((word, i) => (
                <motion.span 
                  key={i} 
                  className={i === 1 ? "gradient-text" : ""}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: "0 0 20px rgba(99, 102, 241, 0.5)"
                  }}
                >
                  {word} 
                </motion.span>
              ))}
            </motion.h1>

            <motion.div variants={itemVariants} className="text-2xl md:text-3xl font-heading font-medium mb-8 flex items-center justify-center lg:justify-start gap-3">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I am a 
              </motion.span>
              <TypingEffect strings={personal.titles} />
            </motion.div>

            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mb-10 leading-relaxed relative"
              whileHover={{ scale: 1.01 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {personal.bio}
              </motion.span>
            </motion.p>

            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  variant="primary" 
                  icon={ArrowRight}
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button variant="outline" icon={Download}>
                  Download CV
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              {[
                { icon: Github, href: personal.github },
                { icon: Linkedin, href: personal.linkedin },
                { icon: Twitter, href: personal.twitter },
                { icon: Instagram, href: personal.instagram },
              ].map((social, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.2,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[var(--border)] rounded-full hover:border-primary transition-all duration-300 text-[var(--text-muted)] hover:text-primary hover:shadow-lg hover:shadow-primary/20"
                  >
                    <social.icon size={20} />
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Avatar/3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-[450px] lg:w-[420px] lg:h-[550px]">
              {/* Rotating Gradient Border */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-primary via-secondary to-accent animate-spin-slow opacity-20 blur-xl" />
              
              {/* Photo Container */}
              <div className="absolute inset-4 rounded-[30px] overflow-hidden border-2 border-primary/20 backdrop-blur-sm z-10 group">
                <img 
                  src={personal.profileImage} 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" }}
                  alt={personal.name}
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-700" />
              </div>

            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[var(--text-muted)] rounded-full flex justify-center p-1 group-hover:border-primary transition-colors"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
          <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium group-hover:text-primary transition-colors">Scroll to explore</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;
