export const dateIsInFuture = (date) => {
    if (!date)
        return false;
    const now = new Date().toISOString();
    return date > now;
};
