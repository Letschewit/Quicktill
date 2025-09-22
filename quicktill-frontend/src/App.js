import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./pages/Users";
import LoginPage from "./pages/Login";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        {/* Public login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected admin route */}
        <Route
          path="/users"
          element={
            user && user.role === "admin"
              ? <UsersPage />
              : <Navigate to="/login" replace />
          }
        />

        {/* Fallback: redirect anything else to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
