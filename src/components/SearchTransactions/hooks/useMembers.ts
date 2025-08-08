import { useMemo } from "react";
import {
  EnhancedMembersWithProps,
  FetchedMembers,
  Guest,
  Member,
} from "../../../types";

export const useMembers = (
  group: { guests: Guest[]; members: Member[] } | undefined,
  userInfo: { userId: string }|undefined
) => {
  if (!userInfo) return { fetchedMembers: [], enhancedMembersWithProps: [] };
  const memberProps: string[] = ["participant", "payer", "sender", "receiver"];

  const { fetchedMembers, enhancedMembersWithProps } = useMemo(() => {
    const allMembers = [...(group?.guests ?? []), ...(group?.members ?? [])];

    const fetchedMembers: FetchedMembers = allMembers.map((m) => ({
      memberId: m.id,
      value: m.name,
      isUser: group?.members?.find((m) => m.userId === userInfo?.userId)?.id===m.id,
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
