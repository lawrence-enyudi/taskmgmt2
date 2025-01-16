import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
