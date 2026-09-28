import currency from 'currency.js';
import { BeautifulMentionsItemData } from 'lexical-beautiful-mentions';

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
  email: string;
};

export type PasswordSignUpResponse = {
  accessToken: string;
};

export type RequestPasswordResetRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type RequestUsernameRecoveryRequest = {
  email: string;
};

export type SetAccountEmailRequest = {
  email: string;
};

export type VerifyAccountEmailRequest = {
  code: string;
};

/**
 * Mirrors the server's PushDeviceKind enum. The API has no string-enum converter, so these cross the
 * wire as the numbers the server's enum actually is — naming them here keeps that off the call sites.
 */
export const PushDeviceKind = {
  WebPush: 0,
  Fcm: 1,
} as const;

export type SendGoogleCodeRequest = {
  code: string;
};

/**
 * The native app's equivalent of SendGoogleCodeRequest. Google's Android sheet returns a signed
 * identity token outright, so there is no code to redeem and no redirect to come back from.
 */
export type SendGoogleIdTokenRequest = {
  idToken: string;
};

export type SendGoogleAccessTokenResponse = {
  accessToken: string;
};

export type UserInfo = {
  userId: string;
  username: string;
  timeZone: string;
  timeZoneCoordinates: Coordinates;
  recentContextId: string;
  hasNewerNotifications: boolean;
  currency: string;
  showBudgetInfo: boolean;
  email: string | null;
  emailVerified: boolean;
  pushNotificationsEnabled: boolean;
};

export type GetVapidPublicKeyResponse = {
  publicKey: string;
};

export type NotificationItem = {
  id: string;
  created: string;
  title: string;
  body: string;
  url: string | null;
};

export type GetNotificationsResponse = {
  notifications: NotificationItem[];
  next: string | null;
};

export type SetPushNotificationsEnabledRequest = {
  enabled: boolean;
};

/**
 * Mirrors the server's DonationKind enum. The API has no string-enum converter, so these cross the
 * wire as the numbers the server's enum actually is — naming them here keeps that off the call sites.
 */
export const DonationTierKind = {
  OneTime: 0,
  Monthly: 1,
} as const;

export type DonationTierKindValue =
  (typeof DonationTierKind)[keyof typeof DonationTierKind];

/**
 * One tier as the server describes it. Carries no price: Google Play sets prices per country and
 * the device reads them from Play, so the server has nothing to say about what anyone pays.
 */
export type DonationProduct = {
  /** Play in-app product id. Must exist in the Play Console under exactly this id. */
  productId: string;
  kind: DonationTierKindValue;
  /** Play needs this to know which plan of a subscription to bill. Null for a one-off. */
  basePlanId: string | null;
};

/** A tier once Play has said what it costs here. This is what the form actually renders. */
export type DonationTier = DonationProduct & {
  /** Play's own formatting, in the buyer's currency and locale. Shown verbatim. */
  priceString: string;
  price: number;
  currencyCode: string;
  /** Identifies the specific offer to bill, when Play returns one. */
  offerToken?: string;
};

/**
 * Whether to ask this person for a contribution, and what to ask for. `shouldAsk` is the server's
 * decision and the client never overrides it upwards — the client only ever declines to show a
 * prompt it was cleared to show, never the reverse.
 */
export type DonationPromptInfo = {
  shouldAsk: boolean;
  /** False when the server has no Google Play credentials. Hides every donation entry point. */
  isAvailable: boolean;
  products: DonationProduct[];
  hasDonated: boolean;
  hasActiveMonthly: boolean;
};

/**
 * A purchase the app has just made, for the server to verify. Deliberately carries no amount: what
 * was paid is Play's to report, and a client-stated figure is exactly the thing not to trust.
 */
export type RegisterDonationPurchaseRequest = {
  productId: string;
  purchaseToken: string;
};

