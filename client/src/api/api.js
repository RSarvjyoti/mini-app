import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

export const fetchAndStore = (username) =>
  axios.get(`${API_BASE}/repos/fetch`, { params: { username } });

export const listRepos = (page = 1, limit = 10, owner_login) =>
  axios.get(`${API_BASE}/repos`, { params: { page, limit, owner_login } });

export const updateRepo = (id, payload) =>
  axios.put(`${API_BASE}/repos/${id}`, payload);

export const deleteRepo = (id) =>
  axios.delete(`${API_BASE}/repos/${id}`);

export const createRepo = (payload) =>
  axios.post(`${API_BASE}/repos`, payload);
