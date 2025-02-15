

//updated


//causing error

// import express from "express";
// import { addBook, getAllBooks, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";
// import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Updated the route to handle image upload
// router.route("/").post(authenticate, authorizeAdmin, addBook).get(getAllBooks);
// router.route("/:id").get(getBookById).put(authenticate, authorizeAdmin, updateBook).delete(authenticate, authorizeAdmin, deleteBook);

// export default router;

import express from "express";
import { addBook, getAllBooks, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Updated the route to handle image upload
// router.route("/").post(authenticate, authorizeAdmin, addBook).get(getAllBooks);
// router.route("/:id").get(getBookById).put(authenticate, authorizeAdmin, updateBook).delete(authenticate, authorizeAdmin, deleteBook);
// Temporarily disable authentication middleware for testing:
router.route("/").post(addBook).get(getAllBooks);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
                                                                                    


export default router;