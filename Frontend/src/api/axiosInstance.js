import axios from "axios";

// Create a pre-configured Axios instance for DebugDiary API
const baseURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: normalize successful responses to return data directly
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Extract a readable message
    const status = error?.response?.status;
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Request failed";
    return Promise.reject(new Error(`${status || ""} ${msg}`.trim()));
  }
);

export default axiosInstance;
