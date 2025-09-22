import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./pages/Users";
import LoginPage from "./pages/Login";
import POSPage from "./pages/POS";
import Navigation from "./components/Navigation";
import './App.css';
import AdminLoginPage from "./pages/AdminLogin";
import BackOfficePage from "./pages/BackOffice";
import InventoryPage from "./pages/Inventory";
import DashboardPage from "./pages/Dashboard";
import RegisterPage from "./pages/Register";
import SettingsPage from "./pages/Settings";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <BrowserRouter>
      <div className="App">
        {user && <Navigation />}
        <Routes>
          {/* Public login routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard after login */}
          <Route
            path="/dashboard"
            element={
              user
                ? <DashboardPage />
                : <Navigate to="/login" replace />
            }
          />

          {/* Protected admin routes */}
          <Route
            path="/users"
            element={
              user && user.role === "admin"
                ? <UsersPage />
                : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/backoffice"
            element={
              user && user.role === "admin"
                ? <BackOfficePage />
                : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/inventory"
            element={
              user && (user.role === "admin" || user.role === "cashier")
                ? <InventoryPage />
                : <Navigate to="/login" replace />
            }
          />

          {/* Settings & Profile: require login */}
          <Route
            path="/settings"
            element={
              user
                ? <SettingsPage />
                : <Navigate to="/login" replace />
            }
          />

          {/* Protected POS route */}
          <Route
            path="/pos"
            element={
              user && (user.role === "admin" || user.role === "cashier")
                ? <POSPage />
                : <Navigate to="/login" replace />
            }
          />

          {/* Fallback: redirect anything else to login or dashboard if logged in */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
