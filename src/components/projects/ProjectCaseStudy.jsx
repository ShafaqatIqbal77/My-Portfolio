import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, ExternalLink, Server, Globe,
  ChevronDown, Copy, Check, Lightbulb, Rocket, Terminal
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

/* ---------- Inline SVG architecture diagram (theme-aware via CSS vars) ---------- */
const ArchitectureDiagram = () => {
  const box = {
    fill: 'var(--bg-card)',
    stroke: 'var(--primary)',
    strokeWidth: 1.5,
    rx: 10,
  };
  const innerBox = { ...box, stroke: 'var(--secondary)', strokeWidth: 1.2, rx: 8 };
  const label = { fill: 'var(--text-primary)', fontSize: 13, fontWeight: 600, textAnchor: 'middle' };
  const small = { fill: 'var(--text-muted)', fontSize: 10.5, textAnchor: 'middle' };

  return (
    <svg
      viewBox="0 0 980 320"
      className="w-full h-auto"
      role="img"
      aria-label="Architecture diagram: Browser connects through the internet to an AWS EC2 instance inside a security group running Nginx, PHP-FPM, Laravel and MySQL"
    >
      <defs>
        <marker id="cs-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* Browser */}
      <rect x="20" y="128" width="120" height="64" {...box} />
      <text x="80" y="155" {...label}>Browser</text>
      <text x="80" y="172" {...small}>HTTPS request</text>

      {/* Arrow Browser -> Internet */}
      <line x1="140" y1="160" x2="185" y2="160" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#cs-arrow)" />

      {/* Internet */}
      <ellipse cx="235" cy="160" rx="52" ry="34" {...box} stroke="var(--accent)" />
      <text x="235" y="157" {...label}>Internet</text>
      <text x="235" y="172" {...small}>AWS network</text>

      {/* Arrow Internet -> EC2 */}
      <line x1="287" y1="160" x2="330" y2="160" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#cs-arrow)" />

      {/* Security Group (dashed, wraps EC2) */}
      <rect x="312" y="14" width="648" height="292" rx="18"
        fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeDasharray="8 6" />
      <g>
        <rect x="330" y="24" width="238" height="24" rx="12" fill="var(--bg-card)" stroke="var(--secondary)" strokeWidth="1" />
        <text x="449" y="40" {...small} fill="var(--text-primary)" fontSize="11.5" fontWeight="600">
          <tspan>Security Group — only ports 22, 80, 443 open</tspan>
        </text>
      </g>

      {/* EC2 instance */}
      <rect x="330" y="58" width="612" height="236" rx="14" {...box} strokeWidth="2" />
      <text x="345" y="80" {...small} textAnchor="start" fontSize="12" fontWeight="700" fill="var(--text-primary)">
        AWS EC2 · Ubuntu 26.04 LTS · {`ap-southeast-2`}
      </text>

      {/* Inner chain: Nginx -> PHP-FPM -> Laravel -> MySQL */}
      {[
        { x: 352, label: 'Nginx', sub: 'reverse proxy :80' },
        { x: 512, label: 'PHP-FPM 8.2', sub: 'unix socket' },
        { x: 672, label: 'Laravel 9', sub: '/var/www app' },
        { x: 832, label: 'MySQL 8.4', sub: 'least-priv user' },
      ].map((n, i, arr) => (
        <g key={n.label}>
          <rect x={n.x} y="130" width="120" height="72" {...innerBox} />
          <text x={n.x + 60} y="158" {...label} fontSize="12.5">{n.label}</text>
          <text x={n.x + 60} y="176" {...small}>{n.sub}</text>
          {i < arr.length - 1 && (
            <line x1={n.x + 122} y1="166" x2={n.x + 158} y2="166" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#cs-arrow)" />
          )}
        </g>
      ))}

      {/* SSH note */}
      <text x="345" y="240" {...small} textAnchor="start">
        <tspan>Deployed manually over SSH · git clone for updates · credentials in .env (never committed)</tspan>
      </text>
    </svg>
  );
};

