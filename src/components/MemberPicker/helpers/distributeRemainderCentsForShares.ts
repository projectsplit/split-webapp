import { PickerMember } from "../../../types";

export function distributeRemainderCentsForShares(
  decimalDigits: number,
  totalAmount: number,
  synchronizedFormMembers: PickerMember[]
) {
  const multiplier = Math.pow(10, decimalDigits);
  const totalCents = Math.round(totalAmount * multiplier);

  // Calculate total shares and initial amounts in cents with member IDs
  const totalShares = synchronizedFormMembers.reduce(
    (sum, member) =>
      sum + (member.screenQuantity && member.selected ? Number(member.screenQuantity) : 0),
    0
  );
  if (totalShares === 0) {
    return { adjustedToOriginalAmount: [] };
  }

  // Calculate initial amounts based on shares for selected members
  const totalEqualShares = totalAmount / totalShares;
  const splitAmountsInCents = synchronizedFormMembers
    .map((m) => {
      if (m.selected) {
        return {
          id: m.id,
          amount: Math.round(Number(m.screenQuantity) * totalEqualShares * multiplier),
        };
      }
      return null;
    })
    .filter((item): item is { id: string; amount: number } => item !== null);

  // Calculate remainder
  const totalSplitCents = splitAmountsInCents.reduce((sum, item) => sum + item.amount, 0);
  const remainderCents = totalCents - totalSplitCents;

  // Adjust amounts to account for remainder
  const adjustArray = (
    arr: { id: string; amount: number }[],
    remainder: number
  ): { id: string; amount: number }[] => {
    const adjusted = [...arr];
    const absRemainder = Math.abs(remainder);
    const isNegative = remainder < 0;

    // Sort indices by amount (descending) to adjust largest amounts first
    const indices = arr
      .map((item, index) => ({ amount: item.amount, index }))
      .sort((a, b) => b.amount - a.amount)
      .map(({ index }) => index);

    // Distribute remainder across the largest values
    for (let i = 0; i < absRemainder; i++) {
      const index = indices[i % indices.length];
      adjusted[index].amount += isNegative ? -1 : 1;
    }

    return adjusted;
  };

  let adjustedAmounts = splitAmountsInCents;
  if (remainderCents !== 0 && splitAmountsInCents.length > 0) {
    adjustedAmounts = adjustArray(splitAmountsInCents, remainderCents);
  }

  // Verify the new total
  const newTotal = adjustedAmounts.reduce((sum, item) => sum + item.amount, 0);
  if (newTotal !== totalCents) {
    console.warn(
      `Adjustment failed: new total ${newTotal} does not match totalCents ${totalCents}`
    );
  }

  // Convert back to original amounts with ID
  const adjustedToOriginalAmount = adjustedAmounts.map((item) => ({
    id: item.id,
    amount: (item.amount / multiplier).toFixed(decimalDigits),
  }));

  return { adjustedToOriginalAmount };
}