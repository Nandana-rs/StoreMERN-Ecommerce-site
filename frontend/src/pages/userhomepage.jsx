
import React from "react";
import { useNavigate } from "react-router-dom";
import harryPotterImg from "../assets/images/harrypotter.jpg";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import "./UserHomepage.css"; // Make sure to update the CSS file

const UserHomepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  // Handler for searching products (dummy handler; update as needed)
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for products...");
  };

  // Handler for navigating to 'Our Products' page
  const goToProducts = () => {
    navigate("/products"); // Adjust the route if needed
  };

  return (
    <div className="user-homepage">
      {/* ========== NAVBAR ========== */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2 className="logo">BookNest</h2>
        </div>

         {/* Search Bar */}
 <form onSubmit={handleSearch} className="navbar-search-form">
            <input
              type="text"
              placeholder="Search products..."
              className="navbar-search-input"
            />
            <button type="submit" className="navbar-search-button">
              <FaSearch />
            </button>
          </form>
 
          {/* Our Products Link */}
          <button onClick={goToProducts} className="products-link">
            Our Products
          </button>
       

        {/* Icons */}
        <div className="navbar-right">
         
           
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

      {/* ========== HERO SECTION ========== */}
      {/* ========== HERO SECTION ========== */}
      {/* 
        Instead of an inline image, we use a background image in CSS 
        for the entire hero section.
      */}
      <section className="hero">
        <div className="hero-text">
          <h1>Discover Your Next Adventure</h1>
          <p>Explore our collection of books and find your next favorite read!</p>
          <button className="explore-button">Explore Now</button>
        </div>
      </section>


      {/* ========== GENRES SECTION ========== */}
      <section className="genres-section">
        <h2>Genres</h2>
        <div className="genres-grid">
          <button className="genre-btn">Fiction</button>
          <button className="genre-btn">Thriller</button>
          <button className="genre-btn">Tech</button>
          <button className="genre-btn">Philosophy</button>
          <button className="genre-btn">Romance</button>
          <button className="genre-btn">Manga</button>
        </div>
      </section>

      {/* ========== NEW ARRIVALS SECTION ========== */}
      <section className="arrivals-section">
        <h2>New Arrivals</h2>
        <div className="arrivals-grid">
          {/* Example book cards - replace with dynamic data */}
          <div className="book-card">
  <img
    src={harryPotterImg}
    alt="Harry Potter"
  />
  <h3>Harry Potter</h3>
  <p>Rs. 499</p>
</div>

          <div className="book-card">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg"
              alt="The Fault in Our Stars"
            />
            <h3>The Fault in Our Stars</h3>
            <p>Rs. 350</p>
          </div>
          <div className="book-card">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/71aLultW5EL.jpg"
              alt="The Stranger"
            />
            <h3>The Stranger</h3>
            <p>Rs. 280</p>
          </div>
          <div className="book-card">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/61Iz2yy2CKL.jpg"
              alt="To Kill a Mockingbird"
            />
            <h3>To Kill a Mockingbird</h3>
            <p>Rs. 400</p>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About</h3>
            <p>Contact us</p>
            <p>Careers</p>
            <p>Blog</p>
          </div>
          <div className="footer-section">
            <h3>Help</h3>
            <p>Payments</p>
            <p>Shipping</p>
            <p>FAQ</p>
          </div>
          <div className="footer-section">
            <h3>Socials</h3>
            <p>LinkedIn</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} BookNest. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserHomepage;
