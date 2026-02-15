import { apiClient } from "@/api/apiClients";
import { DebtsResponse } from "@/types";
import { Signal } from "@preact/signals-react";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ExpenseParsedFilters, TransferParsedFilters } from "../../../types";
import { appendNonGroupFilterToParams } from "../helpers/appendNonGroupFilterToParams";

const useNonGroupDebts = (
  expenseParsedFilters?: Signal<ExpenseParsedFilters>,
  transferParsedFilters?: Signal<TransferParsedFilters>
) => {

  return useQuery<DebtsResponse>({
    queryKey: ["nonGroupDebts",expenseParsedFilters?.value, transferParsedFilters?.value],
    queryFn: () => getNonGroupDebts({
          ...expenseParsedFilters?.value,
          ...transferParsedFilters?.value,
        }),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};

const getNonGroupDebts = async (
   parsedFilters: ExpenseParsedFilters & TransferParsedFilters= {}
): Promise<DebtsResponse> => {

  const { participantsIds = [], payersIds = [], labels = [], sendersIds = [], receiversIds = [], ...base } = parsedFilters ;

  const params = appendNonGroupFilterToParams(base, {
    arrayMappings: [
      { key: "participantIds", values: participantsIds },
      { key: "payerIds", values: payersIds },
      { key: "labelIds", values: labels },
      { key: "senderIds", values: sendersIds },
      { key: "receiverIds", values: receiversIds },
    ],
  });

  const response = await apiClient.get<void, AxiosResponse<DebtsResponse>>("/debts/non-group", { params });
  return response.data;
};

export default useNonGroupDebts;