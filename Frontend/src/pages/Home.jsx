import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">WELCOME TO SHIVCART</p>

          <h1>
            Everything You Need,
            <span> All in One Place.</span>
          </h1>

          <p className="hero-description">
            Discover quality products at great prices and enjoy a simple and
            reliable shopping experience.
          </p>

          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>Get your orders delivered quickly and safely.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Shopping</h3>
          <p>Your shopping experience is safe and secure.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Easy Payment</h3>
          <p>Choose a convenient payment method at checkout.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Quality Products</h3>
          <p>Explore products selected for a better experience.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
