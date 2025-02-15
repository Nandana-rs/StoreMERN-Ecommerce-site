import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaSignOutAlt, FaUsers, FaPlus, FaList, FaCog } from "react-icons/fa"; // Icons
import AddBookForm from "./AddBookForm.jsx"; // Import the AddBookForm component
import "./admindashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState("Manage Users"); // Track active sidebar option

  const handleLogout = () => {
    // Remove the token (or session data) from local storage
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  };

  const handleSidebarClick = (option) => {
    setActiveOption(option);
  };

  return (
    <div className="admin-dashboard">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2>Welcome, Admin</h2>
        </div>
        <div className="navbar-right">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li
            className={activeOption === "Manage Users" ? "active" : ""}
            onClick={() => handleSidebarClick("Manage Users")}
          >
            <FaUsers /> Manage Users
          </li>
          <li
            className={activeOption === "Add Books" ? "active" : ""}
            onClick={() => handleSidebarClick("Add Books")}
          >
            <FaPlus /> Add Books
          </li>
          <li
            className={activeOption === "View Books" ? "active" : ""}
            onClick={() => handleSidebarClick("View Books")}
          >
            <FaList /> View Books
          </li>

          <li
            className={activeOption === "Manage Books" ? "active" : ""}
            onClick={() => handleSidebarClick("Manage Books")}
          >
            <FaList /> Manage Books
          </li>
          <li
            className={activeOption === "Settings" ? "active" : ""}
            onClick={() => handleSidebarClick("Settings")}
          >
            <FaCog /> Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>{activeOption}</h1>
        <p>This is the {activeOption.toLowerCase()} section.</p>
        
        {/* Conditionally render AddBookForm component */}
        {activeOption === "Add Books" && <AddBookForm />}
      </div>
    </div>
  );
};

export default AdminDashboard;
