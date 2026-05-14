import React from 'react';
import { motion } from 'framer-motion';
import { personal } from '../../data/personal';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { Coffee, Code, Bug, User, MapPin, Mail, GraduationCap } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Projects Completed", value: personal.projects, icon: Code, color: "text-blue-500" },
    { label: "Happy Clients", value: personal.clients, icon: User, color: "text-purple-500" },
    { label: "Years Experience", value: personal.experience, icon: Coffee, color: "text-amber-500" },
    { label: "Bugs Fixed", value: "999+", icon: Bug, color: "text-red-500" },
  ];

  const infoGrid = [
    { label: "Name", value: personal.name, icon: User },
    { label: "Location", value: personal.location, icon: MapPin },
    { label: "Email", value: personal.email, icon: Mail },
    { label: "Education", value: "BS Computer Science", icon: GraduationCap },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column - Image & Badges */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 z-10">
                <img 
                  src={personal.profileImage} 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" }}
                  alt="Professional"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 -right-2 md:-right-6 glass p-4 rounded-2xl shadow-xl z-20 flex flex-col items-center border border-amber-500/30"
              >
                <span className="text-3xl font-bold text-amber-500">{personal.experience}</span>
                <span className="text-[10px] uppercase tracking-tighter font-bold">Years Experience</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-6 -left-2 md:-left-6 glass p-4 rounded-2xl shadow-xl z-20 flex flex-col items-center border border-primary/30"
              >
                <span className="text-3xl font-bold text-primary">{personal.projects}</span>
                <span className="text-[10px] uppercase tracking-tighter font-bold">Projects Done</span>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-primary/5 -translate-x-4 -translate-y-4 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="flex-[1.5]">
            <SectionHeading 
              subtitle="About Me"
              title="Passionate Developer Creating Digital Experiences"
              description={personal.bioLong}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {infoGrid.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 glass p-4 rounded-xl border border-[var(--border)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{item.label}</p>
                    <p className="font-medium text-sm md:text-base">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="primary">Download Resume</Button>
              <Button variant="outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Hire Me</Button>
            </div>

            {/* Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="text-center p-4 rounded-xl glass border border-[var(--border)]"
                >
                  <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                  <p className="text-xs text-[var(--text-muted)] uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
