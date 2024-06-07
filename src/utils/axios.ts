import axios from 'axios';

import { getSession } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const isServer = typeof window === 'undefined';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true,
});

API.interceptors.request.use(async (config) => {
  let token;

  if (!isServer) {
    // client
    const session = await getSession();
    token = session?.accessToken;
  } else {
    // server
    ('use server');
    const { getSession } = await import('./getSession');
    const session = await getSession();
    token = session?.accessToken;
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default API;
