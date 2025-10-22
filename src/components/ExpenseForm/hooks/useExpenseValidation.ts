import { useEffect } from "react";

import currency from "currency.js";
import { PickerMember } from "../../../types";
import { amountIsValid } from "../../../helpers/amountIsValid";
import { significantDigitsFromTicker } from "../../../helpers/openExchangeRates";
import { Signal } from "@preact/signals-react";

export function useExpenseValidation({
  amount,
  participants,
  payers,
  currencySymbol,
  setParticipantsError,
  setPayersError,
  setShowAmountError,
  setAmountError,
  participantsCategory,
  payersCategory,
}: {
  amount: string;
  participants: PickerMember[];
  payers: PickerMember[];
  currencySymbol: string;
  setParticipantsError: React.Dispatch<React.SetStateAction<string>>;
  setPayersError: React.Dispatch<React.SetStateAction<string>>;
  setShowAmountError: React.Dispatch<React.SetStateAction<boolean>>;
  setAmountError: React.Dispatch<React.SetStateAction<string>>;
  participantsCategory: Signal<string>;
  payersCategory: Signal<string>;
}) {
  useEffect(() => {
    amountIsValid(amount, setAmountError);
    if (
      participantsCategory.value !== "Shares" &&
      payersCategory.value !== "Shares"
    ) {
    
      const selectedParticipants = participants?.filter((x) => x.selected);
      const areParticipantsNumbersValid = selectedParticipants?.every(
        (x) => x.actualAmount !== "NaN" && Number(x.actualAmount) > 0
      );

      const isParticipantsSumInvalid =
        selectedParticipants?.length > 0 &&
        (significantDigitsFromTicker(currencySymbol) >= 3
          ? Number(
              selectedParticipants
                .reduce((acc, payer) => acc + Number(payer.actualAmount), 0)
                .toFixed(significantDigitsFromTicker(currencySymbol))
            ) !==
            Number(
              Number(amount).toFixed(
                significantDigitsFromTicker(currencySymbol)
              )
            )
          : selectedParticipants.reduce(
              (acc, payer) => currency(acc).add(payer.actualAmount).value,
              0
            ) !== currency(amount).value);

      const selectedPayers = payers?.filter((x) => x.selected);
      const arePayersNumbersValid = selectedPayers?.every(
        (x) => x.actualAmount !== "NaN" && Number(x.actualAmount) > 0
      );
      const isPayersSumInvalid =
        selectedPayers?.length > 0 &&
        (significantDigitsFromTicker(currencySymbol) >= 3
          ? Number(
              selectedPayers
                .reduce((acc, payer) => acc + Number(payer.actualAmount), 0)
                .toFixed(significantDigitsFromTicker(currencySymbol))
            ) !==
            Number(
              Number(amount).toFixed(
                significantDigitsFromTicker(currencySymbol)
              )
            )
          : selectedPayers.reduce(
              (acc, payer) => currency(acc).add(payer.actualAmount).value,
              0
            ) !== currency(amount).value);

      // Validate amount when participants or payers are selected
      if (selectedParticipants?.length > 0 || selectedPayers?.length > 0) {
        setShowAmountError(true);
      }

      const errorsWithTimeOut = setTimeout(() => {
        setParticipantsError(
          !areParticipantsNumbersValid
            ? "Amounts must be positive"
            : isParticipantsSumInvalid
            ? "Amounts must add up to total"
            : ""
        );
        setPayersError(
          !arePayersNumbersValid
            ? "Amounts must be positive"
            : isPayersSumInvalid
            ? "Amounts must add up to total"
            : ""
        );
      }, 200);

      return () => clearTimeout(errorsWithTimeOut);
    }
  }, [amount, participants, payers]);
}
