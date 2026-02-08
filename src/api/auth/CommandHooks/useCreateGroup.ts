import { apiClient } from "@/api/apiClients";
import { GroupRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateGroup = () => {
    const queryClient = useQueryClient();

    return useMutation<any, any, GroupRequest>({
        mutationKey: ["group", "create"],
        mutationFn: createGroupFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["group"], exact: false });
        },
    });
}

const createGroupFn = async (request: GroupRequest) => {
    const response = await apiClient.post("/groups/create", request);
    return response.data;
};
