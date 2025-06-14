import { useMemo } from "react";
import {
  EnhancedMembersWithProps,
  FetchedMembers,
  Guest,
  Member,
} from "../../../types";

export const useMembers = (
  group: { guests: Guest[]; members: Member[] } | undefined,
  userInfo: { userId: string }
) => {
  const memberProps: string[] = ["participant", "payer", "sender", "receiver"];

  const { fetchedMembers, enhancedMembersWithProps } = useMemo(() => {
    const allMembers = [...(group?.guests ?? []), ...(group?.members ?? [])];

    const fetchedMembers: FetchedMembers = allMembers.map((m) => ({
      memberId: m.id,
      value: m.name,
      isUser: m.id === userInfo.userId,
    }));

    const enhancedMembersWithProps: EnhancedMembersWithProps =
      fetchedMembers.flatMap((member) =>
        memberProps.map((prop) => ({
          ...member,
          prop,
        }))
      );

    return { fetchedMembers, enhancedMembersWithProps };
  }, [group]);

  return { fetchedMembers, enhancedMembersWithProps };
};
