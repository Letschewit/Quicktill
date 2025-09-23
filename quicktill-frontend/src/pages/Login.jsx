import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    try {
      const resp = await loginApi(email, password);
      // resp: { user: {...}, token: ... }
      localStorage.setItem('user', JSON.stringify(resp.user));
      localStorage.setItem('token', resp.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Login failed.');
    }
  };

  return (
    <div className="auth-page-root">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="auth-error">{error}</div>}
        <button type="submit">Login</button>
        <div className="auth-switch">
          Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
        </div>
      </form>
      <style>{`
        .auth-page-root {
          min-height: 100vh;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
        }
        .auth-form {
          background: #181818;
          border-radius: 18px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.13);
          padding: 2.5rem 2rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 320px;
          max-width: 420px;
          width: 100%;
        }
        .auth-form h2 {
          color: #fff;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }
        .auth-form input {
          width: 100%;
          margin-bottom: 1.1rem;
          padding: 0.8rem 1rem;
          border-radius: 7px;
          border: 2px solid #fff;
          background: #222;
          color: #fff;
          font-size: 1.1rem;
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .auth-form {
            max-width: 98vw;
            padding: 1.2rem 0.5rem;
          }
        }
        @media (max-width: 600px) {
          .auth-form {
            min-width: 98vw;
            max-width: 98vw;
            padding: 1.2rem 0.5rem;
          }
        }
        .auth-form input:focus {
          outline: none;
          border-color: #2563eb;
        }
        .auth-form button {
          width: 100%;
          padding: 0.9rem 0;
          border-radius: 7px;
          background: #fff;
          color: #000;
          font-weight: 700;
          font-size: 1.1rem;
          border: 2px solid #fff;
          margin-bottom: 0.7rem;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border 0.15s;
        }
        .auth-form button:hover {
          background: #000;
          color: #fff;
          border: 2px solid #fff;
        }
        .auth-error {
          color: #ff5252;
          margin-bottom: 1rem;
          font-size: 1rem;
        }
        .auth-switch {
          color: #bbb;
          font-size: 0.98rem;
          margin-top: 0.5rem;
        }
        .auth-switch span {
          color: #2563eb;
          cursor: pointer;
          margin-left: 0.3rem;
        }
        .auth-switch span:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
