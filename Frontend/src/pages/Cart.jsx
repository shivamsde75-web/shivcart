import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import "../styles/cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>
          <p>Add some products to your cart and come back here.</p>

          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div>
            <h1>Shopping Cart</h1>
            <p>{totalItems} item(s) in your cart</p>
          </div>

          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="cart-item-image">
                  <img src={item.imageURL} alt={item.name} />
                </div>

                <div className="cart-item-info">
                  <h2>{item.name}</h2>

                  <p className="cart-item-category">{item.category}</p>

                  <p className="cart-item-price">₹{item.price}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-cart-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