export type DismissDonationPromptRequest = {
  /** True only for an explicit "don't ask again". A plain "not now" sends false. */
  optOut: boolean;
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
  groupId?: string;
  amount: string;
  currency: string;
  description: string;
  payers?: Payer[] | NonGroupPayer[];
  participants?: Participant[] | NonGroupParticipant[];
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

export type FormGroupExpense = FormExpense & {
  groupId: string;
  payers: Payer[];
  participants: Participant[];
};

export type FormNonGroupExpense = FormExpense & {
  payers: NonGroupPayer[];
  participants: NonGroupParticipant[];
};

export type GroupTransaction = {
  memberId: string;
  amount: number;
};
export type NonGroupTransaction = {
  userId: string;
  amount: number;
};

export type ExpenseResponseItem = {
  transactionType: TransactionType;
  id: string;
  created: string;
  updated: string;
  occurred: string;
  creatorId: string;
  amount: number;
  description: string;
  currency: string;
  location?: GeoLocation;
  groupId?: string;
  recurringExpenseId?: string | null;
  payments?: GroupPayment[] | Payment[];
  shares?: GroupShare[] | Share[];
  labels: {
    id: string;
    text: string;
    color: string;
  }[];
};

export type GetExpensesResponse = {
  expenses: ExpenseResponseItem[];
  next: string | null;
  previous: string | null;
};

export type GetGroupTransfersResponse = {
  transfers: TransferResponseItem[];
  next: string | null;
};

export type GroupExpenseResponseItem = ExpenseResponseItem & {
  groupId: string;
  payments: GroupPayment[];
  shares: GroupShare[];
  next: string | null;
};

export type NonGroupExpenseResponseItem = ExpenseResponseItem & {
  payments: Payment[];
  shares: Share[];
  next: string | null;
};

export type TransferResponseItem = {
  id: string;
  created: string;
  updated: string;
  groupId?: string;
  creatorId: string;
  amount: number;
  occurred: string;
  description: string;
  currency: string;
  senderId: string;
  receiverId: string;
};

export type GroupShare = {
  memberId: string;
  amount: number;
};

export type GroupPayment = {
  memberId: string;
  amount: number;
};

export type Share = {
  userId: string;
  username: string;
  amount: number;
};

export type Payment = {
  userId: string;
  username: string;
  amount: number;
};

export type GetGroupsResponse = {
  groups: Group[];
  next: string | null;
};

export type SearchUserToInviteResponse = {
  users: SearchUserToInviteResponseItem[];
  next: string | null;
};

export type SearchUserResponse = {
  users: SearchUserResponseItem[];
  next: string | null;
};

export type SearchUserToInviteResponseItem = {
  userId: string;
  username: string;
  isGroupMember: boolean;
  isAlreadyInvited: boolean;
};

export type SearchUserResponseItem = {
  userId: string;
  username: string;
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

export type User = {
  userId: string;
  username: string;
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

export type Invitation = {
  id: string;
  created: string;
  senderId: string;
  receiverId: string;
  groupId: string;
  groupName: string;
  guestId: string | null;
  guestName: string | null;
};
export type GroupMember = Member | Guest;

export type PickerMember = {
  id: string;
  name: string;
  avatarName?: string;
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

export type GetLabelsResponse = {
  labels: (Label & { count?: number })[];
};

export type BaseExpenseRequest = {
  expenseId?: string;
  amount: number;
  currency: string;
  description: string;
  location: GeoLocation | null;
  occurred: string;
  labels: {
    text: string;
    color: string;
  }[];
};

export type GroupExpenseRequest = BaseExpenseRequest & {
  groupId?: string;
  payments: {
    memberId: string;
    amount: number;
  }[];
  shares: {
    memberId: string;
    amount: number;
  }[];
};

export type NonGroupExpenseRequest = BaseExpenseRequest & {
  payments: {
    userId: string;
    amount: number;
  }[];
  shares: {
    userId: string;
    amount: number;
  }[];
};

export type PersonalExpenseRequest = BaseExpenseRequest;

export type ExpenseRequest =
  | GroupExpenseRequest
  | NonGroupExpenseRequest
  | PersonalExpenseRequest;

export enum RecurrenceFrequency {
  Daily = 0,
  Weekly = 1,
  Biweekly = 2,
  Monthly = 3,
  Annually = 4,
}

export type RecurrenceSchedule = {
  frequency: RecurrenceFrequency;
  hour: number;
  minute: number;
  dayOfWeek?: number | null;
  dayOfMonth?: number | null;
  month?: number | null;
};

export type RecurringExpenseRequest = {
  groupId?: string;
  amount: number;
  currency: string;
  description: string;
  schedule: RecurrenceSchedule;
  payments?: {
    memberId: string;
    amount: number;
  }[];
  shares?: {
    memberId: string;
    amount: number;
  }[];
  nonGroupPayments?: {
    userId: string;
    amount: number;
  }[];
  nonGroupShares?: {
    userId: string;
    amount: number;
  }[];
  labels: {
    text: string;
    color: string;
  }[];
  location: GeoLocation | null;
};

export type EditRecurringExpenseRequest = Omit<
  RecurringExpenseRequest,
  'groupId'
> & {
  recurringExpenseId: string;
};

export type RecurringExpenseResponseItem = {
  id: string;
  created: string;
  updated: string;
  transactionType: TransactionType;
  groupId: string | null;
  groupName: string | null;
  amount: number;
  currency: string;
  description: string;
  location: GeoLocation | null;
  labels: {
    text: string;
    color: string;
  }[];
  schedule: RecurrenceSchedule | null;
  anchorDate: string;
  nextOccurrence: string;
  isPaused: boolean;
  lastError: string | null;
  payments: GroupPayment[] | null;
  shares: GroupShare[] | null;
  nonGroupPayments: Payment[] | null;
  nonGroupShares: Share[] | null;
  lastExpenseId: string | null;
  lastExpenseOccurred: string | null;
  lastExpenseCreated: string | null;
};

export type GetRecurringExpensesResponse = {
  recurringExpenses: RecurringExpenseResponseItem[];
};

export type CreateRecurringExpenseResponse = {
  recurringExpenseId: string;
  firstOccurrence: string;
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
  Custom,
}

export type BudgetInfoResponse = {
  id: string;
  totalAmountSpent: string;
  description: string;
  remainingDays: string;
  averageSpentPerDay: string;
  goal: string;
  currency: string;
  frequency: Frequency;
  scope: BudgetScope;
  targetGroupIds?: string[];
  startDate: string;
  endDate: string;
};

export type InactiveBudgetsInfoResponseItem = {
  id: string;
  amount: string;
  description: string;
  currency: string;
  frequency: Frequency;
  scope: BudgetScope;
  targetGroupIds?: string[];
  endDate: string;
  startDate: string;
};

export type InactiveBudgetsInfoResponse = {
  budgets: InactiveBudgetsInfoResponseItem[];
};

export type Details = { [currency: string]: number };

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
export type NonGroupPayer = {
  userId: string;
  paymentAmount: string;
};
export type NonGroupParticipant = {
  userId: string;
  participationAmount: string;
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
  groupId?: string;
  transfers: Transfer[];
};

export type CreateTransferRequest = {
  groupId?: string;
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

export type ConnectionRequestItem = {
  id: string;
  created: string;
  senderId: string;
  senderUsername: string;
};

export type GetConnectionRequestsResponse = {
  connectionRequests: ConnectionRequestItem[];
  next: string | null;
};

export type ConnectionStatus =
  | 'connected'
  | 'pending_sent'
  | 'pending_received'
  | 'none';

export type ConnectionStatusItem = {
  userId: string;
  status: ConnectionStatus;
  connectionId: string | null;
};

export type GetConnectionStatusesResponse = {
  statuses: ConnectionStatusItem[];
};

export type Debt = {
  debtor: string;
  debtorName?: string;
  creditor: string;
  creditorName?: string;
  amount: number;
  currency: string;
};

export type DebtsResponse = {
  debts: Debt[];
  totalSpent: Record<string, Record<string, number>>;
  convertedTotalSpent: Record<string, number>;
  totalSent: Record<string, Record<string, number>>;
  convertedTotalSent: Record<string, number>;
  totalReceived: Record<string, Record<string, number>>;
  convertedTotalReceived: Record<string, number>;
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
  guestName: string | null;
};
export type DeleteExpenseRequest = {
  expenseId: string;
};
export type DeleteUserLabelRequest = {
  labelId: string;
};
export type DeleteTransferRequest = {
  transferId: string;
};

export type UpdateNotificationRequest = {
  timestamp: string | undefined;
};
export type SetShowBudgetInfoRequest = {
  showBudgetInfo: boolean;
};

export type UpdateMostRecentContextRequest = {
  contextId: string;
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
export type FetchedPerson = {
  id: string;
  value: string;
  isUser: boolean;
};

export type FetchedPeople = FetchedPerson[];

export type EnhancedPeopleWithProps = {
  value: string;
  id: string;
  isUser: boolean;
  prop: string;
}[];

export type People = {
  payers: FetchedPeople;
  participants: FetchedPeople;
  senders: FetchedPeople;
  receivers: FetchedPeople;
};

export type FilteredPeople = People;

export type FetchedLabel = {
  id: string;
  value: string;
  color: string;
  prop: string;
  isPersonal?: boolean;
};

export type FilteredResultItem = {
  [key: string]: BeautifulMentionsItemData;
  value: string;
  prop: string;
  color: string;
};

export type GroupedItem = {
  [key: string]: FilteredResultItem[];
};

export type CreateExpenseFilterRequest = {
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
  groupId?: string;
  participantsIds: string[];
  payersIds: string[];
  freeText: string;
  before: string | null;
  during: string | null;
  after: string | null;
  labels: string[];
};

export type CreateTransferFilterRequest = {
  groupId: string;
  receiversIds: string[];
  sendersIds: string[];
  freeText: string;
  before: string[];
  during: string[];
  after: string[];
};

export type TransferFilter = {
  groupId?: string;
  receiversIds: string[];
  sendersIds: string[];
  freeText: string;
  before: string | null;
  during: string | null;
  after: string | null;
};

export type SerializedLexicalNode = {
  type: string;
  [key: string]: any;
};

export type SerializedBeautifulMentionNode = SerializedLexicalNode & {
  type: 'beautifulMention' | 'custom-beautifulMention';
  trigger: string;
  value: string;
  data: {
    category: string;
    [key: string]: any;
  };
  version: number;
};

export type SerializedElementNode = SerializedLexicalNode & {
  children: SerializedLexicalNode[];
};

export type ExpenseParsedFilters = {
  participantsIds?: string[];
  payersIds?: string[];
  freeText?: string;
  before?: string | null;
  after?: string | null;
  labels?: string[];
};

export type TransferParsedFilters = {
  sendersIds?: string[];
  receiversIds?: string[];
  freeText?: string;
  before?: string | null;
  after?: string | null;
};

export type DateConstraint = {
  trigger: 'before:' | 'after:' | 'during:';
  value: string;
};

export type CreateBudgetRequest = {
  amount: string;
  description: string;
  currency: string;
  frequency: Frequency;
  scope: BudgetScope;
  targetGroupIds: string[];
  commencementDay: string | null;
  activate?: boolean;
  startDate?: string;
  endDate?: string;
};

export type EditBudgetRequest = CreateBudgetRequest & {
  budgetId: string;
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
  lentAmount: number;
  accumulativeLentAmount: number;
  borrowedAmount: number;
  accumulativeBorrowedAmount: number;
  from: Date;
  to: Date;
};

export enum TransactionType {
  Personal = 0,
  Group = 1,
  NonGroup = 2,
}

export enum Mode {
  Personal = 0,
  Group = 1,
  NonGroup = 2,
}

export enum BudgetScope {
  Personal = 1,
  NonGroup = 2,
  Group = 4,
}
