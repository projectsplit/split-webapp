import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ExpenseParsedFilters,
  GetExpensesResponse,
  Group
} from "../../types";
import { apiClient } from "../apiClients";
import { AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { reformatDate } from "../../components/SearchTransactions/helpers/reformatDate";
import { Signal } from "@preact/signals-react";

type ExpenseQueryParams =
  | { transactionType: "Personal" | "NonGroup"; group?: never }
  | { transactionType: "Group"; group: Group };

const getExpenseEndpoint = (params: ExpenseQueryParams): string => {
  switch (params.transactionType) {
    case "Group":
      return "/expenses"; // or "/group-expenses" if you prefer clearer naming
    case "NonGroup":
      return "/expenses/non-group";
    case "Personal":
      return "/expenses/personal";
    default:
      // This should never happen thanks to TypeScript + exhaustive check
      throw new Error(`Unsupported transactionType: ${(params as any).transactionType}`);
  }
};

const useGetExpenses = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  params: ExpenseQueryParams
) => {

  const queryKey = [
    "expenses",
    params.transactionType,
    params.transactionType === "Group" ? params.group.id : null,
    pageSize,
    expenseParsedFilters.value,
    timeZoneId,
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam: next }) =>
      getExpenses(pageSize, expenseParsedFilters.value,
        params, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
  });

  return { ...query };
};

const getExpenses = async (
  pageSize: number,
  parsedFilters: ExpenseParsedFilters = {},
  queryParams: ExpenseQueryParams,
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

  const endpoint = getExpenseEndpoint(queryParams);
  const params = new URLSearchParams();

  if (queryParams.transactionType === "Group") {
    params.append("groupId", queryParams.group.id);
  }
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
  >(endpoint, { params });
console.log(response.data)
  return response.data;

};

export default useGetExpenses;
