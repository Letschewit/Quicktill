import React, { useEffect, useState } from "react";
import { getSettings, updateSettings, updateProfileName, updateProfilePassword, uploadLogo } from "../api";

export default function SettingsPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.role === 'admin';

  const [form, setForm] = useState({ store_name: '', logo_url: '', receipt_footer: '', printer_host: '', printer_port: 9100 });
  const [apiBaseUrl, setApiBaseUrl] = useState(localStorage.getItem('apiBaseUrl') || '');
  const [saving, setSaving] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      getSettings().then(res => setForm(res.data)).catch(()=>{});
    }
  }, [isAdmin]);

  function saveApiBase() {
    if (apiBaseUrl) {
      localStorage.setItem('apiBaseUrl', apiBaseUrl);
    } else {
      localStorage.removeItem('apiBaseUrl');
    }
    alert('API Base URL saved. The app will reload.');
    window.location.reload();
  }

  async function saveSettings() {
    try {
      setSaving(true);
      if (isAdmin) {
        const res = await updateSettings(form);
        setForm(res.data);
      }
      // Always save API base locally as well
      if (apiBaseUrl) localStorage.setItem('apiBaseUrl', apiBaseUrl); else localStorage.removeItem('apiBaseUrl');
      alert('Settings saved');
      window.location.reload();
    } catch (e) {
      // Even if backend save fails, still persist API URL locally
      if (apiBaseUrl) localStorage.setItem('apiBaseUrl', apiBaseUrl); else localStorage.removeItem('apiBaseUrl');
      alert('Could not save store settings to server, but API Base URL was saved locally. The app will reload.');
      window.location.reload();
    } finally {
      setSaving(false);
    }
  }

  async function handleUploadLogo(fileOverride) {
    const fileToUpload = fileOverride || logoFile;
    if (!fileToUpload) { alert('Choose a file first'); return; }
    try {
      const res = await uploadLogo(fileToUpload);
      setForm(prev => ({ ...prev, logo_url: res.data.logo_url }));
      setLogoFile(null);
      alert('Logo uploaded');
    } catch (e) {
      alert('Failed to upload logo');
    }
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      setLogoFile(file);
      handleUploadLogo(file);
    }
  }

  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  async function saveName() {
    try {
      const res = await updateProfileName(profileName);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert('Name updated');
    } catch (e) {
      alert('Failed to update name');
    }
  }

  async function savePassword() {
    try {
      await updateProfilePassword(currentPassword, newPassword);
      setCurrentPassword(''); setNewPassword('');
      alert('Password updated');
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to update password');
    }
  }

  return (
    <div className="container">
      <div className="page-content">
        <h1>Settings</h1>

        {/* Connectivity - Always available */}
        <div className="card mb-6">
          <h3 style={{ marginTop: 0 }}>Connectivity</h3>
          <div className="form-group">
            <label className="form-label">API Base URL (for mobile)</label>
            <input className="form-input" value={apiBaseUrl} onChange={e=>setApiBaseUrl(e.target.value)} placeholder={`http://${window.location.hostname}:8000/api`} />
          </div>
          <button className="btn" onClick={saveApiBase}>Save API URL</button>
        </div>

        {isAdmin && (
          <div className="card mb-6">
            <h3 style={{ marginTop: 0 }}>Store Settings</h3>
            <div className="form-group">
              <label className="form-label">Store Name</label>
              <input className="form-input" value={form.store_name} onChange={e=>setForm({...form, store_name: e.target.value})} />
            </div>

            <div className="form-group">
              <label className="form-label">Logo</label>
              <div className="grid grid-2">
                <div>
                  <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    style={{
                      border: isDragging ? '2px solid var(--primary-black)' : '2px dashed var(--border-color)',
                      padding: '1rem',
                      textAlign: 'center',
                      borderRadius: 8,
                      background: isDragging ? 'var(--secondary-white)' : 'transparent'
                    }}
                  >
                    <div style={{ marginBottom: '0.5rem' }}>Drag & drop logo here, or choose a file</div>
                    <input type="file" accept=".png,.jpg,.jpeg,.svg" onChange={e=>setLogoFile(e.target.files?.[0] || null)} />
                    <div className="mt-4">
                      <button className="btn" onClick={()=>handleUploadLogo()}>Upload Logo</button>
                    </div>
                  </div>
                </div>
                <div>
                  {form.logo_url && (
                    <img src={form.logo_url} alt="Logo preview" style={{ maxHeight: 64 }} />
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Receipt Footer</label>
              <textarea className="form-input" rows={4} value={form.receipt_footer} onChange={e=>setForm({...form, receipt_footer: e.target.value})} />
            </div>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Printer Host (IP)</label>
                <input className="form-input" value={form.printer_host || ''} onChange={e=>setForm({...form, printer_host: e.target.value})} placeholder="192.168.1.50" />
              </div>
              <div className="form-group">
                <label className="form-label">Printer Port</label>
                <input className="form-input" value={form.printer_port || 9100} onChange={e=>setForm({...form, printer_port: e.target.value})} placeholder="9100" />
              </div>
            </div>
            <button className="btn btn-primary" onClick={saveSettings} disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</button>
          </div>
        )}

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Your Profile</h3>
          <div className="grid grid-2">
            <div>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" value={profileName} onChange={e=>setProfileName(e.target.value)} />
              </div>
              <button className="btn" onClick={saveName}>Update Name</button>
            </div>
            <div>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-input" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input type="password" className="form-input" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
              </div>
              <button className="btn" onClick={savePassword}>Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 