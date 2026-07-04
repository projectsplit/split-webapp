import { jsx as _jsx } from "react/jsx-runtime";
import Pill from '../components/Pill/Pill';
import { getFilterStorageKey } from '../components/SearchTransactions/helpers/localStorageStringParser';
const updateFiltersAndSave = (transferParsedFilters, updatedFilters, queryClient, groupId) => {
    transferParsedFilters.value = {
        ...transferParsedFilters.value,
        ...updatedFilters,
    };
    localStorage.setItem(getFilterStorageKey('transfer', groupId), JSON.stringify(transferParsedFilters.value));
    queryClient.invalidateQueries({ queryKey: ['groupTransfers'], exact: false });
    queryClient.invalidateQueries({
        queryKey: ['nonGroupTransfers'],
        exact: false,
    });
};
export const renderTransferFilterPills = (transferParsedFilters, allParticipants, group, queryClient) => {
    const { freeText, before, after, sendersIds, receiversIds } = transferParsedFilters.value;
    const pills = [];
    if (freeText && freeText != '') {
        pills.push(_jsx(Pill, { title: `search term: ${freeText}`, color: "#e0e0e0", closeButton: true, fontSize: "14px", "$textColor": "black", "$border": false, "$closeButtonColor": "black", onClose: () => updateFiltersAndSave(transferParsedFilters, { freeText: '' }, queryClient, group?.id) }, "freeText"));
    }
    if (before && after && before === after) {
        pills.push(_jsx(Pill, { title: `during: ${before}`, color: "#e0e0e0", closeButton: true, fontSize: "14px", "$textColor": "black", "$border": false, "$closeButtonColor": "black", onClose: () => updateFiltersAndSave(transferParsedFilters, { before: null, after: null }, queryClient, group?.id) }, "during"));
    }
    // Handle before
    if (before && before !== after) {
        pills.push(_jsx(Pill, { title: `before: ${before}`, color: "#e0e0e0", closeButton: true, fontSize: "14px", "$textColor": "black", "$border": false, "$closeButtonColor": "black", onClose: () => updateFiltersAndSave(transferParsedFilters, { before: null }, queryClient, group?.id) }, "before"));
    }
    // Handle after
    if (after && before !== after) {
        pills.push(_jsx(Pill, { title: `after: ${after}`, color: "#e0e0e0", closeButton: true, fontSize: "14px", "$textColor": "black", "$border": false, "$closeButtonColor": "black", onClose: () => updateFiltersAndSave(transferParsedFilters, { after: null }, queryClient, group?.id) }, "after"));
    }
    // Handle participantsIds
    if (sendersIds && sendersIds?.length > 0) {
        sendersIds?.forEach((id, index) => {
            const participant = allParticipants.find((p) => p.id === id);
            const participantName = participant?.name || id;
            pills.push(_jsx(Pill, { title: `sender: ${participantName}`, color: "#e0e0e0", closeButton: true, fontSize: "14px", "$textColor": "black", "$border": false, "$closeButtonColor": "black", onClose: () => updateFiltersAndSave(transferParsedFilters, {
                    sendersIds: sendersIds.filter((sid) => sid !== id),
                }, queryClient, group?.id) }, `sender-${index}`));
        });
    }
    // Handle payersIds
    if (receiversIds && receiversIds?.length > 0) {
        receiversIds?.forEach((id, index) => {
            const payer = allParticipants.find((p) => p.id === id);
            const payerName = payer?.name || id;
            pills.push(_jsx(Pill, { title: `receiver: ${payerName}`, color: "#e0e0e0", closeButton: true, fontSize: "14px", "$textColor": "black", "$border": false, "$closeButtonColor": "black", onClose: () => updateFiltersAndSave(transferParsedFilters, {
                    receiversIds: receiversIds.filter((rid) => rid !== id),
                }, queryClient, group?.id) }, `receiver-${index}`));
        });
    }
    return pills;
};
