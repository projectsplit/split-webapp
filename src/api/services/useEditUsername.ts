import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";

export const useEditUsername = (groupId:string|undefined) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (username) => editUsername({ username }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getMe"] });
      if (groupId) {
        await queryClient.invalidateQueries({
          queryKey: [groupId],
          exact: false,
        });
      }
    
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
    },
  });
};

const editUsername = async (req: EditUsernameRequest): Promise<void> => {
  await apiClient.put<void, AxiosResponse<void>>("/users/username", req);
};

interface EditUsernameRequest {
  username: string;
}
