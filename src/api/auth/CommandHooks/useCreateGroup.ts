import { apiClient } from "@/api/apiClients";
import { GroupRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type GroupResponse= {
    groupId:string
}
export const useCreateGroup = () => {
    const queryClient = useQueryClient();

    return useMutation<GroupResponse, any, GroupRequest>({
        mutationKey: ["group", "create"],
        mutationFn: createGroupFn,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["group"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["shared"], exact: false });
            return data;
        },
    });
}

const createGroupFn = async (request: GroupRequest) => {
    const response = await apiClient.post<GroupResponse>("/groups/create", request);
    return response.data;
};
