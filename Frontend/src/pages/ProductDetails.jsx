import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        if (data?.status === "inactive") {
          throw new Error("Product not found");
        }

        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!product) {
    return <ErrorMessage message="Product not found." />;
  }

  return (
    <main className="product-details-page">
      <div className="product-details">
        <div className="product-details-image">
          <img src={product.imageURL} alt={product.name} />
        </div>

        <div className="product-details-info">
          <p className="product-category">{product.category}</p>

          <h1>{product.name}</h1>

          <p className="product-details-price">₹{product.price}</p>

          <p className="product-description">{product.description}</p>

          <p className="product-stock-details">
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {product.stock > 0
              ? added
                ? "Added to Cart ✓"
                : "Add to Cart"
              : "Out of Stock"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
