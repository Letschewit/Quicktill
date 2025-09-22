// login.js
import axios from "axios";

const inferredHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const defaultBase = `http://${inferredHost}:8000/api`;
const apiBase = (typeof window !== 'undefined' && localStorage.getItem('apiBaseUrl')) || process.env.REACT_APP_API_URL || defaultBase;

async function login(name, password) {
  const res = await axios.post(`${apiBase}/login`, {
    name, password
  });
  localStorage.setItem("token", res.data.token);
  return res.data.user;
}

async function register(name, email, password) {
  const res = await axios.post(`${apiBase}/register`, {
    name, email, password
  });
  localStorage.setItem("token", res.data.token);
  return res.data.user;
}

export { login, register };
