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
    const adjustForUserMembers = memberAmounts.map((m) =>
      m.id === userMemberId ? { ...m, name: "you" } : m
    );

setMemberAmounts(
  recalculateAmounts(
    adjustForUserMembers,
    totalAmount,
    decimalDigits,
    category
  )
);

if (totalAmount > 0) {
  if (
    description === "Participants" &&
    !adjustForUserMembers.some((m) => m.selected)
  ) {
    const newFormMembers = adjustForUserMembers.map((m) => ({
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
    !adjustForUserMembers.some((m) => m.selected)
  ) {
    const newFormMembers = adjustForUserMembers.map((m) => ({
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
  const newFormMembers = adjustForUserMembers.map((m) => ({
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

