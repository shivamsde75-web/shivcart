import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const [logoutError, setLogoutError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      setLogoutError("");
      await logout();
    } catch (error) {
      setLogoutError(error.message || "Logout failed. Please try again.");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="/logo.png"
            alt="Shivcart logo"
            className="navbar-logo-image"
          />
          Shiv<span>cart</span>
        </Link>

        <button
          type="button"
          className="navbar-menu-toggle"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`navbar-links${menuOpen ? " is-open" : ""}`}
        >
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/products" onClick={closeMenu}>
            Products
          </Link>
          <Link to="/cart" onClick={closeMenu}>
            Cart
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin" onClick={closeMenu}>
              Dashboard
            </Link>
          )}
          {user && (
            <Link to="/orders" onClick={closeMenu}>
              Orders
            </Link>
          )}
          {user && (
            <Link to="/profile" onClick={closeMenu}>
              Profile
            </Link>
          )}
        </nav>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="navbar-user">Hi, {user.name}</span>

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {logoutError && <div className="navbar-error">{logoutError}</div>}
    </header>
  );
}

export default Navbar;
