// // src/pages/Auth/Register.jsx

// // src/pages/Auth/Register.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [error, setError] = useState("");  // State for error messages
  const [success, setSuccess] = useState("");  // State for success messages

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if terms are agreed to
    if (!formData.agreeTerms) {
      alert("You must agree to the terms!");
      return;
    }

    // Prepare data for the API call
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Make the API call to register the user
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        // Registration successful
        setSuccess("Registration successful! Please log in.");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeTerms: false,
        });
        setError("");  // Clear any previous error message
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
        }, 2000); // Delay for user to see success message
      } else {
        // If the response is not OK, show the error message from the backend
        setError(result.message || "Registration failed. Please try again.");
        setSuccess("");  // Clear any success message
      }
    } catch (err) {
      // Handle network or unexpected errors
      setError("Something went wrong. Please try again later.");
      setSuccess("");  // Clear any success message
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Your Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Repeat your password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeTerms">
            I agree all statements in <a href="/terms">Terms of Service</a>
          </label>
        </div>

        <button type="submit" className="register-btn">
          REGISTER
        </button>

        {/* Display error or success message */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
      </form>
    </div>
  );
};

export default Register;
