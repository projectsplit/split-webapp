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
  ExpenseParsedFilters,
  TransferParsedFilters,
} from "../../types";
import { reformatDate } from "../../components/SearchTransactions/helpers/reformatDate";

export const getGroupExpenses = async (
  groupId: string,
  pageSize: number,
  parsedFilters: ExpenseParsedFilters = {},
  next?: string
): Promise<GetGroupExpensesResponse> => {
  const {
    participantsIds = [],
    payersIds = [],
    freeText = "",
    before = null,
    after = null,
    labels = [],
  } = parsedFilters;

  // Construct query parameters manually
  const params = new URLSearchParams();
  params.append("groupId", groupId);
  params.append("pageSize", pageSize.toString());
  if (next) params.append("next", next);
  if (freeText) params.append("searchTerm", freeText);
  if (before) params.append("before", reformatDate(before));
  if (after) params.append("after", reformatDate(after));

  participantsIds.forEach((id) => params.append("participantIds", id));
  payersIds.forEach((id) => params.append("payerIds", id));
  labels.forEach((label) => params.append("labelIds", label));

  const response = await apiClient.get<
    void,
    AxiosResponse<GetGroupExpensesResponse>
  >("/expenses", { params });

  return response.data;
};

export const getGroupTransfers = async (
  groupId: string,
  pageSize: number,
  parsedFilters: TransferParsedFilters = {},
  next?: string
): Promise<GetGroupTransfersResponse> => {

    const {
    sendersIds = [],
    receiversIds = [],
    freeText = "",
    before = null,
    after = null,
  } = parsedFilters;

  // Construct query parameters manually
  const params = new URLSearchParams();
  params.append("groupId", groupId);
  params.append("pageSize", pageSize.toString());
  if (next) params.append("next", next);
  if (freeText) params.append("searchTerm", freeText);
  if (before) params.append("before", reformatDate(before));
  if (after) params.append("after", reformatDate(after));

  sendersIds.forEach((id) => params.append("senderIds", id));
  receiversIds.forEach((id) => params.append("receiverIds", id));

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
