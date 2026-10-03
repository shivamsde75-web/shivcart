import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getMyOrders } from "../services/orderService";
import { getProductById } from "../services/productService";
import "../styles/orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const orderData = await getMyOrders();

        const ordersWithProducts = await Promise.all(
          orderData.map(async (order) => {
            try {
              const product = await getProductById(order.itemId);
              console.log("Product:", product);
              return {
                ...order,
                product,
              };
            } catch {
              return {
                ...order,
                product: null,
              };
            }
          }),
        );

        setOrders(ordersWithProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <main className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your orders and their status</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <h2>No Orders Found</h2>
            <p>You haven't placed any orders yet.</p>

            <Link to="/products" className="shop-now-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-product">
                  {order.product && (
                    <>
                      <img
                        src={order.product.imageURL}
                        alt={order.product.name}
                      />

                      <div>
                        <h2>{order.product.name}</h2>

                        <p>₹{order.product.price}</p>

                        <p>Quantity: {order.quantity}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="order-top">
                  <div>
                    <p className="order-label">Order ID</p>

                    <h3>{order._id}</h3>
                  </div>

                  <span className={`order-status status-${order.status}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-details">
                  <div>
                    <span>Quantity</span>
                    <strong>{order.quantity}</strong>
                  </div>

                  <div>
                    <span>Total Price</span>
                    <strong>
                      ₹
                      {Number(order.product?.price || 0) *
                        Number(order.quantity || 0) || 0}
                    </strong>
                  </div>

                  <div>
                    <span>Address</span>
                    <strong>{order.address}</strong>
                  </div>
                </div>

                <div className="order-date">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Orders;
