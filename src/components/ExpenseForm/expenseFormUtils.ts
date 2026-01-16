import { amountIsValid } from "../../helpers/amountIsValid";
import {
  ExpenseRequest,
  FormExpense,
  FormGroupExpense,
  FormNonGroupExpense,
  GeoLocation,
  Guest,
  Label,
  Member,
  PickerMember,
  User,
  UserInfo,
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
  setIsSubmitting,
  isnonGroupExpense,
}: {
  participants: PickerMember[];
  payers: PickerMember[];
  amount: string;
  setAmountError: (msg: string) => void;
  location: GeoLocation | undefined;
  description: string;
  setDescriptionError: (msg: string) => void;
  isCreateExpense: boolean;
  groupId?: string;
  expense: FormExpense | null;
  currencySymbol: string;
  expenseTime: string;
  labels: Label[];
  createExpenseMutation: (expense: ExpenseRequest) => void;
  editExpenseMutation: (expense: ExpenseRequest) => void;
  setShowAmountError: (show: boolean) => void;
  participantsCategory: Signal<string>;
  payersCategory: Signal<string>;
  setIsSubmitting: (value: boolean) => void;
  isnonGroupExpense: Signal<boolean> | undefined;
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

  if (!location && description.length == 0) {
    setDescriptionError("Select a description or a location");
    return;
  }

  let expenseRequest: ExpenseRequest;
  if (isnonGroupExpense?.value) {
    expenseRequest = {
      amount: Number(amount),
      ...(isCreateExpense ? {} : { expenseId: expense?.id }),
      currency: currencySymbol,
      payments: payers
        .filter((value) => value.selected)
        .map((value) => ({
          userId: value.id,
          amount: Number(value.actualAmount),
        })),
      shares: participants
        .filter((value) => value.selected)
        .map((value) => ({
          userId: value.id,
          amount: Number(value.actualAmount),
        })),
      description: description,
      location: location ?? null,
      occurred: expenseTime,
      labels: labels.map((x) => ({ text: x.text, color: x.color })),
    };
  } else {
    expenseRequest = {
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
      location: location ?? null,
      occurred: expenseTime,
      labels: labels.map((x) => ({ text: x.text, color: x.color })),
    };
  }

  if (isCreateExpense) {
    createExpenseMutation(expenseRequest);
    setIsSubmitting(true);
  } else {
    editExpenseMutation(expenseRequest);
    setIsSubmitting(true);
  }
}

function isNonGroupExpense(
  expense: FormExpense | null
): expense is FormNonGroupExpense {
  return !!expense && expense.groupId === undefined;
}

function isGroupExpense(
  expense: FormExpense | null
): expense is FormGroupExpense {
  return !!expense && expense.groupId !== undefined;
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
      const participant = isNonGroupExpense(expense)
        ? expense.participants.find((p) => p.userId === user.userId)
        : undefined;
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
        locked:
          (isNonGroupExpense(expense) &&
            expense.participants.some((p) => p.userId === user.userId)) ??
          false,
        name: user.username,
        order: 0,
        selected:
          (isNonGroupExpense(expense) &&
            expense.participants.some((p) => p.userId === user.userId)) ??
          false,
      };
    });
  } else {
    array = groupMembers.map((member) => {
      const participant =
        expense && isGroupExpense(expense)
          ? expense.participants.find((p) => p.memberId === member.id)
          : undefined;
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
        locked: isGroupExpense(expense)
          ? expense?.participants.some((p) => p.memberId === member.id) ?? false
          : false,
        name: member.name,
        order: 0,
        selected: isGroupExpense(expense)
          ? expense?.participants.some((p) => p.memberId === member.id) ?? false
          : false,
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
  isnonGroupExpense?: boolean,
  currentAmount?: string
): PickerMember[] => {
  let array: PickerMember[] = [];

  if (isnonGroupExpense && nonGroupUsers.length > 0) {
    array = nonGroupUsers.map((user) => {
      const payer = isNonGroupExpense(expense)
        ? expense.payers.find((p) => p.userId === user.userId)
        : undefined;
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
          (isNonGroupExpense(expense) &&
            expense.payers.some((p) => p.userId === user.userId)) ??
          false,
        name: user.username,
        order: 0,
        selected:
          (isNonGroupExpense(expense) &&
            expense.payers.some((p) => p.userId === user.userId)) ??
          false,
      };
    });
  } else {
    array = groupMembers.map((member) => {
      const payer =
        expense && isGroupExpense(expense)
          ? expense.payers.find((p) => p.memberId === member.id)
          : undefined;
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
        locked: isGroupExpense(expense)
          ? expense?.payers.some((p) => p.memberId === member.id) ?? false
          : false,
        name: member.name,
        order: 0,
        selected: isGroupExpense(expense)
          ? expense?.payers.some((p) => p.memberId === member.id) ?? false
          : false,
      };
    });
  }

  // Auto-select the current user as payer for new expense
  if (isCreateExpense) {
    const selectedId =
      isnonGroupExpense && nonGroupUsers.length > 0 ? userId : userMemberId;
    array = array.map((m) => {
      const isSelected = m.id === selectedId;
      return {
        ...m,
        selected: isSelected,
        order: 0,
        actualAmount:
          isSelected && currentAmount ? currentAmount : m.actualAmount,
      };
    });
  }

  return array;
};

export const generatePickerArrays = (
  groupMembers: (Member | Guest)[],
  nonGroupUsers: User[],
  expense: FormExpense | null,
  isCreateExpense: boolean,
  userInfo: UserInfo,
  userMemberId: string | undefined,
  isnonGroupExpense?: boolean,
  currentAmount?: string
) => {
  const participantsByCategory = {
    Amounts: createParticipantPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Amounts",
      isCreateExpense,
      isnonGroupExpense
    ),
    Shares: createParticipantPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Shares",
      isCreateExpense,
      isnonGroupExpense
    ),
    Percentages: createParticipantPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Percentages",
      isCreateExpense,
      isnonGroupExpense
    ),
  };

  const payersByCategory = {
    Amounts: createPayerPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Amounts",
      isCreateExpense,
      userInfo.userId,
      userMemberId,
      isnonGroupExpense,
      currentAmount
    ),
    Shares: createPayerPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Shares",
      isCreateExpense,
      userInfo.userId,
      userMemberId,
      isnonGroupExpense,
      currentAmount
    ),
    Percentages: createPayerPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Percentages",
      isCreateExpense,
      userInfo.userId,
      userMemberId,
      isnonGroupExpense,
      currentAmount
    ),
  };

  return { participantsByCategory, payersByCategory };
};
