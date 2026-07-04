export const getUserName = (p, members, userId, direction) => {
    if (!userId)
        return members.find((member) => member.id === (direction === 'from' ? p.debtor : p.creditor))?.name;
    if (direction === 'from') {
        if (p.debtor === userId)
            return 'you';
        return members.find((member) => member.id === p.debtor)?.name;
    }
    else {
        if (p.creditor === userId)
            return 'you';
        return members.find((member) => member.id === p.creditor)?.name;
    }
};
