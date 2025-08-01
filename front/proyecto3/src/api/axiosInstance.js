import axios from 'axios';

// Lee la variable de entorno o usa localhost en desarrollo
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log("API URL usada en axios:", API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL,
  
});

export default axiosInstance;
