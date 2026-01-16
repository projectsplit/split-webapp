import { create } from "zustand";
import { CategoryMap, ExpenseState } from "./formStoreTypes";
import {
  FormExpense,
  Guest,
  Member,
  PickerMember,
  User,
  UserInfo,
} from "../../../types";
import { Signal } from "@preact/signals-react";
import { generatePickerArrays } from "../expenseFormUtils";

export const useExpenseStore = create<ExpenseState>()((set, get) => ({
  // Default / initial values
  amount: "",
  description: "",
  currencySymbol: "USD", // or your app default
  expenseTime: new Date().toISOString(),
  labels: [],
  location: undefined,
  userMemberId: "",

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
  setParticipantsByCategory: (
    updater:
      | CategoryMap<PickerMember[]>
      | ((prev: CategoryMap<PickerMember[]>) => CategoryMap<PickerMember[]>)
  ) =>
    set((state) => ({
      participantsByCategory:
        typeof updater === "function"
          ? updater(state.participantsByCategory)
          : updater,
    })),

  setPayersByCategory: (
    updater:
      | CategoryMap<PickerMember[]>
      | ((prev: CategoryMap<PickerMember[]>) => CategoryMap<PickerMember[]>)
  ) =>
    set((state) => ({
      payersByCategory:
        typeof updater === "function"
          ? updater(state.payersByCategory)
          : updater,
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
    expense: FormExpense | null;
    currency: string;
    groupMembers: Signal<(Member | Guest)[]>;
    nonGroupUsers: Signal<User[]>;
    userInfo: UserInfo;
    userMemberId?: string;
    isnonGroupExpense?: Signal<boolean>;
  }) => {
    const {
      isCreateExpense,
      expense,
      currency,
      groupMembers,
      nonGroupUsers,
      isnonGroupExpense,
      userInfo,
    } = config;
    const userMembers = groupMembers?.value.filter(
      (item): item is Member => "userId" in item
    );

    const userMemberId = userMembers?.find(
      (m) => m.userId === userInfo?.userId
    )?.id;

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

    const groupArr = groupMembers?.value ?? [];
    const nonGroupArr = nonGroupUsers?.value ?? [];
    const isNonGroup = isnonGroupExpense?.value ?? false;

    const { participantsByCategory, payersByCategory } = generatePickerArrays(
      groupArr,
      nonGroupArr,
      expense,
      isCreateExpense,
      userInfo,
      userMemberId,
      isNonGroup
    );

    set({
      amount: initialAmount,
      description: initialDescription,
      currencySymbol: initialCurrency,
      expenseTime: initialExpenseTime,
      labels: initialLabels,
      location: initialLocation,
      participantsByCategory,
      payersByCategory,

      amountError: "",
      showAmountError: false,
      participantsError: "",
      payersError: "",
      descriptionError: "",
      isSubmitting: false,
      userMemberId: userMemberId,
    });
  },
  updateMembers: (config) => {
    const {
      groupMembers,
      nonGroupUsers,
      expense,
      isCreateExpense,
      isnonGroupExpense,
      userInfo,
      userMemberId,
    } = config;

    // Recalculate participants/payers based on NEW member lists,
    // but keep existing amount/description/etc. in the store.
    const groupArr = groupMembers?.value ?? [];
    const nonGroupArr = nonGroupUsers?.value ?? [];
    const isNonGroup = isnonGroupExpense?.value ?? false;

    // NOTE: This re-creates the arrays. If we want to preserve *selected* states
    // logic would need to be more complex (merging). For now, we assume
    // adding/removing members resets the *picker* state to default for those members.
    const { participantsByCategory, payersByCategory } = generatePickerArrays(
      groupArr,
      nonGroupArr,
      expense,
      isCreateExpense,
      userInfo,
      userMemberId,
      isNonGroup
    );

    set({
      participantsByCategory,
      payersByCategory,
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
