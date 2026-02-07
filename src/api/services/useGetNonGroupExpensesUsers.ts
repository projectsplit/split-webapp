import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClients";
import { AxiosResponse } from "axios";
import { TransactionType, User } from "@/types";

type Users = {
	users: User[];
}
const getNonGroupExpensesUsers = async () => {
	const response = apiClient.get<
		void,
		AxiosResponse<Users>
	>("/users/search-non-group-expense-users")
	return response;
}

export const useGetNonGroupExpensesUsers = (transactionType: TransactionType) => {
	return useQuery({
		queryKey: ["non-group-expense-users"],
		queryFn: () => getNonGroupExpensesUsers(),
		enabled: transactionType === "NonGroup",
	});
}