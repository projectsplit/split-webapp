import { useMemo } from 'react';
import { Mode, } from '../../../types';
import { useGetAllNonGroupUsers } from '@/api/auth/QueryHooks/useGetAllNonGroupUsers';
export const usePeople = (group, userInfo, isPersonal) => {
    const { allUsers } = useGetAllNonGroupUsers(group?.id ? Mode.Group : Mode.NonGroup);
    const { fetchedPeople, enhancedPeopleWithProps } = useMemo(() => {
        if (isPersonal)
            return { fetchedPeople: [], enhancedPeopleWithProps: [] };
        if (!userInfo)
            return { fetchedPeople: [], enhancedPeopleWithProps: [] };
        const memberProps = [
            'participant',
            'payer',
            'sender',
            'receiver',
        ];
        let allMembers = [];
        let isUserCheck = () => false;
        if (group) {
            allMembers = [...(group.guests ?? []), ...(group.members ?? [])];
            isUserCheck = (m) => group.members?.find((gm) => gm.userId === userInfo?.userId)?.id ===
                m.id;
        }
        else {
            allMembers = allUsers.map((u) => ({
                id: u.userId,
                name: u.username,
            }));
            isUserCheck = (m) => m.id === userInfo.userId;
        }
        const fetchedPeople = allMembers.map((m) => ({
            id: m.id,
            value: m.name,
            isUser: isUserCheck(m),
        }));
        const enhancedPeopleWithProps = fetchedPeople.flatMap((person) => memberProps.map((prop) => ({
            ...person,
            prop,
        })));
        return { fetchedPeople, enhancedPeopleWithProps };
    }, [group, allUsers, userInfo]);
    return { fetchedPeople, enhancedPeopleWithProps, allUsers };
};
