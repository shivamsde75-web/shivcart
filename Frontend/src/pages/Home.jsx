import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsError("");
        const data = await getAllProducts();
        setProducts(
          data.filter((product) => product.status !== "inactive").slice(0, 4),
        );
      } catch (error) {
        setProductsError(error.message || "Failed to load products.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

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

      <section className="home-products">
        <div className="home-products-header">
          <div>
            <p className="home-products-eyebrow">SHOP THE COLLECTION</p>
            <h2>Featured Products</h2>
          </div>
          <Link to="/products" className="home-products-link">
            View all products
          </Link>
        </div>

        {productsError && <ErrorMessage message={productsError} />}
        {loadingProducts && (
          <p className="home-products-state">Loading products...</p>
        )}
        {!loadingProducts && !productsError && products.length === 0 && (
          <p className="home-products-state">
            No products are available right now.
          </p>
        )}
        {!loadingProducts && !productsError && products.length > 0 && (
          <div className="home-products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
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
