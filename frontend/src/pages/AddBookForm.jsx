import React, { useState } from "react";
import "./AddBookForm.css";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "Fiction",
    format: "Paperback",
    ISBN: "",
    publisher: "",
    language: "",
    publicationDate: "",
    pages: "",
    stock: "",
    description: "",
    discountPrice: "",
    coverImage: null, // Change to hold the file object
    ratings: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Save the file object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        body: form,
        credentials: 'include', // <-- Add this line to send cookies
      });

      if (response.ok) {
        alert("Book added successfully!");
      } else {
        alert("Failed to add the book.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
          <option value="Children">Children</option>
          <option value="Biography">Biography</option>
          <option value="Self-Help">Self-Help</option>
          <option value="History">History</option>
          <option value="Education">Education</option>
          <option value="Manga">Manga</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Format</label>
        <select
          name="format"
          value={formData.format}
          onChange={handleChange}
        >
          <option value="Paperback">Paperback</option>
          <option value="Hardcover">Hardcover</option>
          <option value="eBook">eBook</option>
        </select>
      </div>
      <div className="form-group">
        <label>ISBN</label>
        <input
          type="text"
          name="ISBN"
          value={formData.ISBN}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Publisher</label>
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Language</label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Publication Date</label>
        <input
          type="date"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Pages</label>
        <input
          type="number"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label>Cover Image</label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Discount Price</label>
        <input
          type="number"
          name="discountPrice"
          value={formData.discountPrice}
          onChange={handleChange}
        />
      </div>

       {/* Add ratings field */}
       <div className="form-group">
        <label>Ratings</label>
        <input
          type="number"
          name="ratings"
          value={formData.ratings}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          required
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
