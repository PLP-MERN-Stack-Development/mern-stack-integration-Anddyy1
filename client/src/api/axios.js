import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Update if backend URL changes
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
