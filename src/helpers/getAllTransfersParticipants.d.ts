import { Guest, Member, Mode, TransferResponseItem, TruncatedMember } from '@/types';
export default function getAllTransfersParticipants(transfers: TransferResponseItem[] | undefined, mode: Mode, members: Member[], guests: Guest[], nonGroupUsers?: TruncatedMember[]): TruncatedMember[];
