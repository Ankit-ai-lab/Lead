// const BASE_URL = 'http://localhost:5000/api';
// const BASE_URL = import.meta.env.VITE_API_URL || "https://lead-cxpn.onrender.com/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const getLeads = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/leads?${query}`);
  return res.json();
};

export const getLeadById = async (id) => {
  const res = await fetch(`${BASE_URL}/leads/${id}`);
  return res.json();
};

export const createLead = async (leadData) => {
  const res = await fetch(`${BASE_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });
  return res.json();
};

export const updateLead = async (id, leadData) => {
  const res = await fetch(`${BASE_URL}/leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });
  return res.json();
};

export const deleteLead = async (id) => {
  const res = await fetch(`${BASE_URL}/leads/${id}`, { method: 'DELETE' });
  return res.json();
};

export const getStats = async () => {
  const res = await fetch(`${BASE_URL}/leads/stats/summary`);
  return res.json();
};
