import axios from "axios";
import { AuthResponse } from "../types/auth";

export const API_URL = "http://localhost:8000/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

// Ниже интерцептор на обновление рефреш токена если аксес умер
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true; // если вернется опять 401 то здесь мы избегаем зацикленности и говорим что запрос мы уже делали
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    } else {
      throw error;
    }
  }
);

export default $api;
