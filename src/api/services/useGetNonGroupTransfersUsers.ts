import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClients";
import { AxiosResponse } from "axios";
import { TransactionType, User } from "@/types";

type Users = {
	users: User[];
}
const getNonGroupTransferUsers = async () => {
	const response = apiClient.get<
		void,
		AxiosResponse<Users>
	>("/users/search-non-group-transfer-users")
	return response;
}

export const useGetNonGroupTransferUsers = (transactionType: TransactionType) => {
	return useQuery({
		queryKey: ["non-group-transfer-users"],
		queryFn: () => getNonGroupTransferUsers(),
		enabled: transactionType === "NonGroup",
	});
}