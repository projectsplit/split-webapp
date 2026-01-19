import { amountIsValid } from "../../helpers/amountIsValid";
import { CategoryKey, CategoryMap } from "./formStore/formStoreTypes";
import { significantDigitsFromTicker } from "../../helpers/openExchangeRates";
import currency from "currency.js";
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
  },
  inputs: {
    groupId?: string;
    createExpenseMutation: (req: ExpenseRequest) => void;
    editExpenseMutation: (req: ExpenseRequest) => void;
    isCreateExpense: boolean;
    expense: FormExpense | null;
    isnonGroupExpense?: Signal<boolean>;
  }
) {
  const {
    groupId,
    createExpenseMutation,
    editExpenseMutation,
    isnonGroupExpense,
    isCreateExpense,
    expense,
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

  if (!amountIsValid(state.amount, state.setAmountError)) return;

  if (!state.location && state.description.length === 0) {
    state.setDescriptionError("Select a description or a location");
    return;
  }

  let expenseRequest: ExpenseRequest;
  if (isnonGroupExpense?.value) {
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
    expenseRequest = {
      amount: Number(state.amount),
      ...(isCreateExpense ? { groupId: groupId } : { expenseId: expense?.id }),
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
