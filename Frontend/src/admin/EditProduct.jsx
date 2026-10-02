import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productService";
import "../styles/adminProductForm.css";

function EditProduct() {
  const { id, status } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    status: "active",
    image: null,
  });

  const [oldImage, setOldImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const product = await getProductById(id, status);

        setFormData({
          name: product.name || "",
          price: product.price || "",
          description: product.description || "",
          category: product.category || "",
          stock: product.stock || "",
          status: product.status || "active",
          image: null,
        });

        setOldImage(product.imageURL || "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError("");

      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("price", formData.price);
      productData.append("description", formData.description);
      productData.append("category", formData.category);
      productData.append("stock", formData.stock);
      productData.append("status", formData.status);

      if (formData.image) {
        productData.append("image", formData.image);
      }

      await updateProduct(id, productData);

      navigate("/admin/products");
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div>Loading product...</div>;
  }

  return (
    <main className="admin-product-form-page">
      <div className="admin-product-form-container">
        <div className="admin-product-form-header">
          <h1>Edit Product</h1>
          <p>Update your Shivcart product</p>
        </div>

        {error && <div className="admin-product-form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price</label>

              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>

              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>

            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {oldImage && (
            <div className="form-group">
              <label>Current Image</label>

              <img
                src={oldImage}
                alt={formData.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="image">New Image (optional)</label>

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="cancel-btn"
              disabled={updating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-product-btn"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProduct;
