
import { PasswordSignInRequest, RefreshTokenResponse, SendGoogleCodeRequest } from "../../types";
import { authApiClient } from "../apiClients";

export const sendGoogleAccessToken = async (request: SendGoogleCodeRequest) => {
  const response = await authApiClient.post<SendGoogleCodeRequest, any>(
    "/auth/external/google/token",
    request
  );
  return response.data;
};

export const sendPasswordCredentials = async (request: PasswordSignInRequest) => {
  const response = await authApiClient.post(
    "/auth/password/sign-in",
    request
  );
  return response.data;
};

export const logOut = async () => {
  const response = await authApiClient.post(
    "/auth/log-out",
    {}
  );
  return response.data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await authApiClient.post(
    "/auth/refresh",
    {}
  );
  return response.data;
};