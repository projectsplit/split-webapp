import { create } from "zustand";
import { ExpenseState } from "./formStoreTypes";
import {
    FormExpense,
  Guest,
  Member,
  User,
  UserInfo,
} from "../../../types";
import { Signal } from "@preact/signals-react";

export const useExpenseStore = create<ExpenseState>()((set, get) => ({
  // Default / initial values
  amount: "",
  description: "",
  currencySymbol: "USD", // or your app default
  expenseTime: new Date().toISOString(),
  labels: [],
  location: undefined,

  amountError: "",
  showAmountError: false,
  participantsError: "",
  payersError: "",
  descriptionError: "",

  isSubmitting: false,

  participantsByCategory: {
    Amounts: [],
    Shares: [],
    Percentages: [],
  } as const,

  payersByCategory: {
    Amounts: [],
    Shares: [],
    Percentages: [],
  } as const,

  participantsCategory: "Amounts",
  payersCategory: "Amounts",

  // ── Simple setters ──────────────────────────────────────────────
  setAmount: (value) => set({ amount: value }),
  setDescription: (value) => set({ description: value }),
  setCurrencySymbol: (value) => set({ currencySymbol: value }),
  setExpenseTime: (value: string | ((prev: string) => string)) =>
    set((state) => ({
      expenseTime:
        typeof value === "function" ? value(state.expenseTime) : value,
    })),

  setLabels: (labels) => set({ labels }),
  setLocation: (location) => set({ location }),

  setIsSubmitting: (value) => set({ isSubmitting: value }),

  setParticipantsCategory: (category) =>
    set({ participantsCategory: category }),
  setPayersCategory: (category) => set({ payersCategory: category }),

  setAmountError: (msg: string) => set({ amountError: msg }),
  setShowAmountError: (show: boolean) => set({ showAmountError: show }),
  setParticipantsError: (msgOrUpdater: string | ((prev: string) => string)) =>
    set((state) => ({
      participantsError:
        typeof msgOrUpdater === "function"
          ? msgOrUpdater(state.participantsError)
          : msgOrUpdater,
    })),
  setPayersError: (msgOrUpdater: string | ((prev: string) => string)) =>
    set((state) => ({
      payersError:
        typeof msgOrUpdater === "function"
          ? msgOrUpdater(state.payersError)
          : msgOrUpdater,
    })),
  setDescriptionError: (msg: string) => set({ descriptionError: msg }),

  // ── Safe complex updates ────────────────────────────────────────
  setParticipantsByCategory: (updater) =>
    set((state) => ({
      participantsByCategory: updater(state.participantsByCategory),
    })),

  setPayersByCategory: (updater) =>
    set((state) => ({
      payersByCategory: updater(state.payersByCategory),
    })),

  // Granular update (recommended for performance)
  updateParticipantsInCategory: (category, updater) =>
    set((state) => ({
      participantsByCategory: {
        ...state.participantsByCategory,
        [category]: updater(state.participantsByCategory[category]),
      },
    })),

  updatePayersInCategory: (category, updater) =>
    set((state) => ({
      payersByCategory: {
        ...state.payersByCategory,
        [category]: updater(state.payersByCategory[category]),
      },
    })),

  initialize: (config: {
    isCreateExpense: boolean;
    expense?:FormExpense | null;
    currency: string;
    groupMembers: Signal<(Member | Guest)[]>;
    nonGroupUsers: Signal<User[]>;
    userInfo: UserInfo;
    userMemberId?: string;
    isnonGroupExpense?: Signal<boolean>;
  }) => {
    const { isCreateExpense, expense, currency } = config;

    const initialCurrency =
      isCreateExpense || !expense ? currency : expense.currency;

    const initialAmount = isCreateExpense || !expense ? "" : expense.amount;

    const initialDescription =
      isCreateExpense || !expense ? "" : expense.description;

    const initialLabels = isCreateExpense || !expense ? [] : expense.labels;

    const initialExpenseTime =
      isCreateExpense || !expense
        ? new Date().toISOString()
        : expense.expenseTime.toISOString();

    const initialLocation = expense?.location ?? undefined;

    set({
      amount: initialAmount,
      description: initialDescription,
      currencySymbol: initialCurrency,
      expenseTime: initialExpenseTime,
      labels: initialLabels,
      location: initialLocation,

      amountError: "",
      showAmountError: false,
      participantsError: "",
      payersError: "",
      descriptionError: "",
      isSubmitting: false,
    });
  },
  resetForm: () => {
    set({
      amount: "",
      description: "",
      labels: [],
      location: undefined,
      amountError: "",
      participantsError: "",
      payersError: "",
      descriptionError: "",
      showAmountError: false,
      // Note: we usually DON'T reset categories here
      // unless it's a full form reset
    });
  },
}));
