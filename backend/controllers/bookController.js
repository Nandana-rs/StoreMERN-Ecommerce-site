import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import Book from "../models/Book.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import multer from "multer";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage for multer to save files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    
    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    console.log('Upload Path:', uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
}).single('coverImage');

// @desc    Add a new book
// @route   POST /api/books
// @access  Admin
const addBook = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer Error:', err);
      return res.status(400).json({ message: "Error uploading image", error: err.message });
    }

    try {
      // Log the request body and file to see what data is being received
      console.log("Request Body:", req.body);
      console.log("Request File:", req.file);

      // Check if the file is present; if not, you might want to handle this case explicitly.
      if (!req.file) {
        console.error("No file received in the request.");
        return res.status(400).json({ message: "No cover image uploaded." });
      }

      const { 
        title, 
        author, 
        price, 
        category, 
        format, 
        ISBN, 
        publisher, 
        language, 
        publicationDate, 
        pages, 
        stock, 
        description, 
        discountPrice 
      } = req.body;

      // Validate required fields
      const missingFields = [];
      if (!title) missingFields.push("title");
      if (!author) missingFields.push("author");
      if (!price) missingFields.push("price");
      if (!category) missingFields.push("category");
      if (!format) missingFields.push("format");
      if (!ISBN) missingFields.push("ISBN");
      if (!publisher) missingFields.push("publisher");
      if (!language) missingFields.push("language");
      if (!publicationDate) missingFields.push("publicationDate");
      if (!pages) missingFields.push("pages");
      if (!stock) missingFields.push("stock");
      if (!description) missingFields.push("description");

      if (missingFields.length > 0) {
        console.error("Missing required fields:", missingFields);
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(", ")}` });
      }
      
      // Check if book already exists by ISBN
      const bookExists = await Book.findOne({ ISBN });
      if (bookExists) {
        console.error("Book with this ISBN already exists.");
        return res.status(400).json({ message: "Book with this ISBN already exists" });
      }

      const book = new Book({
        title,
        author,
        price,
        category,
        format,
        ISBN,
        publisher,
        language,
        publicationDate,
        pages,
        stock,
        description,
        coverImage: `/uploads/${req.file.filename}`, // Save relative path to image
        discountPrice,
      });

      const createdBook = await book.save();
      console.log("Book created:", createdBook);
      res.status(201).json(createdBook);
    } catch (error) {
      console.error('Error saving book:', error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
});

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// @desc    Get a book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json(book);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Admin
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  Object.assign(book, req.body);
  const updatedBook = await book.save();
  res.json(updatedBook);
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  await book.deleteOne();
  res.json({ message: "Book removed successfully" });
});

export { addBook, getAllBooks, getBookById, updateBook, deleteBook };
