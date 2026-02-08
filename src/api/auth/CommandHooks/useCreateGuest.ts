import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { Signal } from "@preact/signals-react";
import { Group, Guest } from "../../../types";

export const useCreateGuest = (
  groupId: string | undefined,
  noGroupError: Signal<string>,
  guestName: string,
  setGuestName: React.Dispatch<React.SetStateAction<string>>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError>({
    mutationFn: () => {
      if (!groupId) {
        noGroupError.value = "No group found";
        return Promise.reject(new Error("No group found"));
      }
      return createGuest(groupId, { guestName });
    },
    onSuccess: async (newGuest) => {
      if (!newGuest.id) {
        console.error("createGuest returned no id:", newGuest);
        noGroupError.value = "Failed to create guest: No ID returned";
        return;
      }

      const previousGroup: Group | undefined = queryClient.getQueryData([
        groupId,
      ]);
      if (previousGroup) {
        const guestToAdd: Guest = {
          id: newGuest.id || `temp-${Date.now()}`, // Fallback ID
          name: newGuest.name || guestName, // Use guestName if API doesn't return name
          canBeRemoved: newGuest.canBeRemoved ?? true, // Default to true
          joined: newGuest?.joined || new Date().toISOString(), // Convert to Date
        };

        queryClient.setQueryData([groupId], {
          ...previousGroup,
          guests: [...previousGroup.guests, guestToAdd],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["debts", groupId],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ["shared"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });

      setGuestName("");
    },
  });
};

const createGuest = async (
  groupId: string,
  req: { guestName: string }
): Promise<Guest> => {
  const response = await apiClient.post<void, AxiosResponse<Guest>>(
    `/groups/${groupId}/add-guest`,
    req
  );

  return response.data;
};
