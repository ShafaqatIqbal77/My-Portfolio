import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  ArrowRight,
  Eye,
  Layout,
  Server,
  Shield,
  CheckCircle2,
  Rocket,
  MapPin,
} from 'lucide-react';
import { projects } from '../../data/projects';
import { personal } from '../../data/personal';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import CaseStudyModalContent from '../projects/CaseStudyModalContent';
import { isPlaceholderUrl, handleProjectLinkClick } from '../../utils/projectLinks';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'DevOps', 'Full Stack', 'Frontend', 'React', 'Node.js'];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter || p.tech.includes(filter));

  return (
    <section id="projects" className="py-16 md:py-24 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-6">
        <SectionHeading
          subtitle="My Work"
          title="Featured Projects"
          description="A showcase of my cloud/DevOps deployments and full-stack web applications."
          center
        />

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 sm:mb-16 hide-scrollbar justify-start sm:justify-center w-full">
          <div className="flex gap-2 sm:gap-4 px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  filter === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-[var(--bg-card)] border border-[var(--border)] hover:border-primary/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const hasMetrics =
                typeof project.stars === 'number' && typeof project.forks === 'number';
              const isDevOps = project.category === 'DevOps';

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -10 }}
                  className={`group glass rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col h-full ${
                    project.featured
                      ? 'border-primary/40 hover:border-primary'
                      : 'border-[var(--border)] hover:border-primary/50'
                  }`}
                >
                  {/* Project Media / DevOps Architecture Preview */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden shrink-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800';
                        }}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/15 via-[var(--bg-card)] to-accent/15 p-5 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.03]">
                        <div className="flex items-center justify-end gap-2">
                          {project.featured && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-white">
                              Featured Case Study
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-center gap-3 my-auto">
                          <div className="p-3 rounded-2xl bg-[var(--bg-primary)]/90 border border-[var(--border)] text-primary shadow-sm">
                            {isDevOps ? <Server size={24} /> : <Layout size={24} />}
                          </div>
                          <span className="text-xs font-code text-[var(--text-muted)]">
                            →
                          </span>
                          <div className="p-3 rounded-2xl bg-[var(--bg-primary)]/90 border border-[var(--border)] text-accent shadow-sm">
                            <Shield size={24} />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-code text-[var(--text-muted)]">
                          <span>{project.region || 'AWS Cloud'}</span>
                          <span>{project.tech.slice(0, 2).join(' • ')}</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`View details for ${project.title}`}
                      >
                        <Eye size={20} />
                      </button>
                      <a
                        href={isPlaceholderUrl(project.github) ? '#projects' : project.github}
                        target={isPlaceholderUrl(project.github) ? undefined : '_blank'}
                        rel={isPlaceholderUrl(project.github) ? undefined : 'noopener noreferrer'}
                        onClick={(e) => handleProjectLinkClick(project.github, e)}
                        aria-label={`GitHub repository for ${project.title}`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
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
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 mt-auto">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-[9px] sm:text-[10px] uppercase font-bold text-primary/70 bg-primary/5 px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-4 sm:pt-6 border-t border-[var(--border)]">
                      {hasMetrics ? (
                        <div className="flex items-center gap-3 sm:gap-4 text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <Star size={14} className="text-amber-500" /> {project.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={14} className="text-blue-500" /> {project.forks}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] font-medium text-[var(--text-muted)] truncate">
                          {project.status || project.region}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="text-primary text-xs sm:text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-1.5 py-0.5"
                      >
                        {project.caseStudy ? 'Read Case Study' : 'View Details'}{' '}
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            variant="outline"
            icon={Layout}
            onClick={() => window.open(personal.github, '_blank', 'noopener,noreferrer')}
          >
            View All Projects on GitHub
          </Button>
        </div>
      </div>

      {/* Project Detail / Case Study Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        maxWidthClass={selectedProject?.caseStudy ? 'sm:max-w-6xl' : 'sm:max-w-5xl'}
      >
        {selectedProject &&
          (selectedProject.caseStudy ? (
            <CaseStudyModalContent project={selectedProject} />
          ) : (
            <div className="flex flex-col lg:flex-row h-full">
              <div className="w-full lg:w-1/2 bg-black/20 p-4 sm:p-8 flex items-center justify-center shrink-0">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800';
                    }}
                    alt={selectedProject.title}
                    className="rounded-2xl shadow-2xl max-w-full h-auto object-cover max-h-[30vh] md:max-h-[60vh]"
                  />
                ) : (
                  <div className="w-full min-h-[220px] rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-8 flex flex-col items-center justify-center text-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                        <Server size={32} />
                      </div>
                      <div className="p-4 rounded-2xl bg-accent/10 text-accent">
                        <Shield size={32} />
                      </div>
                    </div>
                    <p className="font-semibold text-base">{selectedProject.title}</p>
                    {selectedProject.region && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <MapPin size={14} className="text-primary" />
                        {selectedProject.region}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {selectedProject.category}
                  </div>
                  {selectedProject.status && (
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold border border-emerald-500/25">
                      {selectedProject.status}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                  {selectedProject.title}
                </h2>
                <p className="text-[var(--text-muted)] text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>

                {selectedProject.highlights && (
                  <div className="mb-6">
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <CheckCircle2 size={16} className="text-primary" />
                      Implementation Highlights
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-muted)]">
                      {selectedProject.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.plannedNext && (
                  <div className="mb-6 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)]">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <h4 className="font-bold flex items-center gap-2 text-sm">
                        <Rocket size={15} className="text-secondary" />
                        Planned Next
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-secondary/15 text-secondary">
                        PLANNED
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-muted)]">
                      {selectedProject.plannedNext.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-6 sm:mb-8">
                  <h4 className="font-bold mb-3 sm:mb-4 flex items-center gap-2 italic text-sm sm:text-base">
                    <div className="w-4 sm:w-6 h-1 bg-primary rounded-full"></div>
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedProject.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] font-medium text-xs sm:text-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-[var(--border)] mt-auto">
                  <Button
                    className="w-full"
                    icon={Github}
                    onClick={() => handleProjectLinkClick(selectedProject.github)}
                  >
                    {isPlaceholderUrl(selectedProject.github)
                      ? selectedProject.github
                      : 'Source Code'}
                  </Button>
                  {selectedProject.demo && selectedProject.demo !== '#' && (
                    <Button
                      variant="outline"
                      className="w-full"
                      icon={ExternalLink}
                      onClick={() =>
                        window.open(
                          selectedProject.demo,
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </Modal>
    </section>
  );
};

export default Projects;
