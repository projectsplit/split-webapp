import { PickerMember } from "../../../types";
import { split } from "./split";

export const isEquallySplitFn = (
    memberAmounts: PickerMember[],
    totalAmount: number,
    decimalDigits: number
  ): boolean => {
    const pickedMembersCount = memberAmounts.filter(
      (m) => m.actualAmount !== ""
    ).length;
  
    if (pickedMembersCount === 0) {
      return true;
    }
  
    const equallySplitAmount = split(
      totalAmount,
      pickedMembersCount,
      decimalDigits
    )[0].toFixed(decimalDigits);
    const equallySplitAmountLowerEnd = split(
      totalAmount,
      pickedMembersCount,
      decimalDigits
    )[pickedMembersCount - 1].toFixed(decimalDigits);
    return memberAmounts
      .filter((m) => m.actualAmount !== "")
      .every(
        (m) =>
          m.actualAmount === equallySplitAmount ||
          m.actualAmount === equallySplitAmountLowerEnd
      );
  };