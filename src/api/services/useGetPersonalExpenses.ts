import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ExpenseParsedFilters,
  GetExpensesResponse,
} from "../../types";
import { apiClient } from "../apiClients";
import { AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { reformatDate } from "../../components/SearchTransactions/helpers/reformatDate";
import { Signal } from "@preact/signals-react";

export const useGetPersonalExpenses = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true
) => {
  const queryKey = [
    "personalExpenses",
    pageSize,
    expenseParsedFilters.value,
    timeZoneId,
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam: next }) =>
      getPersonalExpenses(pageSize, expenseParsedFilters.value, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
    enabled
  });

  return { ...query };
};

const getPersonalExpenses = async (
  pageSize: number,
  parsedFilters: ExpenseParsedFilters = {},
  next?: string
): Promise<GetExpensesResponse> => {
  const {
    participantsIds = [],
    payersIds = [],
    freeText = "",
    before = null,
    after = null,
    labels = [],
  } = parsedFilters;

  const params = new URLSearchParams();

  params.append("pageSize", pageSize.toString());
  if (next) params.append("next", next);
  if (freeText) params.append("searchTerm", freeText);

  if (before === after && before !== null && after !== null) {
    let beforeDate = DateTime.fromFormat(before, "dd-MM-yyyy");
    let afterDate = DateTime.fromFormat(after, "dd-MM-yyyy");

    beforeDate = beforeDate.plus({ days: 1 });

    params.append("before", reformatDate(beforeDate.toFormat("dd-MM-yyyy")));
    params.append("after", reformatDate(afterDate.toFormat("dd-MM-yyyy")));
  } else {
    if (before) params.append("before", reformatDate(before));
    if (after) params.append("after", reformatDate(after));
  }

  participantsIds.forEach((id) => params.append("participantIds", id));
  payersIds.forEach((id) => params.append("payerIds", id));
  labels.forEach((label) => params.append("labelIds", label));

  const response = await apiClient.get<
    void,
    AxiosResponse<GetExpensesResponse>
  >("/expenses/personal", { params });

  return response.data;
};
