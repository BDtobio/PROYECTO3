// src/api/axiosInstance.js (o .ts)
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  // Podés agregar aquí headers comunes, timeouts, etc.
});

export default axiosInstance;
