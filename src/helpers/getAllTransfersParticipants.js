import { Mode, } from '@/types';
import { mergeMembersAndGuests } from './mergeMembersAndGuests';
export default function getAllTransfersParticipants(transfers, mode, members, guests, nonGroupUsers = []) {
    if (mode === Mode.Group) {
        return mergeMembersAndGuests(members || [], guests || []);
    }
    const nonGroupUserMap = new Map();
    nonGroupUsers.forEach((u) => nonGroupUserMap.set(u.id, u.name));
    const uniqueUserIds = new Set();
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
        return nonGroupUsers
            .map((u) => u.id)
            .filter((id) => nonGroupUserMap.has(id))
            .map((id) => ({
            id,
            name: nonGroupUserMap.get(id),
        }));
    }
    return Array.from(uniqueUserIds)
        .filter((id) => nonGroupUserMap.has(id))
        .map((id) => ({
        id,
        name: nonGroupUserMap.get(id),
    }));
}
