export interface RefreshTokenResponse {
  accessToken: string;
}

export interface PasswordSignInRequest {
  username: string;
  password: string;
};

export interface PasswordSignInResponse {
  accessToken: string;
};

export interface SendGoogleAccessTokenRequest {
  googleAccessToken: string;
};

export interface SendGoogleAccessTokenResponse {
  accessToken: string;
};

export interface UserInfo {
  userId: string;
  username: string;
};

export interface GetLabelsResponse {
  labels: string[];
};

export interface ExpenseItem {
  id: string
  date: string
  description: string
  amount: number
  currency: string
  shareAmount: number
  location: GeoLocation | undefined
  labels: string[]
}

export interface TransferItem {
  id: string
  date: string
  description: string
  amount: number
  currency: string
  senderName: string
  receiverName: string
}

export interface ExpenseProps {
  expense: ExpenseItem
  timeZoneId: string
}

export interface TransferProps {
  transfer: TransferItem
  timeZoneId: string
}

export interface GetGroupExpensesResponse {
  expenses: ExpenseResponseItem[];
  next: string | null;
};

export interface GetGroupTransfersResponse {
  transfers: TransferResponseItem[];
  next: string | null;
};

export interface ExpenseResponseItem {
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
  location: GeoLocation | undefined
};

export interface TransferResponseItem {
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

export interface Share {
  memberId: string;
  amount: number;
}

export interface Payment {
  memberId: string;
  amount: number;
}

export interface GetGroupsResponse {
  groups: GetGroupsResponseItem[];
  next: string | null;
};

export interface GetGroupsResponseItem {
  id: string;
  name: string;
};

export interface Group {
  id: string
  created: Date
  updated: Date
  ownerId: string
  name: string
  currency: string
  members: Member[]
  guests: Guest[]
  labels: Label[]
}

export interface Member {
  id: string
  name: string
  userId: string
  joined: Date
}

export interface Guest {
  id: string
  name: string
  joined: Date
}

export interface Label {
  id: string;
  text: string;
  color: string;
}

export interface DateTimePickerProps {
  selectedDateTime: string
  setSelectedDateTime: React.Dispatch<React.SetStateAction<string>>
  realtimeUpdate: boolean
  setRealtimeUpdate: React.Dispatch<React.SetStateAction<boolean>>
  timeZoneId: string
}

export interface DateTimeProps {
  selectedDateTime: string
  setSelectedDateTime: React.Dispatch<React.SetStateAction<string>>
  timeZoneId: string
}

export interface PickerMember {
  id: string
  name: string
  amount: string
  selected: boolean
  locked: boolean
  order: number
}

export interface MemberPickerProps {
  totalAmount: number
  memberAmounts: PickerMember[]
  setMemberAmounts: React.Dispatch<React.SetStateAction<PickerMember[]>>
  description?: string
  error?: string
}

export interface CreateExpenseRequest {
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
}

export interface GeoLocation {
  coordinates: Coordinates
  google: GooglePlace | null
}

export interface GooglePlace {
  id: string | undefined
  name: string | undefined
  address: string | undefined
  url: string | undefined
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface DayPickerProps {
  selectedDateTime: string
  setSelectedDateTime: React.Dispatch<React.SetStateAction<string>>
  timeZoneId: string
}

export interface ScrollPickerProps {
  items: string[]
  selectedIndex: number
  setSelectedIndex: (index: number) => void
}