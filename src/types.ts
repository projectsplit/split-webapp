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

export type SendGoogleAccessTokenRequest = {
  googleAccessToken: string;
};

export type SendGoogleAccessTokenResponse = {
  accessToken: string;
};

export type UserInfo = {
  userId: string;
  username: string;
};

export type GetLabelsResponse = {
  labels: string[];
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

export type ExpenseResponseItem = {
  id: string;
  created: string;
  updated: string;
  groupId: string;
  creatorId: string;
  amount: number;
  occured: string;
  description: string;
  currency: string;
  payments: Payment[];
  shares: Share[];
  labels: string[];
  location: GeoLocation | undefined;
};

export type TransferResponseItem = {
  id: string;
  created: string;
  updated: string;
  groupId: string;
  creatorId: string;
  amount: number;
  occured: string;
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
};

export type Member = {
  id: string;
  name: string;
  userId: string;
  joined: Date;
};

export type Guest = {
  id: string;
  name: string;
  joined: Date;
};

export interface Label {
  id: string;
  text: string;
  color: string;
}

export type PickerMember = {
  id: string;
  name: string;
  amount: string;
  selected: boolean;
  locked: boolean;
  order: number;
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
  labelIds: string[];
  location: GeoLocation | null;
  occured: string;
  labels: string[];
};

export type GeoLocation = {
  coordinates: Coordinates;
  google: GooglePlace | null;
};

export type GooglePlace = {
  id: string | undefined;
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

export type Groups = {
  details: Details;
  id: string;
  name: string;
}[];

export type GroupsTotalAmountsResponse = {
  groups: Groups;
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
