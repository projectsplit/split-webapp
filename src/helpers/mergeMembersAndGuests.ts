import { Member, TruncatedMember } from "../types";

 export const mergeMembersAndGuests = (
    members: Member[],
    guests: TruncatedMember[]
  ): TruncatedMember[] => {
    const truncatedMembers: TruncatedMember[] = members.map(({ id, name }) => ({
      id,
      name,
    }));

    return [...truncatedMembers, ...guests];
  };