import { Guest, Member, Mode, TransferResponseItem, TruncatedMember } from "@/types";
import { mergeMembersAndGuests } from "./mergeMembersAndGuests";

export default function getAllTransfersParticipants(
  transfers: TransferResponseItem[] | undefined,
  mode: Mode,
  members: Member[],
  guests: Guest[],
  nonGroupUsers: TruncatedMember[] = []
): TruncatedMember[] {
  if (mode === Mode.Group) {
    return mergeMembersAndGuests(members || [], guests || []);
  }

  const nonGroupUserMap = new Map<string, string>();
  nonGroupUsers.forEach((u) => nonGroupUserMap.set(u.id, u.name));
  const uniqueUserIds = new Set<string>();

  if (transfers) {
    for (const transfer of transfers) {
      if (transfer.senderId) {
        uniqueUserIds.add(transfer.senderId);
      }
      if (transfer.receiverId) {
        uniqueUserIds.add(transfer.receiverId);
      }
    }
  }

  if (uniqueUserIds.size === 0) {

    return nonGroupUsers.map(u => u.id)
      .filter((id) => nonGroupUserMap.has(id))
      .map((id) => ({
        id,
        name: nonGroupUserMap.get(id)!,
      }));

  }

  return Array.from(uniqueUserIds)
    .filter((id) => nonGroupUserMap.has(id))
    .map((id) => ({
      id,
      name: nonGroupUserMap.get(id)!,
    }));

}
