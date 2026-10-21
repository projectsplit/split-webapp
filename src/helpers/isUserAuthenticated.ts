import { jwtDecode } from 'jwt-decode';

export const isUserAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

/**
 * Whose session this device holds, read from the access token without checking it. It still
 * answers once the token has expired, which offline use depends on: the person is the same, only
 * the proof has to be renewed before the server will listen.
 */
export const getSignedInUserId = (): string | null => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    return jwtDecode<{ sub?: string }>(token).sub ?? null;
  } catch {
    return null;
  }
};
