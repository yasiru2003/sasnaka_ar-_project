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
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '1rem', 
            lineHeight: '1.7',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            "Where curtains rise and dreams take flight. Join the legacy of Sasnaka Sansada."
          </p>
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Star size={18} color="var(--theatre-gold)" />
            <h3 style={{ color: 'var(--theatre-gold)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
              Performance Categories
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            <CategoryCard icon={Mic2} title="Singing" description="Solo or group vocal performances across all genres." index={0} />
            <CategoryCard icon={Accessibility} title="Dancing" description="Contemporary, classical, or cultural dance acts." index={1} />
            <CategoryCard icon={User} title="Acting" description="Drama, monologues, or theatrical sketches." index={2} />
            <CategoryCard icon={Music} title="Instrumental" description="Showcase your mastery over any instrument." index={3} />
            <CategoryCard icon={BookOpen} title="Rules" description="15-30 years old | Max 3 mins video | Be original." index={4} />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Award size={18} color="var(--theatre-gold)" />
            <h3 style={{ color: 'var(--theatre-gold)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
              Grand Prizes
            </h3>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(197, 160, 89, 0.05)', 
            padding: '24px', 
            borderRadius: '12px',
            border: '1px dashed rgba(197, 160, 89, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px' }}>LKR 100,000</div>
            <div style={{ color: 'var(--theatre-gold)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Grand Finale Prize</div>
          </div>
        </motion.div>
      </motion.div>

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
          marginTop: '20px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
        }}
      >
        Register Now
      </motion.button>
    </Modal>
  );
};

export default DetailsModal;
