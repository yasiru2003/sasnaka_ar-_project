'use client';

import React, { useState } from 'react';
import Modal from './Modal';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadNow: (email: string) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onUploadNow }) => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    name: '',
    email: '',
    district: '',
    category: 'Traditional Dance'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }
      
      setSuccess(true);
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

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.2s'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Talent Registration">
      {success ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>✨</div>
          <h3 style={{ color: 'var(--theatre-gold)', marginBottom: '10px', fontSize: '1.5rem' }}>Registration Successful!</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '30px' }}>
            Would you like to upload your talent entry video now, or do it later?
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              onClick={() => onUploadNow(formData.email)}
              style={{
                ...buttonStyle,
                backgroundColor: 'var(--theatre-gold)',
                color: '#000',
                border: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Upload Talent Now
            </button>
            <button
              onClick={onClose}
              style={{
                ...buttonStyle,
                backgroundColor: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              I'll Upload Later
            </button>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', marginTop: '20px' }}>
            Note: You can always login later using your email to upload.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
            <label style={labelStyle}>Registration Number (e.g. G/001)</label>
            <input
              type="text"
              required
              placeholder="Assigned at on-ground stall"
              style={inputStyle}
              value={formData.registrationNumber}
              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'var(--theatre-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 160, 89, 0.3)'}
            />
          </div>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              required
              style={inputStyle}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'var(--theatre-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 160, 89, 0.3)'}
            />
          </div>

          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              required
              style={inputStyle}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'var(--theatre-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 160, 89, 0.3)'}
            />
          </div>

          <div>
            <label style={labelStyle}>District</label>
            <select
              required
              style={inputStyle}
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'var(--theatre-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 160, 89, 0.3)'}
            >
              <option value="" disabled style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>Select District</option>
              {["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"].map(d => (
                <option key={d} value={d} style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Performance Category</label>
            <select
              style={inputStyle}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              onFocus={(e) => e.target.style.borderColor = 'var(--theatre-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 160, 89, 0.3)'}
            >
              <option value="Traditional Dance" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>Traditional Dance</option>
              <option value="Contemporary Dance & Drama" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>Contemporary Dance & Drama</option>
              <option value="Vocal" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>Vocal</option>
              <option value="Instruments" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>Instruments</option>
              <option value="Other" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>Other</option>
            </select>
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
            {loading ? 'Processing...' : 'Complete Registration'}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default RegistrationModal;
