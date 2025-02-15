// // main entry file of our backend

// // console.log("Hello Nandana");

//packages
// // main entry file of our backend

// packages
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors package

// Utiles
import connectDB from "./config/db.js"; 
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Enable CORS for your frontend (React app) origin
app.use(cors({
  origin: 'http://localhost:5173', // React frontend URL
  methods: 'GET, POST, PUT, DELETE',  // Allow only GET and POST methods
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes); 

// app.get('/' , (req , res) => {
//     res.send("Hello Nandana");
// })

app.listen(port, () => console.log(`Server running on port : ${port}`));
