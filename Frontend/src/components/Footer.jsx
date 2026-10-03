import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">Shivcart</h2>
          <p>
            Your trusted destination for quality products, great prices and a
            smooth shopping experience.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
        </div>

        <div className="footer-section">
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/profile">My Profile</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: shivam.sde@gmail.com</p>
          <p>Phone: +91 7505423113</p>
          <p>India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Shivcart. All rights reserved.</p>
        <p>Made with ❤️ for a better shopping experience.</p>
      </div>
    </footer>
  );
}

export default Footer;
