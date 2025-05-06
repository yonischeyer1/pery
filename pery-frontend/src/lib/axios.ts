import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

const instance = axios.create({
  baseURL: BASE_URL, // Can be '/api' or full domain if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token automatically if you add a store later
// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers["x-authentication"] = token;
//   return config;
// });

export default instance;
