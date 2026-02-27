import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ExpenseParsedFilters,
  GetExpensesResponse,
} from "../../../types";
import { apiClient } from "../../apiClients";
import { AxiosResponse } from "axios";
import { Signal } from "@preact/signals-react";
import { appendNonGroupFilterToParams } from "../helpers/appendNonGroupFilterToParams";

type PageParam = { next?: string; previous?: string };

export const useGetNonGroupExpenses = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true,
  jumpToken?: string
) => {
  const queryKey = [
    "nonGroupExpenses",
    pageSize,
    expenseParsedFilters.value,
    timeZoneId,
    jumpToken,
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => {
      const { next, previous } = pageParam as PageParam;
      return getNonGroupExpenses(pageSize, expenseParsedFilters.value, next, previous);
    },
    getNextPageParam: (lastPage): PageParam | undefined =>
      lastPage?.next ? { next: lastPage.next } : undefined,
    getPreviousPageParam: (firstPage): PageParam | undefined =>
      firstPage?.previous ? { previous: firstPage.previous } : undefined,
    initialPageParam: { next: jumpToken || "" } as PageParam,
    enabled,
  });

  return { ...query };
};

const getNonGroupExpenses = async (
  pageSize: number,
  parsedFilters: ExpenseParsedFilters = {},
  next?: string,
  previous?: string
): Promise<GetExpensesResponse> => {
  const { participantsIds = [], payersIds = [], labels = [], ...base } = parsedFilters;

  const params = appendNonGroupFilterToParams(base, {
    pageSize,
    next,
    previous,
    arrayMappings: [
      { key: "participantIds", values: participantsIds },
      { key: "payerIds", values: payersIds },
      { key: "labelIds", values: labels },
    ],
  });

  const response = await apiClient.get<
    void,
    AxiosResponse<GetExpensesResponse>
  >("/expenses/non-group", { params });

  return response.data;
};
