import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useQuery } from "@tanstack/react-query";

export const useGetJoinCode = (code: string) => {

  return useQuery<any, Error, GetJoinCodeResponse>({
    queryKey: ["joinCode", code],
    queryFn: () => getJoinCode(code),
  });
};

const getJoinCode = async (code: string): Promise<GetJoinCodeResponse> => {
  const response = await apiClient.get<void, AxiosResponse<GetJoinCodeResponse>>(
    `/join/${code}`
  );
  return response.data;
};

type GetJoinCodeResponse = {
  isAlreadyMember: boolean
  groupId: string,
  groupName: string,
  isExpired: boolean
};