import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// add interceptors for auth or error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
