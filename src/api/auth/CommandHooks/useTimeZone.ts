import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { UpdateSelectedTimeZoneRequest } from "../../../types";

export const useTimeZone = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (timeZone) => updateTimeZone({ timeZone }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["getMe"],
        exact: false,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const updateTimeZone = async (
  req: UpdateSelectedTimeZoneRequest
): Promise<void> => {
  const response = await apiClient.put<void, AxiosResponse<void>>(
    "/users/preferences/time-zone",
    req
  );
  return response.data;
};
