// import mongoose from "mongoose";

// const bookSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     author: { type: String, required: true, trim: true },
//     price: { type: Number, required: true, min: 0 },
//     category: { 
//       type: String, 
//       required: true, 
//       enum: ["Fiction", "Non-Fiction", "Science", "Technology", "Children", "Biography", "Self-Help", "History", "Education", "Other"]
//     },
//     format: { type: String, required: true, enum: ["Paperback", "Hardcover", "eBook"] },
//     ISBN: { type: String, unique: true, required: true },
//     publisher: { type: String, required: true },
//     language: { type: String, required: true },
//     publicationDate: { type: Date, required: true },
//     pages: { type: Number, required: true },
//     stock: { type: Number, required: true, min: 0 },
//     description: { type: String, required: true },
//     coverImage: { type: String, required: true },
//     discountPrice: { type: Number, min: 0 },
//     ratings: { type: Number, default: 0, min: 0, max: 5 },
//   },
//   { timestamps: true }
// );

// const Book = mongoose.model("Book", bookSchema);

// // Using ES Module export
// export default Book;


import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { 
      type: String, 
      required: true, 
      enum: ["Fiction", "Non-Fiction", "Science", "Technology", "Children", "Biography", "Self-Help", "History", "Education", "Other"]
    },
    format: { type: String, required: true, enum: ["Paperback", "Hardcover", "eBook"] },
    ISBN: { type: String, unique: true, required: true },
    publisher: { type: String, required: true },
    language: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    pages: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    coverImage: { type: String, required: true }, // Will store relative path to image
    discountPrice: { type: Number, min: 0 },
    ratings: { type: Number, default: 0, min: 0, max: 5 },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
