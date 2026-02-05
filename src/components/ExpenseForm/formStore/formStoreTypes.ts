import { Signal } from "@preact/signals-react";
import {
  ExpenseRequest,
  FormExpense,
  GeoLocation,
  Guest,
  Label,
  Member,
  PickerMember,
  User,
  UserInfo,
} from "../../../types";

export type SplitMethod = "Amounts" | "Shares" | "Percentages";

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
  // ── Actions

  setAmount: (value: string) => void;
  setDescription: (value: string) => void;
  setCurrencySymbol: (value: string) => void;
  setExpenseTime: (value: string | ((prev: string) => string)) => void;
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
    createExpenseMutation: (req: ExpenseRequest) => void;
    editExpenseMutation: (req: ExpenseRequest) => void;
    isCreateExpense: boolean;
    expense: FormExpense | null;
    isnonGroupExpense?: Signal<boolean>;
  }) => void;
}