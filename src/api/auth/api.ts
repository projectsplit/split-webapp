import {
  PasswordSignInRequest,
  PasswordSignUpRequest,
  RefreshTokenResponse,
  RequestPasswordResetRequest,
  RequestUsernameRecoveryRequest,
  ResetPasswordRequest,
  SendGoogleCodeRequest,
  SetAccountEmailRequest,
  VerifyAccountEmailRequest,
} from '../../types';
import { apiClient, authApiClient } from '../apiClients';

export const sendGoogleAccessToken = async (request: SendGoogleCodeRequest) => {
  const response = await authApiClient.post<SendGoogleCodeRequest, any>(
    '/auth/external/google/token',
    request
  );
  return response.data;
};

export const sendPasswordCredentials = async (
  request: PasswordSignInRequest
) => {
  const response = await authApiClient.post('/auth/password/sign-in', request);
  return response.data;
};

export const createPasswordCredentials = async (
  request: PasswordSignUpRequest
) => {
  const response = await authApiClient.post('/auth/password/sign-up', request);
  return response.data;
};

export const requestPasswordReset = async (
  request: RequestPasswordResetRequest
) => {
  const response = await authApiClient.post('/auth/password/forgot', request);
  return response.data;
};

export const resetPassword = async (request: ResetPasswordRequest) => {
  const response = await authApiClient.post('/auth/password/reset', request);
  return response.data;
};

export const requestUsernameRecovery = async (
  request: RequestUsernameRecoveryRequest
) => {
  const response = await authApiClient.post('/auth/username/forgot', request);
  return response.data;
};

export const setAccountEmail = async (request: SetAccountEmailRequest) => {
  const response = await apiClient.post('/auth/account/email', request);
  return response.data;
};

export const verifyAccountEmail = async (
  request: VerifyAccountEmailRequest
) => {
  const response = await apiClient.post('/auth/account/email/verify', request);
  return response.data;
};

export const logOut = async () => {
  const response = await authApiClient.post('/auth/log-out', {});
  return response.data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await authApiClient.post('/auth/refresh', {});
  return response.data;
};
