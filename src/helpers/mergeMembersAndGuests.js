export const mergeMembersAndGuests = (members, guests) => {
    const truncatedMembers = members.map(({ id, name }) => ({
        id,
        name,
    }));
    return [...truncatedMembers, ...guests];
};
