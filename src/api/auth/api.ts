import {
  DismissDonationPromptRequest,
  DonationPromptInfo,
  PasswordSignInRequest,
  PasswordSignUpRequest,
  RefreshTokenResponse,
  RequestPasswordResetRequest,
  RegisterDonationPurchaseRequest,
  RequestUsernameRecoveryRequest,
  ResetPasswordRequest,
  SendGoogleCodeRequest,
  SendGoogleIdTokenRequest,
  SetAccountEmailRequest,
  SetPushNotificationsEnabledRequest,
  VerifyAccountEmailRequest,
} from '../../types';
import { AxiosResponse } from 'axios';
import { apiClient, authApiClient } from '../apiClients';

export const sendGoogleAccessToken = async (request: SendGoogleCodeRequest) => {
  const response = await authApiClient.post<SendGoogleCodeRequest, any>(
    '/auth/external/google/token',
    request
  );
  return response.data;
};

export const sendGoogleIdToken = async (request: SendGoogleIdTokenRequest) => {
  const response = await authApiClient.post<SendGoogleIdTokenRequest, any>(
    '/auth/external/google/id-token',
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

export const setPushNotificationsEnabled = async (
  request: SetPushNotificationsEnabledRequest
) => {
  const response = await apiClient.post('/notifications/preference', request);
  return response.data;
};

export const getDonationPrompt = async () => {
  const response = await apiClient.get<void, AxiosResponse<DonationPromptInfo>>(
    '/donations/prompt'
  );
  return response.data;
};

export const recordDonationPromptShown = async () => {
  const response = await apiClient.post('/donations/prompt/shown', {});
  return response.data;
};

export const dismissDonationPrompt = async (
  request: DismissDonationPromptRequest
) => {
  const response = await apiClient.post('/donations/prompt/dismiss', request);
  return response.data;
};

export const registerDonationPurchase = async (
  request: RegisterDonationPurchaseRequest
) => {
  const response = await apiClient.post('/donations/purchase', request);
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
