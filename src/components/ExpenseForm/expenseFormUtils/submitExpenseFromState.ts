import { amountIsValid } from "../../../helpers/amountIsValid";
import { CategoryMap } from "../formStore/formStoreTypes";
import {
  ExpenseRequest,
  FormExpense,
  GeoLocation,
  Label,
  PersonalExpenseRequest,
  PickerMember,
  Group
} from "../../../types";
import { Signal } from "@preact/signals-react";

export function submitExpenseFromState(
  state: {
    amount: string;
    description: string;
    currencySymbol: string;
    expenseTime: string;
    labels: Label[];
    location: GeoLocation | undefined;
    participantsByCategory: CategoryMap<PickerMember[]>;
    payersByCategory: CategoryMap<PickerMember[]>;
    participantsCategory: Signal<string>;
    payersCategory: Signal<string>;
    setAmountError: (msg: string) => void;
    setDescriptionError: (msg: string) => void;
    setIsSubmitting: (value: boolean) => void;
    setShowAmountError: (value: boolean) => void;
  },
  inputs: {
    groupId?: string;
    createExpenseMutation: (req: ExpenseRequest) => void;
    editExpenseMutation: (req: ExpenseRequest) => void;
    isCreateExpense: boolean;
    expense: FormExpense | null;
    isnonGroupExpense?: Signal<boolean>;
    fromPersonal?: boolean;
    fromHomeGroup?: Signal<Group | null>;
  }
) {
  const {
    groupId,
    createExpenseMutation,
    editExpenseMutation,
    isnonGroupExpense,
    fromPersonal,
    isCreateExpense,
    expense,
    fromHomeGroup,
  } = inputs;

  const participants =
    state.participantsByCategory[
    state.participantsCategory
      .value as keyof typeof state.participantsByCategory
    ];

  const payers =
    state.payersByCategory[
    state.payersCategory.value as keyof typeof state.payersByCategory
    ];

  // Deselect participants with zero amount in Shares mode
  if (state.participantsCategory.value === "Shares") {
    participants.forEach((p) => {
      if (p.actualAmount === "0.00") {
        p.selected = false;
      }
    });
  }

  // Deselect payers with zero amount in Shares mode
  if (state.payersCategory.value === "Shares") {
    payers.forEach((p) => {
      if (p.actualAmount === "0.00") {
        p.selected = false;
      }
    });
  }

  if (!amountIsValid(state.amount, state.setAmountError, state.setShowAmountError)) return;

  if (!state.location && state.description.length === 0) {
    state.setDescriptionError("Select a description or a location");
    return;
  }

  let expenseRequest: ExpenseRequest | PersonalExpenseRequest;
  if (fromPersonal) {
    expenseRequest = {
      amount: Number(state.amount),
      ...(isCreateExpense ? {} : { expenseId: expense?.id }),
      currency: state.currencySymbol,
      description: state.description,
      location: state.location ?? null,
      occurred: state.expenseTime,
      labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
    };
  } else if (isnonGroupExpense?.value) {
    console.log("here1")
    expenseRequest = {
      amount: Number(state.amount),
      ...(isCreateExpense ? {} : { expenseId: expense?.id }),
      currency: state.currencySymbol,
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
      description: state.description,
      location: state.location ?? null,
      occurred: state.expenseTime,
      labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
    };
  } else {
    console.log("here2")
    expenseRequest = {
      amount: Number(state.amount),
      ...(isCreateExpense ? { groupId: groupId || fromHomeGroup?.value?.id } : { expenseId: expense?.id }),
      currency: state.currencySymbol,
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
      description: state.description,
      location: state.location ?? null,
      occurred: state.expenseTime,
      labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
    };
  }

  state.setIsSubmitting(true);
  if (isCreateExpense) {
    createExpenseMutation(expenseRequest);
  } else {
    editExpenseMutation(expenseRequest);
  }
}
