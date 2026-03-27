'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Curtains from './Curtains';

interface TheatreProps {
  children: React.ReactNode;
}

const Theatre: React.FC<TheatreProps> = ({ children }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Stage 1: Fade in from black (0-2s)
    const startTimeout = setTimeout(() => setIsStarted(true), 1000);
    
    // Stage 4: Content fades in (6s)
    const contentTimeout = setTimeout(() => setShowContent(true), 6000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(contentTimeout);
    };
  }, []);

  return (
    <div className="theatre-container">
      {/* Layer 0: Theatre Stage Background */}
      <div 
        className="theatre-bg-image"
        style={{
          position: 'absolute',
          inset: '-5%', // slight bleed for parallax/shake movement if we add it
          backgroundImage: "url('/images/theatre-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3) saturate(1.2)', // Darken for the cinematic feel
          zIndex: 0
        }}
      />

      {/* Layer 1: Light Beams */}
      <div className="light-beams" style={{ zIndex: 1 }} />
      {/* Layer 2: Black Overlay (Initial Fade) */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundColor: 'black', 
          zIndex: 20,
          pointerEvents: 'none'
        }}
      />

      {/* Layer 3: Spotlight */}
      <AnimatePresence>
        {isStarted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, duration: 2, ease: "easeOut" }}
            className="spotlight"
          />
        )}
      </AnimatePresence>

      {/* Layer 4: Curtains */}
      <Curtains isOpening={isStarted} />

      {/* Layer 5: Dust Particles */}
      <div className="dust-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-20%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              backgroundColor: 'white',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Layer 6: Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ zIndex: 30, position: 'relative' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Theatre;
