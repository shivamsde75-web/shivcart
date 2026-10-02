import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getAdminAnalytics } from "../services/analyticsService";
import "../styles/adminDashboard.css";

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminAnalytics();
        setAnalytics(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage and monitor your Shivcart store</p>
          </div>

          <div className="dashboard-actions">
            <Link to="/admin/users" className="dashboard-users-btn">
              View Users
            </Link>

            <Link to="/admin/orders" className="dashboard-orders-btn">
              View Orders
            </Link>

            <Link to="/admin/products" className="dashboard-product-btn">
              View Products
            </Link>

            <Link to="/admin/products/create" className="dashboard-create-btn">
              Create Product
            </Link>
          </div>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <span>Total Orders</span>
            <h2>{analytics?.totalOrders ?? 0}</h2>
          </div>

          <div className="analytics-card">
            <span>Total Products</span>
            <h2>{analytics?.totalProducts ?? 0}</h2>
          </div>

          <div className="analytics-card">
            <span>Total Users</span>
            <h2>{analytics?.totalUsers ?? 0}</h2>
          </div>

          <div className="analytics-card">
            <span>Total Revenue</span>
            <h2>₹{analytics?.totalRevenue ?? 0}</h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
