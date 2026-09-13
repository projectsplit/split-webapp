import { createStore } from 'zustand';
import { CategoryMap, ExpenseState, SplitMethod } from './formStoreTypes';
import {
  EditRecurringExpenseRequest,
  ExpenseRequest,
  PickerMember,
  FormExpense,
  Group,
  Guest,
  Member,
  RecurrenceSchedule,
  RecurringExpenseRequest,
  User,
  UserInfo,
} from '../../../types';

import { signal, Signal } from '@preact/signals-react';
import {
  generatePickerArrays,
  validateExpenseState,
  submitExpenseFromState,
} from '../expenseFormUtils';
import { recalculateAmounts } from '@/components/MemberPicker/helpers/recalculateAmounts';
import { significantDigitsFromTicker } from '@/helpers/openExchangeRates';
import { DateTime as LuxonDateTime } from 'luxon';
import { toLuxon, toUtcString } from '@/helpers/dateTimeAndRounding';

type ByCategory = CategoryMap<PickerMember[]>;

const resetSharesOnSelection = (
  prevByCategory: ByCategory,
  updater: ByCategory | ((prev: ByCategory) => ByCategory)
) => {
  const newByCategory =
    typeof updater === 'function' ? updater(prevByCategory) : updater;

  const prevShares = prevByCategory['Shares'] ?? [];
  const newShares = newByCategory['Shares'] ?? [];
  const sharesChanged = newShares !== prevShares;

  if (!sharesChanged) {
    return { finalByCategory: newByCategory, sharesChanged };
  }

  const prevSelectedIds = new Set(
    prevShares.filter((m) => m.selected).map((m) => m.id)
  );

  const resetShares = newShares.map((member) => {
    const wasJustSelected = member.selected && !prevSelectedIds.has(member.id);

    if (wasJustSelected) {
      return {
        ...member,
        actualAmount: '',
        screenQuantity: '',
        locked: false,
      };
    }
    return member;
  });

  return {
    finalByCategory: { ...newByCategory, Shares: resetShares },
    sharesChanged,
  };
};

