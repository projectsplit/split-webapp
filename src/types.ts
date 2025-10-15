import currency from "currency.js";
import { BeautifulMentionsItemData } from "lexical-beautiful-mentions";
import { DateTime } from "luxon";

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

export type PasswordSignUpRequest = {
  username: string;
  password: string;
};

export type PasswordSignUpResponse = {
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
    id: string;
    text: string;
    color: string;
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
    id: string;
    text: string;
    color: string;
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
  screenQuantity: string;
  actualAmount: string;
  selected: boolean;
  locked: boolean;
  order: number;
};

export type Label = {
  id: string;
  text: string;
  color: string;
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
    text: string;
    color: string;
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
    text: string;
    color: string;
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
    text: string;
    color: string;
  }[];
};

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
  isArchived: boolean;
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
  totalSent: Record<string, Record<string, number>>;
  totalReceived: Record<string, Record<string, number>>;
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
  guestName:string| null
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
  name: string;
};

export type ArchiveGroupRequest = {
  isArchived: boolean;
};
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
};

export type FetchedMember = {
  memberId: string;
  value: string;
  isUser: boolean;
};

export type FetchedMembers = FetchedMember[];

export type EnhancedMembersWithProps = {
  value: string;
  memberId: string;
  isUser: boolean;
  prop: string;
}[];

export type Members = {
  payers: FetchedMembers;
  participants: FetchedMembers;
  senders: FetchedMembers;
  receivers: FetchedMembers;
};

export type FilteredMembers = Members;

export type FetchedLabel = {
  id: string;
  value: string;
  color: string;
  prop: string;
};

export type FilteredResultItem = {
  [key: string]: BeautifulMentionsItemData; // Dynamic properties
  value: string; // `value` is explicitly required
  prop: string; // `prop` should also be explicitly defined
  color: string;
};

export type GroupedItem = {
  [key: string]: FilteredResultItem[]; // Groups items under keys by `prop`
};

export type CreateExpenseFilterRequest = {//Do not change
  groupId: string;
  participantsIds: string[];
  payersIds: string[];
  freeText: string;
  before: string[];
  during: string[];
  after: string[];
  labels: string[];
};

export type ExpenseFilter = {
  groupId: string;
  participantsIds: string[];
  payersIds: string[];
  freeText: string;
  before: string;
  during: string;
  after: string;
  labels: string[];
};

export type CreateTransferFilterRequest = { //Do not change
  groupId: string;
  receiversIds: string[];
  sendersIds: string[];
  freeText: string;
  before: string[];
  during: string[];
  after: string[];
};

export type TransferFilter = {
  groupId: string;
  receiversIds: string[];
  sendersIds: string[];
  freeText: string;
  before: string;
  during: string;
  after: string;
};

export type SerializedLexicalNode = {
  type: string;
  [key: string]: any;
};

export type SerializedBeautifulMentionNode = SerializedLexicalNode & {
  type: "beautifulMention";
  trigger: string;
  value: string;
  data: {
    category: string;
    [key: string]: any; // Allow additional properties in data if needed
  };
  version: number;
};

export type SerializedElementNode = SerializedLexicalNode & {
  children: SerializedLexicalNode[];
};

// export type FilterResponse = {
//   payers: FetchedMembers;
//   participants: FetchedMembers;
//   senders: FetchedMembers;
//   receivers: FetchedMembers;
//   before: DateTime[];
//   during: DateTime[];
//   after: DateTime[];
//   description: string;
//   labels: FetchedLabel[];
// };

export type ExpenseFilterResponse = {
  payers: FetchedMembers;
  participants: FetchedMembers;
  before: string[];
  during: string[];
  after: string[];
  freeText: string;
  labels: FetchedLabel[];
};

export type TransferFilterResponse = {
  senders: FetchedMembers;
  receivers: FetchedMembers;
  before: string[];
  during: string[];
  after: string[];
  freeText: string;
};

export type ExpenseParsedFilters= {
  participantsIds?: string[];
  payersIds?: string[];
  freeText?: string;
  before?: string | null;
  after?: string | null;
  labels?: string[];
}

export type TransferParsedFilters= {
  sendersIds?: string[];
  receiversIds?: string[];
  freeText?: string;
  before?: string | null;
  after?: string | null;

}

export type DateConstraint = {
  trigger: "before:" | "after:" | "during:";
  value: string; 
};


export type GetTotalLentTotalBorrowedResponse = {
  totalBorrowed: number[];
  totalLent: number[];
};

export type CreateBudgetRequest = {
  amount: string;
  currency: string;
  budgetType: Frequency;
  day: string | null;
};

export type SpendingInfoResponse = {
  budgetSubmitted: boolean;
  totalAmountSpent: string;
  currency: string;
};

export type JoinCode = {
  created: string;
  creatorId: string;
  expires: string;
  groupId: string;
  id: string;
  maxUses: number;
  timesUsed: number;
  updated: string;
};

export type GetJoinCodesResponse = {
  codes: JoinCode[];
  next: string | null;
};

export type SpendingChartsResponse = {
  items: SpendingChartsResponseItem[];
};

export type SpendingChartsResponseItem = {
  shareAmount: number;
  accumulativeShareAmount: number;
  paymentAmount: number;
  accumulativePaymentAmount: number;
  from: Date;
  to: Date;
};

export type SearchUserToInviteResponse = {
  users: SearchUserToInviteResponseItem[];
  next: string | null;
};

export type SearchUserToInviteResponseItem = {
  userId: string;
  username: string;
  isGroupMember: boolean;
  isAlreadyInvited: boolean;
};