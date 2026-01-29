import currency from "currency.js";
import { significantDigitsFromTicker } from "../../../helpers/openExchangeRates";
import { PickerMember } from "../../../types";
import { Signal } from "@preact/signals-react";

export const errorSettingFn = (
  description: string,
  memberAmounts: PickerMember[],
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMenu: Signal<string>,
  selectedCurrency: string,
  totalAmount: number
) => {
  const isParticipants = description === "Participants";
  const memberType = isParticipants ? "participant" : "payer";
  const selectedMembers = memberAmounts.filter((p) => p.selected);
  if (
    memberAmounts.length === memberAmounts.filter((p) => !p.selected).length
  ) {
    setError(`Select at least one ${memberType}`);
    errorMenu.value = "amountsError";
    return;
  }

  const areNumbersValid = selectedMembers.every(
    (x) => x.actualAmount !== "NaN" && Number(x.actualAmount) > 0
  );

  const decimal = significantDigitsFromTicker(selectedCurrency);
  const isSumInvalid =
    selectedMembers.length > 0 &&
    (decimal >= 3
      ? Number(
          selectedMembers
            .reduce((acc, payer) => acc + Number(payer.actualAmount), 0)
            .toFixed(decimal)
        ) !== Number(Number(totalAmount).toFixed(decimal))
      : selectedMembers.reduce(
          (acc, payer) => currency(acc).add(payer.actualAmount).value,
          0
        ) !== currency(totalAmount).value);

  setError(
    !areNumbersValid&&description === "Participants"
      ? "Participation amounts must be positive":
      !areNumbersValid&&description === "Payers"
      ? "Payment amounts must be positive":
      isSumInvalid&&description === "Participants"
      ? "Participation amounts must add up to total":
      isSumInvalid&&description === "Payers"
      ? "Payment amounts must add up to total"
      : ""
  );
};
