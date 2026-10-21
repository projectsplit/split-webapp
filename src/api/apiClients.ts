import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import config from '../config';

import routes from '../routes';
import { logOut, refreshToken } from './auth/api';
import { isConnectivityError } from './offline/connectivity';

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

let refreshing: Promise<void> | null = null;

/**
 * Swaps the expired access token for a new one, once, however many requests are waiting for it.
 * They all share the outcome: a request that went ahead after a failed refresh would carry the
 * expired token, and its 401 would sign the person out.
 *
 * Only a refresh the server turns down ends the session. One that never reached the server says
 * nothing about it — the phone may just be offline — and signing someone out for that would strand
 * every expense they filed in the meantime, so the waiting requests fail as if offline instead.
 */
const refreshAccessToken = () => {
  refreshing ??= (async () => {
    try {
      const refreshResponse = await refreshToken();
      storeAccessToken(refreshResponse.accessToken);
    } catch (error) {
      if (isConnectivityError(error)) throw error;

      try {
        await logOut();
      } catch {
        // The session is over either way; this only clears the refresh cookie.
      }
      clearAccessToken();
      clearSubmittedFromHomePersistData();
      redirectToAuth();
      throw new axios.Cancel('Session expired, logging out.');
    } finally {
      refreshing = null;
    }
  })();

  return refreshing;
};

apiClient.interceptors.request.use(
  async (config) => {
    if (!isAccessTokenValid(getAccessToken())) {
      await refreshAccessToken();
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
