'use client';

import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, ExternalLink } from 'lucide-react';

interface AdminQRCodeProps {
  url: string;
  logoPath: string;
}

const AdminQRCode: React.FC<AdminQRCodeProps> = ({ url, logoPath }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);

  useEffect(() => {
    // We only initialize qr-code-styling on the client
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'svg',
      data: url,
      image: logoPath,
      dotsOptions: {
        color: '#c5a059', // Theatre Gold
        type: 'extra-rounded'
      },
      cornersSquareOptions: {
        color: '#c5a059',
        type: 'extra-rounded'
      },
      backgroundOptions: {
        color: 'transparent',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10,
        imageSize: 0.4
      }
    });

    if (qrRef.current) {
      qr.append(qrRef.current);
    }
    setQrCode(qr);

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, [url, logoPath]);

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      name: 'sasnaka_talent_show_qr',
      extension: 'png'
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      padding: '30px',
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      border: '1px solid rgba(197, 160, 89, 0.2)'
    }}>
      <div 
        ref={qrRef} 
        style={{ 
          padding: '20px', 
          backgroundColor: '#fff', 
          borderRadius: '12px',
          boxShadow: '0 0 40px rgba(197, 160, 89, 0.2)'
        }} 
      />
      
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--theatre-gold)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '5px' }}>
          Portal URL:
        </p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '0.85rem', 
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          {url} <ExternalLink size={14} />
        </a>
      </div>

      <button
        onClick={onDownloadClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 24px',
          backgroundColor: 'var(--theatre-gold)',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <Download size={18} /> Download High-Res PNG
      </button>
      
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', maxWidth: '250px', textAlign: 'center' }}>
        This QR code is optimized for print marketing and includes the Sasnaka logo.
      </p>
    </div>
  );
};

export default AdminQRCode;
