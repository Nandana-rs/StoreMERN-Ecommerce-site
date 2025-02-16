// src/pages/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div className="cart-card" key={item._id}>
                <img
                  src={`http://localhost:5000${item.coverImage}`}
                  alt={item.title}
                  className="cart-cover"
                />
                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p>By {item.author}</p>
                  <p>Price: Rs. {item.price}</p>
                  {item.discountPrice && (
                    <p style={{ color: "red" }}>
                      Discount: Rs. {item.discountPrice}
                    </p>
                  )}
                  <button onClick={() => handleRemove(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="clear-cart-btn" onClick={handleClear}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
