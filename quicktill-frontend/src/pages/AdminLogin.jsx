import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const uname = name.trim();
      const user = await login(uname, password);
      if (user.role !== "admin") {
        localStorage.removeItem("token");
        setError("Admin access required");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      // Hard navigation to ensure state refresh
      window.location.replace('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="page-content" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ marginBottom: 0 }}>QuickTill Admin</h2>
            <div style={{ color: 'var(--text-secondary)' }}>Sign in as Administrator</div>
          </div>

          {error && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              border: '2px solid var(--primary-black)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Admin Username</label>
              <input
                className="form-input"
                placeholder="admin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="username"
                inputMode="text"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 