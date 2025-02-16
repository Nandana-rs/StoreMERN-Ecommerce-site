// src/BookDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Modified: Added Redux hook
import { addToWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice"; 
 // Modified: Importing wishlist action (adjust path accordingly)
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams(); // Get book id from URL
  const dispatch = useDispatch(); // Modified: Initialize dispatch from Redux
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Modified: Dispatch wishlist action and navigate to wishlist page
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(book));
    navigate("/wishlist"); // navigate to the wishlist page
  };

  // NEW: Handle add to cart
  const handleAddToCart = () => {
    dispatch(addToCart(book));
    navigate("/cart"); // Navigate to cart page (you can choose to show a toast notification instead)
  };
  
  if (loading) return <div className="loading">Loading Book Details...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="book-details-container">
      <div className="book-image">
        <img src={`http://localhost:5000${book.coverImage}`} alt={book.title} />
      </div>
      <div className="book-info">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Price:</strong> Rs. {book.price}</p>
        {book.discountPrice && (
          <p style={{ color: "red" }}>
            <strong>Discount:</strong> Rs. {book.discountPrice}
          </p>
        )}
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Format:</strong> {book.format}</p>
        <p><strong>ISBN:</strong> {book.ISBN}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <p><strong>Language:</strong> {book.language}</p>
        <p>
          <strong>Publication Date:</strong>{" "}
          {new Date(book.publicationDate).toDateString()}
        </p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Stock:</strong> {book.stock}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <div className="buttons">
          <button className="wishlist-btn" onClick={handleAddToWishlist}>
            Add to Wishlist
          </button>
          <button className="cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
