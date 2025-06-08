import { useEffect } from "react";
import { recalculateAmounts } from "../recalculateAmounts";
import { PickerMember } from "../../../../types";
import { Signal } from "@preact/signals-react";

export const useRecalculateAmounts = (
  memberAmounts: PickerMember[],
  setMemberAmounts: (newMembers: PickerMember[]) => void,
  totalAmount: number,
  userMemberId: string | undefined,
  decimalDigits: number,
  description: string,
  renderCounter: React.MutableRefObject<number>,
  category: Signal<string>
) => {
  useEffect(() => {

setMemberAmounts(
  recalculateAmounts(
    memberAmounts,
    totalAmount,
    decimalDigits,
    category
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
        category
      )
    );
  }
  if (
    description === "Payers" &&
    !memberAmounts.some((m) => m.selected)
  ) {
    const newFormMembers = memberAmounts.map((m) => ({
      ...m,
      selected: m.id === userMemberId,
      order: renderCounter.current,
    }));
    setMemberAmounts(
      recalculateAmounts(
        newFormMembers,
        totalAmount,
        decimalDigits,
        category
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

  }, [totalAmount,category.value]);
};

