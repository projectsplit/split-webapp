import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { UserInfo } from "@/types";
import { apiClient } from "@/api/apiClients";

export const useGetMe = () => {
    return useQuery({
        queryKey: ["getMe"],
        queryFn: getMe,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}

const getMe = async () => {
    const response = await apiClient.get<void, AxiosResponse<UserInfo>>(
        "/users/me"
    );
    return response.data;
};
