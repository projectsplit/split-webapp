import { useMemo } from "react";
import { Signal } from "@preact/signals-react";
import { PickerMember, User } from "../../../types";
import { CategoryKey, CategoryMap } from "../formStore/formStoreTypes";

interface UseAdjustedMembersParams {
  participantsByCategory: CategoryMap<PickerMember[]>;
  payersByCategory: CategoryMap<PickerMember[]>;
  participantsCategory: Signal<CategoryKey>;
  payersCategory: Signal<CategoryKey>;
  nonGroupUsers: Signal<User[]>;
  isnonGroupExpense: Signal<boolean> | undefined;
  userInfo: { userId: string } | undefined;
  userMemberId: string;
}

export function useAdjustedMembers({
  participantsByCategory,
  payersByCategory,
  participantsCategory,
  payersCategory,
  nonGroupUsers,
  isnonGroupExpense,
  userInfo,
  userMemberId,
}: UseAdjustedMembersParams) {
  const participants =
    participantsByCategory[
      participantsCategory.value as keyof typeof participantsByCategory
    ];

  const payers =
    payersByCategory[payersCategory.value as keyof typeof payersByCategory];

  const adjustParticipants = useMemo(() => {
    if (!participants) return [];
    const userIdToCheck =
      nonGroupUsers.value.length > 0 || isnonGroupExpense?.value
        ? userInfo?.userId
        : userMemberId;
    return participants.map((m) =>
      m.id === userIdToCheck ? { ...m, name: "you" } : m
    );
  }, [
    participants,
    userInfo?.userId,
    userMemberId,
    nonGroupUsers.value.length,
    isnonGroupExpense?.value,
  ]);

  const adjustPayers = useMemo(() => {
    if (!payers) return [];
    const userIdToCheck =
      nonGroupUsers.value.length > 0 || isnonGroupExpense?.value
        ? userInfo?.userId
        : userMemberId;
    return payers.map((m) =>
      m.id === userIdToCheck ? { ...m, name: "you" } : m
    );
  }, [
    payers,
    userInfo?.userId,
    userMemberId,
    nonGroupUsers.value.length,
    isnonGroupExpense?.value,
  ]);

  return {
    participants,
    payers,
    adjustParticipants,
    adjustPayers,
  };
}
