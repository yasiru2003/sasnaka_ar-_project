'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CurtainsProps {
  isOpening: boolean;
}

const Curtains: React.FC<CurtainsProps> = ({ isOpening }) => {
  return (
    <div className="absolute inset-0 flex pointer-events-none overflow-hidden" 
         style={{ zIndex: 11, position: 'absolute', inset: 0, display: 'flex' }}>
      
      {/* Left Curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ 
          x: isOpening ? "-85%" : "0%",
          skewX: isOpening ? -5 : 0 
        }}
        transition={{ 
          delay: 0.5, 
          duration: 1.5, 
          ease: [0.45, 0, 0.55, 1], // Custom cubic-bezier for "heavy" feel
        }}
        style={{
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, #5c0505 0%, #8b0000 50%, #4a0404 100%)',
          boxShadow: '20px 0 50px rgba(0,0,0,0.8)',
          position: 'relative',
          borderRight: '2px solid rgba(197, 160, 89, 0.3)'
        }}
      >
        {/* Fabric Folds (Simulated with gradients) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.2) 41px, transparent 80px)',
          opacity: 0.4
        }} />
        
        {/* Curtain Rope / Gold Border Placeholder */}
        <div style={{
          position: 'absolute',
          right: '5%',
          bottom: '20%',
          width: '4px',
          height: '60%',
          backgroundColor: '#c5a059',
          boxShadow: '0 0 10px rgba(197, 160, 89, 0.5)',
          borderRadius: '2px'
        }} />
      </motion.div>

      {/* Right Curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ 
          x: isOpening ? "85%" : "0%",
          skewX: isOpening ? 5 : 0
        }}
        transition={{ 
          delay: 0.5, 
          duration: 1.5, 
          ease: [0.45, 0, 0.55, 1],
        }}
        style={{
          width: '50%',
          height: '100%',
          background: 'linear-gradient(270deg, #5c0505 0%, #8b0000 50%, #4a0404 100%)',
          boxShadow: '-20px 0 50px rgba(0,0,0,0.8)',
          position: 'relative',
          borderLeft: '2px solid rgba(197, 160, 89, 0.3)'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.2) 41px, transparent 80px)',
          opacity: 0.4
        }} />
        
        <div style={{
          position: 'absolute',
          left: '5%',
          bottom: '20%',
          width: '4px',
          height: '60%',
          backgroundColor: '#c5a059',
          boxShadow: '0 0 10px rgba(197, 160, 89, 0.5)',
          borderRadius: '2px'
        }} />
      </motion.div>
    </div>
  );
};

export default Curtains;
