import React, { useState, useEffect } from "react";
import "./AdminViewBook.css"; // Import CSS for styling

const AdminViewBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/books") // Adjust the API URL if needed
      .then((response) => response.json())
      .then((data) => {
        setBooks(data); // Store fetched books
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  // Filter books based on search query and selected category
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter dropdown
  const categories = ["All", ...new Set(books.map((book) => book.category))];

  return (
    <div className="admin-view-books">
      <h1>Book Store Dashboard</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">
          <i className="fas fa-search"></i> {/* Replace with your preferred icon */}
        </button>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        <label>Filter by Category:</label>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Book List */}
      {loading ? (
        <p className="loading">Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <p className="no-books">No books found.</p>
      ) : (
        <div className="book-list">
          {filteredBooks.map((book) => {
            console.log("Cover Image URL:", book.coverImage); // Debug the image path
            return (
              <div key={book._id} className="book-card">
                {book.discountPrice && (
                  <div className="discount-badge">
                    {Math.round(((book.price - book.discountPrice) / book.price) * 100)}% OFF
                  </div>
                )}
                <img
                  src={`http://localhost:5000${book.coverImage}`} // Prepend backend URL
                  alt={book.title}
                  className="book-image"
                  onError={(e) => {
                    e.target.src = "/images/fallback.jpg"; // Fallback image
                  }}
                />
                <div className="book-details">
                  <h3>{book.title}</h3>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Category:</strong> {book.category}</p>
                  <div className="price">
                    {book.discountPrice ? (
                      <>
                        <span className="original-price">₹{book.price}</span>
                        <span className="discounted-price">₹{book.discountPrice}</span>
                      </>
                    ) : (
                      <span>₹{book.price}</span>
                    )}
                  </div>
                  <p><strong>Rating:</strong> {book.ratings} ⭐</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminViewBook;