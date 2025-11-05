import { useEffect, useLayoutEffect } from "react";
import { recalculateAmounts } from "../recalculateAmounts";
import { Guest, Member, PickerMember, User } from "../../../../types";
import { Signal } from "@preact/signals-react";

export const useRecalculateAmounts = (
  memberAmounts: PickerMember[],
  setMemberAmounts: (newMembers: PickerMember[]) => void,
  totalAmount: number,
  userMemberId: string | undefined,
  decimalDigits: number,
  description: string,
  renderCounter: React.MutableRefObject<number>,
  category: Signal<string>,
  ticker: string,
  userId: string,
  groupMembers: Signal<(Member | Guest)[]>,
  nonGroupUsers: Signal<User[]>,
  isCreateExpense:boolean,
   isnonGroupExpense?: Signal<boolean>
) => {
  useLayoutEffect(() => {
    setMemberAmounts(
      recalculateAmounts(
        memberAmounts,
        totalAmount,
        decimalDigits,
        category,
        ticker,
        isCreateExpense
      )
    );

    if (totalAmount > 0) {
      if (
        description === "Participants" &&
        !memberAmounts.some((m) => m.selected)
      ) {
        const newFormMembers = memberAmounts.map((m) => ({
          ...m,
          selected: true,
          order: renderCounter.current,
        }));
        setMemberAmounts(
          recalculateAmounts(
            newFormMembers,
            totalAmount,
            decimalDigits,
            category,
            ticker,
            isCreateExpense
          )
        );
      }
      if (description === "Payers" && !memberAmounts.some((m) => m.selected)) {
        const newFormMembers = memberAmounts.map((m) => ({
          ...m,
          selected:
           isnonGroupExpense&& isnonGroupExpense.value && nonGroupUsers.value.length > 0
              ? m.id === userId
              : isnonGroupExpense&& isnonGroupExpense.value && groupMembers.value.length > 0
              ? m.id === userMemberId
              : m.id === userMemberId,
          order: renderCounter.current,
        }));
        setMemberAmounts(
          recalculateAmounts(
            newFormMembers,
            totalAmount,
            decimalDigits,
            category,
            ticker,
            isCreateExpense
          )
        );
      }
    }

    if (totalAmount === 0) {
      const newFormMembers = memberAmounts.map((m) => ({
        ...m,
        selected: false,
        actualAmount: "",
        screenQuantity: "",
        locked: false,
      }));
      setMemberAmounts(newFormMembers);
    }
    return () => {};
  }, [
    totalAmount,
    category.value,
    memberAmounts.length,
    groupMembers.value,
    nonGroupUsers.value,
  ]);
};
