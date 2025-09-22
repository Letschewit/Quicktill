import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackOfficePage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="page-content">
        <h1>Back Office Console</h1>

        <div className="grid grid-3 mb-8">
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Sales Summary</h3>
            <div style={{ color: 'var(--text-secondary)' }}>Coming soon</div>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Top Products</h3>
            <div style={{ color: 'var(--text-secondary)' }}>Coming soon</div>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Inventory Alerts</h3>
            <div style={{ color: 'var(--text-secondary)' }}>Coming soon</div>
          </div>
        </div>

        <div className="grid grid-3">
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Point of Sale</h3>
            <div className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Open POS terminal for sales operations.
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/pos')}>Open POS</button>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0 }}>Inventory Management</h3>
            <div className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Manage products, prices, and stock levels.
            </div>
            <button className="btn" onClick={() => navigate('/inventory')}>Open Inventory</button>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0 }}>Users</h3>
            <div className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Manage system users and roles.
            </div>
            <button className="btn" onClick={() => navigate('/users')}>Manage Users</button>
          </div>
        </div>
      </div>
    </div>
  );
} 