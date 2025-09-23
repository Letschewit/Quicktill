
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="dashboard-root">
      <nav className="dashboard-navbar">
        <span className="dashboard-title">Quicktill Dashboard</span>
        <div className="dashboard-navlinks">
          <button className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`nav-btn ${activeTab === 'pos' ? 'active' : ''}`} onClick={() => navigate('/pos')}>POS</button>
          <button className={`nav-btn ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>Inventory</button>
          <button className={`nav-btn ${activeTab === 'sales' ? 'active' : ''}`} onClick={() => setActiveTab('sales')}>Sales</button>
          <button className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
        </div>
        <button className="logout-btn" onClick={() => navigate('/login')}>Logout</button>
      </nav>
      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div className="dashboard-overview">
            <h2>Welcome to the Dashboard!</h2>
            <p>This is a static dashboard for troubleshooting route rendering.</p>
          </div>
        )}
        {activeTab === 'inventory' && (
          <div className="inventory-section">
            <h2>Inventory Management</h2>
            <p>Inventory content goes here.</p>
          </div>
        )}
        {activeTab === 'sales' && (
          <div className="sales-section">
            <h2>Sales Tracking</h2>
            <p>Sales content goes here.</p>
          </div>
        )}
        {activeTab === 'users' && (
          <div className="users-section">
            <h2>User Management</h2>
            <p>User content goes here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
