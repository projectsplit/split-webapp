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
import { Signal } from "@preact/signals-react";

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
  participantsCategory,
  payersCategory,
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
  participantsCategory: Signal<string>;
  payersCategory: Signal<string>;
}) {
  setShowAmountError(true);


if (participantsCategory.value === 'Shares') {
  participants.map(p => {
    if ( p.actualAmount === '0.00') {
      p.selected = false;
    }
    return p; 
  });
}

if (payersCategory.value === 'Shares') {
  payers.map(p => {
    if ( p.actualAmount === '0.00') {
      p.selected = false;
    }
    return p; 
  });
}


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

   if( participantsCategory.value === "Shares" || payersCategory.value === "Shares") {
       const selectedParticipants = participants.filter((x) => x.selected);
        const areParticipantsNumbersValid = selectedParticipants.every(
          (x) => x.actualAmount !== "NaN" && Number(x.actualAmount) > 0
        );
    
        const isParticipantsSumInvalid =
          selectedParticipants.length > 0 &&
          (significantDigitsFromTicker(currencySymbol) >= 3
            ? Number(
                selectedParticipants
                  .reduce((acc, payer) => acc + Number(payer.actualAmount), 0)
                  .toFixed(significantDigitsFromTicker(currencySymbol))
              ) !==
              Number(
                Number(amount).toFixed(significantDigitsFromTicker(currencySymbol))
              )
            : selectedParticipants.reduce(
                (acc, payer) => currency(acc).add(payer.actualAmount).value,
                0
              ) !== currency(amount).value);
    
        const selectedPayers = payers.filter((x) => x.selected);
        const arePayersNumbersValid = selectedPayers.every(
          (x) => x.actualAmount !== "NaN" && Number(x.actualAmount) > 0
        );
        const isPayersSumInvalid =
          selectedPayers.length > 0 &&
          (significantDigitsFromTicker(currencySymbol) >= 3
            ? Number(
                selectedPayers
                  .reduce((acc, payer) => acc + Number(payer.actualAmount), 0)
                  .toFixed(significantDigitsFromTicker(currencySymbol))
              ) !==
              Number(
                Number(amount).toFixed(significantDigitsFromTicker(currencySymbol))
              )
            : selectedPayers.reduce(
                (acc, payer) => currency(acc).add(payer.actualAmount).value,
                0
              ) !== currency(amount).value);
    
        // Validate amount when participants or payers are selected
        if (selectedParticipants.length > 0 || selectedPayers.length > 0) {
          setShowAmountError(true);
        }
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
  }
  
  if (!amountIsValid(amount, setAmountError)) return;

  if (!location.value && description.length == 0) {
    setDescriptionError("Select a description or a location");
    return;
  }

  //Add a setError only for when Shares state is active so if all shares accross all payers and participants are 0 then show error
  //console.log(payers, participants, amount);

  const expenseRequest: ExpenseRequest = {
    amount: Number(amount),
    ...(isCreateExpense ? { groupId: group.id } : { expenseId: expense?.id }),
    currency: currencySymbol,
    payments: payers
      .filter((value) => value.selected)
      .map((value) => ({
        memberId: value.id,
        amount: Number(value.actualAmount),
      })),
    shares: participants
      .filter((value) => value.selected)
      .map((value) => ({
        memberId: value.id,
        amount: Number(value.actualAmount),
      })),
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
export const createParticipantPickerArray = (
  group: Group,
  expense: FormExpense | null,
  type: string,
  isCreateExpense:boolean
): PickerMember[] => {
  return [...group.guests, ...group.members].map((member) => {
    const participant = expense?.participants.find(
      (p) => p.memberId === member.id
    );
    const actualAmount = participant?.participationAmount ?? "";
    const isPercentageType = type === "Percentages";
     const isSharesType = type === "Shares";
    const expenseAmount = Number(expense?.amount);
    const participationAmount = Number(participant?.participationAmount);

    const screenQuantity =
      isPercentageType &&
      expense?.amount &&
      participant?.participationAmount &&
      !isNaN(expenseAmount) &&
      expenseAmount !== 0
        ? ((participationAmount / expenseAmount) * 100).toFixed(1)
        : isSharesType && !isCreateExpense?'':actualAmount //'0'

    return {
      id: member.id,
      actualAmount:
        expense?.participants.find((p) => p.memberId === member.id)
          ?.participationAmount ?? "",
      screenQuantity,
      locked:
        expense?.participants.some((p) => p.memberId === member.id) ?? false,
      name: member.name,
      order: 0,
      selected:
        expense?.participants.some((p) => p.memberId === member.id) ?? false,
    };
  });
};

export const createPayerPickerArray = (
  group: Group,
  expense: FormExpense | null,
  type: string,
  isCreateExpense: boolean
): PickerMember[] => {
  return [...group.guests, ...group.members].map((member) => {
    const payer = expense?.payers.find((p) => p.memberId === member.id);
    const actualAmount = payer?.paymentAmount ?? "";
    const isPercentageType = type === "Percentages";
    const isSharesType = type === "Shares";
    const expenseAmount = Number(expense?.amount);
    const paymentAmount = Number(payer?.paymentAmount);

    const screenQuantity =
      isPercentageType &&
      expense?.amount &&
      payer?.paymentAmount &&
      !isNaN(expenseAmount) &&
      expenseAmount !== 0
        ? ((paymentAmount / expenseAmount) * 100).toFixed(1)
        : isSharesType && !isCreateExpense?'':actualAmount //'0'

    return {
      id: member.id,
      actualAmount:
        expense?.payers.find((p) => p.memberId === member.id)?.paymentAmount ??
        "",
      screenQuantity,
      locked: expense?.payers.some((p) => p.memberId === member.id) ?? false,
      name: member.name,
      order: 0,
      selected: expense?.payers.some((p) => p.memberId === member.id) ?? false,
    };
  });
};
