'use client';

import { useState } from 'react';
import Theatre from '@/components/Theatre';
import { motion, AnimatePresence } from 'framer-motion';
import RegistrationModal from '@/components/RegistrationModal';
import UploadModal from '@/components/UploadModal';
import DetailsModal from '@/components/DetailsModal';

export default function Home() {
  const [activeModal, setActiveModal] = useState<'details' | 'register' | 'upload' | null>(null);
  const [prefilledPhone, setPrefilledPhone] = useState('');

  const handleRegisterFromDetails = () => {
    setActiveModal('register');
  };

  const handleUploadNow = (phone: string) => {
    setPrefilledPhone(phone);
    setActiveModal('upload');
  };

  return (
    <main>
      <Theatre>
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 20px'
        }}>
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            style={{
              width: 'min(180px, 45vw)', // Smaller logo on mobile
              height: 'auto',
              margin: '0 auto 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src="/images/sasnaka-logo.png" 
              alt="Sasnaka Logo" 
              style={{
                width: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 0 20px rgba(0, 195, 255, 0.3))'
              }}
            />
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            style={{
              fontSize: '1.2rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--theatre-gold)',
              marginBottom: '10px',
              fontWeight: 300
            }}
          >
            Sasnaka Sansada Talent Show
          </motion.h2>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.8 }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 800,
              marginBottom: '30px',
              lineHeight: 1.1,
              background: 'linear-gradient(to bottom, #ffffff 50%, #c5a059 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            ZENTAGE 2026 <br /> 
            <span style={{ fontSize: '0.5em', letterSpacing: '0.3em', opacity: 0.8 }}>SASNAKA SANSADA TALENT SHOW</span>
            <div style={{ 
              fontSize: '0.35em', 
              letterSpacing: '0.5em', 
              marginTop: '15px', 
              color: 'var(--theatre-gold)', 
              fontWeight: 400,
              textTransform: 'uppercase'
            }}>
              Where Vintage meets GenZ
            </div>
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              margin: '0 auto',
              maxWidth: '100%'
            }}
          >
            <button 
              onClick={() => setActiveModal('details')}
              style={{
                padding: '14px 30px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s, border-color 0.2s',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              See Details
            </button>
            <button 
              onClick={() => setActiveModal('register')}
              className="pulse-gold"
              style={{
                padding: '14px 30px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                backgroundColor: 'var(--theatre-gold)',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                overflow: 'hidden',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(197, 160, 89, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(197, 160, 89, 0.3)';
              }}
            >
              <div className="shimmer-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
              Register Now
            </button>
            <button 
              onClick={() => {
                setPrefilledPhone('');
                setActiveModal('upload');
              }}
              style={{
                padding: '14px 30px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s, border-color 0.2s',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              Login / Upload
            </button>
          </motion.div>
        </div>
      </Theatre>

      <AnimatePresence>
        {activeModal === 'details' && (
          <DetailsModal 
            isOpen={true} 
            onClose={() => setActiveModal(null)} 
            onRegister={handleRegisterFromDetails}
          />
        )}
        {activeModal === 'register' && (
          <RegistrationModal 
            isOpen={true} 
            onClose={() => setActiveModal(null)} 
            onUploadNow={handleUploadNow}
          />
        )}
        {activeModal === 'upload' && (
          <UploadModal 
            isOpen={true} 
            onClose={() => setActiveModal(null)} 
            initialPhone={prefilledPhone}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800&display=swap');
      `}</style>
    </main>
  );
}
