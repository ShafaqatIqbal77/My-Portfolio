import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';
import SectionHeading from '../ui/SectionHeading';

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading 
          subtitle="My Skills"
          title="Technologies I Work With"
          description="I use a wide range of modern technologies to build high-performance web applications that provide exceptional user experiences."
          center
        />

        {/* PART A - Tech Stack Icons Grid (Double Row with Enhanced Animations) */}
        <div className="mb-16 md:mb-20">
          <div className="space-y-6 md:space-y-8">
            {/* First Row - Moving Right */}
            <div className="flex overflow-hidden group">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 md:gap-8 whitespace-nowrap min-w-full py-6"
              >
                {[...skills.techIcons, ...skills.techIcons].map((tech, i) => (
                  <motion.div 
                    key={`row1-${i}`} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.3 }
                    }}
                    className="flex flex-col items-center gap-3 min-w-[100px] p-4 md:min-w-[120px] md:p-6 glass rounded-2xl border border-[var(--border)] hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group/icon"
                  >
                    <motion.img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 grayscale group-hover/icon:grayscale-0 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.span 
                      className="text-[10px] sm:text-xs md:text-sm font-medium text-[var(--text-muted)] group-hover/icon:text-primary truncate w-full text-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech.name}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Second Row - Moving Left */}
            <div className="flex overflow-hidden group">
              <motion.div 
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 md:gap-8 whitespace-nowrap min-w-full py-6"
              >
                {[...skills.techIcons, ...skills.techIcons].slice().reverse().map((tech, i) => (
                  <motion.div 
                    key={`row2-${i}`} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    className="flex flex-col items-center gap-3 min-w-[100px] p-4 md:min-w-[120px] md:p-6 glass rounded-2xl border border-[var(--border)] hover:border-secondary hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 group/icon"
                  >
                    <motion.img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 grayscale group-hover/icon:grayscale-0 transition-all duration-300"
                      whileHover={{ rotate: -360 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.span 
                      className="text-[10px] sm:text-xs md:text-sm font-medium text-[var(--text-muted)] group-hover/icon:text-secondary truncate w-full text-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech.name}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* PART B - Skill Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20">
          {/* Frontend Skills */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
              <span className="w-6 sm:w-8 h-1 bg-primary rounded-full"></span>
              Frontend Development
            </h3>
            <div className="space-y-6 sm:space-y-8">
              {skills.frontend.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-[var(--text-muted)]">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-[var(--bg-card)] rounded-full overflow-hidden border border-[var(--border)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
              <span className="w-6 sm:w-8 h-1 bg-secondary rounded-full"></span>
              Backend & Cloud
            </h3>
            <div className="space-y-6 sm:space-y-8">
              {skills.backend.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-[var(--text-muted)]">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-[var(--bg-card)] rounded-full overflow-hidden border border-[var(--border)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-secondary to-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DevOps Skills */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
            <span className="w-6 sm:w-8 h-1 bg-accent rounded-full"></span>
            DevOps & Infrastructure
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {skills.devops.map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 md:p-6 glass rounded-2xl border border-[var(--border)] hover:border-primary transition-all group"
              >
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-base sm:text-lg">{skill.name}</span>
                  <span className="text-primary font-bold">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-[var(--bg-card)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 + 0.5 }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PART C - Tools */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-10 italic">Tools I Use Daily</h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            {skills.tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-3 sm:p-4 glass rounded-xl border border-[var(--border)] flex items-center gap-2 sm:gap-3 hover:border-primary transition-all duration-300"
              >
                <img src={tool.icon} alt={tool.name} className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-sm sm:text-base">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
