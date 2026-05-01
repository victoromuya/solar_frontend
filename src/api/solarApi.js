import axios from "axios";

export const API_BASE_URL = "https://solar-api-seven.vercel.app";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.url?.startsWith("/admin")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;

export const loginAdmin = (credentials) =>
  axios.post(`${API_BASE_URL}/api/token/`, credentials);

export const createCalculation = (data) => API.post("/calculations/", data);

export const getCalculation = (id) => API.get(`/calculations/${id}/`);

export const getAppliances = () => API.get("/appliances/");

export const getAdminAppliances = () => API.get("/admin/appliances/");

export const createAdminAppliance = (data) =>
  API.post("/admin/appliances/", data);

export const deleteAdminAppliance = (id) =>
  API.delete(`/admin/appliances/${id}/`);
