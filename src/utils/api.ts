import axios from 'axios';
import { AuthorizationResponse } from '../types/authorization-response';

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const copy = { ...config };
  copy.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return copy;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthorizationResponse>(`${import.meta.env.VITE_API_URL}/users/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        return await api.request(originalRequest);
      } catch (error) {
        return 'not authorized';
      }
    }
    throw err;
  }
);

export default api;
