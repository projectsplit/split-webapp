import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { appendGroupFilterToParams } from '../helpers/appendGroupFilterToParams';
const useGroupDebts = (groupId, expenseParsedFilters, transferParsedFilters) => {
    return useQuery({
        queryKey: [
            'debts',
            groupId,
            expenseParsedFilters?.value,
            transferParsedFilters?.value,
        ],
        queryFn: () => groupId
            ? getGroupDebts(groupId, {
                ...expenseParsedFilters?.value,
                ...transferParsedFilters?.value,
            })
            : Promise.reject(new Error('No groupId')),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 9000,
        enabled: !!groupId,
    });
};
const getGroupDebts = async (groupId, parsedFilters = {}) => {
    const { participantsIds = [], payersIds = [], labels = [], sendersIds = [], receiversIds = [], ...base } = parsedFilters;
    const params = appendGroupFilterToParams(groupId, base, {
        arrayMappings: [
            { key: 'participantIds', values: participantsIds },
            { key: 'payerIds', values: payersIds },
            { key: 'labelIds', values: labels },
            { key: 'senderIds', values: sendersIds },
            { key: 'receiverIds', values: receiversIds },
        ],
    });
    const response = await apiClient.get('/debts', { params });
    return response.data;
};
export default useGroupDebts;
