import { Link } from "react-router-dom";
import "../styles/product.css";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.imageURL} alt={product.name} />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-price">₹{product.price}</p>

        <p className="product-stock">
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
        </p>

        <Link to={`/products/${product._id}`} className="view-product-btn">
          View Product
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
