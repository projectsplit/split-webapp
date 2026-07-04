import { authApiClient } from '../apiClients';
export const sendGoogleAccessToken = async (request) => {
    const response = await authApiClient.post('/auth/external/google/token', request);
    return response.data;
};
export const sendPasswordCredentials = async (request) => {
    const response = await authApiClient.post('/auth/password/sign-in', request);
    return response.data;
};
export const createPasswordCredentials = async (request) => {
    const response = await authApiClient.post('/auth/password/sign-up', request);
    return response.data;
};
export const logOut = async () => {
    const response = await authApiClient.post('/auth/log-out', {});
    return response.data;
};
export const refreshToken = async () => {
    const response = await authApiClient.post('/auth/refresh', {});
    return response.data;
};
