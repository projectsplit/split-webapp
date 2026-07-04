/**
 * Creates a specialized pagination token to "jump" to a specific expense.
 * @param occurred The occurred timestamp of the target expense.
 * @param created The created timestamp of the target expense.
 */
export const createJumpToken = (occurred, created) => {
    const tokenObj = {
        Occurred: occurred,
        Created: created,
        IsJumpTo: true,
    };
    return btoa(JSON.stringify(tokenObj));
};
