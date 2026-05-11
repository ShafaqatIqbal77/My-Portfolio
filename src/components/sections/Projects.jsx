import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, ArrowRight, Eye, Layout } from 'lucide-react';
import { projects } from '../../data/projects';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Frontend', 'Full Stack', 'React', 'Node.js'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter || p.tech.includes(filter));

  return (
    <section id="projects" className="py-24 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-6">
        <SectionHeading 
          subtitle="My Work"
          title="Featured Projects"
          description="A showcase of some of my best work, ranging from complex full-stack applications to beautiful frontend designs."
          center
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-[var(--bg-card)] border border-[var(--border)] hover:border-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                className="group glass rounded-3xl overflow-hidden border border-[var(--border)] hover:border-primary/50 transition-all duration-500"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" }}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    >
                      <Eye size={20} />
                    </button>
                    <a href={project.github} className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                      <Github size={20} />
                    </a>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/50 text-white border-none backdrop-blur-md">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[10px] uppercase font-bold text-primary/70 bg-primary/5 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-[var(--border)]">
                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1"><Star size={14} className="text-amber-500" /> {project.stars}</span>
                      <span className="flex items-center gap-1"><GitFork size={14} className="text-blue-500" /> {project.forks}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <div className="mt-16 text-center">
          <Button variant="outline" icon={Layout}>View All Projects on GitHub</Button>
        </div>
      </div>

      {/* Project Detail Modal */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <div className="flex flex-col lg:flex-row h-full">
            <div className="flex-1 bg-black/20 p-8 flex items-center justify-center">
              <img 
                src={selectedProject.image} 
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" }}
                alt={selectedProject.title}
                className="rounded-2xl shadow-2xl max-w-full h-auto object-cover max-h-[60vh]"
              />
            </div>
            <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                {selectedProject.category}
              </div>
              <h2 className="text-4xl font-bold mb-6">{selectedProject.title}</h2>
              <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mb-8">
                <h4 className="font-bold mb-4 flex items-center gap-2 italic">
                  <div className="w-6 h-1 bg-primary rounded-full"></div>
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] font-medium text-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-[var(--border)]">
                <Button className="w-full" icon={Github}>Source Code</Button>
                <Button variant="outline" className="w-full" icon={ExternalLink}>Live Demo</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Projects;
