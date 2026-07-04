export const initializeFilterState = (expenseFiltersData, transferFiltersData, params, expenseFilterState, transferFilterState, filteredPeople, filteredLabels, group, suggestedLabels, users) => {
    let allPeople = [];
    if (group) {
        allPeople = [...group.members, ...group.guests];
    }
    else if (users) {
        allPeople = users.map((u) => ({
            id: u.userId,
            name: u.username,
        }));
    }
    const showExpenseDuring = expenseFiltersData.before === expenseFiltersData.after &&
        expenseFiltersData.before !== null &&
        expenseFiltersData.before !== '';
    const showTransferDuring = transferFiltersData.before === transferFiltersData.after &&
        transferFiltersData.before !== null &&
        transferFiltersData.before !== '';
    expenseFilterState.value = {
        groupId: params.groupid || '',
        participantsIds: expenseFiltersData.participantsIds?.map((id) => id) || [],
        payersIds: expenseFiltersData.payersIds?.map((id) => id) || [],
        freeText: expenseFiltersData.freeText,
        before: showExpenseDuring
            ? []
            : expenseFiltersData.before
                ? [expenseFiltersData.before]
                : [],
        during: showExpenseDuring && expenseFiltersData.after
            ? [expenseFiltersData.after]
            : [],
        after: showExpenseDuring
            ? []
            : expenseFiltersData.after
                ? [expenseFiltersData.after]
                : [],
        labels: expenseFiltersData.labels?.map((id) => id) || [],
    };
    transferFilterState.value = {
        groupId: params.groupid || '',
        receiversIds: transferFiltersData.receiversIds?.map((id) => id) || [],
        sendersIds: transferFiltersData.sendersIds?.map((id) => id) || [],
        freeText: transferFiltersData.freeText,
        before: showTransferDuring
            ? []
            : transferFiltersData.before
                ? [transferFiltersData.before]
                : [],
        during: showTransferDuring && transferFiltersData.after
            ? [transferFiltersData.after]
            : [],
        after: showTransferDuring
            ? []
            : transferFiltersData.after
                ? [transferFiltersData.after]
                : [],
    };
    const createFetchedPerson = (id) => {
        const person = allPeople.find((p) => p.id === id);
        if (!person)
            return null;
        return {
            id: id,
            value: person.name,
            isUser: 'userId' in person,
        };
    };
    filteredPeople.value = {
        participants: expenseFiltersData.participantsIds
            ?.map(createFetchedPerson)
            .filter((p) => p !== null) || [],
        payers: expenseFiltersData.payersIds
            ?.map(createFetchedPerson)
            .filter((p) => p !== null) || [],
        senders: transferFiltersData.sendersIds
            ?.map(createFetchedPerson)
            .filter((p) => p !== null) || [],
        receivers: transferFiltersData.receiversIds
            ?.map(createFetchedPerson)
            .filter((p) => p !== null) || [],
    };
    filteredLabels.value =
        expenseFiltersData.labels
            ?.map((id) => {
            const label = suggestedLabels?.labels?.find((l) => l.id === id);
            if (!label)
                return null;
            return {
                id: label.id,
                value: label.text,
                color: label.color,
                prop: '',
            };
        })
            .filter((label) => label !== null) || [];
};
