import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return null;

  const isAdmin = user.role === 'admin';

  return (
    <div className="container">
      <div className="page-content">
        <h1>Dashboard</h1>

        <div className="grid grid-3 mb-8">
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Today Sales</h3>
            <div style={{ color: 'var(--text-secondary)' }}>Coming soon</div>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Transactions</h3>
            <div style={{ color: 'var(--text-secondary)' }}>Coming soon</div>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Low Stock</h3>
            <div style={{ color: 'var(--text-secondary)' }}>Coming soon</div>
          </div>
        </div>

        <div className="grid grid-3">
          {(isAdmin ? [
            { title: 'Point of Sale', desc: 'Open POS terminal for sales operations.', path: '/pos', primary: true },
            { title: 'Back Office', desc: 'Overview and KPIs for management.', path: '/backoffice' },
            { title: 'Inventory', desc: 'Manage products, prices, and stock.', path: '/inventory' },
          ] : [
            { title: 'Point of Sale', desc: 'Open POS terminal for sales operations.', path: '/pos', primary: true },
            { title: 'Sales History', desc: 'View your recent transactions.', path: '/pos' },
            { title: 'Support', desc: 'Get help and documentation.', path: '/pos' },
          ]).map((card, idx) => (
            <div className="card" key={idx}>
              <h3 style={{ marginTop: 0 }}>{card.title}</h3>
              <div className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                {card.desc}
              </div>
              <button className={`btn${card.primary ? ' btn-primary' : ''}`} onClick={() => navigate(card.path)}>
                Open {card.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 