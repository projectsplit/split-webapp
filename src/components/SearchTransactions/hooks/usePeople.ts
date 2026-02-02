import { useMemo } from "react";
import {
  EnhancedPeopleWithProps,
  FetchedPeople,
  Guest,
  Member,
  User,
} from "../../../types";

export const usePeople = (
  group: { guests: Guest[]; members: Member[] } | null,
  userInfo: { userId: string } | undefined,
  nonGroupUsers?: User[]
) => {
  if (!userInfo) return { fetchedPeople: [], enhancedPeopleWithProps: [] };
  const memberProps: string[] = ["participant", "payer", "sender", "receiver"];

  const { fetchedPeople, enhancedPeopleWithProps } = useMemo(() => {
    let allMembers: { id: string; name: string }[] = [];
    let isUserCheck: (m: { id: string }) => boolean = () => false;

    if (group) {
      allMembers = [...(group.guests ?? []), ...(group.members ?? [])];
      isUserCheck = (m) =>
        group.members?.find((gm) => gm.userId === userInfo?.userId)?.id ===
        m.id;
    } else if (nonGroupUsers) {
      allMembers = nonGroupUsers.map((u) => ({
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
  }, [group, nonGroupUsers, userInfo]);

  return { fetchedPeople, enhancedPeopleWithProps };
};
