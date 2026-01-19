import { create } from "zustand";
import { ExpenseState, CategoryKey } from "./formStoreTypes";
import {
  FormExpense,
  Guest,
  Member,
  User,
  UserInfo,
} from "../../../types";
import { signal, Signal } from "@preact/signals-react";
import {
  generatePickerArrays,
  validateExpenseState,
  submitExpenseFromState,
} from "../expenseFormUtils";

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

  makePersonalClicked: false,
  showPicker: false,

  participantsCategory: signal<CategoryKey>("Amounts"),
  payersCategory: signal<CategoryKey>("Amounts"),

  // ── Simple setters ──────────────────────────────────────────────
  setAmount: (value) => set({ amount: value }),
  setDescription: (value) => set({ description: value }),
  setCurrencySymbol: (value: string) => {
    set({
      currencySymbol: value,
      amount: "",
    });
  },
  setExpenseTime: (value: string | ((prev: string) => string)) =>
    set((state) => ({
      expenseTime:
        typeof value === "function" ? value(state.expenseTime) : value,
    })),

  setMakePersonalClicked: (value) => set({ makePersonalClicked: value }),
  setShowPicker: (value) => set({ showPicker: value }),
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
  setParticipantsByCategory: (updater) =>
    set((state) => {
      const prevByCategory = state.participantsByCategory;
      const newByCategory =
        typeof updater === "function" ? updater(prevByCategory) : updater;

      // === PART 1: Detect if Shares changed ===
      const prevShares = prevByCategory["Shares"] ?? [];
      const newShares = newByCategory["Shares"] ?? [];
      const sharesChanged = newShares !== prevShares;

      let finalByCategory = newByCategory;

      // === PART 2: If Shares changed, apply reset to newly selected members ===
      if (sharesChanged) {
        const prevSelectedIds = new Set(
          prevShares.filter((m) => m.selected).map((m) => m.id)
        );

        const resetShares = newShares.map((member) => {
          const wasJustSelected =
            member.selected && !prevSelectedIds.has(member.id);

          if (wasJustSelected) {
            return {
              ...member,
              actualAmount: "",
              screenQuantity: "",
              locked: false,
            };
          }
          return member;
        });

        finalByCategory = {
          ...newByCategory,
          Shares: resetShares,
        };
      }

      // === PART 3: Clear error if Shares changed ===
      return {
        participantsByCategory: finalByCategory,
        ...(sharesChanged ? { participantsError: "" } : {}),
      };
    }),

  setPayersByCategory: (updater) =>
    set((state) => {
      const prevByCategory = state.payersByCategory;
      const newByCategory =
        typeof updater === "function" ? updater(prevByCategory) : updater;

      const prevShares = prevByCategory["Shares"] ?? [];
      const newShares = newByCategory["Shares"] ?? [];
      const sharesChanged = newShares !== prevShares;

      let finalByCategory = newByCategory;

      if (sharesChanged) {
        const prevSelectedIds = new Set(
          prevShares.filter((m) => m.selected).map((m) => m.id)
        );

        const resetShares = newShares.map((member) => {
          const wasJustSelected =
            member.selected && !prevSelectedIds.has(member.id);

          if (wasJustSelected) {
            return {
              ...member,
              actualAmount: "",
              screenQuantity: "",
              locked: false,
            };
          }
          return member;
        });

        finalByCategory = {
          ...newByCategory,
          Shares: resetShares,
        };
      }

      return {
        payersByCategory: finalByCategory,
        ...(sharesChanged ? { payersError: "" } : {}),
      };
    }),

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
    const userMembers = groupMembers
      ?.peek()
      .filter((item): item is Member => "userId" in item);

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

    const groupArr = groupMembers?.peek() ?? [];
    const nonGroupArr = nonGroupUsers?.peek() ?? [];
    const isNonGroup = isnonGroupExpense?.peek() ?? false;

    const { participantsByCategory, payersByCategory } = generatePickerArrays(
      groupArr,
      nonGroupArr,
      expense,
      isCreateExpense,
      userInfo,
      userMemberId,
      isNonGroup,
      initialAmount
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

    const userMembers = groupMembers
      ?.peek()
      .filter((item): item is Member => "userId" in item);

    // If we have a userMemberId passed in config, use it (though likely undefined/stale if coming from effect)
    // Otherwise, try to find it in the new groupMembers list
    let derivedUserMemberId = userMemberId;
    if (!derivedUserMemberId && userMembers) {
      derivedUserMemberId = userMembers.find(
        (m) => m.userId === userInfo?.userId
      )?.id;
    }
    // Also re-check against current group members if we have an ID but it might be from a diff group?
    // Actually, simply re-deriving it unconditionally from the current groupMembers is safer when switching groups.
    derivedUserMemberId = userMembers?.find(
      (m) => m.userId === userInfo?.userId
    )?.id;

    // Recalculate participants/payers based on NEW member lists,
    // but keep existing amount/description/etc. in the store.
    const groupArr = groupMembers?.peek() ?? [];
    const nonGroupArr = nonGroupUsers?.peek() ?? [];
    const isNonGroup = isnonGroupExpense?.peek() ?? false;

    const currentAmount = get().amount;
    // NOTE: This re-creates the arrays. If we want to preserve *selected* states
    // logic would need to be more complex (merging). For now, we assume
    // adding/removing members resets the *picker* state to default for those members.
    const { participantsByCategory, payersByCategory } = generatePickerArrays(
      groupArr,
      nonGroupArr,
      expense,
      isCreateExpense,
      userInfo,
      derivedUserMemberId,
      isNonGroup,
      currentAmount
    );

    set({
      participantsByCategory,
      payersByCategory,
      userMemberId: derivedUserMemberId, // Update store with the correct ID
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
  validateForm: (options = { showErrors: true }) => {
    const {
      amount,
      participantsCategory,
      payersCategory,
      currencySymbol,
      participantsByCategory,
      payersByCategory,
    } = get();

    const {
      isValid,
      errors: validationErrors,
      amountErr,
      participantsErr,
      payersErr,
      showAmountErr,
    } = validateExpenseState(
      amount,
      participantsCategory.peek(),
      payersCategory.peek(),
      currencySymbol,
      participantsByCategory,
      payersByCategory
    );

    if (options.showErrors) {
      // Optimized set (exact match with functional check)

      set((s) => ({
        amountError: s.amountError === amountErr ? s.amountError : amountErr,
      }));
      set((s) => ({
        showAmountError:
          s.showAmountError === showAmountErr
            ? s.showAmountError
            : showAmountErr,
      }));
      set((s) => ({
        participantsError:
          s.participantsError === participantsErr
            ? s.participantsError
            : participantsErr,
      }));
      set((s) => ({
        payersError: s.payersError === payersErr ? s.payersError : payersErr,
      }));
    }

    return {
      isValid,
      errors: validationErrors,
    };
  },
  submitExpense: (inputs) => {
    const state = get();
    submitExpenseFromState(
      {
        amount: state.amount,
        description: state.description,
        currencySymbol: state.currencySymbol,
        expenseTime: state.expenseTime,
        labels: state.labels,
        location: state.location,
        participantsByCategory: state.participantsByCategory,
        payersByCategory: state.payersByCategory,
        participantsCategory: state.participantsCategory,
        payersCategory: state.payersCategory,
        setAmountError: state.setAmountError,
        setDescriptionError: state.setDescriptionError,
        setIsSubmitting: state.setIsSubmitting,
      },
      inputs
    );
  },
}));
