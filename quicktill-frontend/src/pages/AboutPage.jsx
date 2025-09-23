import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AboutPage() {
  const location = useLocation();
  return (
    <div className="homepage-responsive-root" style={{ position: 'relative', overflow: 'hidden' }}>
      <img src="/bg-about.svg" alt="background" className="page-bg-svg" aria-hidden="true" />
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
        <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f465.svg" alt="Team Illustration" className="page-context-img" style={{margin:'0 auto 2rem auto',display:'block',width:'120px',height:'120px',filter:'drop-shadow(0 4px 24px #2563eb33)'}} />
        <div className="about-hero">
          <img src="/quicktill-logo.svg" alt="Quicktill" className="about-hero-img" />
          <div>
            <h1 className="themed-title">About Quicktill</h1>
            <p className="themed-desc">
              Quicktill is a modern, lightning-fast point-of-sale and back office solution designed for businesses of all sizes. Our mission is to simplify sales, inventory, and business management with a beautiful, intuitive interface and robust features.
            </p>
            <p className="themed-desc themed-desc-secondary">
              Whether you run a retail store, restaurant, or service business, Quicktill helps you streamline operations, track sales, manage inventory, and grow your business with confidence.
            </p>
          </div>
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
        .about-hero {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .about-hero-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.13);
          object-fit: contain;
          filter: grayscale(1) brightness(1.5);
        }
        .themed-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 900;
          color: #fff;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          text-align: left;
        }
        .themed-desc {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: #bbb;
          margin-bottom: 1.5rem;
          text-align: left;
        }
        .themed-desc-secondary {
          color: #e0e0e0;
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
          .themed-title {
            font-size: 1.5rem;
          }
          .homepage-main {
            padding: clamp(0.2rem, 2vw, 0.5rem) clamp(0.1rem, 2vw, 0.2rem);
            width: 100vw;
            max-width: 100vw;
            min-height: 100dvh;
          }
        }
      `}</style>
    </div>
  );
}
