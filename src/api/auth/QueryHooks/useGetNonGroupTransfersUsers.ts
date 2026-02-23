import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../apiClients";
import { AxiosResponse } from "axios";
import { Mode, User } from "@/types";

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

export const useGetNonGroupTransferUsers = (mode: Mode) => {
	return useQuery({
		queryKey: ["non-group-transfer-users"],
		queryFn: () => getNonGroupTransferUsers(),
		enabled: mode === Mode.NonGroup,
	});
}