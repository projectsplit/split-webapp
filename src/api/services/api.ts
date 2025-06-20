import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import {
  GetGroupExpensesResponse,
  GetGroupsResponse,
  UserInfo,
  GetGroupTransfersResponse,
  BudgetInfoResponse,
  GroupsTotalAmountsResponse,
  GroupsAllBalancesResponse,
  GroupRequest,
  MostRecentGroupDetailsResponse,
  DebtsResponse,
} from "../../types";

export const getGroupExpenses = async (
  groupId: string,
  pageSize: number,
  next?: string
): Promise<GetGroupExpensesResponse> => {
  const params = { groupId, pageSize, next };

  const response = await apiClient.get<
    void,
    AxiosResponse<GetGroupExpensesResponse>
  >("/expenses", { params });

  return response.data;
};

export const getGroupTransfers = async (
  groupId: string,
  pageSize: number,
  next?: string
): Promise<GetGroupTransfersResponse> => {
  const params = { groupId, pageSize, next };
  const response = await apiClient.get<
    void,
    AxiosResponse<GetGroupTransfersResponse>
  >("/transfers", { params });
  return response.data;
};

export const getGroupsTotalAmounts = async (
  pageSize: number,
  next: string,
  isArchived:boolean
): Promise<GroupsTotalAmountsResponse> => {
  const params = { pageSize, next, isArchived };
  const response = await apiClient.get<GroupsTotalAmountsResponse>(
    "/groups/details",
    { params }
  );
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get<void, AxiosResponse<UserInfo>>(
    "/users/me"
  );
  return response.data;
};

export const getGroupDebts = async (
  groupId: string
): Promise<DebtsResponse> => {
  const params = { groupId };
  const response = await apiClient.get<void, AxiosResponse<DebtsResponse>>("/debts", { params });

  return response.data;
};

export const getGroups = async (
  userId: string,
  pageSize: number,
  next?: string
): Promise<GetGroupsResponse> => {
  const params = { userId, pageSize, next };
  const response = await apiClient.get<void, AxiosResponse<GetGroupsResponse>>(
    "/groups",
    { params }
  );
  return response.data;
};

export const getUserId = async () => {
  const response = await apiClient.get("/");
  return response.data;
};


export const getBudgetInfo = async (): Promise<BudgetInfoResponse> => {
  const response = await apiClient.get<BudgetInfoResponse>(
    `/budget/budgetinfo`
  );
  return response.data;
};

export const getGroupsAllBalances =
  async (): Promise<GroupsAllBalancesResponse> => {
    const response = await apiClient.get<GroupsAllBalancesResponse>(
      `/groups/all-balances`
    );
    return response.data;
  };

export const getMostRecentGroup = async (
  groupId: string
): Promise<MostRecentGroupDetailsResponse> => {
  const response = await apiClient.get<MostRecentGroupDetailsResponse>(
    `/groups/${groupId}/details`
  );
  return response.data;
};

export const createGroupFn = async (request: GroupRequest) => {
  const response = await apiClient.post("/groups/create", request);
  return response.data;
};
