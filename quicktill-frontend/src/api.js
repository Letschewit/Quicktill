import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Laravel URL
  withCredentials: true, // important for Sanctum
});

export default api;
