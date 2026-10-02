const API_URL = `${import.meta.env.Backend_URL}/api/analytics`;

export const getAdminAnalytics = async () => {
  const response = await fetch(`${API_URL}/admin`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch analytics");
  }

  return data;
};
