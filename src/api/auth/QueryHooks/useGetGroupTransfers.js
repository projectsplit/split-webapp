import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { appendGroupFilterToParams } from '../helpers/appendGroupFilterToParams';
const useGetGroupTransfers = (group, transferParsedFilters, pageSize, timeZoneId) => {
    const queryKey = [
        'groupTransfers',
        group?.id,
        pageSize,
        transferParsedFilters.value,
        timeZoneId,
    ];
    const query = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({ pageParam: next }) => getGroupTransfers(group?.id, pageSize, transferParsedFilters.value, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
        enabled: !!group,
    });
    return { ...query };
};
const getGroupTransfers = async (groupId, pageSize, parsedFilters = {}, next) => {
    const { sendersIds = [], receiversIds = [], ...base } = parsedFilters;
    const params = appendGroupFilterToParams(groupId, base, {
        pageSize,
        next,
        arrayMappings: [
            { key: 'senderIds', values: sendersIds },
            { key: 'receiverIds', values: receiversIds },
        ],
    });
    const response = await apiClient.get('/transfers', { params });
    return response.data;
};
export default useGetGroupTransfers;
