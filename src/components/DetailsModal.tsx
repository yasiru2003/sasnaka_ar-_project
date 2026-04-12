'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music, Accessibility, User, Mic2, Star, Award, BookOpen } from 'lucide-react';
import Modal from './Modal';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const CategoryCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ scale: 1.02, backgroundColor: 'rgba(197, 160, 89, 0.08)' }}
    style={{
      padding: '14px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(197, 160, 89, 0.15)',
      borderRadius: '8px',
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      cursor: 'default',
      transition: 'border-color 0.3s'
    }}
    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.4)')}
    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.15)')}
  >
    <div style={{
      width: '36px',
      height: '36px',
      flexShrink: 0,
      borderRadius: '50%',
      backgroundColor: 'rgba(197, 160, 89, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--theatre-gold)'
    }}>
      <Icon size={18} />
    </div>
    <div style={{ overflow: 'hidden' }}>
      <h4 style={{ color: 'var(--theatre-gold)', margin: 0, fontSize: '0.95rem', letterSpacing: '0.05em' }}>{title}</h4>
      <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: '2px 0 0', fontSize: '0.8rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{description}</p>
    </div>
  </motion.div>
);

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, onRegister }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="The Grand Experience">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '15px' }}
      >
        <motion.div variants={itemVariants} style={{ marginBottom: '32px' }}>
          <div style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '1.1rem', 
            lineHeight: '1.8',
            textAlign: 'left',
            padding: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(197, 160, 89, 0.15)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
          }}>
            <p style={{ marginBottom: '16px' }}>
              <span style={{ color: 'var(--theatre-gold)', fontWeight: 'bold' }}>Sasnaka Sansada Talent Show 2026</span>, titled <span style={{ color: 'var(--theatre-gold)', fontWeight: 'bold' }}>ZENTAGE</span>, is a groundbreaking cultural event that brings together tradition and modern creativity on one stage.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Building on the success of past events, it creates a powerful platform for youth to showcase talents in dancing, music, and performance. 
            </p>
            <p style={{ marginBottom: '0' }}>
              By blending a traditional mindset with a new-age creative vision, this show highlights the <span style={{ fontStyle: 'italic', color: 'var(--theatre-gold)' }}>“Unseen Legacy”</span> of heritage while inspiring innovation, unity, and artistic expression for a new generation.
            </p>
          </div>
        </motion.div>

      </motion.div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.5)', 
          fontSize: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px'
        }}>
          For more details, contact: 
          <a 
            href="tel:+94771768769" 
            style={{ 
              color: 'var(--theatre-gold)', 
              fontWeight: 'bold', 
              fontSize: '1.2rem',
              textDecoration: 'none',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            077 176 8769
          </a>
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(197, 160, 89, 0.4)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onRegister}
        style={{
          width: '100%',
          padding: '18px',
          backgroundColor: 'var(--theatre-gold)',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          cursor: 'pointer',
          marginTop: '15px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
        }}
      >
        Register Now
      </motion.button>
    </Modal>
  );
};

export default DetailsModal;
