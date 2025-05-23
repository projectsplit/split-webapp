import { useEffect } from "react";
import { amountIsValid } from "../../helpers/amountIsValid";
import {
  ExpenseRequest,
  FormExpense,
  GeoLocation,
  Group,
  Label,
  PickerMember,
} from "../../types";
import { significantDigitsFromTicker } from "../../helpers/openExchangeRates";
import currency from "currency.js";

export function submitExpense({
  participants,
  setParticipantsError,
  payers,
  setPayersError,
  amount,
  setAmountError,
  location,
  description,
  setDescriptionError,
  isCreateExpense,
  group,
  expense,
  currencySymbol,
  expenseTime,
  labels,
  createExpenseMutation,
  editExpenseMutation,
  setShowAmountError,
}: {
  participants: PickerMember[];
  setParticipantsError: React.Dispatch<React.SetStateAction<string>>;
  payers: PickerMember[];
  setPayersError: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmountError: React.Dispatch<React.SetStateAction<string>>;
  location: { value: GeoLocation | undefined };
  description: string;
  setDescriptionError: React.Dispatch<React.SetStateAction<string>>;
  isCreateExpense: boolean;
  group: Group;
  expense: FormExpense | null;
  currencySymbol: string;
  expenseTime: string;
  labels: Label[];
  createExpenseMutation: (expense: ExpenseRequest) => void;
  editExpenseMutation: (expense: ExpenseRequest) => void;
  setShowAmountError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  setShowAmountError(true);

  if (
    participants.length ===
    participants.filter((p) => p.selected === false).length
  ) {
    setParticipantsError("Select at least one participant");
    return;
  }

  if (payers.length === payers.filter((p) => p.selected === false).length) {
    setPayersError("Select at least one payer");
    return;
  }

  if (!amountIsValid(amount, setAmountError)) return;

  if (!location.value && description.length == 0) {
    setDescriptionError("Select a description or a location");
    return;
  }

  const expenseRequest: ExpenseRequest = {
    amount: Number(amount),
    ...(isCreateExpense ? { groupId: group.id } : { expenseId: expense?.id }),
    currency: currencySymbol,
    payments: payers
      .filter((value) => value.selected)
      .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
    shares: participants
      .filter((value) => value.selected)
      .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
    description: description,
    location: location.value ?? null,
    occurred: expenseTime,
    labels: labels.map((x) => ({ text: x.text, color: x.color })),
  };

  if (isCreateExpense) {
    createExpenseMutation(expenseRequest);
  } else {
    editExpenseMutation(expenseRequest);
  }
}

export function useExpenseValidation({
  amount,
  participants,
  payers,
  currencySymbol,
  setParticipantsError,
  setPayersError,
  setShowAmountError,
  setAmountError
}: {
  amount: string;
  participants: PickerMember[];
  payers: PickerMember[];
  currencySymbol: string;
  setParticipantsError: React.Dispatch<React.SetStateAction<string>>;
  setPayersError: React.Dispatch<React.SetStateAction<string>>;
  setShowAmountError: React.Dispatch<React.SetStateAction<boolean>>;
  setAmountError: React.Dispatch<React.SetStateAction<string>>
}) {
   useEffect(() => {
      amountIsValid(amount, setAmountError);
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
  
      // Validate amount when participants or payers are selected
      if (selectedParticipants.length > 0 || selectedPayers.length > 0) {
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
    }, [amount, participants, payers]);
}


export const createParticipantPickerArray = (
  group: Group,
  expense: FormExpense | null
): PickerMember[] => {
  return [...group.guests, ...group.members].map((member) => ({
    id: member.id,
    amount:
      expense?.participants.find((p) => p.memberId === member.id)
        ?.participationAmount ?? "",
    locked: false,
    name: member.name,
    order: 0,
    selected:
      expense?.participants.some((p) => p.memberId === member.id) ?? false,
  }));
};

export const createPayerPickerArray = (
  group: Group,
  expense: FormExpense | null
): PickerMember[] => {
  return [...group.guests, ...group.members].map((member) => ({
    id: member.id,
    amount:
      expense?.payers.find((p) => p.memberId === member.id)?.paymentAmount ??
      "",
    locked: false,
    name: member.name,
    order: 0,
    selected: expense?.payers.some((p) => p.memberId === member.id) ?? false,
  }));
};