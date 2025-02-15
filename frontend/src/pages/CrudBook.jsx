import React, { useState, useEffect } from "react";
import "./CrudBook.css"; // Import CSS for styling

const CrudBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
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
  const [editBookId, setEditBookId] = useState(null); // Track the book being edited

  // Fetch all books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books");
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  // Handle form submission (Add/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      let response;
      if (editBookId) {
        // Update existing book
        response = await fetch(`http://localhost:5000/api/books/${editBookId}`, {
          method: "PUT",
          body: formDataToSend,
        });
      } else {
        // Add new book
        response = await fetch("http://localhost:5000/api/books", {
          method: "POST",
          body: formDataToSend,
        });
      }

      if (response.ok) {
        fetchBooks(); // Refresh the book list
        setFormData({
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
        setEditBookId(null); // Reset edit mode
      } else {
        console.error("Error saving book:", await response.json());
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      category: book.category,
      format: book.format,
      ISBN: book.ISBN,
      publisher: book.publisher,
      language: book.language,
      publicationDate: book.publicationDate.split("T")[0], // Format date for input
      pages: book.pages,
      stock: book.stock,
      description: book.description,
      discountPrice: book.discountPrice,
      coverImage: null, // Reset cover image for new upload
    });
    setEditBookId(book._id);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchBooks(); // Refresh the book list
      } else {
        console.error("Error deleting book:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="crud-book">
      <h2>Manage Books</h2>

      {/* Add/Edit Book Form */}
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="format"
          placeholder="Format"
          value={formData.format}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="ISBN"
          placeholder="ISBN"
          value={formData.ISBN}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={formData.publisher}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={formData.language}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="publicationDate"
          placeholder="Publication Date"
          value={formData.publicationDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="pages"
          placeholder="Pages"
          value={formData.pages}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          value={formData.discountPrice}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="coverImage"
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit">{editBookId ? "Update Book" : "Add Book"}</button>
      </form>

      {/* Book List Table */}
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>₹{book.price}</td>
                <td>{book.category}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudBook;