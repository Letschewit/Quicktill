
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function HomePage() {
  const location = useLocation();
  return (
    <div className="homepage-responsive-root" style={{ position: 'relative', overflow: 'hidden' }}>
      <img src="/bg-home.svg" alt="background" className="page-bg-svg" aria-hidden="true" />
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
        <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6cd.svg" alt="POS Illustration" className="page-context-img" style={{margin:'0 auto 2rem auto',display:'block',width:'120px',height:'120px',filter:'drop-shadow(0 4px 24px #2563eb33)'}} />
        <h1 className="homepage-title">
          Welcome to <span className="homepage-title-accent">Quicktill</span>
        </h1>
        <p className="homepage-desc">
          Your modern, lightning-fast point-of-sale and back office solution. Please login or register to get started.
        </p>
        <div className="homepage-btn-group">
          <Link to="/login" className="homepage-btn homepage-btn-primary">Login</Link>
          <Link to="/register" className="homepage-btn homepage-btn-outline">Register</Link>
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
          align-items: center;
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
        .nav-btn:hover, .nav-btn.active {
          background: #000 !important;
          color: #fff !important;
          border: 2px solid #fff;
          box-shadow: 0 0 0 2px #fff;
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
          background: #000;
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
        .homepage-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 900;
          color: #fff;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          text-align: center;
          width: 100%;
        }
        .homepage-title-accent {
          color: #fff;
          background: #000;
          padding: 0.2rem 0.7rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(255,255,255,0.08);
        }
        .homepage-desc {
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: #bbb;
          width: 100%;
          text-align: center;
          margin-bottom: 3rem;
        }
        .homepage-btn-group {
          display: flex;
          gap: 2.5rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }
        .homepage-btn {
          border-radius: 10px;
          padding: clamp(0.8rem, 2vw, 1.3rem) 0;
          font-size: clamp(1rem, 3vw, 1.5rem);
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.2s, color 0.2s, border 0.2s;
          margin-bottom: 1rem;
          width: 30vw;
          min-width: 200px;
          max-width: 400px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .homepage-btn-primary {
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
        .homepage-btn-primary {
          border: 2px solid #fff;
          box-shadow: 0 4px 16px rgba(255,255,255,0.10);
        }
        .homepage-btn-outline {
          background: #000;
          color: #fff;
          border: 2.5px solid #fff;
          box-shadow: 0 4px 16px rgba(255,255,255,0.06);
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
        }
        @media (max-width: 600px) {
          .homepage-navbar {
            font-size: 1.1rem;
            padding: 1rem 1.2rem;
          }
          .homepage-title {
            font-size: 2rem;
          }
          .homepage-main {
            padding: clamp(0.2rem, 2vw, 0.5rem) clamp(0.1rem, 2vw, 0.2rem);
            width: 100vw;
            max-width: 100vw;
            min-height: 100dvh;
          }
          .homepage-btn {
            padding: 0.9rem 2rem;
            font-size: 1rem;
          }
          .homepage-btn-group {
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
