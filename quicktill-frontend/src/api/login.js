// login.js
import axios from "axios";

async function login(email, password) {
  const res = await axios.post("http://127.0.0.1:8000/api/login", {
    email, password
  });
  localStorage.setItem("token", res.data.token);
  return res.data.user;
}

// axios setup
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
