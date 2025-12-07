import { amountIsValid } from "../../helpers/amountIsValid";
import {
  ExpenseRequest,
  FormExpense,
  GeoLocation,
  Guest,
  Label,
  Member,
  PickerMember,
  User,
} from "../../types";
import { Signal } from "@preact/signals-react";

export function submitExpense({
  participants,
  payers,
  amount,
  setAmountError,
  location,
  description,
  setDescriptionError,
  isCreateExpense,
  groupId,
  expense,
  currencySymbol,
  expenseTime,
  labels,
  createExpenseMutation,
  editExpenseMutation,
  setShowAmountError,
  participantsCategory,
  payersCategory,
  isSubmitting
}: {
  participants: PickerMember[];
  payers: PickerMember[];
  amount: string;
  setAmountError: React.Dispatch<React.SetStateAction<string>>;
  location: { value: GeoLocation | undefined };
  description: string;
  setDescriptionError: React.Dispatch<React.SetStateAction<string>>;
  isCreateExpense: boolean;
  groupId?: string;
  expense: FormExpense | null;
  currencySymbol: string;
  expenseTime: string;
  labels: Label[];
  createExpenseMutation: (expense: ExpenseRequest) => void;
  editExpenseMutation: (expense: ExpenseRequest) => void;
  setShowAmountError: React.Dispatch<React.SetStateAction<boolean>>;
  participantsCategory: Signal<string>;
  payersCategory: Signal<string>;
  isSubmitting:Signal<boolean>
}) {
  setShowAmountError(true);
  if (participantsCategory.value === "Shares") {
    participants.map((p) => {
      if (p.actualAmount === "0.00") {
        p.selected = false;
      }
      return p;
    });
  }

  if (payersCategory.value === "Shares") {
    payers.map((p) => {
      if (p.actualAmount === "0.00") {
        p.selected = false;
      }
      return p;
    });
  }

  if (!amountIsValid(amount, setAmountError)) return;

  if (!location.value && description.length == 0) {
    setDescriptionError("Select a description or a location");
    return;
  }

  const expenseRequest: ExpenseRequest = {
    amount: Number(amount),
    ...(isCreateExpense ? { groupId: groupId } : { expenseId: expense?.id }),
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
    isSubmitting.value = true;
  } else {
    editExpenseMutation(expenseRequest);
    isSubmitting.value = true;
  }
}

export const createParticipantPickerArray = (
  groupMembers: (Member | Guest)[],
  nonGroupUsers: User[],
  expense: FormExpense | null,
  type: string,
  isCreateExpense: boolean,
  isnonGroupExpense?: boolean
): PickerMember[] => {
  let array: PickerMember[] = [];

  if (isnonGroupExpense && nonGroupUsers.length > 0) {
    array = nonGroupUsers.map((user) => {
      const participant = expense?.participants.find(
        (p) => p.memberId === user?.userId
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
          : isSharesType && !isCreateExpense
          ? ""
          : actualAmount;

      return {
        id: user.userId,
        actualAmount,
        screenQuantity,
        locked: expense?.participants.some((p) => p.memberId === user.userId) ??
            false,
        name: user.username,
        order: 0,
        selected:
          expense?.participants.some((p) => p.memberId === user.userId) ??
          false,
      };
    });
  } else { 
    array = groupMembers.map((member) => {
      const participant = expense?.participants.find(
        (p) => p.memberId === member?.id
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
          : isSharesType && !isCreateExpense
          ? ""
          : actualAmount;

      return {
        id: member.id,
        actualAmount,
        screenQuantity,
        locked: 
          expense?.participants.some((p) => p.memberId === member.id) ?? false,
        name: member.name,
        order: 0,
        selected:
          expense?.participants.some((p) => p.memberId === member.id) ?? false,
      };
    });
  }

  // Auto-select all participants for new expense
  if (isCreateExpense) {
    array = array.map((m) => ({ ...m, selected: true, order: 0 }));
  }

  return array;
};

export const createPayerPickerArray = (
  groupMembers: (Member | Guest)[],
  nonGroupUsers: User[],
  expense: FormExpense | null,
  type: string,
  isCreateExpense: boolean,
  userId: string,
  userMemberId: string | undefined,
  isnonGroupExpense?: boolean
): PickerMember[] => {
  let array: PickerMember[] = [];

  if (isnonGroupExpense && nonGroupUsers.length > 0) {
    array = nonGroupUsers.map((user) => {
      const payer = expense?.payers.find((p) => p.memberId === user?.userId);
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
          : isSharesType && !isCreateExpense
          ? ""
          : actualAmount;

      return {
        id: user.userId,
        actualAmount,
        screenQuantity,
        locked:
          expense?.payers.some((p) => p.memberId === user.userId) ?? false,
        name: user.username,
        order: 0,
        selected:
          expense?.payers.some((p) => p.memberId === user.userId) ?? false,
      };
    });
  } else {
    array = groupMembers.map((member) => {
      const payer = expense?.payers.find((p) => p.memberId === member?.id);
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
          : isSharesType && !isCreateExpense
          ? ""
          : actualAmount;

      return {
        id: member.id,
        actualAmount,
        screenQuantity,
        locked: expense?.payers.some((p) => p.memberId === member.id) ?? false,
        name: member.name,
        order: 0,
        selected:
          expense?.payers.some((p) => p.memberId === member.id) ?? false,
      };
    });
  }

  // Auto-select the current user as payer for new expense
  if (isCreateExpense) {
    const selectedId =
      isnonGroupExpense && nonGroupUsers.length > 0
        ? userId
        : userMemberId;
    array = array.map((m) => ({
      ...m,
      selected: m.id === selectedId,
      order: 0,
    }));
  }

  return array;
};
