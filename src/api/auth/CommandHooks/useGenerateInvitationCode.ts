import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { useMutation } from "@tanstack/react-query";

export const useGenerateInvitationCode = () => {

  return useMutation<any, Error, { groupId: string; }>({
    mutationFn: ({ groupId }) => generateInvitationCode({ groupId }),

    onError: (error) => {
      console.error(error);
    },
  });
};

const generateInvitationCode = async (req: GenerateCodeRequest): Promise<string> => {
  const response = await apiClient.post<{ code: string }, AxiosResponse<{ code: string }>>('/join/create', req);
  return response.data.code;
};

type GenerateCodeRequest = {
  groupId: string
};
