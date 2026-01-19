import currency from "currency.js";
import { CategoryKey, CategoryMap } from "../formStore/formStoreTypes";
import { PickerMember } from "../../../types";
import { significantDigitsFromTicker } from "../../../helpers/openExchangeRates";

export const validateExpenseState = (
  amount: string,
  participantsCategory: CategoryKey,
  payersCategory: CategoryKey,
  currencySymbol: string,
  participantsByCategory: CategoryMap<PickerMember[]>,
  payersByCategory: CategoryMap<PickerMember[]>
) => {
  let amountErr = "";
  let participantsErr = "";
  let payersErr = "";
  let showAmountErr = false;

  // Category skip
  if (participantsCategory === "Shares" && payersCategory === "Shares") {
    return {
      isValid: true,
      errors: {
        amount: "",
        participants: "",
        payers: "",
      },
      showAmountErr: false,
      amountErr: "",
      participantsErr: "",
      payersErr: "",
    };
  }

  const amountTrimmed = amount.trim();
  const isAmountEmptyOrZero =
    !amountTrimmed || amountTrimmed === "0" || amountTrimmed === "0.";

  if (isAmountEmptyOrZero) {
    return {
      isValid: false,
      errors: {}, // or define logic for empty amount
      showAmountErr: false,
      amountErr: "",
      participantsErr: "",
      payersErr: "",
    };
  }

  const currentAmount = Number(amount);

  // Show amount error
  const activeParticipants = participantsByCategory[participantsCategory] ?? [];
  const selectedParticipants = activeParticipants.filter((p) => p.selected);
  const activePayers = payersByCategory[payersCategory] ?? [];
  const selectedPayers = activePayers.filter((p) => p.selected);

  if (selectedParticipants.length > 0 || selectedPayers.length > 0) {
    showAmountErr = true;
  }

  // Participants validation
  const areParticipantsValid = selectedParticipants.every(
    (p) => p.actualAmount !== "NaN" && Number(p.actualAmount) > 0
  );
  const digits = significantDigitsFromTicker(currencySymbol);
  let isParticipantsSumInvalid = false;
  if (digits >= 3) {
    const sum = Number(
      selectedParticipants
        .reduce((acc, p) => acc + Number(p.actualAmount), 0)
        .toFixed(digits)
    );
    const target = Number(currentAmount.toFixed(digits));
    isParticipantsSumInvalid = sum !== target;
  } else {
    const sum = selectedParticipants.reduce(
      (acc, p) => currency(acc).add(p.actualAmount).value,
      0
    );
    isParticipantsSumInvalid = sum !== currency(currentAmount).value;
  }

  participantsErr = !areParticipantsValid
    ? "Participation amounts must be positive"
    : isParticipantsSumInvalid
    ? "Participation amounts must add up to total"
    : "";

  // Payers validation
  const arePayersValid = selectedPayers.every(
    (p) => p.actualAmount !== "NaN" && Number(p.actualAmount) > 0
  );
  let isPayersSumInvalid = false;
  if (digits >= 3) {
    const sum = Number(
      selectedPayers
        .reduce((acc, p) => acc + Number(p.actualAmount), 0)
        .toFixed(digits)
    );
    const target = Number(currentAmount.toFixed(digits));
    isPayersSumInvalid = sum !== target;
  } else {
    const sum = selectedPayers.reduce(
      (acc, p) => currency(acc).add(p.actualAmount).value,
      0
    );
    isPayersSumInvalid = sum !== currency(currentAmount).value;
  }

  payersErr = !arePayersValid
    ? "Payment amounts must be positive"
    : isPayersSumInvalid
    ? "Payment amounts must add up to total"
    : "";

  const isValid = !amountErr && !participantsErr && !payersErr;

  return {
    isValid,
    errors: {
      amount: amountErr,
      participants: participantsErr,
      payers: payersErr,
    },
    // Return individual error strings too for granular updates
    amountErr,
    participantsErr,
    payersErr,
    showAmountErr,
  };
};
