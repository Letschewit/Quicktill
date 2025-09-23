import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./pages/Users.jsx";
import LoginPage from "./pages/Login.jsx";
import POSPage from "./pages/POS.jsx";
import Navigation from "./components/Navigation.jsx";
import './App.css';
import AdminLoginPage from "./pages/AdminLogin.jsx";
import BackOfficePage from "./pages/BackOffice.jsx";
import InventoryPage from "./pages/Inventory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RegisterPage from "./pages/Register.jsx";
import SettingsPage from "./pages/Settings.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  console.log('Current user:', user);
  console.log('Current path:', window.location.pathname);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="App">
        {user && !['/login', '/register', '/'].includes(window.location.pathname) && <Navigation />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/pos" element={user?.role === "admin" || user?.role === "cashier" ? <POSPage /> : <Navigate to="/login" replace />} />
          <Route path="/inventory" element={user?.role === "admin" || user?.role === "cashier" ? <InventoryPage /> : <Navigate to="/login" replace />} />
          <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" replace />} />
          <Route path="/users" element={user?.role === "admin" ? <UsersPage /> : <Navigate to="/dashboard" replace />} />
          <Route path="/backoffice" element={user?.role === "admin" ? <BackOfficePage /> : <Navigate to="/dashboard" replace />} />
          <Route path="*" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
