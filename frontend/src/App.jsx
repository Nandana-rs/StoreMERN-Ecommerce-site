// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import UserHomepage from "./pages/userhomepage.jsx";
import BookList from "./pages/BookList.jsx";
import BookDetails from "./pages/BookDetails";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";     

import AdminDashboard from "./pages/admindashboard.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./utils/protectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      {/* <ToastContainer /> */}
      {/* <Navigation /> */}
      <main className="py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userhomepage" element={<UserHomepage />} />
          <Route path="/products" element={<BookList />} />
          <Route path="/products/:id" element={<BookDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admindashboard" element={<AdminDashboard/>}/>
         
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
