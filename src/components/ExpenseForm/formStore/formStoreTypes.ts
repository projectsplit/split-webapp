import { Signal } from "@preact/signals-react";
import {
  FormExpense,
  GeoLocation,
  Guest,
  Label,
  Member,
  PickerMember,
  User,
  UserInfo,
} from "../../../types";

type CategoryKey = "Amounts" | "Shares" | "Percentages";

type CategoryMap<T> = {
  readonly Amounts: T;
  readonly Shares: T;
  readonly Percentages: T;
};

export interface ExpenseState {
  amount: string;
  description: string;
  currencySymbol: string;
  expenseTime: string;

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

  participantsCategory: CategoryKey;
  payersCategory: CategoryKey;

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

  setParticipantsCategory: (category: CategoryKey) => void;
  setPayersCategory: (category: CategoryKey) => void;

  setParticipantsByCategory: (
    updater: (prev: CategoryMap<PickerMember[]>) => CategoryMap<PickerMember[]>
  ) => void;

  setPayersByCategory: (
    updater: (prev: CategoryMap<PickerMember[]>) => CategoryMap<PickerMember[]>
  ) => void;

  updateParticipantsInCategory: (
    category: CategoryKey,
    updater: (prev: PickerMember[]) => PickerMember[]
  ) => void;

  updatePayersInCategory: (
    category: CategoryKey,
    updater: (prev: PickerMember[]) => PickerMember[]
  ) => void;

  initialize: (config: {
    isCreateExpense: boolean;
    expense?: FormExpense | null;
    currency: string;
    groupMembers: Signal<(Member | Guest)[]>;
    nonGroupUsers: Signal<User[]>;
    userInfo: UserInfo;
    userMemberId?: string;
    isnonGroupExpense?: Signal<boolean>;
  }) => void;

  resetForm: () => void;
}
