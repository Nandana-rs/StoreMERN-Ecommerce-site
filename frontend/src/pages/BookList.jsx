import React, { useEffect, useState } from "react";
import "./BookList.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1200]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState("newest");

  
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Dummy categories for demonstration - replace with your actual categories
  const categories = ["Fiction", "Thriller", "Tech", "Philosophy", "Romance", "Mango"];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="bookstore-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2 className="brand">Bookztron</h2>
          <div className="search-bar">
  <input 
    type="text" 
    placeholder="Search books..." 
    className="search-input"
  />
  <button className="search-button">
    <i className="fas fa-search"></i> Search
  </button>
</div>
        </div>
        <div className="navbar-right">
          <button className="wishlist-btn">
            <i className="fas fa-heart"></i>
          </button>
          <button className="cart-btn">
            <i className="fas fa-shopping-cart"></i>
          </button>
          <button className="logout-btn">Logout</button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="filters-section">
          <h3>Filters</h3>
          <button className="clear-btn">Clear</button>

          <div className="filter-group">
            <h4>Price</h4>
            <div className="price-range">
              <span>Min {priceRange[0]}</span>
              <span>Max {priceRange[1]}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1200" 
              onChange={(e) => setPriceRange([0, e.target.value])}
            />
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            {categories.map(category => (
              <label key={category} className="category-option">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(category)}
                  onChange={() => {}}
                />
                {category}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Rating</h4>
            {[4, 3, 2, 1].map(num => (
              <label key={num} className="rating-option">
                <input 
                  type="radio" 
                  name="rating" 
                  checked={ratingFilter === num}
                  onChange={() => setRatingFilter(num)}
                />
                {num} stars or above
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Sort By</h4>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">New Arrival</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="popular">Popularity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Showing {books.length} products</h1>
        </div>

        <div className="book-grid">
          {books.map(book => (
             <div
             className="book-card"
             key={book._id}
             onClick={() => navigate(`/products/${book._id}`)} // Navigates to BookDetails.jsx
             style={{ cursor: "pointer" }}
           >
              {book.isNew && <div className="new-badge">New Arrival</div>}
              <img
                src={`http://localhost:5000${book.coverImage}`}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">By {book.author}</p>
                
                <div className="price-section">
                  {book.discountPrice ? (
                    <>
                      <span className="discount-price">Rs. {book.discountPrice}</span>
                      <span className="original-price">Rs. {book.price}</span>
                      <span className="discount-percent">
                        ({(100 - (book.discountPrice/book.price)*100).toFixed(0)}% off)
                      </span>
                    </>
                  ) : (
                    <span className="normal-price">Rs. {book.price}</span>
                  )}
                </div>

                <div className="category-tag">{book.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;