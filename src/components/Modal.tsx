'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)'
    }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        style={{
          width: 'min(95%, 500px)',
          backgroundColor: '#0a0a0a',
          border: '1px solid var(--theatre-gold)',
          borderRadius: '8px',
          padding: 'var(--modal-padding, 40px)',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px var(--theatre-gold-glow)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.5)',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{
          textAlign: 'center',
          color: 'var(--theatre-gold)',
          fontSize: '1.8rem',
          marginBottom: '30px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          {title}
        </h2>

        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
