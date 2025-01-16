import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Register from "./Register"; // Ensure the correct file path
import Login from "./LoginUser"; // Ensure the correct file path
import LoginAdmin from "./LoginAdmin";
import AdminDashboard from "./AdminDashboard";
import Homepage from "./Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />

        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
