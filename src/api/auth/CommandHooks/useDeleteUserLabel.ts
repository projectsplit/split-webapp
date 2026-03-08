import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { DeleteUserLabelRequest } from "../../../types";
import { apiClient } from "../../apiClients";
import { Signal } from "@preact/signals-react";

export const useDeleteUserLabel = (
  errorMessage: Signal<string>,
  menu: Signal<string | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { labelId: string }>({
    mutationFn: ({ labelId }) => deleteUserLabel({ labelId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userLabels"], exact: false });
    },
    onError: (err) => {
      const error = err as AxiosError;
      errorMessage.value = String(error.response?.data);
      menu.value = "generalWarning"
    },
  });
};

const deleteUserLabel = async (req: DeleteUserLabelRequest): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    "/users/delete-user-label",
    req
  );
  return response.data;
};
