import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ExpenseParsedFilters,
  GetExpensesResponse,
  Group,
} from "../../../types";
import { apiClient } from "../../apiClients";
import { AxiosResponse } from "axios";
import { Signal } from "@preact/signals-react";
import { appendGroupFilterToParams } from "../helpers/appendGroupFilterToParams";

const useGetGroupExpenses = (
  group: Group,
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true,
  jumpToken?: string
) => {
  const queryKey = [
    "groupExpenses",
    group?.id,
    pageSize,
    expenseParsedFilters.value,
    timeZoneId,
    jumpToken
  ];

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam: next }) =>
      getGroupExpenses(group?.id!, pageSize, expenseParsedFilters.value, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    getPreviousPageParam: (firstPage) => firstPage?.previous || undefined,
    initialPageParam: jumpToken || "",
    enabled: enabled && !!group?.id,
  });

  return { ...query };
};

const getGroupExpenses = async (
  groupId: string,
  pageSize: number,
  parsedFilters: ExpenseParsedFilters = {},
  token?: string
): Promise<GetExpensesResponse> => {
  const { participantsIds = [], payersIds = [], labels = [], ...base } = parsedFilters;

  const params = appendGroupFilterToParams(groupId, base, {
    pageSize,
    next: token,
    arrayMappings: [
      { key: "participantIds", values: participantsIds },
      { key: "payerIds", values: payersIds },
      { key: "labelIds", values: labels },
    ],
  });

  const response = await apiClient.get<
    void,
    AxiosResponse<GetExpensesResponse>
  >("/expenses", { params });

  return response.data;
};

export default useGetGroupExpenses;
