import axios from "axios";

// Create a pre-configured Axios instance for DebugDiary API
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  withCredentials: true, // send HTTP-only JWT cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: normalize successful responses to return data directly
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Request failed";
    return Promise.reject(new Error(`${status || ""} ${msg}`.trim()));
  }
);

export default axiosInstance;