import React from 'react';
import { motion } from 'framer-motion';
import { personal } from '../../data/personal';
import SectionHeading from '../ui/SectionHeading';
import { Github, Code, Flame, Star } from 'lucide-react';

const GitHubStats = () => {
  const username = personal.github.split('/').pop() || "ShafaqatIqbal77";

  const stats = [
    {
      title: "GitHub Stats",
      url: `https://ghchart.rshah.org/${username}.png`,
      icon: Github,
      delay: 0.1,
      fallback: "GitHub contribution graph showing activity"
    },
    {
      title: "Repository Stats",
      url: `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=transparent&hide_border=true&title_color=6366f1&icon_color=6366f1&text_color=94a3b8&bg_color=00000000`,
      icon: Code,
      delay: 0.2,
      fallback: "Repository statistics and languages"
    },
    {
      title: "Current Streak",
      url: `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&hide_border=true&stroke=6366f1&ring=6366f1&fire=6366f1&currStreakNum=6366f1&sideNums=94a3b8&sideLabels=94a3b8&dates=94a3b8&bg_color=00000000`,
      icon: Flame,
      delay: 0.3,
      fallback: "Contribution streak statistics"
    }
  ];

  return (
    <section id="github" className="py-16 md:py-24 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading 
          subtitle="Activity"
          title="My GitHub Stats"
          description="A real-time overview of my open source contributions and coding activity."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay }}
              whileHover={{ y: -10 }}
              className="glass p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[var(--border)] hover:border-primary/50 transition-all duration-500 group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                  <stat.icon size={18} className="sm:w-5 sm:h-5" />
                </div>
                <h4 className="font-bold text-base sm:text-lg">{stat.title}</h4>
              </div>
              <div className="flex justify-center items-center bg-black/10 rounded-xl sm:rounded-2xl p-2 sm:p-4 overflow-hidden flex-grow min-h-[150px]">
                <img 
                  src={stat.url} 
                  alt={stat.title} 
                  className="w-full h-auto max-h-[200px] object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-center text-[var(--text-muted)] p-4 sm:p-8 w-full">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon size={24} className="sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <p className="text-xs sm:text-sm">{stat.fallback}</p>
                  <p className="text-[10px] sm:text-xs mt-2 text-[var(--text-muted)]">Unable to load stats</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Static Contribution Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-12 glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[var(--border)]"
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
              <Star size={18} className="sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-bold text-base sm:text-lg">Contribution Activity</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="p-4 sm:p-6 bg-black/10 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">25</div>
              <div className="text-xs sm:text-sm text-[var(--text-muted)]">Total Contributions</div>
            </div>
            <div className="p-4 sm:p-6 bg-black/10 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1 sm:mb-2">3</div>
              <div className="text-xs sm:text-sm text-[var(--text-muted)]">Current Streak</div>
              <div className="text-[10px] sm:text-xs text-[var(--text-muted)] mt-1">May 2 - May 4</div>
            </div>
            <div className="p-4 sm:p-6 bg-black/10 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">3</div>
              <div className="text-xs sm:text-sm text-[var(--text-muted)]">Longest Streak</div>
              <div className="text-[10px] sm:text-xs text-[var(--text-muted)] mt-1">May 2 - May 4</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
