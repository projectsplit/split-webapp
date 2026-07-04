import { Debt, Guest, Member, Mode, TruncatedMember } from '@/types';
export default function getAllDebtsParticipants(debts: Debt[], mode: Mode, members: Member[], guests: Guest[]): TruncatedMember[];
