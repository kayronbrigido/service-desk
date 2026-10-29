import { apiEnv } from "@src/config/environment";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const instance = axios.create({
  baseURL: apiEnv.url || "http://localhost:3030",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true
});


export function getInstance() {

  instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post('/api/auth/refresh', {}, { withCredentials: true });

        return instance(originalRequest);
      } catch (err) {
        // logout aqui
      }
    }

    return Promise.reject(error);
  }
);

  instance.interceptors.request.use(
    (config) => {
      config.headers['X-Request-ID'] = uuidv4();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  return instance;
}
