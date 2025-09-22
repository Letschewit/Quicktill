import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("/users"); // axios baseURL already points to Laravel API
        setUsers(res.data);
      } catch (err) {
        alert("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Update role
  async function updateRole(id, role) {
    try {
      const res = await axios.patch(`/users/${id}/role`, { role });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? res.data : u))
      );
    } catch (err) {
      alert("Failed to update role");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Management</h1>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="cashier">Cashier</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}