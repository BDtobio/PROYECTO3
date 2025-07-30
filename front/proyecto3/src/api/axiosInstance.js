import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://dpg-d24pfvili9vc73ehvda0-a.render.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  // Podés agregar aquí headers comunes, timeouts, etc.
});

export default axiosInstance;
