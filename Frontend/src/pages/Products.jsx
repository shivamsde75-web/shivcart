import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getAllProducts } from "../services/productService";
import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProducts();

        setProducts(data.filter((product) => product.status !== "inactive"));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        <p>Explore our latest products</p>
      </div>

      {error && <ErrorMessage message={error} />}

      {!error && products.length === 0 && (
        <div className="no-products">
          <h2>No Products Found</h2>
          <p>There are no products available right now.</p>
        </div>
      )}

      {!error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;
