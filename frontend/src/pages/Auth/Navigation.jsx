import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // For user profile icon
import "./Navigation.css"; // Import the CSS file

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Brand Logo with Fancy Font */}
        <Link className="navbar-brand" to="/">
          <span className="brand-text">BookNest</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <ul className="nav-links">
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li> */}
          </ul>

          {/* User Profile Dropdown */}
          <div className="profile-dropdown">
            <div className="profile-icon" onClick={toggleDropdown}>
              <FaUserCircle />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/my-account">
                  My Account
                </Link>
                <Link className="dropdown-item" to="/my-orders">
                  My Orders
                </Link>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;