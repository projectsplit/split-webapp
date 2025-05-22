import currency from "currency.js";

export type RefreshTokenResponse = {
  accessToken: string;
};

export type PasswordSignInRequest = {
  username: string;
  password: string;
};

export type PasswordSignInResponse = {
  accessToken: string;
};

export type SendGoogleCodeRequest = {
  code: string;
};

export type SendGoogleAccessTokenResponse = {
  accessToken: string;
};

export type UserInfo = {
  userId: string;
  username: string;
  timeZone: string;
  timeZoneCoordinates: Coordinates;
  recentGroupId: string;
  hasNewerNotifications: boolean;
  currency: string;
};

export type ExpenseItem = {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  shareAmount: number;
  location: GeoLocation | undefined;
  labels: string[];
};

export type TransferItem = {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  senderName: string;
  receiverName: string;
};

export type GetGroupExpensesResponse = {
  expenses: ExpenseResponseItem[];
  next: string | null;
};

export type GetGroupTransfersResponse = {
  transfers: TransferResponseItem[];
  next: string | null;
};

export type GroupedTransaction = {
  totalAmount: currency;
  currency: string;
  id: string;
  isOwed: boolean;
  isUser: boolean;
  name: string;
};

export type FormExpense = {
  id: string;
  groupId: string;
  amount: string;
  currency: string;
  description: string;
  payers: Payer[];
  participants: Participant[];
  expenseTime: Date;
  labels: {
    id: string,
    text: string,
    color: string
  }[];
  creationTime: Date;
  lastUpdateTime: Date;
  location: GeoLocation | undefined;
};

export type ExpenseResponseItem = {
  id: string;
  created: string;
  updated: string;
  groupId: string;
  creatorId: string;
  amount: number;
  occurred: string;
  description: string;
  currency: string;
  payments: Payment[];
  shares: Share[];
  labels: {
    id: string,
    text: string,
    color: string
  }[];
  location: GeoLocation | undefined;
};

export type TransferResponseItem = {
  id: string;
  created: string;
  updated: string;
  groupId: string;
  creatorId: string;
  amount: number;
  occurred: string;
  description: string;
  currency: string;
  senderId: string;
  receiverId: string;
};

export type Share = {
  memberId: string;
  amount: number;
};

export type Payment = {
  memberId: string;
  amount: number;
};

export type GetGroupsResponse = {
  groups: GetGroupsResponseItem[];
  next: string | null;
};

export type GetGroupsResponseItem = {
  id: string;
  name: string;
};

export type Group = {
  id: string;
  created: Date;
  updated: Date;
  ownerId: string;
  name: string;
  currency: string;
  members: Member[];
  guests: Guest[];
  labels: Label[];
  isArchived: boolean;
};

export type Member = {
  id: string;
  name: string;
  userId: string;
  joined: Date;
};

export type TruncatedMember = {
  id: string;
  name: string;
};

export type Guest = {
  canBeRemoved: boolean;
  id: string;
  name: string;
  joined: Date;
};
export type GroupMember = Member | Guest;

export type PickerMember = {
  id: string;
  name: string;
  amount: string;
  selected: boolean;
  locked: boolean;
  order: number;
};

export type Label = {
  id: string,
  text: string,
  color: string
};

export type CreateExpenseRequest = {
  amount: number;
  groupId: string;
  currency: string;
  payments: {
    memberId: string;
    amount: number;
  }[];
  shares: {
    memberId: string;
    amount: number;
  }[];
  description: string;
  location: GeoLocation | null;
  occurred: string;
  labels: {
    text: string,
    color: string
  }[];
};

export type CreateEditExpenseRequest = {
  expenseId: string;
  amount: number;
  currency: string;
  payments: {
    memberId: string;
    amount: number;
  }[];
  shares: {
    memberId: string;
    amount: number;
  }[];
  description: string;
  location: GeoLocation | null;
  occurred: string;
  labels: {
    text: string,
    color: string
  }[];
};

export type ExpenseRequest = {
  expenseId?: string;
  groupId?: string;
  amount: number;
  currency: string;
  payments: {
    memberId: string;
    amount: number;
  }[];
  shares: {
    memberId: string;
    amount: number;
  }[];
  description: string;
  location: GeoLocation | null;
  occurred: string;
  labels: {
    text: string,
    color: string
  }[];
}

export type GeoLocation = {
  coordinates: Coordinates;
  google: GooglePlace | null;
};

