import { useQuery } from "@tanstack/react-query";
import { DebtsResponse, ExpenseParsedFilters, TransferParsedFilters } from "../../../types";
import { apiClient } from "../../apiClients";
import { AxiosResponse } from "axios";
import { Signal } from "@preact/signals-react";
import { appendFilterToParams } from "../helpers/appendFilterToParams";


const useGroupDebts = (
  groupId: string | undefined,
  expenseParsedFilters?: Signal<ExpenseParsedFilters>,
  transferParsedFilters?: Signal<TransferParsedFilters>
) => {
  return useQuery<DebtsResponse>({
    queryKey: ["debts", groupId, expenseParsedFilters?.value, transferParsedFilters?.value],
    queryFn: () =>
      groupId
        ? getGroupDebts(groupId, {
          ...expenseParsedFilters?.value,
          ...transferParsedFilters?.value,
        })
        : Promise.reject(new Error("No groupId")),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: !!groupId,
  });
};

const getGroupDebts = async (
  groupId: string,
  parsedFilters: ExpenseParsedFilters & TransferParsedFilters = {}
): Promise<DebtsResponse> => {

  const { participantsIds = [], payersIds = [], labels = [], sendersIds = [], receiversIds = [], ...base } = parsedFilters;

  const params = appendFilterToParams(groupId, base, {
    arrayMappings: [
      { key: "participantIds", values: participantsIds },
      { key: "payerIds", values: payersIds },
      { key: "labelIds", values: labels },
      { key: "senderIds", values: sendersIds },
      { key: "receiverIds", values: receiversIds },
    ],
  });

  const response = await apiClient.get<void, AxiosResponse<DebtsResponse>>("/debts", { params });

  return response.data;
};
export default useGroupDebts;