/* ---------- Copy-able code block ---------- */
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. non-secure context) — no-op
    }
  };

  return (
    <div className="relative mt-3 rounded-xl overflow-hidden border border-[var(--border)] bg-black/60">
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      </button>
      <pre className="p-4 pt-5 overflow-x-auto text-left">
        <code className="font-mono text-xs sm:text-sm text-emerald-300 whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

/* ---------- Troubleshooting accordion item ---------- */
const TroubleItem = ({ item, index }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--bg-primary)]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start gap-3 p-4 sm:p-5 text-left hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="shrink-0 w-7 h-7 rounded-full bg-red-500/10 text-red-500 border border-red-500/30 flex items-center justify-center text-xs font-bold">
          {index + 1}
        </span>
        <span className="flex-1">
          <span className="block font-bold text-sm sm:text-base">{item.problem}</span>
          <span className="block text-[var(--text-muted)] text-xs sm:text-sm mt-0.5 line-clamp-1">
            {item.cause}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 mt-1 text-[var(--text-muted)] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 pl-14 sm:pl-16 space-y-3">
              <p className="text-sm text-[var(--text-muted)]">
                <span className="font-bold text-[var(--text-primary)]">Root cause: </span>{item.cause}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                <span className="font-bold text-emerald-500">Fix: </span>{item.fix}
              </p>
              {item.code && <CodeBlock code={item.code} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 }
};

const SectionTitle = ({ icon: Icon, children, accent }) => (
  <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-2">
    <span className={`w-6 h-1 rounded-full ${accent || 'bg-primary'}`} />
    <Icon size={18} className="text-primary" />
    {children}
  </h3>
);

const ProjectCaseStudy = ({ project }) => {
  const study = project.caseStudy;

  return (
    <div className="p-5 sm:p-8 lg:p-10 overflow-y-auto">
      {/* Header */}
      <motion.header {...fadeUp} className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge>{project.category}</Badge>
          {project.status && (
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
              {project.status}
            </Badge>
          )}
          <span className="text-xs text-[var(--text-muted)] ml-auto flex items-center gap-1.5">
            <Server size={13} /> Region: {study.region}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">{project.title}</h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-5 max-w-3xl">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span key={i} className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-xs font-bold uppercase text-primary/80">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.github && (
            <Button icon={Github} onClick={() => window.open(project.github, '_blank')}>
              GitHub
            </Button>
          )}
          {project.demo && project.demo !== '#' && (
            <Button variant="outline" icon={ExternalLink} onClick={() => window.open(project.demo, '_blank')}>
              Live Demo
            </Button>
          )}
        </div>
      </motion.header>

      {/* Architecture diagram */}
      <motion.section {...fadeUp} className="mb-10">
        <SectionTitle icon={Globe}>Architecture</SectionTitle>
        <div className="glass rounded-2xl border border-[var(--border)] p-4 sm:p-6 overflow-x-auto">
          <ArchitectureDiagram />
        </div>
      </motion.section>

      {/* Deployment timeline */}
      <motion.section {...fadeUp} className="mb-10">
        <SectionTitle icon={Server}>Deployment Timeline</SectionTitle>
        <ol className="relative border-l-2 border-[var(--border)] ml-3 space-y-6">
          {study.steps.map((step, i) => (
            <li key={i} className="relative pl-8">
              <span className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-[11px] font-bold flex items-center justify-center border-2 border-[var(--bg-primary)]">
                {i + 1}
              </span>
              <h4 className="font-bold text-sm sm:text-base mb-1">{step.title}</h4>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.detail}</p>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* Troubleshooting */}
      <motion.section {...fadeUp} className="mb-10">
        <SectionTitle icon={Terminal} accent="bg-red-500">Troubleshooting Log</SectionTitle>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Six real problems hit during deployment — each diagnosed from logs and fixed on the server.
        </p>
        <div className="space-y-3">
          {study.troubleshooting.map((item, i) => (
            <TroubleItem key={i} item={item} index={i} />
          ))}
        </div>
      </motion.section>

      {/* What I learned */}
      <motion.section {...fadeUp} className="mb-10">
        <SectionTitle icon={Lightbulb} accent="bg-amber-500">What I Learned</SectionTitle>
        <ul className="space-y-3">
          {study.learned.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-muted)] leading-relaxed">
              <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Planned next */}
      <motion.section {...fadeUp} className="mb-4">
        <SectionTitle icon={Rocket} accent="bg-cyan-500">Planned Next</SectionTitle>
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
            PLANNED — not yet implemented
          </Badge>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {study.planned.map((item, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)] glass rounded-xl border border-[var(--border)] px-4 py-3">
              <Rocket size={15} className="text-cyan-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  );
};

export default ProjectCaseStudy;
