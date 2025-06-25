import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/admin`;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// JWT Token interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
