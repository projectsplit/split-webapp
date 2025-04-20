import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";

export const useEditUsername = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (username) => editUsername({ username }),
    onSuccess: async () => {
      queryClient.refetchQueries({ queryKey: ["getMe"] })
    },
  });
};

const editUsername = async (req: EditUsernameRequest): Promise<void> => {
  await apiClient.put<void, AxiosResponse<void>>("/users/username", req);
};

interface EditUsernameRequest {
  username: string;
};