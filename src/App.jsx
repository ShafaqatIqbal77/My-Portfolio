import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';
import ScrollProgress from './components/layout/ScrollProgress';
import BackToTop from './components/layout/BackToTop';
import FloatingHireBtn from './components/layout/FloatingHireBtn';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Testimonials from './components/sections/Testimonials';
import GitHubStats from './components/sections/GitHubStats';
import Contact from './components/sections/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[var(--bg-primary)]">
        <div className="mesh-gradient opacity-[0.15] dark:opacity-[0.3]" />
        
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <GitHubStats />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
        <FloatingHireBtn />
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
          },
        }} />
      </div>
    </ThemeProvider>
  );
}

export default App;
