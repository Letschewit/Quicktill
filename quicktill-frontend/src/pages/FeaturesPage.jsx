
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const features = [
  {
    icon: '🧾',
    title: 'Fast, Intuitive POS',
    desc: 'Process sales quickly with a user-friendly interface.'
  },
  {
    icon: '📦',
    title: 'Inventory Management',
    desc: 'Track stock levels, receive alerts, and manage suppliers.'
  },
  {
    icon: '📊',
    title: 'Sales Analytics',
    desc: 'Visualize sales trends and generate detailed reports.'
  },
  {
    icon: '👥',
    title: 'Multi-User Support',
    desc: 'Manage staff access and permissions securely.'
  },
  {
    icon: '☁️',
    title: 'Cloud Sync',
    desc: 'Access your data from anywhere, on any device.'
  },
  {
    icon: '💻',
    title: 'Mobile & Desktop Ready',
    desc: 'Enjoy a seamless experience on all screen sizes.'
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    desc: 'Your business data is protected with industry-standard security.'
  }
];

export default function FeaturesPage() {
  const location = useLocation();
  return (
    <div className="homepage-responsive-root" style={{ position: 'relative', overflow: 'hidden' }}>
      <img src="/bg-features.svg" alt="background" className="page-bg-svg" aria-hidden="true" />
  <nav className="homepage-navbar" style={{ position: 'relative', zIndex: 1 }}>
  <img src="/quicktill-logo.svg" alt="Quicktill Logo" className="homepage-logo" />
        <span style={{ fontWeight: 800, fontSize: '1.7rem', marginRight: '2rem', letterSpacing: '0.04em', color: '#fff' }}>Quicktill</span>
        <div className="homepage-navlinks">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/features" className={location.pathname === '/features' ? 'active' : ''}>Features</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/login" className={"nav-btn" + (location.pathname === '/login' ? ' active' : '')}>Login</Link>
          <Link to="/register" className={"nav-btn nav-btn-outline" + (location.pathname === '/register' ? ' active' : '')}>Register</Link>
        </div>
      </nav>
  <main className="homepage-main" style={{ position: 'relative', zIndex: 1 }}>
        <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a1.svg" alt="Features Illustration" className="page-context-img" style={{margin:'0 auto 2rem auto',display:'block',width:'120px',height:'120px',filter:'drop-shadow(0 4px 24px #2563eb33)'}} />
        <h1 className="themed-title">Features</h1>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-emoji" aria-label="icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </main>
  <footer className="homepage-footer" style={{ position: 'relative', zIndex: 1 }}>
        &copy; {new Date().getFullYear()} Quicktill. All rights reserved.
      </footer>
      <style>{`
        .page-bg-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          object-fit: cover;
          pointer-events: none;
        }
        .page-context-img {
          z-index: 1;
        }
        .nav-btn {
          margin-left: 1.2rem;
          padding: 0.45rem 1.1rem;
          border-radius: 7px;
          background: #fff;
          color: #000 !important;
          font-weight: 700;
          border: 2px solid #fff;
          transition: background 0.15s, color 0.15s, border 0.15s;
        }
        .nav-btn:hover, .nav-btn.active {
          background: #000 !important;
          color: #fff !important;
          border: 2px solid #fff;
          box-shadow: 0 0 0 2px #fff;
        }
        .nav-btn-outline {
          background: transparent;
          color: #fff !important;
          border: 2px solid #fff;
        }
        .nav-btn-outline:hover, .nav-btn-outline.active {
          background: #fff !important;
          color: #000 !important;
        }
        .homepage-responsive-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #111;
          font-family: Inter, Arial, sans-serif;
        }
        .homepage-navbar {
          background: #000;
          color: #fff;
          padding: 1.2rem 2.5rem;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: 0.04em;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          display: flex;
          align-items: center;
        }
        .homepage-logo {
          height: 36px;
          margin-right: 16px;
        }
        .homepage-navlinks {
          display: flex;
          gap: 2rem;
          margin-left: auto;
        }
        .homepage-navlinks a {
          color: #fff;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 0.3rem 0.7rem;
          border-radius: 5px;
          transition: background 0.15s, color 0.15s;
        }
        .homepage-navlinks a.active, .homepage-navlinks a:hover {
          background: #fff;
          color: #000;
        }
        /* Ensure nav-btn and nav-btn-outline always override navlinks hover */
        .homepage-navlinks .nav-btn:hover, .homepage-navlinks .nav-btn.active {
          background: #000 !important;
          color: #fff !important;
        }
        .homepage-navlinks .nav-btn-outline:hover, .homepage-navlinks .nav-btn-outline.active {
          background: #fff !important;
          color: #000 !important;
        }
        }
        }
        }
        .homepage-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          width: 100vw;
          max-width: 100vw;
          min-height: 100dvh;
          margin: 0;
          box-sizing: border-box;
          padding-left: clamp(1rem, 5vw, 4rem);
          padding-right: clamp(1rem, 5vw, 4rem);
        }
        .themed-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 900;
          color: #fff;
          margin-bottom: 2.5rem;
          letter-spacing: -0.02em;
          text-align: center;
        }
        .features-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          margin-bottom: 2rem;
          width: 100vw;
          max-width: 100vw;
          box-sizing: border-box;
        }
        .feature-card {
          background: #181818;
          border-radius: 18px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.13);
          padding: 2.2rem 1.2rem 1.5rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 220px;
          max-width: 340px;
          width: 100%;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .feature-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .feature-emoji {
          font-size: 3rem;
          margin-bottom: 1.1rem;
          text-align: center;
        }
        .feature-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .feature-desc {
          font-size: 1.08rem;
          color: #bbb;
          text-align: center;
        }
        .homepage-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          padding: 2rem 0;
          width: 100vw;
          max-width: 100vw;
        }
        .homepage-footer {
          text-align: center;
          padding: 1rem;
          color: #bbb;
          font-size: 0.95rem;
          background: transparent;
        }
        @media (max-width: 900px) {
          .homepage-main {
            max-width: 100vw;
            width: 100vw;
            min-height: 100dvh;
            padding: clamp(0.5rem, 2vw, 1.2rem) clamp(0.2rem, 2vw, 0.5rem);
          }
          .features-grid {
            max-width: 100vw;
            width: 100vw;
            gap: 1.2rem;
            box-sizing: border-box;
          }
        }
        @media (max-width: 600px) {
          .homepage-navbar {
            font-size: 1.1rem;
            padding: 1rem 1.2rem;
          }
          .themed-title {
            font-size: 1.5rem;
          }
          .homepage-main {
            padding: clamp(0.2rem, 2vw, 0.5rem) clamp(0.1rem, 2vw, 0.2rem);
            width: 100vw;
            max-width: 100vw;
            min-height: 100dvh;
          }
          .features-grid {
            flex-direction: column;
            align-items: stretch;
            gap: 0.7rem;
            width: 100vw;
            max-width: 100vw;
            box-sizing: border-box;
          }
        }
      `}</style>
    </div>
  );
}
