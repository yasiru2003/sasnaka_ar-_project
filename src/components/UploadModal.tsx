'use client';

import React, { useState } from 'react';
import Modal from './Modal';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhone?: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, initialPhone = '' }) => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    phone: initialPhone,
    videoUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationNumber: formData.registrationNumber,
          phone: formData.phone,
          videoUrl: formData.videoUrl
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit entry');
      }
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(197, 160, 89, 0.3)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '1rem',
    marginBottom: '20px',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const labelStyle = {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Your Entry">
      {success ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎬</div>
          <h3 style={{ color: 'var(--theatre-gold)', marginBottom: '10px' }}>Entry Received!</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Thank you for sharing your talent.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.5)', 
            fontSize: '0.9rem', 
            marginBottom: '20px',
            textAlign: 'center' 
          }}>
            Please provide your assigned Registration Number (e.g., G/001) to link your video entry.
          </p>
          
          {error && (
            <div style={{ 
              color: '#ff4444', 
              backgroundColor: 'rgba(255, 68, 68, 0.1)', 
              padding: '10px', 
              borderRadius: '4px', 
              marginBottom: '20px',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              required
              style={inputStyle}
              placeholder="e.g. 0771234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'var(--theatre-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 160, 89, 0.3)'}
            />
          </div>

          <div>
            <label style={labelStyle}>Registration Number</label>
            <input
              type="text"
              required
              style={inputStyle}
              placeholder="e.g. G/001"
              value={formData.registrationNumber}
              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'var(--theatre-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 160, 89, 0.3)'}
            />
          </div>

          <div>
            <label style={labelStyle}>Video URL (YouTube/Drive/Vimeo)</label>
            <input
              type="url"
              required
              style={inputStyle}
              placeholder="https://..."
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'var(--theatre-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 160, 89, 0.3)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: 'var(--theatre-gold)',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: '10px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {loading ? 'Uploading...' : 'Submit Entry'}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default UploadModal;
