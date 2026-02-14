import { useInfiniteQuery } from "@tanstack/react-query";
import {
  GetGroupTransfersResponse,
  Group,
  TransferParsedFilters,
} from "../../../types";
import { apiClient } from "../../apiClients";
import { AxiosResponse } from "axios";
import { Signal } from "@preact/signals-react";
import { appendFilterToParams } from "../helpers/appendFilterToParams";

const useGetGroupTransfers = (
  group: Group,
  transferParsedFilters: Signal<TransferParsedFilters>,
  pageSize: number,
  timeZoneId: string,
) => {
  const queryKey = [
    "groupTransfers",
    group?.id,
    pageSize,
    transferParsedFilters.value,
    timeZoneId,
  ];

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam: next }) =>
      getGroupTransfers(
        group?.id!,
        pageSize,
        transferParsedFilters.value,
        next
      ),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
    enabled: !!group,
  });

  return { ...query };
};

const getGroupTransfers = async (
  groupId: string,
  pageSize: number,
  parsedFilters: TransferParsedFilters = {},
  next?: string
): Promise<GetGroupTransfersResponse> => {


  const { sendersIds = [], receiversIds = [], ...base } = parsedFilters;

  const params = appendFilterToParams(groupId, base, {
    pageSize,
    next,
    arrayMappings: [
      { key: "senderIds", values: sendersIds },
      { key: "receiverIds", values: receiversIds },
    ],
  });

  const response = await apiClient.get<
    void,
    AxiosResponse<GetGroupTransfersResponse>
  >("/transfers", { params });
  return response.data;
};

export default useGetGroupTransfers;
