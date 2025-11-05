import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

// Export only once (default export)
export default api;
