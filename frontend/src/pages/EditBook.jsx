import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditBook.css"; // Import CSS for styling

const EditBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    format: "",
    ISBN: "",
    publisher: "",
    language: "",
    publicationDate: "",
    pages: "",
    stock: "",
    description: "",
    discountPrice: "",
    coverImage: null,
  });
  const [loading, setLoading] = useState(true);

  // Fetch book details by ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        const data = await response.json();
        setBook({
          ...data,
          publicationDate: data.publicationDate.split("T")[0], // Format date for input
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setBook({ ...book, coverImage: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in book) {
      if (book[key] !== null && book[key] !== "") {
        formDataToSend.append(key, book[key]);
      }
    }

    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (response.ok) {
        navigate("/admin/books"); // Redirect to the book list after update
      } else {
        console.error("Error updating book:", await response.json());
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  if (loading) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="edit-book">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={book.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="format"
          placeholder="Format"
          value={book.format}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="ISBN"
          placeholder="ISBN"
          value={book.ISBN}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={book.publisher}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={book.language}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="publicationDate"
          placeholder="Publication Date"
          value={book.publicationDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="pages"
          placeholder="Pages"
          value={book.pages}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={book.stock}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          value={book.discountPrice}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="coverImage"
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;