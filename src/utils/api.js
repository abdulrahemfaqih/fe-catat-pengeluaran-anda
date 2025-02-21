// src/utils/api.js
import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_PUBLIC_API_URL
      ? `${import.meta.env.VITE_PUBLIC_API_URL}`
      : "http://localhost:5000/api",
});

export default api;
