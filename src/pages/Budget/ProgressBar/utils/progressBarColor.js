export const progressBarColor = (data, theme) => {
    if (data !== undefined &&
        data.remainingDays !== undefined &&
        data.goal !== undefined &&
        data.averageSpentPerDay !== undefined &&
        data.totalAmountSpent !== undefined &&
        data.description !== undefined) {
        const totalAmountSpent = parseFloat(data.totalAmountSpent);
        const remainingDays = parseFloat(data.remainingDays);
        const averageSpentPerDay = parseFloat(data.averageSpentPerDay);
        const goal = parseFloat(data.goal);
        const spendingProjection = totalAmountSpent + remainingDays * averageSpentPerDay;
        if (totalAmountSpent < goal && spendingProjection < goal) {
            return theme?.green;
        }
        else
            return theme?.redish;
    }
    else {
        return 'black';
    }
};
