import { Signal } from '@preact/signals-react';
import {
  EditRecurringExpenseRequest,
  ExpenseRequest,
  FormExpense,
  GeoLocation,
  Group,
  Guest,
  Label,
  Member,
  PickerMember,
  RecurrenceSchedule,
  RecurringExpenseRequest,
  User,
  UserInfo,
} from '../../../types';

export type SplitMethod = 'Amounts' | 'Shares' | 'Percentages';

export type CategoryMap<T> = {
  readonly Amounts: T;
  readonly Shares: T;
  readonly Percentages: T;
};

export interface ExpenseState {
  amount: string;
  description: string;
  currencySymbol: string;
  expenseTime: string;
  userMemberId: string;
  labels: Label[];
  location: GeoLocation | undefined;

  amountError: string;
  showAmountError: boolean;
  participantsError: string;
  payersError: string;
  descriptionError: string;

  isSubmitting: boolean;

  participantsByCategory: CategoryMap<PickerMember[]>;
  payersByCategory: CategoryMap<PickerMember[]>;

  participantsCategory: Signal<SplitMethod>;
  payersCategory: Signal<SplitMethod>;
  makePersonalClicked: boolean;
  showPicker: boolean;
  recurrenceSchedule: RecurrenceSchedule | null;
  showRecurrencePicker: boolean;

  setAmount: (value: string) => void;
  setDescription: (value: string) => void;
  setCurrencySymbol: (value: string) => void;
  setExpenseTime: (value: string | ((prev: string) => string)) => void;
  isTrackingNow: boolean;
  setIsTrackingNow: (value: boolean) => void;
  setLabels: (labels: Label[]) => void;
  setLocation: (location: GeoLocation | undefined) => void;

  setAmountError: (msg: string) => void;
  setShowAmountError: (show: boolean) => void;
  setParticipantsError: (
    msgOrUpdater: string | ((prev: string) => string)
  ) => void;
  setPayersError: (msgOrUpdater: string | ((prev: string) => string)) => void;
  setDescriptionError: (msg: string) => void;

  setIsSubmitting: (value: boolean) => void;
  setMakePersonalClicked: (value: boolean) => void;
  setShowPicker: (value: boolean) => void;
  setRecurrenceSchedule: (schedule: RecurrenceSchedule | null) => void;
  setShowRecurrencePicker: (value: boolean) => void;

  setParticipantsByCategory: (
    updater:
      | CategoryMap<PickerMember[]>
      | ((prev: CategoryMap<PickerMember[]>) => CategoryMap<PickerMember[]>)
  ) => void;

  setPayersByCategory: (
    updater:
      | CategoryMap<PickerMember[]>
      | ((prev: CategoryMap<PickerMember[]>) => CategoryMap<PickerMember[]>)
  ) => void;

  updateParticipantsInCategory: (
    category: SplitMethod,
    updater: (prev: PickerMember[]) => PickerMember[]
  ) => void;

  updatePayersInCategory: (
    category: SplitMethod,
    updater: (prev: PickerMember[]) => PickerMember[]
  ) => void;

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
  }) => void;

  updateMembers: (config: {
    groupMembers: Signal<(Member | Guest)[]>;
    nonGroupUsers: Signal<User[]>;
    expense: FormExpense | null;
    isCreateExpense: boolean;
    isnonGroupExpense?: Signal<boolean>;
    userInfo: UserInfo;
    userMemberId?: string;
  }) => void;

  validateForm: (options?: { showErrors: boolean } | undefined) => {
    isValid: boolean;
    errors:
      | { amount: string; participants: string; payers: string }
      | { amount?: undefined; participants?: undefined; payers?: undefined };
  };

  resetForm: () => void;
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
  }) => void;
}
