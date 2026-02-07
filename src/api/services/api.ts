import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import {
  UserInfo,
  GroupsTotalAmountsResponse,
  GroupsAllBalancesResponse,
  GroupRequest,
  MostRecentGroupDetailsResponse,
} from "../../types";


export const getGroupsTotalAmounts = async (
  pageSize: number,
  next: string,
  isArchived: boolean
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


export const getUserId = async () => {
  const response = await apiClient.get("/");
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
