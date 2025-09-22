import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoFallback from '../logo.svg';
import { getSettings } from '../api';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [open, setOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await getSettings();
        setLogoUrl(res.data.logo_url || null);
      } catch (_) {}
    }
    if (user) loadSettings();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  const linkStyle = (path) => ({
    backgroundColor: location.pathname === path ? 'var(--primary-white)' : 'transparent',
    color: location.pathname === path ? 'var(--primary-black)' : 'var(--primary-white)',
    borderColor: 'var(--primary-white)',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem'
  });

  function NavLinks() {
    return (
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {user.role === 'admin' && (
          <>
            <button onClick={() => { setOpen(false); navigate('/backoffice'); }} className="btn" style={linkStyle('/backoffice')}>Back Office</button>
            <button onClick={() => { setOpen(false); navigate('/inventory'); }} className="btn" style={linkStyle('/inventory')}>Inventory</button>
            <button onClick={() => { setOpen(false); navigate('/users'); }} className="btn" style={linkStyle('/users')}>Users</button>
          </>
        )}
        {(user.role === 'admin' || user.role === 'cashier') && (
          <button onClick={() => { setOpen(false); navigate('/pos'); }} className="btn" style={linkStyle('/pos')}>POS</button>
        )}
        <button onClick={() => { setOpen(false); navigate('/settings'); }} className="btn" style={linkStyle('/settings')}>Settings</button>
      </div>
    );
  }

  const brandClick = () => navigate(user.role === 'admin' ? '/backoffice' : '/dashboard');

  return (
    <nav style={{
      backgroundColor: 'var(--primary-black)',
      color: 'var(--primary-white)',
      padding: '1rem 0',
      borderBottom: '3px solid var(--primary-white)'
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={logoUrl || logoFallback} alt="QuickTill" style={{ height: 36, display: 'block', cursor: 'pointer' }} onClick={brandClick} />
            <button className="btn mobile-only" onClick={() => setOpen(o=>!o)} style={{ padding: '8px 12px' }}>Menu</button>
          </div>
          <div className="desktop-only">
            <NavLinks />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right', fontSize: '0.9rem' }}>
              <div style={{ fontWeight: '600' }}>{user.name}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {user.role}
              </div>
            </div>
            <button onClick={handleLogout} className="btn" style={{ backgroundColor: 'transparent', color: 'var(--primary-white)', borderColor: 'var(--primary-white)', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button>
          </div>
        </div>
        {open && (
          <div className="mobile-only" style={{ marginTop: '0.75rem' }}>
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
}


