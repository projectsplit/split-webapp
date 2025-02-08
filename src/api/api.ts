import { AxiosResponse } from "axios";
import { GetGroupExpensesResponse, GetGroupsResponse, UserInfo, Group, PasswordSignInRequest, SendGoogleAccessTokenRequest, CreateExpenseRequest, GetLabelsResponse, GetGroupTransfersResponse } from "../types";
import { apiClient, authApiClient } from "./apiClients";

export const getGroupExpenses = async (groupId: string, pageSize: number, next?: string): Promise<GetGroupExpensesResponse> => {
  const params = { groupId, pageSize, next };
  const response = await apiClient.get<void, AxiosResponse<GetGroupExpensesResponse>>('/expenses', { params });
  return response.data;
};

export const getGroupTransfers = async (groupId: string, pageSize: number, next?: string): Promise<GetGroupTransfersResponse> => {
  const params = { groupId, pageSize, next };
  const response = await apiClient.get<void, AxiosResponse<GetGroupTransfersResponse>>('/transfers', { params });
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get<void, AxiosResponse<UserInfo>>("/users/me");
  return response.data;
};

export const getGroup = async (groupId: string): Promise<Group> => {
  const response = await apiClient.get<void, AxiosResponse<Group>>(`/groups/${groupId}`);
  return response.data;
};

export const getGroups = async (userId: string, pageSize: number, next?: string): Promise<GetGroupsResponse> => {
  const params = { userId, pageSize, next };
  const response = await apiClient.get<void, AxiosResponse<GetGroupsResponse>>("/groups", { params });
  return response.data;
};

export const getUserId = async () => {
  const response = await apiClient.get("/");
  return response.data;
};

export const createExpense = async (req: CreateExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/create", req);
};

export const getLabels = async (groupId: string, limit: number, query?: string) => {
  const params = { groupId, limit, query };
  const response = await apiClient.get<void, AxiosResponse<GetLabelsResponse>>("/expenses/labels", { params });
  return response.data;
};

// --- AUTH ---
export const sendGoogleAccessToken = async (request: SendGoogleAccessTokenRequest) => {
  const response = await authApiClient.post<SendGoogleAccessTokenRequest, any>(
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

export const refreshToken = async () => {
  const response = await authApiClient.post(
    "/auth/refresh",
    {}
  );
  return response.data;
};