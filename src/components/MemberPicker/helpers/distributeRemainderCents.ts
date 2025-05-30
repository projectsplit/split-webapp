import { PickerMember } from "../../../types";

export function distributeRemainderCents(
  decimalDigits: number,
  totalAmount: number,
  screenArray: number[],
  synchronizedFormMembers: PickerMember[]
) {
  const multiplier = Math.pow(10, decimalDigits);
  const totalCents = Math.round(totalAmount * multiplier);
  const splitOfUnlockedAmountsInCents = [
    ...screenArray.map((s) => Math.round((s * totalCents) / 100), 0),
  ];
  const lockedPercentages = synchronizedFormMembers
    .filter((s) => s.locked === true)
    .map((s) => Number(s.screenQuantity));
  const splitOfLockeAmountsInCents = lockedPercentages.map(
    (s) => Math.round((s * totalCents) / 100),
    0
  ); 
  const remainderCents =
    totalCents -
    splitOfUnlockedAmountsInCents.reduce((a, b) => a + b, 0) -
    splitOfLockeAmountsInCents.reduce((a, b) => a + b, 0); 

  if (remainderCents === 0) {
    const adjustedLockedToOriginalAmount = splitOfLockeAmountsInCents.map((s) =>
      (s / multiplier).toFixed(decimalDigits)
    );
    const adjustedUnlockedToOriginalAmount = splitOfUnlockedAmountsInCents.map(
      (s) => (s / multiplier).toFixed(decimalDigits)
    );
    return { adjustedUnlockedToOriginalAmount, adjustedLockedToOriginalAmount };
  } 
  const adjustArray = (arr: number[], remainder: number) => {
    const adjusted = [...arr];
    const absRemainder = Math.abs(remainder);
    const isNegative = remainder < 0;

    // Sort indices by value (descending) to adjust largest amounts first
    const indices = arr
      .map((value, index) => ({ value, index }))
      .sort((a, b) => b.value - a.value)
      .map(({ index }) => index);

    // Distribute remainder across the largest values
    for (let i = 0; i < absRemainder; i++) {
      const index = indices[i % indices.length]; 
      adjusted[index] += isNegative ? -1 : 1;
    }

    return adjusted;
  }; 

  let adjustedUnlocked = [...splitOfUnlockedAmountsInCents];
  let adjustedLocked = [...splitOfLockeAmountsInCents];

  if (splitOfLockeAmountsInCents.length > 0) {

    adjustedLocked = adjustArray(splitOfLockeAmountsInCents, remainderCents);
  } else if (splitOfUnlockedAmountsInCents.length > 0) {
 
    adjustedUnlocked = adjustArray(
      splitOfUnlockedAmountsInCents,
      remainderCents
    );
  } 
  const newTotal =
    adjustedUnlocked.reduce((a, b) => a + b, 0) +
    adjustedLocked.reduce((a, b) => a + b, 0);
  if (newTotal !== totalCents) {
    console.warn(
      `Adjustment failed: new total ${newTotal} does not match totalCents ${totalCents}`
    );
  }
  const adjustedLockedToOriginalAmount = adjustedLocked.map((s) =>
    (s / multiplier).toFixed(decimalDigits)
  );
  const adjustedUnlockedToOriginalAmount = adjustedUnlocked.map((s) =>
    (s / multiplier).toFixed(decimalDigits)
  );
  return {
    adjustedLockedToOriginalAmount: adjustedLockedToOriginalAmount,
    adjustedUnlockedToOriginalAmount: adjustedUnlockedToOriginalAmount,
  };
}
