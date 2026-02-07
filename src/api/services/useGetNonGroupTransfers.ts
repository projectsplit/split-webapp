import { useInfiniteQuery } from "@tanstack/react-query";
import {
  GetGroupTransfersResponse,
  TransferParsedFilters,
} from "../../types";
import { apiClient } from "../apiClients";
import { AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { reformatDate } from "../../components/SearchTransactions/helpers/reformatDate";
import { Signal } from "@preact/signals-react";

const useGetNonGroupTransfers = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true
) => {
  const queryKey = [
    "nonGroupTransfers",
    pageSize,
    transferParsedFilters.value,
    timeZoneId,
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam: next }) =>
      getNonGroupTransfers(
        pageSize,
        transferParsedFilters.value,
        next
      ),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
    enabled,
  });

  return { ...query };
};

const getNonGroupTransfers = async (
  pageSize: number,
  parsedFilters: TransferParsedFilters = {},
  next?: string
): Promise<GetGroupTransfersResponse> => {

  const {
    sendersIds = [],
    receiversIds = [],
    freeText = "",
    before = null,
    after = null,
  } = parsedFilters;

  // Construct query parameters manually
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

  sendersIds.forEach((id) => params.append("senderIds", id));
  receiversIds.forEach((id) => params.append("receiverIds", id));

  const response = await apiClient.get<
    void,
    AxiosResponse<GetGroupTransfersResponse>
  >("/transfers/non-group", { params });
  return response.data;
};

export default useGetNonGroupTransfers;
