import { CSSProperties } from "react";
import {
  ExpenseItem,
  ExpenseResponseItem,
  FormExpense,
  Frequency,
  GeoLocation,
  GetUserInvitationsResponse,
  GetUserInvitationsResponseItem,
  Group,
  GroupedTransaction,
  Member,
  Payment,
  PickerMember,
  Share,
  TransferItem,
  TruncatedMember,
  UserInfo,
} from "./types";
import { Signal } from "@preact/signals-react";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

export interface ExpenseProps {
  timeZoneId: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  amount: number;
  currency: string;
  occurred: string;
  description: string;
  location: GeoLocation | undefined;
  userAmount: number;
}

export interface MapsInfoBoxProps {
  location: GeoLocation | undefined;
  googleUrl:string;
}

export interface MembersInfoBoxProps {
  transactions: {
    memberId: string;
    amount: number;
  }[];
  areShares: boolean;
  currency: string;
  members: TruncatedMember[];
}

export interface DetailedExpenseProps {
  timeZoneId: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  payments: Payment[];
  shares: Share[];
  amount: number;
  currency: string;
  occurred: string;
  created: string;
  description: string;
  labels: string[];
  location: GeoLocation | undefined;
  userAmount: number;
  selectedExpense: Signal<ExpenseResponseItem | null>;
  creator: string;
  members: TruncatedMember[];
  errorMessage: Signal<string>;
}

export interface TransferProps {
  transfer: TransferItem;
  timeZoneId: string;
}

export interface DateTimePickerProps {
  selectedDateTime: string;
  setSelectedDateTime: React.Dispatch<React.SetStateAction<string>>;
  realtimeUpdate: boolean;
  setRealtimeUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  timeZoneId: string;
}

export interface DateTimeProps {
  selectedDateTime: string;
  setSelectedDateTime: React.Dispatch<React.SetStateAction<string>>;
  timeZoneId: string;
}

export interface MemberPickerProps {
  totalAmount: number;
  memberAmounts: PickerMember[];
  setMemberAmounts: React.Dispatch<React.SetStateAction<PickerMember[]>>;
  description?: string;
  error?: string;
}

export interface DayPickerProps {
  selectedDateTime: string;
  setSelectedDateTime: React.Dispatch<React.SetStateAction<string>>;
  timeZoneId: string;
}

export interface ScrollPickerProps {
  items: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: any;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  backgroundcolor?: string;
}

export interface LoadingSpinnerProps {
  name: string;
  fontSize: number;
}

export interface OptionsContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
  hasarrow: boolean;
}

export interface TreeAdjustedContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
  hasarrow: boolean;
  items: (string | JSX.Element)[];
}

export interface NotificationsBellProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface RecommendationMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  currency: string;
  days: string;
  reduceAmount: string;
  offBudgetAmount: string;
  style?: CSSProperties;
  closeButton: boolean;
  budgetType?: Frequency;
}
export interface BottomMainMenuProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export interface OverspentMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  overspent: boolean;
  currency: string;
  offBudgetAmount: string;
  overspentBy: string;
  style?: CSSProperties;
  closeButton: boolean;
  budgetType?: Frequency;
}

export interface OnTrackMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  currency: string;
  amount: string;
  style?: CSSProperties;
  closeButton: boolean;
  budgetType?: Frequency;
}

export interface SimpleOnTrackMessageProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  style?: CSSProperties;
  closeButton: boolean;
}
export interface ReceivedMoreThanSpentMessageProps
  extends OnTrackMessageProps {}

export interface SelectionButtonProps {
  children: any;
  name: string;
  description: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export interface OptionsButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  username: string;
  children?: any;
}

export interface TreeProps {
  items: (string | JSX.Element)[];
}

export interface StyledOnTrackMessageProps {
  style?: React.CSSProperties;
}

export interface StyledRecommendationProps {
  style?: React.CSSProperties;
}
export interface NewButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export interface StyledBottomMenuProps {
  height?: string;
}
export interface CurrencyOptionProps {
  clickHandler: (curr: string) => void;
}
export interface CurrencyOptionsAnimationProps {
  clickHandler: (curr: string) => void;
  currencyMenu: Signal<string | null>;
}

export interface BottomMenuProps {
  children: any;
  height?: string;
}

export interface CategoryButtonProps {
  to?: string;
  children: any;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  backgroundcoloronselect?: string;
  style?: CSSProperties;
  key?: any;
}

export interface CategorySelectorProps {
  categories: { cat1: string; cat2: string; cat3: string };
  activeCat: string;
  // onCategoryChange: React.Dispatch<React.SetStateAction<string>>;
}

export interface MenuProps {
  menu: Signal<string | null>;
}

export interface MenuAnimationBackgroundProps extends MenuProps {}
export interface SettingsMenuAnimationProps extends MenuProps {
  username: string;
}
export interface LogoStripeProps extends MenuProps {}

export interface CreateGroupAnimationProps extends MenuProps {
  currencyMenu: Signal<string | null>;
}

export interface CreateGroupProps extends MenuProps {
  nodeRef: React.MutableRefObject<null>;
  currencyMenu: Signal<string | null>;
}