export type GooglePlace = {
  id: string | null;
  name: string | undefined;
  address: string | undefined;
  url: string | undefined;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export enum Frequency {
  Weekly,
  Monthly,
  Annually,
}

export type BudgetInfoResponse = {
  budgetSubmitted: boolean;
  averageSpentPerDay?: string;
  remainingDays?: string;
  totalAmountSpent?: string;
  goal?: string;
  currency?: string;
  budgetType?: Frequency;
  startDate?: any;
  endDate?: any;
};

export type UserPendingTransaction = {
  userIsSender: boolean;
  userIsReceiver: boolean;
  amount: number;
  currency: string;
};

export type Details = { [currency: string]: number };

export type GroupWithDetails = {
  details: Details;
  id: string;
  name: string;
  currency: string;
  isArchived: boolean;
};
export type GroupsWithDetails = {
  details: Details;
  id: string;
  name: string;
  currency: string;
  isArchived: boolean;
}[];

export type GroupsTotalAmountsResponse = {
  groups: GroupsWithDetails;
  next: string;
};

export type GroupsTotalSummary = {
  numberOfGroups: number;
  userIsOwedAmounts: { [currency: string]: number };
  userOwesAmounts: { [currency: string]: number };
};

export type GroupsAllBalancesResponse = {
  balances: Details;
  groupCount: number;
};

export type GroupRequest = {
  name: string;
  currency: string;
};
export type Currency = {
  symbol: string;
  name: string;
  flagClass: string;
};

export type MostRecentGroupDetailsResponse = {
  id: string;
  name: string;
  details: Details;
  isArchived: boolean
};

export type Participant = {
  memberId: string;
  participationAmount: string;
};

export type Payer = {
  memberId: string;
  paymentAmount: string;
};

export type Transfer = {
  description: string;
  amount: number;
  currency: string;
  receiverId: string;
  senderId: string;
  occurred: string;
};

export type CreateTransfersRequest = {
  groupId: string;
  transfers: Transfer[];
};

export type CreateTransferRequest = {
  groupId: string;
  description: string;
  amount: number;
  currency: string;
  receiverId: string;
  senderId: string;
  occurred: string;
};

export type GetUserInvitationsResponse = {
  invitations: GetUserInvitationsResponseItem[];
  next: string | null;
};

export type Debt = {
  debtor: string;
  creditor: string;
  amount: number;
  currency: string;
};

export type DebtsResponse = {
  debts: Debt[];
  totalSpent: Record<string, Record<string, number>>;
};

export type TotalSpent = Record<string, Record<string, number>>;

export type GetUserInvitationsResponseItem = {
  id: string;
  created: string;
  senderId: string;
  receiverId: string;
  groupId: string;
  groupName: string;
  guestId: string | null;
};

export type DeleteExpenseRequest = {
  expenseId: string;
};
export type DeleteTransferRequest = {
  transferId: string;
};

export type UpdateNotificationRequest = {
  timestamp: string | undefined;
};

export type UpdateMostRecentGroupRequest = {
  groupId: string;
};
export type UpdateSelectedCurrencyRequest = {
  currency: string;
};
export type UpdateSelectedTimeZoneRequest = {
  timeZone: string;
};
export type UpdateGroupNameRequest = {
  name: string
}

export type ArchiveGroupRequest = {
  isArchived: boolean;
}
export type WithCreated = {
  created: string;
};

export type ExpenseFormState = {
  amount: string;
  displayedAmount: string;
  currencySymbol: string;
  description: string;
  labels: Label[];
  expenseTime: string;
  participants: PickerMember[];
  payers: PickerMember[];
  showErrors: boolean;
  errors: {
    showAmount: string;
    amount: string;
    participants: string;
    payers: string;
    description: string;
  };
}

export type ExpenseFormAction =
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_DISPLAYED_AMOUNT"; payload: string }
  | { type: "SET_CURRENCY"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_LABELS"; payload: Label[] }
  | { type: "SET_EXPENSE_TIME"; payload: string }
  | { type: "SET_PARTICIPANTS"; payload: PickerMember[] }
  | { type: "SET_PAYERS"; payload: PickerMember[] }
  | { type: "SET_SHOW_ERRORS"; payload: boolean }
  | { type: "SET_ERROR"; payload: Partial<ExpenseFormState["errors"]> }
  | { type: "RESET_AMOUNT" };