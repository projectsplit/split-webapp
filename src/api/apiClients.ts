import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import config from '../config';

import routes from '../routes';
import { logOut, refreshToken } from './auth/api';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const redirectToAuth = () => {
  if (window.location.pathname !== routes.AUTH) {
    window.location.href = routes.AUTH;
  }
};

const isAccessTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  const decodedToken: { exp: number } = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  const tokenRefreshBufferSeconds = 50;
  return decodedToken.exp > currentTime + tokenRefreshBufferSeconds;
};

export const apiClient = axios.create({
  baseURL: `${config.serverUrl}`,
});

apiClient.interceptors.request.use(
  async (config) => {
    if (!isAccessTokenValid(getAccessToken())) {
      if (mutex.isLocked()) {
        await mutex.waitForUnlock();
      } else {
        const release = await mutex.acquire();
        try {
          const refreshResponse = await refreshToken();
          storeAccessToken(refreshResponse.accessToken);
        } catch (error) {
          await logOut();
          clearAccessToken();
          clearSubmittedFromHomePersistData();
          redirectToAuth();
          throw new axios.Cancel('Session expired, logging out.');
        } finally {
          release();
        }
      }
    }

    config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401
    ) {
      await logOut();
      clearAccessToken();
      clearSubmittedFromHomePersistData();
      redirectToAuth();
    }
    return Promise.reject(error);
  }
);

export const authApiClient = axios.create({
  baseURL: config.serverUrl,
  withCredentials: true,
});

function clearAccessToken() {
  localStorage.removeItem('accessToken');
}

function storeAccessToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function clearSubmittedFromHomePersistData() {
  sessionStorage.removeItem('submittedFromHomePersistData');
}
