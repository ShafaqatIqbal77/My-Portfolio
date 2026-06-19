import React, { useCallback, useState, useEffect } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Use slim version for better performance

const ParticlesBg = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const particlesInit = useCallback(async engine => {
    try {
      await loadSlim(engine);
    } catch (error) {
      console.error("Failed to load particles engine:", error);
    }
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60, // Limit FPS for better performance
        particles: {
          number: { 
            value: isMobile ? 30 : 80, // Fewer particles on mobile
            density: { enable: true, value_area: 800 } 
          },
          color: { value: "#6366f1" },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: !isMobile, // Disable lines on mobile for better performance
            distance: 150,
            color: "#6366f1",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: isMobile ? 0.5 : 1, // Slower on mobile
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: !isMobile, mode: "grab" }, // Disable hover effects on mobile
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: isMobile ? 2 : 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      }}
    />
  );
};

export default ParticlesBg;
