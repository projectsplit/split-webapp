import { Debt, TruncatedMember } from "@/types";

export const getUserName = (p: Debt, members: TruncatedMember[], userId: string | undefined, direction: string) => {
    if (!userId) return members.find((member) => member.id === (direction === "from" ? p.debtor : p.creditor))?.name;

    if (direction === "from") {
        if (p.debtor === userId) return "you";
        return members.find((member) => member.id === p.debtor)?.name;
    } else {
        if (p.creditor === userId) return "you";
        return members.find((member) => member.id === p.creditor)?.name;
    }
};