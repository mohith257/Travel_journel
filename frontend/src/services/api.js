import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth APIs
export const signup = (userData) => {
  return api.post("/auth/signup", userData);
};

export const login = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const getUser = (userId) => {
  return api.get(`/auth/${userId}`);
};

// Entry APIs
export const createEntry = (entryData) => {
  return api.post("/entries", entryData);
};

export const getEntries = (userId) => {
  return api.get(`/entries/user/${userId}`);
};

export const getEntry = (entryId) => {
  return api.get(`/entries/${entryId}`);
};

export const searchEntries = (title) => {
  return api.get(`/entries/search/title/${title}`);
};

export const updateEntry = (entryId, entryData) => {
  return api.put(`/entries/${entryId}`, entryData);
};

export const deleteEntry = (entryId) => {
  return api.delete(`/entries/${entryId}`);
};