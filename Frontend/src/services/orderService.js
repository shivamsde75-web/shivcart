const API_URL = `${import.meta.env.Backend_URL}/api/orders`;

export const createOrder = async (productId, orderData) => {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create order");
  }

  return data;
};

export const getMyOrders = async () => {
  const response = await fetch(`${API_URL}/myorders`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data;
};

export const getAllOrders = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch all orders");
  }

  return data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await fetch(`${API_URL}/${orderId}/${status}`, {
    method: "PUT",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update order status");
  }

  return data;
};

export const deleteOrder = async (orderId) => {
  const response = await fetch(`${API_URL}/${orderId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete order");
  }

  return data;
};