export interface SettingsMenuProps {
  menu: Signal<string | null>;
  nodeRef: React.MutableRefObject<null>;
  username: string;
}

export interface TopMenuProps {
  title: string;
  menu: Signal<string | null>;
  username: string;
  numberOfNotifications: Signal<number>;
}

export interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

export interface NewExpenseAnimationProps {
  group: Group;
  expense: FormExpense | null;
  timeZoneId: string;
  menu: Signal<string | null>;
}

export interface ExpenseFormProps {
  group: Group;
  expense: FormExpense | null;
  timeZoneId: string;
  menu: Signal<string | null>;
}

export interface Label {
  id: string;
  text: string;
  color: string;
}

export interface GroupQuickActionsAnimationProps extends MenuProps {}

export interface GroupQuickActionsMenuprops extends MenuProps {}
export interface DeleteExpenseAnimationProps extends MenuProps {
  description: string;
  selectedExpense: Signal<ExpenseResponseItem | null>;
  errorMessage: Signal<string>;
}
export interface DeleteExpenseConfirmationProps extends MenuProps {
  description: string;
  selectedExpense: Signal<ExpenseResponseItem | null>;
  errorMessage: Signal<string>;
}

export interface BarsWithLegendsProps {
  bar1Total: number;
  bar2Total: number;
  currency: string;
  bar1Legend: string;
  bar2Legend: string;
  bar1Color: string;
  bar2Color: string;
}

export interface TransfersProps {
  group: Group;
  memberId: string;
  timeZoneId: string;
}

export interface DebtsResponse {
  debtor: string;
  creditor: string;
  amount: number;
  currency: string;
}

export interface MemberProps {
  pendingTransactions: DebtsResponse[];
  groupedTransactions: GroupedTransaction[];
  memberId: string;
  name: string;
  isLogedUser: boolean;
  menu: Signal<string | null>;
  memberIdSelectedToSettleUp: Signal<string>;
  members: TruncatedMember[];
  isGuest: boolean;
}

export interface RenderScenariosProps {
  memberTransactions: GroupedTransaction[];
  pendingTransactions: DebtsResponse[];
  isLogedUser: boolean;
  memberId: string;
  name: string;
  showTree: boolean;
  treeItems: React.JSX.Element[];
  members: TruncatedMember[];
}
export interface RenderSettledProps {
  name: string;
  isLogedUser: boolean;
}

export interface RenderBothScenariosProps {
  memberTransactions: GroupedTransaction[];
  pendingTransactions: DebtsResponse[];
  isLogedUser: boolean;
  memberId: string;
  name: string;
  doNotshowTreeWhenMemberIsOwed: boolean;
  doNotshowTreeWhenMemberOwes: boolean;
  memberIsOwedItems: React.JSX.Element[];
  memberOwesItems: React.JSX.Element[];
  members: TruncatedMember[];
}

export interface MemberDetailedDescriptionProps {
  pendingTransactions: DebtsResponse[];
  memberTransactions: GroupedTransaction[];
  memberId: string;
  isLogedUser: boolean;
  isOwed: boolean;
  name: string;
  members: TruncatedMember[];
}

export interface DescriptionAndTreeProps {
  memberTransactions: GroupedTransaction[];
  pendingTransactions: DebtsResponse[];
  isLogedUser: boolean;
  memberId: string;
  name: string;
  isOwed: boolean;
  showTree: boolean;
  treeItems: React.JSX.Element[];
  members: TruncatedMember[];
}

export interface SettleUpButtonProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface SettleUpAnimationProps {
  menu: Signal<string | null>;
  pendingTransactions: DebtsResponse[];
  memberIdSelectedToSettleUp: Signal<string>;
  members: TruncatedMember[];
}
export interface SettleUpOptionsProps {
  pendingTransactions: DebtsResponse[];
  memberIdSelectedToSettleUp: Signal<string>;
  menu: Signal<string | null>;
  members: TruncatedMember[];
}
export interface PillProps {
  title: string;
  color: string;
  closeButton: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: (event: React.MouseEvent<HTMLDivElement>) => void;
  fontSize?: string;
}
export interface AddNewUserAnimationProps extends MenuProps {}

export interface SearchUsersToInviteProps extends MenuProps {}
export interface DetailedExpenseAnimationProps extends DetailedExpenseProps {}

export interface NotificationsMenuProps extends MenuProps {
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<GetUserInvitationsResponse, unknown>,
      Error
    >
  >;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  userInvitations: GetUserInvitationsResponseItem[] | undefined;
}
export interface NotificationsMenuAnimationProps extends MenuProps {
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<GetUserInvitationsResponse, unknown>,
      Error
    >
  >;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  userInvitations: GetUserInvitationsResponseItem[] | undefined;
}

export interface MiddleScreenMenuProps {
  children: any;
  height?: string;
}

export interface EditorContentHandle {
  clearEditor: () => void;
}

export interface ErrorMenuAnimationProps extends MenuProps {
  message: string;
}

export interface ErrorMenuProps extends MenuProps {
  children: any;
}
