import React from 'react';
import { Link } from 'react-scroll';
import { Github, Linkedin, Twitter, Instagram, Heart } from 'lucide-react';
import { personal } from '../../data/personal';

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-secondary)] py-12 border-t border-[var(--border)]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Link to="home" smooth={true} className="cursor-pointer flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-2xl">
              {personal.name.split(" ").map(n => n[0]).join("")}
            </div>
            <span className="font-heading font-bold text-2xl">
              {personal.name.split(" ")[0]}<span className="gradient-text">{personal.name.split(" ")[1] || ""}</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                offset={-70}
                className="text-[var(--text-muted)] hover:text-primary transition-colors cursor-pointer font-medium"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-6">
            {[
              { icon: Github, href: personal.github },
              { icon: Linkedin, href: personal.linkedin },
              { icon: Twitter, href: personal.twitter },
              { icon: Instagram, href: personal.instagram },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-primary hover:border-primary transition-all duration-300"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-[var(--text-muted)] flex flex-col items-center gap-2">
            <p className="flex items-center gap-2">
              Made with <Heart size={16} className="text-red-500 fill-red-500" /> and React.js
            </p>
            <p>© 2026 {personal.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
