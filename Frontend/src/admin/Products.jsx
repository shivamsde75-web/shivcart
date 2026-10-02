import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getAllProducts, deleteProduct } from "../services/productService";
import "../styles/adminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState("");
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(productId);
      setError("");

      await deleteProduct(productId);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleteLoading("");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error && products.length === 0) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="admin-products-page">
      <div className="admin-products-container">
        {/* Header */}
        <div className="admin-products-header">
          <div>
            <h1>Product Management</h1>
            <p>Manage all products in your Shivcart store</p>
          </div>

          <Link to="/admin/products/create" className="add-product-btn">
            + Add Product
          </Link>
        </div>

        {/* Error */}
        {error && <div className="admin-product-error">{error}</div>}

        {/* No Products */}
        {products.length === 0 ? (
          <div className="no-products">
            <h2>No Products Found</h2>

            <p>Add your first product to the store.</p>

            <Link to="/admin/products/create" className="add-product-btn">
              Add Product
            </Link>
          </div>
        ) : (
          /* Products Table */
          <div className="admin-products-table-wrapper">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    {/* Image */}
                    <td>
                      <img
                        src={product.imageURL}
                        alt={product.name}
                        className="admin-product-image"
                      />
                    </td>

                    {/* Name */}
                    <td>
                      <strong>{product.name}</strong>
                    </td>

                    {/* Category */}
                    <td>{product.category}</td>

                    {/* Price */}
                    <td>₹{product.price}</td>

                    {/* Stock */}
                    <td>{product.stock}</td>

                    <td>
                      <span
                        className={`product-status-badge ${product.status || "active"}`}
                      >
                        {product.status || "active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="admin-product-actions">
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="edit-product-btn"
                        >
                          Edit
                        </Link>

                        <button
                          className="delete-product-btn"
                          onClick={() => handleDelete(product._id)}
                          disabled={deleteLoading === product._id}
                        >
                          {deleteLoading === product._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminProducts;
