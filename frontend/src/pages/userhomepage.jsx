// import React from "react";
// import { useNavigate } from "react-router-dom";

// const UserHomepage = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Remove the token (or session data) from local storage
//     localStorage.removeItem("authToken");

//     // Redirect to the login page
//     navigate("/login");
//   };

//   return (
//     <div>
//       {/* Navigation Header */}
//       <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#333", color: "#fff" }}>
//         <h2>BookNest</h2>
//         <button onClick={handleLogout} style={{ background: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>
//           Logout
//         </button>
//       </nav>

//       {/* Main Content */}
//       <h1>Welcome to the User Homepage</h1>
//     </div>
//   );
// };

// export default UserHomepage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaSignOutAlt } from "react-icons/fa"; // Icons
import "./UserHomepage.css"; // Import the CSS file

const UserHomepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token (or session data) from local storage
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="user-homepage">
      {/* Navigation Header */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>BookNest</h2>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search for books..." />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        {/* Icons */}
        <div className="navbar-icons">
          <div className="icon">
            <FaHeart />
            <span className="icon-badge">3</span> {/* Wishlist count */}
          </div>
          <div className="icon">
            <FaShoppingCart />
            <span className="icon-badge">5</span> {/* Cart count */}
          </div>
          <div className="icon" onClick={handleLogout}>
            <FaSignOutAlt />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to BookNest</h1>
        <p>Explore our collection of books and find your next favorite read!</p>
      </div>
    </div>
  );
};

export default UserHomepage;