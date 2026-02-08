import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { useQuery } from "@tanstack/react-query";

export const useGetUsernameStatus = (username: string | undefined) => {
  return useQuery<any, Error, GetUsernameStatusResponse>({
    queryKey: ["usernameStatus", username],
    queryFn: () => getUsernameStatus(username!),
    staleTime: 0,
    gcTime: 0,
    enabled: !!username,
  });
};

const getUsernameStatus = async (username: string): Promise<GetUsernameStatusResponse> => {
  const response = await apiClient.get<void, AxiosResponse<GetUsernameStatusResponse>>(`/users/username/${username}`);
  return response.data;
};

type GetUsernameStatusResponse = {
  isValid: boolean;
  errorMessage: string | null;
  isAvailable: boolean;
};
