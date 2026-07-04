export const getFilterStorageKey = (type, groupId, isPersonal) => {
    const suffix = groupId && groupId !== '' ? groupId : isPersonal ? 'personal' : 'nonGroup';
    return `${type}Filter_${suffix}`;
};
export const localStorageStringParser = (expenseFilterRaw, transferFilterRaw) => {
    const expenseFilterDefault = {
        groupId: '',
        participantsIds: [],
        payersIds: [],
        freeText: '',
        before: null,
        during: null,
        after: null,
        labels: [],
    };
    const transferFilterDefault = {
        groupId: '',
        receiversIds: [],
        sendersIds: [],
        freeText: '',
        before: null,
        during: null,
        after: null,
    };
    const sanitizeExpense = (f) => ({
        ...expenseFilterDefault, //this is the safe base
        ...f, //brings in user's values
        participantsIds: Array.isArray(f.participantsIds)
            ? f.participantsIds.filter((id) => typeof id === 'string')
            : [],
        payersIds: Array.isArray(f.payersIds)
            ? f.payersIds.filter((id) => typeof id === 'string')
            : [],
        labels: Array.isArray(f.labels)
            ? f.labels.filter((id) => typeof id === 'string')
            : [],
    });
    const sanitizeTransfer = (f) => ({
        ...transferFilterDefault,
        ...f,
        receiversIds: Array.isArray(f.receiversIds)
            ? f.receiversIds.filter((id) => typeof id === 'string')
            : [],
        sendersIds: Array.isArray(f.sendersIds)
            ? f.sendersIds.filter((id) => typeof id === 'string')
            : [],
    });
    const expenseFilter = expenseFilterRaw
        ? sanitizeExpense(JSON.parse(expenseFilterRaw))
        : expenseFilterDefault;
    const transferFilter = transferFilterRaw
        ? sanitizeTransfer(JSON.parse(transferFilterRaw))
        : transferFilterDefault;
    return { expenseFilter, transferFilter };
};
