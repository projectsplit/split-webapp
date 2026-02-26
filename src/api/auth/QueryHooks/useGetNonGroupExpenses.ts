import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ExpenseParsedFilters,
  GetExpensesResponse,
} from "../../../types";
import { apiClient } from "../../apiClients";
import { AxiosResponse } from "axios";
import { Signal } from "@preact/signals-react";
import { appendNonGroupFilterToParams } from "../helpers/appendNonGroupFilterToParams";

const PREV_PREFIX = "prev::";

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
    jumpToken
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam: rawParam }) =>
      getNonGroupExpenses(pageSize, expenseParsedFilters.value, rawParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage?.previous ? `${PREV_PREFIX}${firstPage.previous}` : undefined,
    initialPageParam: jumpToken || "",
    enabled,
  });

  return { ...query };
};

const getNonGroupExpenses = async (
  pageSize: number,
  parsedFilters: ExpenseParsedFilters = {},
  rawParam?: string
): Promise<GetExpensesResponse> => {
  const { participantsIds = [], payersIds = [], labels = [], ...base } = parsedFilters;

  const isPrev = rawParam?.startsWith(PREV_PREFIX);
  const token = isPrev ? rawParam!.slice(PREV_PREFIX.length) : rawParam;

  const params = appendNonGroupFilterToParams(base, {
    pageSize,
    next: isPrev ? undefined : token || undefined,
    previous: isPrev ? token : undefined,
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
