const API_URL = `${import.meta.env.Backend_URL}/api/auth`;

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data;
};
