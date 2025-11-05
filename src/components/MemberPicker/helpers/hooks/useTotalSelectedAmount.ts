import { useMemo } from "react";
import { PickerMember } from "../../../../types";
import { significantDigitsFromTicker } from "../../../../helpers/openExchangeRates";

export const useTotalSelectedAmount = (
  memberAmounts: PickerMember[],
  selectedCurrency: string
) => {
  return useMemo(() => {
    if (!memberAmounts?.length) return 0;

    const sum = memberAmounts
      .filter(m => m.selected)
      .reduce((acc, m) => acc + Number(m.actualAmount || 0), 0);

    return Number(sum.toFixed(significantDigitsFromTicker(selectedCurrency)));
  }, [memberAmounts, selectedCurrency]); // ← now safe!
};