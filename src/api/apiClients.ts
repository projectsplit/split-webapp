import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "../config";

import routes from "../routes";
import { refreshToken } from "./auth/api";

const isAccessValid = (token: string): boolean => {
  const decodedToken: { exp: number } = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  const tokenRefreshBufferSeconds = 50;
  return decodedToken.exp > currentTime + tokenRefreshBufferSeconds;
};

export const apiClient = axios.create({
  baseURL: `${config.serverUrl}`,
  // headers: {
  //   "ngrok-skip-browser-warning": "ngrok",
  // },
});

apiClient.interceptors.request.use(
  async c => {
    const existingAccessToken = localStorage.getItem("accessToken");

    if (existingAccessToken && existingAccessToken != "undefined" && isAccessValid(existingAccessToken)) {
      c.headers["Authorization"] = `Bearer ${existingAccessToken}`;
      return c;
    }

    const refreshResponse = await refreshToken();
    localStorage.setItem("accessToken", refreshResponse.accessToken);
    c.headers["Authorization"] = `Bearer ${refreshResponse.accessToken}`;
    return c;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken")
      window.location.href = routes.AUTH;
    }
    return Promise.reject(error);
  },
);

export const authApiClient = axios.create({
  baseURL: config.serverUrl,
  withCredentials: true,
  // headers: {
  //   "ngrok-skip-browser-warning": "ngrok",
  // },
});