import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';
import { experience, education } from '../../data/experience';
import SectionHeading from '../ui/SectionHeading';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="experience" className="py-16 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading 
          subtitle="My Journey"
          title="Experience & Education"
          description="A timeline of my professional career and academic achievements."
          center
        />

        {/* Tab Buttons */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12 sm:mb-16">
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold transition-all text-xs sm:text-base ${
              activeTab === 'experience' 
                ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                : 'glass border border-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            <Briefcase size={18} className="sm:w-5 sm:h-5" /> <span className="hidden xs:inline">Professional</span> Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold transition-all text-xs sm:text-base ${
              activeTab === 'education' 
                ? 'bg-secondary text-white shadow-xl shadow-secondary/20' 
                : 'glass border border-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            <GraduationCap size={18} className="sm:w-5 sm:h-5" /> <span className="hidden xs:inline">Academic</span> History
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent opacity-30 md:-translate-x-1/2" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 sm:space-y-12 relative"
            >
              {(activeTab === 'experience' ? experience : education).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 sm:left-6 md:left-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--bg-primary)] border-4 border-primary z-10 -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center top-6 md:top-auto">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-ping" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[45%] ml-8 sm:ml-12 md:ml-0 glass p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-[var(--border)] hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider w-fit">
                        {item.duration}
                      </span>
                      <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs sm:text-sm font-medium">
                        <MapPin size={14} className="shrink-0" /> <span className="truncate">{item.location}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                      {activeTab === 'experience' ? item.title : item.degree}
                    </h3>
                    <h4 className="text-base sm:text-lg font-medium text-secondary mb-4 sm:mb-6 italic">
                      {activeTab === 'experience' ? item.company : item.institution}
                    </h4>

                    {activeTab === 'experience' ? (
                      <ul className="space-y-2 sm:space-y-3">
                        {item.description.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3 text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed">
                            <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5 sm:mt-1" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed italic">
                        {item.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-6 sm:mt-8">
                      {(activeTab === 'experience' ? item.tech : item.tags).map((tag, i) => (
                        <span key={i} className="px-2 sm:px-3 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[9px] sm:text-[10px] font-bold uppercase whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Empty Spacer for Desktop */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
