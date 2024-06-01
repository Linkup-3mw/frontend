import axios from 'axios';
import { getCookie } from './cookie';

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
  //Server Side
  if (isServer) {
    const { cookies } = await import('next/headers');
    const token = cookies().get('access-token')?.value;

    if (cookies() && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } else {
    //Client Side
    const token = getCookie('access-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;
