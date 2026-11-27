import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Server,
  Shield,
  ChevronDown,
  Lightbulb,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  MapPin,
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ArchitectureDiagram from './ArchitectureDiagram';
import CodeSnippetBlock from './CodeSnippetBlock';
import { isPlaceholderUrl, handleProjectLinkClick } from '../../utils/projectLinks';

const CaseStudyModalContent = ({ project }) => {
  const { caseStudy } = project;
  const [openTroubleshootingId, setOpenTroubleshootingId] = useState(
    caseStudy.troubleshooting?.[0]?.id || null
  );

  const hasLiveLink = project.demo && project.demo !== '#' && !isPlaceholderUrl(project.demo);

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-10">
      {/* Header */}
      <header className="space-y-5 pr-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge>{project.category}</Badge>
          {project.status && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-500">
              Status: {project.status}
            </span>
          )}
          {project.region && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-muted)]">
              <MapPin size={12} className="text-primary" />
              {project.region}
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
          {project.title}
        </h2>

        <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed max-w-4xl">
          {caseStudy.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] font-medium text-xs sm:text-sm"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button
            icon={Github}
            onClick={() => handleProjectLinkClick(project.github)}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isPlaceholderUrl(project.github) ? project.github : 'GitHub Repository'}
          </Button>
          {hasLiveLink && (
            <Button
              variant="outline"
              icon={ExternalLink}
              onClick={() => window.open(project.demo, '_blank', 'noopener,noreferrer')}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Live Deployment
            </Button>
          )}
        </div>
      </header>

      {/* Architecture Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        aria-labelledby="case-study-arch-heading"
        className="space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Server size={18} />
          </div>
          <h3 id="case-study-arch-heading" className="text-xl sm:text-2xl font-bold">
            Infrastructure Architecture
          </h3>
        </div>
        <ArchitectureDiagram />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] flex items-start gap-2.5">
            <Shield size={16} className="text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Security Group</p>
              <p className="text-[var(--text-muted)]">Inbound limited to ports 22, 80, and 443.</p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] flex items-start gap-2.5">
            <Server size={16} className="text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Runtime Matching</p>
              <p className="text-[var(--text-muted)]">PHP-FPM 8.2 via packages.sury.org on Ubuntu 26.04 LTS.</p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Least-Privilege Setup</p>
              <p className="text-[var(--text-muted)]">www-data web ownership & dedicated MySQL 8.4 user.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Deployment Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        aria-labelledby="case-study-timeline-heading"
        className="space-y-5"
      >
        <h3 id="case-study-timeline-heading" className="text-xl sm:text-2xl font-bold flex items-center gap-2.5">
          <span className="w-6 h-1 bg-primary rounded-full" />
          Deployment Timeline (7 Steps)
        </h3>

        <ol className="relative border-l-2 border-primary/25 ml-3 sm:ml-4 space-y-6">
          {caseStudy.timeline.map((item, idx) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="pl-6 sm:pl-8 relative"
            >
              <span className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold flex items-center justify-center shadow-md shadow-primary/25">
                {item.step}
              </span>
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)]">
                <h4 className="font-bold text-base sm:text-lg mb-1.5">{item.title}</h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.detail}
                </p>
                {item.snippet && (
                  <CodeSnippetBlock
                    code={item.snippet}
                    language={item.snippetLang || 'bash'}
                  />
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      {/* Troubleshooting Accordion */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        aria-labelledby="case-study-troubleshooting-heading"
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 id="case-study-troubleshooting-heading" className="text-xl sm:text-2xl font-bold flex items-center gap-2.5">
            <AlertTriangle size={20} className="text-amber-500 shrink-0" />
            Troubleshooting Log (6 Real Issues Solved)
          </h3>
          <span className="text-xs text-[var(--text-muted)]">
            Problem → Root cause → Fix
          </span>
        </div>

        <div className="space-y-3">
          {caseStudy.troubleshooting.map((issue, idx) => {
            const isOpen = openTroubleshootingId === issue.id;
            const panelId = `troubleshoot-panel-${issue.id}`;
            const triggerId = `troubleshoot-trigger-${issue.id}`;

            return (
              <div
                key={issue.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden"
              >
                <h4>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenTroubleshootingId(isOpen ? null : issue.id)
                    }
                    className="w-full px-4 sm:px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-500 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-sm sm:text-base truncate">
                        {issue.problem}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-[var(--text-muted)] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                </h4>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[var(--border)] space-y-3 text-xs sm:text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                            <p className="text-[11px] uppercase tracking-wider font-bold text-amber-500 mb-1">
                              Root Cause
                            </p>
                            <p className="text-[var(--text-muted)] leading-relaxed">
                              {issue.rootCause}
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                            <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-500 mb-1">
                              Fix Applied
                            </p>
                            <p className="text-[var(--text-muted)] leading-relaxed">
                              {issue.fix}
                            </p>
                          </div>
                        </div>
                        {issue.snippet && (
                          <CodeSnippetBlock
                            code={issue.snippet}
                            language={issue.snippetLang || 'bash'}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* What I Learned & Planned Next */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          aria-labelledby="case-study-learned-heading"
          className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-4"
        >
          <h3 id="case-study-learned-heading" className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <Lightbulb size={18} className="text-primary shrink-0" />
            What I Learned
          </h3>
          <ul className="space-y-3">
            {caseStudy.learned.map((item) => (
              <li key={item.title} className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold">{item.title}: </span>
                  <span className="text-[var(--text-muted)]">{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          aria-labelledby="case-study-planned-heading"
          className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 id="case-study-planned-heading" className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Rocket size={18} className="text-secondary shrink-0" />
              Planned Next
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/15 text-secondary border border-secondary/30">
              PLANNED (NOT DONE)
            </span>
          </div>
          <ul className="space-y-2.5">
            {caseStudy.plannedNext.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]"
              >
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </div>
  );
};

export default CaseStudyModalContent;
