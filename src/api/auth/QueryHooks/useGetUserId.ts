import { apiClient } from "@/api/apiClients";
import { UserInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserId = () => {
    return useQuery<UserInfo>({
        queryKey: ["getUserId"],
        queryFn: getUserId,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}

const getUserId = async () => {
    const response = await apiClient.get("/");
    return response.data;
};

