import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getAllOrders, updateOrderStatus } from "../services/orderService";
import "../styles/adminOrders.css";

const STATUS_OPTIONS = ["pending", "paid", "delivered", "cancelled"];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, nextStatus) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, nextStatus);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: nextStatus } : order,
        ),
      );
    } catch (err) {
      setError(err.message || "Failed to update order status");
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="admin-orders-page">
      <div className="admin-orders-container">
        <div className="admin-orders-header">
          <div>
            <h1>Orders</h1>
            <p>Manage customer order status</p>
          </div>

          <Link to="/admin" className="back-to-dashboard-btn">
            Back to Dashboard
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <h2>No Orders Found</h2>
            <p>There are no orders yet.</p>
          </div>
        ) : (
          <div className="admin-orders-table-wrapper">
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{String(order._id).slice(-8)}</td>
                    <td>{String(order.userId).slice(-8)}</td>
                    <td>{String(order.itemId).slice(-8)}</td>
                    <td>{order.quantity}</td>
                    <td>₹{Number(order.totalPrice || 0)}</td>
                    <td>
                      <select
                        value={order.status}
                        className={`status-select ${order.status}`}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        disabled={updatingId === order._id}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
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

export default AdminOrders;
