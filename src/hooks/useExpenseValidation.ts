import { useEffect } from "react";
import { ExpenseFormAction, ExpenseFormState, GeoLocation, PickerMember } from "../types";
import { amountIsValid } from "../helpers/amountIsValid";
import { significantDigitsFromTicker } from "../helpers/openExchangeRates";
import currency from "currency.js";

export const useExpenseValidation = ({
  amount,
  participants,
  payers,
  currencySymbol,
  description,
  location,
  dispatch
}: {
  amount: string;
  participants: PickerMember[];
  payers: PickerMember[];
  currencySymbol: string;
  description: string;
  location?: GeoLocation;
  dispatch: (value: ExpenseFormAction) => void
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const errors: Partial<ExpenseFormState["errors"]> = {};

      // Validate amount
      errors.amount = amountIsValid(amount) ? "" : "Invalid amount";

      // Validate participants
      const selectedParticipants = participants.filter((x) => x.selected);
      const areParticipantsNumbersValid = selectedParticipants.every(
        (x) => x.amount !== "NaN" && Number(x.amount) > 0
      );
      const isParticipantsSumInvalid =
        selectedParticipants.length > 0 &&
        (significantDigitsFromTicker(currencySymbol) >= 3
          ? Number(
            selectedParticipants
              .reduce((acc, payer) => acc + Number(payer.amount), 0)
              .toFixed(significantDigitsFromTicker(currencySymbol))
          ) !==
          Number(
            Number(amount).toFixed(significantDigitsFromTicker(currencySymbol))
          )
          : selectedParticipants.reduce(
            (acc, payer) => currency(acc).add(payer.amount).value,
            0
          ) !== currency(amount).value);
      errors.participants =
        !areParticipantsNumbersValid
          ? "Amounts must be positive"
          : isParticipantsSumInvalid
            ? "Amounts must add up to total"
            : "";

      // Validate payers
      const selectedPayers = payers.filter((x) => x.selected);
      const arePayersNumbersValid = selectedPayers.every(
        (x) => x.amount !== "NaN" && Number(x.amount) > 0
      );
      const isPayersSumInvalid =
        selectedPayers.length > 0 &&
        (significantDigitsFromTicker(currencySymbol) >= 3
          ? Number(
            selectedPayers
              .reduce((acc, payer) => acc + Number(payer.amount), 0)
              .toFixed(significantDigitsFromTicker(currencySymbol))
          ) !==
          Number(
            Number(amount).toFixed(significantDigitsFromTicker(currencySymbol))
          )
          : selectedPayers.reduce(
            (acc, payer) => currency(acc).add(payer.amount).value,
            0
          ) !== currency(amount).value);
      errors.payers =
        !arePayersNumbersValid
          ? "Amounts must be positive"
          : isPayersSumInvalid
            ? "Amounts must add up to total"
            : "";

      // Validate description
      errors.description =
        !location && description.length === 0
          ? "Select a description or a location"
          : "";

      dispatch({ type: "SET_ERROR", payload: errors });
    }, 200);

    return () => clearTimeout(timeout);
  }, [amount, participants, payers, currencySymbol, description, location]);

  return null;
}