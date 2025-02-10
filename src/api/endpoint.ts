import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;
const baseUrl = `${serverUrl}/api`;

export const endPoints = {
  login: `${baseUrl}/auth/login`,
};

export const instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const customRequest = (token?: string) => {
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};
