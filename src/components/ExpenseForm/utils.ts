import { Signal } from "@preact/signals-react";
import {
  ExpenseFormAction,
  ExpenseFormState,
  ExpenseRequest,
  ExpenseResponseItem,
  FormExpense,
  GeoLocation,
  Group,
  PickerMember,
} from "../../types";
import { useExpense } from "../../api/services/useExpense";
import { useEditExpense } from "../../api/services/useEditExpense";
import { amountIsValid } from "../../helpers/amountIsValid";

type SubmitExpenseParams = {
  state: ExpenseFormState;
  dispatch: React.Dispatch<ExpenseFormAction>;
  isCreateExpense: boolean;
  groupId: string;
  expenseId?: string;
  location: Signal<GeoLocation | undefined>;
};

export function expenseFormReducer(
  state: ExpenseFormState,
  action: ExpenseFormAction
): ExpenseFormState {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_DISPLAYED_AMOUNT":
      return { ...state, displayedAmount: action.payload };
    case "SET_CURRENCY":
      return {
        ...state,
        currencySymbol: action.payload,
        amount: "",
        displayedAmount: "",
        errors: { ...state.errors, amount: "" },
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
        errors: { ...state.errors, description: "" },
      };
    case "SET_LABELS":
      return { ...state, labels: action.payload };
    case "SET_EXPENSE_TIME":
      return { ...state, expenseTime: action.payload };
    case "SET_PARTICIPANTS":
      return { ...state, participants: action.payload };
    case "SET_PAYERS":
      return { ...state, payers: action.payload };
    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, ...action.payload } };
    case "SET_SHOW_ERRORS":
      return { ...state, showErrors: action.payload };
    case "RESET_AMOUNT":
      return {
        ...state,
        amount: "",
        errors: { ...state.errors, amount: "" },
      };
    default:
      return state;
  }
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

export function useExpenseSubmission({
  menu,
  groupId,
  selectedExpense,
  isCreateExpense,
}: {
  menu: Signal<string | null>;
  groupId: string;
  selectedExpense: Signal<ExpenseResponseItem | null>;
  isCreateExpense: boolean;
}) {
  const { mutate: createExpenseMutation, isPending: isPendingCreate } =
    useExpense(menu, groupId);
  const { mutate: editExpenseMutation, isPending: isPendingEdit } =
    useEditExpense(menu, selectedExpense, groupId);

  const submitExpense = ({
    state,
    dispatch,
    isCreateExpense,
    groupId,
    expenseId,
    location,
  }: SubmitExpenseParams) => {
    dispatch({ type: "SET_SHOW_ERRORS", payload: true });

    const amountError = amountIsValid(state.amount)
      ? ""
      : "Enter a valid amount greater than zero";
    if (amountError) {
      dispatch({ type: "SET_ERROR", payload: { amount: amountError } });
      return;
    }

    if (
      state.participants.length ===
      state.participants.filter((p) => p.selected === false).length
    ) {
      dispatch({
        type: "SET_ERROR",
        payload: { participants: "Select at least one participant" },
      });
      return;
    }

    if (
      state.payers.length ===
      state.payers.filter((p) => p.selected === false).length
    ) {
      dispatch({
        type: "SET_ERROR",
        payload: { payers: "Select at least one payer" },
      });
      return;
    }

    if (!location && state.description.length === 0) {
      dispatch({
        type: "SET_ERROR",
        payload: { description: "Select a description or a location" },
      });
      return;
    }

    const expenseRequest: ExpenseRequest = {
      amount: Number(state.amount),
      ...(isCreateExpense ? { groupId } : { expenseId }),
      currency: state.currencySymbol,
      payments: state.payers
        .filter((value) => value.selected)
        .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
      shares: state.participants
        .filter((value) => value.selected)
        .map((value) => ({ memberId: value.id, amount: Number(value.amount) })),
      description: state.description,
      location: location.value ?? null,
      occurred: state.expenseTime,
      labels: state.labels.map((x) => ({ text: x.text, color: x.color })),
    };

    if (isCreateExpense) {
      createExpenseMutation(expenseRequest);
    } else {
      editExpenseMutation(expenseRequest);
    }
  };

  return {
    submitExpense,
    isPending: isCreateExpense ? isPendingCreate : isPendingEdit,
  };
}
