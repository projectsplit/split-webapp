import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Signal } from "@preact/signals-react";
import { GetJoinCodesResponse } from "../../../types";

export const useRevokeInvitationCode = (
  groupId: string,
  pageSize: number,
  invitationCode: string | null,
  mostRecentCodeHasBeenRevoked: Signal<boolean>,
) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { code: string }>({
    mutationFn: ({ code }) => revokeInvitationCode({ code }),
    onSuccess: (_, { code }) => {

      const url = new URL(window.location.href);
      if (code === invitationCode) {
        url.searchParams.delete("invitationcode");
        window.history.replaceState({}, "", url);
        mostRecentCodeHasBeenRevoked.value = true
      }
      queryClient.setQueryData(
        ["getGroupJoinCodes", groupId, pageSize],
        (oldData: { pages: GetJoinCodesResponse[] } | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              codes: page.codes.filter((item) => item.id !== code),
            })),
          };
        }
      );

    },

    onError: (error) => {
      console.error(error);
    },
  });
};

const revokeInvitationCode = async (
  req: RevokeCodeRequest
): Promise<string> => {
  const response = await apiClient.post<
    { code: string },
    AxiosResponse<{ code: string }>
  >("/join/revoke", req);
  return response.data.code;
};

type RevokeCodeRequest = {
  code: string;
};
