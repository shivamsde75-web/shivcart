import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { createOrder } from "../services/orderService";

import "../styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, totalItems, totalPrice, clearCart } = useCart();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await Promise.all(
        cartItems.map((item) =>
          createOrder(item._id, {
            quantity: item.quantity,
            address,
          }),
        ),
      );

      clearCart();

      navigate("/orders");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Cart is Empty</h1>
          <p>Add products to your cart before checkout.</p>

          <button
            onClick={() => navigate("/products")}
            className="checkout-back-btn"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order</p>
        </div>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Delivery Address</h2>
            <div className="form-group">
              <label htmlFor="address">Address</label>

              <textarea
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your complete delivery address"
                rows="5"
                required
              />
            </div>
            {error && <div className="checkout-error">{error}</div>}
            <button
              type="submit"
              className="place-order-btn"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-products">
              {cartItems.map((item) => (
                <div className="checkout-product" key={item._id}>
                  <img src={item.imageURL} alt={item.name} />

                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <strong>₹{item.price * item.quantity}</strong>
                </div>
              ))}
            </div>

            <div className="checkout-divider"></div>

            <div className="checkout-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="checkout-total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
