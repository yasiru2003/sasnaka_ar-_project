'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  Video, 
  LayoutDashboard, 
  LogOut, 
  ArrowRight,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  QrCode
} from 'lucide-react';
import AdminQRCode from '@/components/AdminQRCode';

interface Participant {
  id: string;
  registrationNumber: string;
  name: string;
  phone: string;
  district: string;
  category: string[];
  entry_video_url: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [error, setError] = useState<string | null>(null);

  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  const fetchParticipants = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/participants');
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setParticipants(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchParticipants();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminSecret) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Invalid password');
    }
  };

  const filteredParticipants = useMemo(() => {
    return participants.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'All' || p.category.includes(categoryFilter);
      
      return matchesSearch && matchesCategory;
    });
  }, [participants, searchTerm, categoryFilter]);

  const categories = useMemo(() => {
    const cats = new Set(participants.flatMap(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [participants]);

  const exportToCSV = () => {
    const headers = ['Reg No', 'Name', 'Phone', 'District', 'Category', 'Video URL', 'Date'];
    const rows = filteredParticipants.map(p => [
      p.registrationNumber,
      p.name,
      p.phone,
      p.district,
      p.category.join('; '),
      p.entry_video_url || 'N/A',
      new Date(p.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sasnaka_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <main style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, var(--theatre-purple) 0%, var(--background) 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(197, 160, 89, 0.2)',
            borderRadius: '16px',
            padding: '40px',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--theatre-gold-glow)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'var(--theatre-gold)'
          }}>
            <LayoutDashboard size={30} />
          </div>
          <h1 style={{ color: 'var(--theatre-gold)', marginBottom: '10px', fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Admin Access</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', fontSize: '0.9rem' }}>Secure portal for Sasnaka Sansada admins</p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                marginBottom: '20px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--theatre-gold)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            {error && <p style={{ color: '#ff4444', fontSize: '0.8rem', marginBottom: '15px' }}>{error}</p>}
            <button 
              type="submit"
              className="pulse-gold"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--theatre-gold)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              Sign In <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px', backgroundColor: '#050505' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ color: 'var(--theatre-gold)', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '5px' }}>Dashboard</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Sasnaka Sansada Talent Show Registry</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={fetchParticipants}
              disabled={loading}
              style={{
                padding: '10px 15px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem'
              }}
            >
              <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              style={{
                padding: '10px 15px',
                backgroundColor: 'rgba(255,68,68,0.1)',
                border: '1px solid rgba(255,68,68,0.2)',
                borderRadius: '8px',
                color: '#ff4444',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem'
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '20px', 
          marginBottom: '40px' 
        }}>
          {[
            { label: 'Total Registrations', value: participants.length, icon: Users, color: 'var(--theatre-gold)' },
            { label: 'Uploaded Entries', value: participants.filter(p => p.entry_video_url).length, icon: Video, color: '#44ff44' },
            { label: 'Traditional Dance', value: participants.filter(p => p.category.includes('Traditional Dance')).length, icon: CheckCircle2, color: '#44ccff' },
            { label: 'Other Categories', value: participants.filter(p => !p.category.includes('Traditional Dance')).length, icon: CheckCircle2, color: '#ffcc44' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '12px', 
                backgroundColor: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color
              }}>
                <stat.icon size={24} />
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
                <p style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marketing Assets & QR Code */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Marketing Assets
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
            <AdminQRCode 
              url="https://sasnaka-ar-project-kuio.vercel.app/" 
              logoPath="/images/sasnaka-logo.png" 
            />
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: '16px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{ color: 'var(--theatre-gold)', marginBottom: '15px' }}>Public Access QR</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '20px' }}>
                Use this high-resolution QR code for printed posters, flyers, and social media announcements. It directs users straight to the talent portal lander.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ 
                  backgroundColor: 'rgba(197, 160, 89, 0.1)', 
                  color: 'var(--theatre-gold)', 
                  padding: '6px 12px', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem' 
                }}>
                  Branded with Logo
                </span>
                <span style={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)', 
                  color: '#fff', 
                  padding: '6px 12px', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem' 
                }}>
                  300x300 PNG
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '15px' 
        }}>
          <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} size={18} />
              <input 
                placeholder="Search by name, phone or reg no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 15px 10px 40px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Filter style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} size={16} />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  padding: '10px 15px 10px 35px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button 
            onClick={exportToCSV}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--theatre-gold)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Table Container */}
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <tr>
                  {['Reg No', 'Participant Name', 'Category', 'District', 'Video Link', 'Registered'].map(h => (
                    <th key={h} style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredParticipants.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ color: 'var(--theatre-gold)', fontWeight: 'bold', fontFamily: 'monospace' }}>{p.registrationNumber}</span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ color: '#fff', fontWeight: 500 }}>{p.name}</div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>{p.phone}</div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ 
                          padding: '4px 10px', 
                          borderRadius: '20px', 
                          fontSize: '0.75rem', 
                          backgroundColor: 'rgba(197, 160, 89, 0.1)', 
                          color: 'var(--theatre-gold)',
                          border: '1px solid rgba(197, 160, 89, 0.2)'
                        }}>
                          {p.category.join(', ')}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.8)' }}>{p.district}</td>
                      <td style={{ padding: '16px 20px' }}>
                        {p.entry_video_url ? (
                          <a 
                            href={p.entry_video_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                              color: '#44ccff', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '5px', 
                              textDecoration: 'none',
                              fontSize: '0.85rem'
                            }}
                          >
                            <Video size={14} /> View Video
                          </a>
                        ) : (
                          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>No entry</span>
                        )}
                      </td>
                      <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {filteredParticipants.length === 0 && !loading && (
            <div style={{ padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
              <AlertCircle size={40} style={{ margin: '0 auto 15px', display: 'block' }} />
              <p>No participants found matching your criteria</p>
            </div>
          )}
          {loading && (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--theatre-gold)' }}>
              <RefreshCcw size={30} className="animate-spin" style={{ margin: '0 auto 15px', display: 'block' }} />
              <p>Loading database...</p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </main>
  );
}
