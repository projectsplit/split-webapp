import { useLayoutEffect } from "react";
import currency from "currency.js";
import { PickerMember } from "../../../types";
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
  participantsCategory: Signal<string>;
  payersCategory: Signal<string>;
}) {
  useLayoutEffect(() => {
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

      setParticipantsError((prev) => {
        if (!amount || amount.trim() === ""||amount==='0'||amount=='0.') {
          return prev === "" ? prev : "";
        }
        const newError = !areParticipantsNumbersValid
          ? "Amounts must be positive"
          : isParticipantsSumInvalid
          ? "Amounts must add up to total"
          : "";
        return prev === newError ? prev : newError;
      });
      setPayersError((prev) => {
         if (!amount || amount.trim() === ""||amount==='0'||amount=='0.') {
          return prev === "" ? prev : "";
        }
        const newError = !arePayersNumbersValid
          ? "Amounts must be positive"
          : isPayersSumInvalid
          ? "Amounts must add up to total"
          : "";
        return prev === newError ? prev : newError;
      });
    }
  }, [amount, participants, payers]);
}
