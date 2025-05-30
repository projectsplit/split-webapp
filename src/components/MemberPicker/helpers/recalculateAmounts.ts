import { Signal } from "@preact/signals-react";
import { PickerMember } from "../../../types";
import { split } from "./split";
import { distributeRemainderCents } from "./distributeRemainderCents";

export const recalculateAmounts = (
  formMembers: PickerMember[],
  totalAmount: number,
  decimalDigits: number,
  category: Signal<string>
): PickerMember[] => {
  // Synchronize actualAmount and screenQuantity for "Amounts" locked members
  //TODO FIX FOR "Percentages" and "Shares" categories

  const synchronizedFormMembers = formMembers.map((m) =>
    m.locked && m.selected ? { ...m, actualAmount: m.screenQuantity } : m
  );

  const lockedSelectedMembers = synchronizedFormMembers.filter(
    (m) => m.selected && m.locked
  );
  const unlockedSelectedMembers = synchronizedFormMembers.filter(
    (m) => m.selected && !m.locked
  );
  const lockedTotalAmount = lockedSelectedMembers
    .map((m) => Number(m.actualAmount))
    .reduce((total, a) => total + a, 0);

  let screenArray: number[] = [];
  let actualAmountsArray: number[] = [];
  let actualPercentageSplit: number[] = [];

  switch (category.value) {
    case "Amounts":
      screenArray = split(
        totalAmount - lockedTotalAmount,
        unlockedSelectedMembers.length,
        decimalDigits
      );
      actualAmountsArray = [...screenArray];
      return synchronizedFormMembers.map((m) => {
        if (m.selected && !m.locked) {
          return {
            ...m,
            screenQuantity: screenArray.shift()?.toFixed(decimalDigits) || "",
            actualAmount:
              actualAmountsArray.shift()?.toFixed(decimalDigits) || "",
          };
        }
        return m;
      });

    case "Percentages":
      screenArray = split(
        100 - lockedTotalAmount,
        unlockedSelectedMembers.length,
         decimalDigits+2
      );
      actualPercentageSplit = split(
        100 - lockedTotalAmount,
        unlockedSelectedMembers.length,
        decimalDigits+2
      );

      const {
        adjustedUnlockedToOriginalAmount: adjustedUnlocked,
        adjustedLockedToOriginalAmount: adjustedLocked,
      } = distributeRemainderCents(
        decimalDigits,
        totalAmount,
        actualPercentageSplit,
        synchronizedFormMembers
      );
      let unlockedIndex = 0;
      let lockedIndex = 0;
      return synchronizedFormMembers.map((m) => {
        if (m.selected && !m.locked) {
          return {
            ...m,
            screenQuantity: screenArray[unlockedIndex]?.toFixed(2) || "",
            actualAmount: adjustedUnlocked[unlockedIndex] || "",
            unlockedIndex: unlockedIndex++,
          };
        }
        if (m.selected && m.locked) {
          return {
            ...m,
            actualAmount: adjustedLocked[lockedIndex] || m.actualAmount,
            lockedIndex: lockedIndex++,
          };
        }
        // Reset unselected members
        return {
          ...m,
          actualAmount: "",
          screenQuantity: "",
        };
      });

    case "Shares":
      const totalShares = synchronizedFormMembers.reduce(
        (sum, member) =>
          sum + (member.screenQuantity ? Number(member.screenQuantity) : 0),
        0
      );
      if (totalShares === 0) {
        return synchronizedFormMembers;
      }
      const totalEqualShares = totalAmount / totalShares;
      return synchronizedFormMembers.map((m) => {
        if (m.selected) {
          return {
            ...m,
            actualAmount: (Number(m.screenQuantity) * totalEqualShares).toFixed(
              decimalDigits
            ),
            screenQuantity: m.screenQuantity || "", //"0"
          };
        }
        return {
          ...m,
          actualAmount: "",
          screenQuantity: "",
        };
      });

    default:
      return synchronizedFormMembers;
  }
};
