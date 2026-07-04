import { ExpenseResponseItem, Guest, Member, Mode, TruncatedMember } from '@/types';
export default function getAllExpenseParticipants(expenses: ExpenseResponseItem[] | undefined, mode: Mode, members: Member[], guests: Guest[], nonGroupUsers?: TruncatedMember[]): TruncatedMember[];
