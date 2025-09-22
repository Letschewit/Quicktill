import React, { useEffect, useState } from "react";
import api from "../api";

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', sku: '', price: '', stock: '' });

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function createProduct() {
    try {
      const payload = {
        name: addForm.name.trim(),
        sku: addForm.sku.trim(),
        price: parseFloat(addForm.price),
        stock: parseInt(addForm.stock || '0', 10)
      };
      if (!payload.name || !payload.sku || isNaN(payload.price)) {
        alert('Please fill name, SKU and price');
        return;
      }
      await api.post('/products', payload);
      setShowAdd(false);
      setAddForm({ name: '', sku: '', price: '', stock: '' });
      loadProducts();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to add product');
    }
  }

  return (
    <div className="container">
      <div className="page-content">
        <h1>Inventory Management</h1>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>Products</h3>
            <button className="btn" onClick={() => setShowAdd(true)}>Add Product</button>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: '600' }}>{p.id}</td>
                      <td style={{ fontWeight: '600' }}>{p.name}</td>
                      <td>{p.sku}</td>
                      <td>Rp {Number(p.price).toLocaleString()}</td>
                      <td>{p.stock}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn">Edit</button>
                          <button className="btn">Adjust Stock</button>
                          <button className="btn">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showAdd && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ width: 480, background: 'white' }}>
              <h3 style={{ marginTop: 0 }}>Add Product</h3>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" value={addForm.name} onChange={e=>setAddForm({...addForm, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">SKU</label>
                <input className="form-input" value={addForm.sku} onChange={e=>setAddForm({...addForm, sku: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Price</label>
                <input className="form-input" value={addForm.price} onChange={e=>setAddForm({...addForm, price: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Stock</label>
                <input className="form-input" value={addForm.stock} onChange={e=>setAddForm({...addForm, stock: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button className="btn" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={createProduct}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 