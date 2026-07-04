import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { appendNonGroupFilterToParams } from '../helpers/appendNonGroupFilterToParams';
const useGetNonGroupTransfers = (transferParsedFilters, pageSize, timeZoneId, enabled = true) => {
    const queryKey = [
        'nonGroupTransfers',
        pageSize,
        transferParsedFilters.value,
        timeZoneId,
    ].filter(Boolean);
    const query = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({ pageParam: next }) => getNonGroupTransfers(pageSize, transferParsedFilters.value, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
        enabled,
    });
    return { ...query };
};
const getNonGroupTransfers = async (pageSize, parsedFilters = {}, next) => {
    const { sendersIds = [], receiversIds = [], ...base } = parsedFilters;
    const params = appendNonGroupFilterToParams(base, {
        pageSize,
        next,
        arrayMappings: [
            { key: 'senderIds', values: sendersIds },
            { key: 'receiverIds', values: receiversIds },
        ],
    });
    const response = await apiClient.get('/transfers/non-group', { params });
    return response.data;
};
export default useGetNonGroupTransfers;
