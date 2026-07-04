import { apiClient } from '@/api/apiClients';
import { Mode } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { appendNonGroupFilterToParams } from '../helpers/appendNonGroupFilterToParams';
const useNonGroupDebts = (mode, expenseParsedFilters, transferParsedFilters) => {
    return useQuery({
        queryKey: [
            'nonGroupDebts',
            expenseParsedFilters?.value,
            transferParsedFilters?.value,
        ],
        queryFn: () => getNonGroupDebts({
            ...expenseParsedFilters?.value,
            ...transferParsedFilters?.value,
        }),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 9000,
        enabled: mode === Mode.NonGroup,
    });
};
const getNonGroupDebts = async (parsedFilters = {}) => {
    const { participantsIds = [], payersIds = [], labels = [], sendersIds = [], receiversIds = [], ...base } = parsedFilters;
    const params = appendNonGroupFilterToParams(base, {
        arrayMappings: [
            { key: 'participantIds', values: participantsIds },
            { key: 'payerIds', values: payersIds },
            { key: 'labelIds', values: labels },
            { key: 'senderIds', values: sendersIds },
            { key: 'receiverIds', values: receiversIds },
        ],
    });
    const response = await apiClient.get('/debts/non-group', { params });
    return response.data;
};
export default useNonGroupDebts;
