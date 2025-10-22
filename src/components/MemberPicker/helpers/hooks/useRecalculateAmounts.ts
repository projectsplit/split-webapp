import { useEffect } from "react";
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
  isnonGroupExpense: boolean | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  nonGroupUsers: Signal<User[]>
) => {
  useEffect(() => {
    setMemberAmounts(
      recalculateAmounts(
        memberAmounts,
        totalAmount,
        decimalDigits,
        category,
        ticker
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
            ticker
          )
        );
      }
      if (description === "Payers" && !memberAmounts.some((m) => m.selected)) {
        const newFormMembers = memberAmounts.map((m) => ({
          ...m,
          selected:
            isnonGroupExpense && nonGroupUsers.value.length > 0
              ? m.id === userId
              : isnonGroupExpense && groupMembers.value.length > 0
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
            ticker
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
  }, [totalAmount, category.value, memberAmounts.length]);
};