export const createExpenseStore = () =>
  createStore<ExpenseState>()((set, get) => ({
  amount: '',
  description: '',
  currencySymbol: 'USD',
  expenseTime: new Date().toISOString(),
  isTrackingNow: true,
  labels: [],
  location: undefined,
  userMemberId: '',

  amountError: '',
  showAmountError: false,
  participantsError: '',
  payersError: '',
  descriptionError: '',

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
  recurrenceSchedule: null,
  showRecurrencePicker: false,

  participantsCategory: signal<SplitMethod>('Amounts'),
  payersCategory: signal<SplitMethod>('Amounts'),

  setAmount: (value: string) => set({ amount: value }),
  setDescription: (value: string) => set({ description: value }),
  setCurrencySymbol: (value: string) => {
    set({
      currencySymbol: value,
      amount: '',
    });
  },
  setExpenseTime: (value: string | ((prev: string) => string)) =>
    set((state) => ({
      expenseTime:
        typeof value === 'function' ? value(state.expenseTime) : value,
    })),

  setIsTrackingNow: (value: boolean) => set({ isTrackingNow: value }),

  setMakePersonalClicked: (value: boolean) =>
    set({ makePersonalClicked: value }),
  setShowPicker: (value: boolean) => set({ showPicker: value }),
  setRecurrenceSchedule: (schedule) => set({ recurrenceSchedule: schedule }),
  setShowRecurrencePicker: (value: boolean) =>
    set({ showRecurrencePicker: value }),
  setLabels: (labels) => set({ labels }),
  setLocation: (location) => set({ location }),

  setIsSubmitting: (value: boolean) => set({ isSubmitting: value }),

  setAmountError: (msg: string) => set({ amountError: msg }),
  setShowAmountError: (show: boolean) => set({ showAmountError: show }),
  setParticipantsError: (msgOrUpdater: string | ((prev: string) => string)) =>
    set((state) => ({
      participantsError:
        typeof msgOrUpdater === 'function'
          ? msgOrUpdater(state.participantsError)
          : msgOrUpdater,
    })),
  setPayersError: (msgOrUpdater: string | ((prev: string) => string)) =>
    set((state) => ({
      payersError:
        typeof msgOrUpdater === 'function'
          ? msgOrUpdater(state.payersError)
          : msgOrUpdater,
    })),
  setDescriptionError: (msg: string) => set({ descriptionError: msg }),

  setParticipantsByCategory: (updater) =>
    set((state) => {
      const { finalByCategory, sharesChanged } = resetSharesOnSelection(
        state.participantsByCategory,
        updater
      );

      return {
        participantsByCategory: finalByCategory,
        ...(sharesChanged ? { participantsError: '' } : {}),
      };
    }),

  setPayersByCategory: (updater) =>
    set((state) => {
      const { finalByCategory, sharesChanged } = resetSharesOnSelection(
        state.payersByCategory,
        updater
      );

      return {
        payersByCategory: finalByCategory,
        ...(sharesChanged ? { payersError: '' } : {}),
      };
    }),

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
    recurrenceSchedule?: RecurrenceSchedule | null;
  }) => {
    const {
      isCreateExpense,
      expense,
      currency,
      groupMembers,
      nonGroupUsers,
      isnonGroupExpense,
      userInfo,
      recurrenceSchedule,
    } = config;
    const userMembers = groupMembers
      ?.peek()
      .filter((item): item is Member => 'userId' in item);

    const userMemberId = userMembers?.find(
      (m) => m.userId === userInfo?.userId
    )?.id;

    const initialCurrency =
      isCreateExpense || !expense ? currency : expense.currency;

    const initialAmount = isCreateExpense || !expense ? '' : expense.amount;

    const initialDescription =
      isCreateExpense || !expense ? '' : expense.description;

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

    const amountNum = Number(initialAmount);
    const decimalDigits = significantDigitsFromTicker(initialCurrency);

    const finalParticipants = { ...participantsByCategory };
    const finalPayers = { ...payersByCategory };

    for (const cat of ['Amounts', 'Shares', 'Percentages'] as const) {
      finalParticipants[cat] = recalculateAmounts(
        participantsByCategory[cat],
        amountNum,
        decimalDigits,
        { value: cat } as Signal<string>,
        initialCurrency,
        isCreateExpense
      );
      finalPayers[cat] = recalculateAmounts(
        payersByCategory[cat],
        amountNum,
        decimalDigits,
        { value: cat } as Signal<string>,
        initialCurrency,
        isCreateExpense
      );
    }

    set({
      amount: initialAmount,
      description: initialDescription,
      currencySymbol: initialCurrency,
      expenseTime: initialExpenseTime,
      isTrackingNow: isCreateExpense,
      labels: initialLabels,
      location: initialLocation,
      participantsByCategory: finalParticipants,
      payersByCategory: finalPayers,

      amountError: '',
      showAmountError: false,
      participantsError: '',
      payersError: '',
      descriptionError: '',
      isSubmitting: false,
      userMemberId: userMemberId,
      recurrenceSchedule: recurrenceSchedule ?? null,
      showRecurrencePicker: false,
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
      .filter((item): item is Member => 'userId' in item);

    let derivedUserMemberId = userMemberId;
    if (!derivedUserMemberId && userMembers) {
      derivedUserMemberId = userMembers.find(
        (m) => m.userId === userInfo?.userId
      )?.id;
    }
    derivedUserMemberId = userMembers?.find(
      (m) => m.userId === userInfo?.userId
    )?.id;

    const groupArr = groupMembers?.peek() ?? [];
    const nonGroupArr = nonGroupUsers?.peek() ?? [];
    const isNonGroup = isnonGroupExpense?.peek() ?? false;

    const currentAmount = get().amount;
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

    const amountNum = Number(currentAmount);
    const decimalDigits = significantDigitsFromTicker(get().currencySymbol);

    const finalParticipants = { ...participantsByCategory };
    const finalPayers = { ...payersByCategory };

    for (const cat of ['Amounts', 'Shares', 'Percentages'] as const) {
      finalParticipants[cat] = recalculateAmounts(
        participantsByCategory[cat],
        amountNum,
        decimalDigits,
        { value: cat } as Signal<string>,
        get().currencySymbol,
        isCreateExpense
      );
      finalPayers[cat] = recalculateAmounts(
        payersByCategory[cat],
        amountNum,
        decimalDigits,
        { value: cat } as Signal<string>,
        get().currencySymbol,
        isCreateExpense
      );
    }

    set({
      participantsByCategory: finalParticipants,
      payersByCategory: finalPayers,
      userMemberId: derivedUserMemberId,
    });
  },
  resetForm: () => {
    set({
      amount: '',
      description: '',
      labels: [],
      location: undefined,
      amountError: '',
      participantsError: '',
      payersError: '',
      descriptionError: '',
      showAmountError: false,
      recurrenceSchedule: null,
      showRecurrencePicker: false,
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
  submitExpense: (inputs: {
    groupId?: string;
    timeZoneId: string;
    isDatePicked: boolean;
    createExpenseMutation: (req: ExpenseRequest) => void;
    editExpenseMutation: (req: ExpenseRequest) => void;
    createRecurringExpenseMutation: (req: RecurringExpenseRequest) => void;
    editRecurringExpenseMutation: (req: EditRecurringExpenseRequest) => void;
    recurringExpenseId?: string;
    isCreateExpense: boolean;
    expense: FormExpense | null;
    isnonGroupExpense?: Signal<boolean>;
    isPersonal?: Signal<boolean>;
    fromPersonal?: Signal<boolean>;
    fromHomeGroup?: Signal<Group | null>;
    userId: string;
    onUserNotInExpense: () => void;
    onRecurrenceRequired: () => void;
  }) => {
    const state = get();

    const now = LuxonDateTime.utc().setZone(inputs.timeZoneId);
    const expenseTimeForSubmit = !state.isTrackingNow
      ? state.expenseTime
      : inputs.isDatePicked
        ? toUtcString(
            toLuxon(state.expenseTime, inputs.timeZoneId).set({
              hour: now.hour,
              minute: now.minute,
              second: now.second,
            })
          )
        : toUtcString(now);

    submitExpenseFromState(
      {
        amount: state.amount,
        description: state.description,
        currencySymbol: state.currencySymbol,
        expenseTime: expenseTimeForSubmit,
        labels: state.labels,
        location: state.location,
        participantsByCategory: state.participantsByCategory,
        payersByCategory: state.payersByCategory,
        participantsCategory: state.participantsCategory,
        payersCategory: state.payersCategory,
        recurrenceSchedule: state.recurrenceSchedule,
        setAmountError: state.setAmountError,
        setDescriptionError: state.setDescriptionError,
        setIsSubmitting: state.setIsSubmitting,
        setShowAmountError: state.setShowAmountError,
      },
      {
        ...inputs,
        fromPersonal:
          inputs.fromPersonal?.peek() || inputs.isPersonal?.peek() || undefined,
      }
    );
  },
}));
