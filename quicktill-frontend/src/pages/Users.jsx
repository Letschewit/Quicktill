import React, { useEffect, useState } from "react";
import api from "../api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users:", err);
        if (err.response?.status === 401) {
          // Unauthorized - redirect to login
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          alert("Failed to load users: " + (err.response?.data?.message || err.message));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Update role
  async function updateRole(id, role) {
    try {
      const res = await api.patch(`/users/${id}/role`, { role });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? res.data : u))
      );
    } catch (err) {
      alert("Failed to update role");
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to delete user');
    }
  }

  if (loading) return (
    <div className="container">
      <div className="page-content">
        <div className="loading">Loading users...</div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="page-content">
        <div className="container">
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>User Management</h1>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ border: 'none', margin: 0 }}>System Users</h2>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {users.length} user{users.length !== 1 ? 's' : ''} total
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td style={{ fontWeight: '600' }}>{u.id}</td>
                      <td style={{ fontWeight: '600' }}>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span 
                          className={`status-badge ${u.role === 'admin' ? 'status-admin' : 'status-cashier'}`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select
                          value={u.role}
                          onChange={(e) => updateRole(u.id, e.target.value)}
                          className="form-select"
                          style={{ minWidth: '120px' }}
                        >
                          <option value="admin">Admin</option>
                          <option value="cashier">Cashier</option>
                        </select>
                          <button className="btn" onClick={() => deleteUser(u.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {users.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No users found</div>
                <div>Users will appear here once they are added to the system.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}