import { Signal } from "@preact/signals-react";
import { PickerMember } from "../../../types";
import { split } from "./split";
import { distributeRemainderCents } from "./distributeRemainderCents";
import { distributeRemainderCentsForShares } from "./distributeRemainderCentsForShares";
import { significantDigitsFromTicker } from "../../../helpers/openExchangeRates";
import { removeCommas } from "../../../helpers/removeCommas";


export const recalculateAmounts = (
  formMembers: PickerMember[],
  totalAmount: number,
  decimalDigits: number,
  category: Signal<string>,
  ticker: string
): PickerMember[] => {

  const getCleanActual = (sq: string) => {
    const clean = removeCommas(sq);
    if (clean === '' || clean === '.') {
      return '0';
    } else if (clean.startsWith('.')) {
      return '0' + clean;
    }
    return clean;
  };

  const synchronizedFormMembers = formMembers.map((m) =>
    m.locked && m.selected ? { ...m, actualAmount: getCleanActual(m.screenQuantity) } : m
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
          const screenValue = screenArray.shift()?.toFixed(decimalDigits) || "";
          return {
            ...m,
            screenQuantity: formatCurrency(screenValue, ticker),
            //screenQuantity:screenValue,
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
        decimalDigits + 2
      );
      actualPercentageSplit = split(
        100 - lockedTotalAmount,
        unlockedSelectedMembers.length,
        decimalDigits + 2
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
          sum + (member.screenQuantity && member.selected ? Number(member.screenQuantity) : 0),
        0
      );
      if (totalShares === 0) {
        return synchronizedFormMembers;
      }
      const { adjustedToOriginalAmount } = distributeRemainderCentsForShares(
        decimalDigits,
        totalAmount,
        synchronizedFormMembers
      );

      return synchronizedFormMembers.map((m) => {
        if (m.selected) {
          const adjustedMember = adjustedToOriginalAmount.find((a) => a.id === m.id);
          return {
            ...m,
            actualAmount: adjustedMember ? adjustedMember.amount : "",
            screenQuantity: m.screenQuantity || "",
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

function formatCurrency(value: string, ticker: string): string {
  let sign = '';
  if (value.startsWith('-')) {
    sign = '-';
    value = value.slice(1);
  }

  let formattedValue = value.replace(/[^\d.]/g, "").replace(/^0+(?=\d)/, "");

  const decimalPoints = significantDigitsFromTicker(ticker?.toUpperCase());
  const decimalIndex = formattedValue.indexOf(".");
  if (decimalIndex !== -1) {
    if (decimalPoints === 0) {
      formattedValue = formattedValue.slice(0, decimalIndex);
    } else {
      formattedValue = formattedValue.slice(0, decimalIndex + decimalPoints + 1);
    }
  }

  if (decimalPoints >= 3) {
    const parts = formattedValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formattedValue = parts.join(".");
  } else {
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (formattedValue.startsWith('0.') && formattedValue.length > 2) {
    formattedValue = formattedValue.slice(1);
  } else if (formattedValue === '0.') {
    formattedValue = '.';
  }

  return sign + formattedValue;
}