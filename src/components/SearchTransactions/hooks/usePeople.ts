import { useMemo } from "react";
import {
  EnhancedPeopleWithProps,
  FetchedPeople,
  Group,
  Mode,
  UserInfo,
} from "../../../types";
import { useGetAllNonGroupUsers } from "@/api/auth/QueryHooks/useGetAllNonGroupUsers";

export const usePeople = (
  group: Group | null,
  userInfo: UserInfo | undefined
) => {
  const { allUsers } = useGetAllNonGroupUsers(group?.id ? Mode.Group : Mode.NonGroup);

  const { fetchedPeople, enhancedPeopleWithProps } = useMemo(() => {
    if (!userInfo) return { fetchedPeople: [], enhancedPeopleWithProps: [] };

    const memberProps: string[] = ["participant", "payer", "sender", "receiver"];
    let allMembers: { id: string; name: string }[] = [];
    let isUserCheck: (m: { id: string }) => boolean = () => false;

    if (group) {
      allMembers = [...(group.guests ?? []), ...(group.members ?? [])];
      isUserCheck = (m) =>
        group.members?.find((gm) => gm.userId === userInfo?.userId)?.id ===
        m.id;
    } else {
      allMembers = allUsers.map((u) => ({
        id: u.userId,
        name: u.username,
      }));
      isUserCheck = (m) => m.id === userInfo.userId;
    }

    const fetchedPeople: FetchedPeople = allMembers.map((m) => ({
      id: m.id,
      value: m.name,
      isUser: isUserCheck(m),
    }));

    const enhancedPeopleWithProps: EnhancedPeopleWithProps =
      fetchedPeople.flatMap((person) =>
        memberProps.map((prop) => ({
          ...person,
          prop,
        }))
      );

    return { fetchedPeople, enhancedPeopleWithProps };
  }, [group, allUsers, userInfo]);

  return { fetchedPeople, enhancedPeopleWithProps, allUsers };
};
