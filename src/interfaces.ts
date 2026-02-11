import { CSSProperties, MouseEventHandler } from "react";
import {
  Coordinates,
  Debt,
  ExpenseResponseItem,
  FetchedLabel,
  FormExpense,
  Frequency,
  GeoLocation,
  Group,
  GroupedTransaction,
  Label,
  Payment,
  PickerMember,
  Share,
  TransferItem,
  TransferResponseItem,
  TruncatedMember,
  UserInfo,
  CreateTransferFilterRequest,
  CreateExpenseFilterRequest,
  ExpenseParsedFilters,
  TransferParsedFilters,
  BudgetInfoResponse,
  GetJoinCodesResponse,
  SpendingChartsResponse,
  Member,
  Guest,
  User,
  GroupPayment,
  GroupShare,
  ExpenseType,
  GroupTransaction,
  NonGroupTransaction,
  TransactionType,
  EnhancedPeopleWithProps,
  FetchedPeople,
  FilteredPeople,
  SplitCategory,
} from "./types";
import { ReadonlySignal, Signal } from "@preact/signals-react";
import { EditorState } from "lexical";
import {
  BeautifulMentionsItemData,
  BeautifulMentionsMenuProps,
} from "lexical-beautiful-mentions";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  UseMutateFunction,
} from "@tanstack/react-query";
import { SplitMethod } from "./components/ExpenseForm/formStore/formStoreTypes";


export interface ExpenseProps {
  timeZoneId: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  amount: number;
  currency: string;
  occurred: string;
  description: string;
  location: GeoLocation | undefined;
  userAmount: number;
  labels: Label[];
}

export interface MapsInfoBoxProps {
  location: GeoLocation | undefined;
  googleMapsUrl: string;
}
export interface LabelProps {
  backgroundColor: string;
}


export interface MembersInfoBoxProps {
  transactions: GroupTransaction[] | NonGroupTransaction[] | undefined;
  areShares: boolean;
  currency: string;
  participants: TruncatedMember[];
  userMemberId: string;
  userId: string;
  transactionType: TransactionType;
}

export interface DetailedExpenseProps {
  expenseType: ExpenseType;
  timeZoneId: string;
  timeZoneCoordinates: Coordinates;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  payments?: GroupPayment[] | Payment[];
  shares?: GroupShare[] | Share[];
  amount: number;
  currency: string;
  occurred: string;
  created: string;
  description: string;
  labels: {
    id: string;
    text: string;
    color: string;
  }[];
  location: GeoLocation | undefined;
  selectedExpense: Signal<ExpenseResponseItem | null>;
  creator: string;
  participants: TruncatedMember[];
  errorMessage: Signal<string>;
  userMemberId: string;
  group?: Group;
  userId: string;
  transactionType: TransactionType;
}

export interface DetailedTransferProps {
  timeZoneId: string;
  selectedTransfer: Signal<TransferResponseItem | null>;
  amount: number;
  currency: string;
  occurred: string;
  created: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  creator: string;
  userMemberId: string;
  members: TruncatedMember[];
  errorMessage: Signal<string>;
  groupIsArchived: boolean;
  userId: string;
}

export interface TransferProps {
  transfer: TransferItem;
  timeZoneId: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface DateTimePickerProps {
  selectedDateTime: string;
  setSelectedDateTime: React.Dispatch<React.SetStateAction<string>>;
  realtimeUpdate?: boolean;
  setRealtimeUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  showTimeControls: boolean;
  timeZoneId: string;
  datePeriodClicked?: Signal<string>;
  calendarIsOpen?: Signal<boolean>;
  showOptions?: Signal<boolean>;
  withLexicalContext?: boolean;
  category: Signal<string>;
  isDateShowing?: Signal<boolean>;
}

export interface DateTimeProps {
  selectedDateTime: string;
  setSelectedDateTime: (value: string | ((prev: string) => string)) => void;
  timeZoneId: string;
  isEdit: boolean;
  withLexicalContext?: boolean;
  category: Signal<string>;
  isDateShowing: Signal<boolean>;
  setShowPicker: (value: boolean) => void;
  showPicker: boolean;
}

export interface DateDisplayProps {
  timeZoneId: string;
  selectedDateTime: string;
  setTime: (time: string) => void;
  isDateShowing: Signal<boolean>;
  setShowPicker: (value: boolean) => void;
}

export interface MemberPickerProps {
  totalAmount: number;
  memberAmounts: PickerMember[];
  setMemberAmounts: (newParticipants: PickerMember[]) => void;
  description: "Participants" | "Payers";
  error?: string;
  // group: Group;
  selectedCurrency: string;
  category: Signal<SplitMethod>;
  userMemberId: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isnonGroupExpense?: Signal<boolean>;
  userId: string;
  groupMembers: Signal<(Member | Guest)[]>;
  nonGroupUsers: Signal<User[]>;
  isLoading: boolean;
  isCreateExpense: boolean;
}

export interface DayPickerProps {
  selectedDateTime: string;
  setSelectedDateTime: React.Dispatch<React.SetStateAction<string>>;
  timeZoneId: string;
  datePeriodClicked?: Signal<string>;
  calendarIsOpen?: Signal<boolean>;
  showOptions?: Signal<boolean>;
  withLexicalContext?: boolean;
  category: Signal<string>;
  isDateShowing?: Signal<boolean>;
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
  hasOption: boolean;
  optionname?: any;
  iconfontsize?: number;
  right?: number;
  onIconClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  $optionColor?: string;
}
export interface GroupOptionsProps {
  group: Group | undefined;
}

export interface TreeAdjustedContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
  hasOption: boolean;
  optionname?: any;
  items: (string | JSX.Element)[];
  iconfontsize?: number;
  right?: number;
  onIconClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  $optionColor?: string;
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
  group?: Group;
  isLoading?: boolean;
  menu?: Signal<string | null>;
  onGroupSearchClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  bottomBarRef?: React.RefObject<HTMLDivElement>;
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
  extends OnTrackMessageProps { }

export interface SelectionButtonProps {
  children: any;
  name: string;
  description: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  hasArrow: boolean;
}
export interface OptionsButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  username?: string | undefined;
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
  selectedCurrency?: string | undefined;
}
export interface TimeZoneOptionsProps {
  clickHandler: (curr: string) => void;
  userInfo?: UserInfo | undefined;
}
export interface CurrencyOptionsAnimationProps {
  clickHandler: (curr: string) => void;
  currencyMenu: Signal<string | null>;
  selectedCurrency: string | undefined;
}

export interface LocationPickerProps {
  isMapOpen: Signal<boolean>;
  location: GeoLocation | undefined;
  timeZoneCoordinates: Coordinates;
  setLocation: (location: GeoLocation | undefined) => void
  isCreateExpense: boolean;
  setDescriptionError: (error: string) => void;
}

export interface LocationDisplayProps {
  location: GeoLocation | undefined;
  isMapOpen: Signal<boolean>;
  setLocation: (location: GeoLocation | undefined) => void
}
export interface PlacePickerProps {
  location: GeoLocation | undefined;
  isMapOpen: Signal<boolean>;
  defaultCoordinates: Coordinates;
  setLocation: (location: GeoLocation | undefined) => void
  isCreateExpense: boolean;
  setDescriptionError: (error: string) => void;
}

export interface PlacePickerAnimationProps extends PlacePickerProps { }
export interface TimeZoneOptionsAnimationProps {
  clickHandler: (curr: string) => void;
  timeZoneMenu: Signal<string | null>;
  userInfo: UserInfo | undefined;
}
export interface LabelPickerProps {
  labels: Label[];
  setLabels: (labels: Label[]) => void;
  groupId?: string;
}

export interface LabelMenuProps {
  labelMenuIsOpen: Signal<boolean>;
  labels: Label[];
  setLabels: (labels: Label[]) => void
  groupId?: string;
}

export interface BottomMenuProps {
  children: any;
  height?: string;
}

export interface CategoryButtonProps {
  to?: string;
  children: any;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  backgroundcoloronselect?: string;
  style?: CSSProperties;
  key?: any;
}

export interface CategorySelectorProps {
  categories: { cat1?: string; cat2?: string; cat3?: string };
  activeCat: string;
  navLinkUse: boolean;
  activeCatAsState?: Signal<string>;
  // onCategoryChange: React.Dispatch<React.SetStateAction<string>>;
}

export interface MenuProps {
  menu: Signal<string | null>;
}

export interface MenuAnimationBackgroundProps extends MenuProps { }
export interface SettingsMenuAnimationProps extends MenuProps {
  userInfo: UserInfo | undefined;
}
export interface LogoStripeProps extends MenuProps { }

export interface CreateGroupAnimationProps extends MenuProps {
  currencyMenu: Signal<string | null>;
}

export interface CreateGroupProps extends MenuProps {
  nodeRef: React.MutableRefObject<null>;
  currencyMenu: Signal<string | null>;
}

export interface GroupSearchBarAnimationProps {
  showSearchBar: Signal<boolean>;
  searchBarRef: React.MutableRefObject<any>;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export interface SettingsMenuProps {
  menu: Signal<string | null>;
  nodeRef: React.MutableRefObject<null>;
  userInfo: UserInfo | undefined;
}

export interface TopMenuProps {
  title: string;
  menu: Signal<string | null>;
  username: string | undefined;
  hasNewerNotifications: boolean;
  openGroupOptionsMenu: Signal<boolean>;
  groupIsArchived: boolean;
  confirmUnarchiveMenu: Signal<string | null>;
}

export interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

export interface NewExpenseAnimationProps {
  groupId?: string;
  expense: FormExpense | null;
  timeZoneId: string;
  menu: Signal<string | null>;
  selectedExpense?: Signal<ExpenseResponseItem | null>;
  timeZoneCoordinates: Coordinates;
  isPersonal: Signal<boolean>;
  groupMembers: Signal<(Member | Guest)[]>;
  currency: string;
  isnonGroupExpense?: Signal<boolean>;
  nonGroupUsers: Signal<User[]>;
  nonGroupMenu?: Signal<string | null>;

}

export interface NewTransferAnimationProps {
  timeZoneId: string;
  menu: Signal<string | null>;
  groupMembers: Signal<(Member | Guest)[]>;
  nonGroupUsers: Signal<User[]>;
  currency: string;
  groupId?: string;
  isnonGroupTransfer?: Signal<boolean>;
  nonGroupMenu?: Signal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  }>;
  nonGroupGroup?: Signal<Group | null>;
  fromHome?: boolean;
}

export interface ExpenseFormProps {
  groupMembers: Signal<(Member | Guest)[]>;
  nonGroupUsers: Signal<User[]>;
  groupId?: string;
  expense: FormExpense | null; //make this signal, and then make null when toggling a lock so it does not use prev expense any more
  timeZoneId: string;
  menu: Signal<string | null>;
  timeZoneCoordinates: Coordinates;
  header: string;
  selectedExpense?: Signal<ExpenseResponseItem | null>;
  isCreateExpense: boolean;
  isPersonal: Signal<boolean>;
  isnonGroupExpense?: Signal<boolean>;
  currency: string;
  nonGroupMenu?: Signal<string | null>;
  nonGroupGroup?: Signal<Group | null>;
  fromHome?: boolean;
}

export interface EditExpenseFormProps extends ExpenseFormProps {
  selectedExpense?: Signal<ExpenseResponseItem | null>;
}

export interface TransferFormProps {
  // group: Group;
  groupMembers: Signal<(Member | Guest)[]>;
  nonGroupUsers: Signal<User[]>;
  currency: string;
  timeZoneId: string;
  menu: Signal<string | null>;
  nonGroupGroup?: Signal<Group | null>;
  groupId?: string;
  isnonGroupTransfer?: Signal<boolean>;
  nonGroupMenu?: Signal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  }>;
  fromHome?: boolean;
}

export interface GroupQuickActionsAnimationProps extends MenuProps { }
export interface HomeQuickActionsAnimationProps {
  quickActionsMenu: Signal<string | null>;
  isNonGroupExpense: Signal<boolean>;
  nonGroupTransferMenu: Signal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  }>;
  userInfo: UserInfo;
}
export interface NonGroupExpenseUsersAnimationProps extends MenuProps {
  nonGroupUsers: Signal<User[]>;
  isPersonal: Signal<boolean>;
  groupMembers: Signal<(Guest | Member)[]>;
  nonGroupGroup: Signal<Group | null>;
  isNonGroupExpense: Signal<boolean>;
  fromNonGroup: boolean;
}

export interface NonGroupTransferAnimationProps {
  nonGroupTransferMenu: Signal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  }>;
  nonGroupGroup: Signal<Group | null>;
  groupMembers: Signal<(Guest | Member)[]>;
  isNonGroupTransfer: Signal<boolean>;
}

export interface NonGroupTransferMenuProps {
  nonGroupTransferMenu: Signal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  }>;
  nonGroupGroup: Signal<Group | null>;
  groupMembers: Signal<(Guest | Member)[]>;
  isNonGroupTransfer: Signal<boolean>;
}

export interface NonGroupUsersProps extends MenuProps {
  nonGroupUsers: Signal<User[]>;
  isPersonal: Signal<boolean>;
  groupMembers: Signal<(Guest | Member)[]>;
  nonGroupGroup: Signal<Group | null>;
  isNonGroupExpense: Signal<boolean>;
  fromNonGroup: boolean;
}
export interface LocationPickerAnimationProps extends MenuProps {
  location: GeoLocation | undefined;
  setLocation: React.Dispatch<React.SetStateAction<GeoLocation | undefined>>;
}
export interface UserItemProps {
  name: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface UserProps {
  name: string;
  userId: string;
  nonGroupTransferMenu: Signal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  }>;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  currentUserId: string;
}

export interface GroupQuickActionsMenuprops extends MenuProps { }
export interface ActionsMenuprops {
  onClickTransfer: React.MouseEventHandler<HTMLDivElement> | undefined;
  onClickExpense: React.MouseEventHandler<HTMLDivElement> | undefined;
  bottom?: string | number;
}
export interface DeleteExpenseAnimationProps extends MenuProps {
  description: string;
  selectedExpense: Signal<ExpenseResponseItem | null>;
  errorMessage: Signal<string>;
}
export interface DeleteTransferAnimationProps extends MenuProps {
  selectedTransfer: Signal<TransferResponseItem | null>;
  errorMessage: Signal<string>;
}

export interface DeleteExpenseConfirmationProps extends MenuProps {
  description: string;
  selectedExpense: Signal<ExpenseResponseItem | null>;
  errorMessage: Signal<string>;
}
export interface DeleteTransferConfirmationProps extends MenuProps {
  selectedTransfer: Signal<TransferResponseItem | null>;
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
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface TransfersProps {
  group: Group;
  memberId: string;
  timeZoneId: string;
}

export interface MemberProps {
  pendingTransactions: Debt[];
  groupedTransactions: GroupedTransaction[];
  id: string;
  name: string;
  isLogedUser: boolean;
  menu: Signal<string | null>;
  idSelectedToSettleUp: Signal<string>;
  participants: TruncatedMember[];
  isGuest: boolean;
  totalSpent: Record<string, Record<string, number>>;
  group: Group;
  guestToBeReplaced: Signal<{ guestId: string; guestName: string }>;
  userOrMemberId: string;
}

export interface RenderScenariosProps {
  memberTransactions: GroupedTransaction[];
  pendingTransactions: Debt[];
  isLogedUser: boolean;
  id: string;
  name: string;
  showTree: boolean;
  treeItems: React.JSX.Element[];
  participants: TruncatedMember[];
  userOrMemberId: string;
  transactionType: TransactionType;
}
export interface RenderSettledProps {
  name: string;
  isLogedUser: boolean;
}

export interface RenderBothScenariosProps {
  memberTransactions: GroupedTransaction[];
  pendingTransactions: Debt[];
  isLogedUser: boolean;
  id: string;
  name: string;
  doNotshowTreeWhenMemberIsOwed: boolean;
  doNotshowTreeWhenMemberOwes: boolean;
  memberIsOwedItems: React.JSX.Element[];
  memberOwesItems: React.JSX.Element[];
  participants: TruncatedMember[];
  userOrMemberId: string;
  transactionType: TransactionType;
}

export interface MemberDetailedDescriptionProps {
  pendingTransactions: Debt[];
  memberTransactions: GroupedTransaction[];
  id: string;
  isLogedUser: boolean;
  isOwed: boolean;
  name: string;
  participants: TruncatedMember[];
  userOrMemberId: string;
  transactionType: TransactionType;
}

export interface DescriptionAndTreeProps {
  memberTransactions: GroupedTransaction[];
  pendingTransactions: Debt[];
  isLogedUser: boolean;
  id: string;
  name: string;
  isOwed: boolean;
  showTree: boolean;
  treeItems: React.JSX.Element[];
  participants: TruncatedMember[];
  userOrMemberId: string;
  transactionType: TransactionType;
}

export interface SettleUpButtonProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
}

export interface SettleUpAnimationProps {
  menu: Signal<string | null>;
  pendingTransactions: Debt[];
  idSelectedToSettleUp: Signal<string>;
  members: TruncatedMember[];
  userId: string
}
export interface SettleUpOptionsProps {
  pendingTransactions: Debt[];
  idSelectedToSettleUp: Signal<string>;
  menu: Signal<string | null>;
  members: TruncatedMember[];
  userId: string;
}
export interface PillProps {
  title: string;
  color: string;
  $textColor: string;
  closeButton: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: (event: React.MouseEvent<HTMLDivElement>) => void;
  fontSize?: string;
  $border: boolean;
  $closeButtonColor?: string;
}
export interface AddNewUserAnimationProps extends MenuProps {
  guestToBeReplaced?: { guestId: string; guestName: string };
}

export interface SearchUsersToInviteProps extends MenuProps {

  guestToBeReplaced?: { guestId: string; guestName: string };
}
export interface DetailedExpenseAnimationProps extends DetailedExpenseProps { }

export interface NotificationsMenuProps extends MenuProps {
  // fetchNextPage: (
  //   options?: FetchNextPageOptions
  // ) => Promise<
  //   InfiniteQueryObserverResult<
  //     InfiniteData<GetUserInvitationsResponse, unknown>,
  //     Error
  //   >
  // >;
  // isFetchingNextPage: boolean;
  // hasNextPage: boolean;
  // userInvitations: GetUserInvitationsResponseItem[] | undefined;
  userInfo: UserInfo | undefined;
}
export interface NotificationsMenuAnimationProps extends MenuProps {
  // fetchNextPage: (
  //   options?: FetchNextPageOptions
  // ) => Promise<
  //   InfiniteQueryObserverResult<
  //     InfiniteData<GetUserInvitationsResponse, unknown>,
  //     Error
  //   >
  // >;
  // isFetchingNextPage: boolean;
  // hasNextPage: boolean;
  // userInvitations: GetUserInvitationsResponseItem[] | undefined;
  hasNewerNotifications: boolean;
  userInfo: UserInfo | undefined;
}
export interface MemberItemProps {
  member: {
    id: string;
    name: string;
  };
  groupId: string | undefined;
  noGroupError: Signal<string>;
  noMemberError: Signal<string>;
  isGuest: boolean;
  canBeRemoved: boolean;
  onCannotRemoveClick: () => void;
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
  type: string;
}

export interface ErrorMenuProps extends MenuProps {
  children: any;
  type: string;
}

export interface InputMonetaryProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  backgroundColor?: string;
  value?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  $inputError?: boolean;
  currencyMenu: Signal<React.SetStateAction<string | null>>;
  currency: string;
}

export interface ConfirmationProps {
  children: any;
  menu: Signal<string | null>;
  isLoading: boolean;
  onClick: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  header: string;
}

export interface ConfirmArchiveGroupAnimationProps extends MenuProps {
  groupId: string | undefined;
  openGroupOptionsMenu: Signal<boolean>;
  navigateToGroups: boolean;
}

export interface ConfirmLeaveGroupAnimationProps extends MenuProps {
  groupId: string | undefined;
  memberId: string | undefined;
  openGroupOptionsMenu: Signal<boolean>;
}

export interface ConfirmArchiveGroupProps extends MenuProps {
  groupId: string | undefined;
  openGroupOptionsMenu: Signal<boolean>;
  navigateToGroups: boolean;
}

export interface ConfirmLeaveGroupProps extends MenuProps {
  groupId: string | undefined;
  memberId: string | undefined;
  openGroupOptionsMenu: Signal<boolean>;
}
export interface RemoveWarningProps extends MenuProps {
  message: string;
  header: string;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
}
export interface ParticipantsPayersErrorMenuProps extends MenuProps {
  error: string | undefined;
}
export interface RemoveWarningAnimationProps extends MenuProps {
  header: string;
  message: string;
  menuValue: string;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
}
export interface ParticipantsPayersAnimationProps extends MenuProps {
  error: string | undefined;
}
export interface GeneralWarningMenuProps extends MenuProps {
  message: string | undefined;
}
export interface GeneralWarningMenuAnimationProps extends MenuProps {
  message: string | undefined;
}
export interface RenameGroupMenuProps extends MenuProps {
  groupId: string | undefined;
  groupName: string | undefined;
}
export interface RenameGroupAnimationProps extends MenuProps {
  groupId: string | undefined;
  groupName: string | undefined;
}

export interface RemoveUserFromGroupMenuProps {
  openRemoveUserMenu: Signal<boolean>;
  groupId: string | undefined;
  userInfo: UserInfo | undefined;
}

export interface GroupTotalsByCurrencyAnimationProps extends MenuProps {
  bar1Color: string;
  bar2Color: string;
  bar1Legend: string;
  bar2Legend: string;
  groupTotalsByCurrency: Record<string, number>;
  userTotalsByCurrency: Record<string, number>;
}
export interface GroupTotalExpensesByCurrencyProps extends MenuProps {
  bar1Color: string;
  bar2Color: string;
  bar1Legend: string;
  bar2Legend: string;
  groupTotalsByCurrency: Record<string, number>;
  userTotalsByCurrency: Record<string, number>;
}

export interface BarsAndAmountsProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  currency: string;
  bar1Total: number;
  bar2Total: number;
  bar1Color: string;
  bar2Color: string;
}

export interface EditUsernameProps {
  existingUsername: string | undefined;
  editUsernameMenu: Signal<string | null>;
}

export interface EditUsernameAnimationProps {
  existingUsername: string | undefined;
  editUsernameMenu: Signal<string | null>;
}

export interface GroupErrorProps {
  groupError: Signal<
    | {
      message: string;
      code?: string;
      status?: number;
      config?: any;
    }
    | undefined
  >;
}

export interface NameAndAmountsProps {
  category: Signal<SplitMethod>;
  m: PickerMember;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  currency: string;
}

export interface CurrentSearchFieldProps {
  currentSearch: string;
  filterState: Signal<CreateExpenseFilterRequest | CreateTransferFilterRequest>;
  removedFilter: Signal<boolean>;
  submitButtonIsActive: Signal<boolean>;
  showFreeTextPill: Signal<boolean>;
}

export interface EditorContentHandle {
  clearEditor: () => void;
}

export type EnhancedMembersWithProps = {
  value: string;
  memberId: string;
  isUser: boolean;
  prop: string;
}[];

export interface LexicalEditorProps {
  enhancedPeopleWithProps: EnhancedPeopleWithProps;
  submitButtonIsActive: Signal<boolean>;

  labels: FetchedLabel[];
  expenseFilterState: Signal<CreateExpenseFilterRequest>;
  transferFilterState: Signal<CreateTransferFilterRequest>;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState | null>>;
  contentEditableHeight: number;
  people: FetchedPeople | undefined;
  cancelled: Signal<boolean>;
  filteredPeople: Signal<FilteredPeople>;
  timeZoneId: string;
  filteredLabels: Signal<FetchedLabel[]>;
  category: Signal<string>;
  searchKeyword: Signal<string>;

}

export interface FilterCalendarProps {
  calendarIsOpen: Signal<boolean>;
  showOptions: Signal<boolean>;
  datePeriodClicked: Signal<string>;
  timeZoneId: string;
  category: Signal<string>;
}
export interface SearchMenuProps {
  $contentEditableHeight: number;
}
export interface CombinedMenuProps
  extends SearchMenuProps,
  BeautifulMentionsMenuProps {
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export interface StyledMenuItemProps {
  selected?: boolean;
}
export interface SearchCategoryButtonProps {
  category: string;
  type: string;
  submitButtonIsActive: Signal<boolean>;
  // onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface SearchDateButtonProps extends SearchCategoryButtonProps {
  dates: any;
  showOptions: Signal<boolean>;
  calendarIsOpen: Signal<boolean>;
  datePeriodClicked: Signal<string>;
  filterState: Signal<CreateExpenseFilterRequest | CreateTransferFilterRequest>;
  cancelled: Signal<boolean>;
  removedFilter: Signal<boolean>;
}

export interface PeoplePillsDisplayProps {
  category: string;
  type: string;
  filteredPeople: Signal<FilteredPeople>;
  showOptions: Signal<boolean>;
  submitButtonIsActive: Signal<boolean>;
  expenseFilterState: Signal<CreateExpenseFilterRequest>;
  transferFilterState: Signal<CreateTransferFilterRequest>;
  cancelled: Signal<boolean>;
  removedFilter: Signal<boolean>;
}
export interface LabelsPillsDisplayProps {
  category: string;
  filteredLabels: Signal<FetchedLabel[]>;
  showOptions: Signal<boolean>;
  submitButtonIsActive: Signal<boolean>;
  filterState: Signal<CreateExpenseFilterRequest>;
  cancelled: Signal<boolean>;
  removedFilter: Signal<boolean>;
}

export interface SearchPeopleButtonProps extends SearchCategoryButtonProps {
  showOptions: Signal<boolean>;
  filteredPeople: Signal<FilteredPeople>;
  submitButtonIsActive: Signal<boolean>;
  expenseFilterState: Signal<CreateExpenseFilterRequest>;
  transferFilterState: Signal<CreateTransferFilterRequest>;
  cancelled: Signal<boolean>;
  removedFilter: Signal<boolean>;
}

export interface SearchLabelButtonProps extends SearchCategoryButtonProps {
  showOptions: Signal<boolean>;
  filteredLabels: Signal<FetchedLabel[]>;
  submitButtonIsActive: Signal<boolean>;
  filterState: Signal<CreateExpenseFilterRequest>;
  cancelled: Signal<boolean>;
  removedFilter: Signal<boolean>;
}

export interface OptionsToolbarProps {
  editorStateString: string | undefined;
  filteredResults: {
    [key: string]: BeautifulMentionsItemData;
    value: string;
  }[];
  setFilteredResults: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: BeautifulMentionsItemData;
        value: string;
      }[]
    >
  >;
  submitButtonIsActive: Signal<boolean>;
}

export interface MentionsToolbarProps {
  showOptions: Signal<boolean>;
  ref?: React.Ref<HTMLDivElement>;
  // filteredMembers:Members;
  submitButtonIsActive: Signal<boolean>;
  expenseFilterState: Signal<CreateExpenseFilterRequest>;
  transferFilterState: Signal<CreateTransferFilterRequest>;
  cancelled: Signal<boolean>;
  removedFilter: Signal<boolean>;
  filteredPeople: Signal<FilteredPeople>;
  calendarIsOpen: Signal<boolean>;
  datePeriodClicked: Signal<string>;
  filteredLabels: Signal<FetchedLabel[]>;
  category: Signal<string>;
  showFreeTextPill: Signal<boolean>;
}
export interface SearchTransactionsProps {
  menu: Signal<string | null>;
  group: Group | null;
  userInfo: UserInfo | undefined;
  timeZoneId: string;
  expenseParsedFilters: Signal<ExpenseParsedFilters>;
  transferParsedFilters: Signal<TransferParsedFilters>;
  //nonGroupUsers?: Signal<User[]>;
}
export interface SearchTransactionAnimationProps {
  menu: Signal<string | null>;
  group: Group | null;
  userInfo: UserInfo | undefined;
  timeZoneId: string;
  expenseParsedFilters: Signal<ExpenseParsedFilters>;
  transferParsedFilters: Signal<TransferParsedFilters>;
  // nonGroupUsers?: Signal<User[]>;
}

export interface CycleSelectionProps {
  children: any;
  header: string;
}

export interface AnalyticsSelectionAnimationProps {
  menu: Signal<string | null>;
  header: string;
  children: any;
}

export interface AnalyticsYearSelectionAnimationProps
  extends AnalyticsSelectionAnimationProps { }

export interface AnalyticsTimePeriodSelectionAnimationProps
  extends AnalyticsSelectionAnimationProps { }

export interface TopBarWithBackButtonProps {
  header: string;
  onClick: MouseEventHandler<SVGElement>;
}

export interface CarouselProps {
  carouselItems: string[] | string[][];
  selectedTimeCycleIndex: Signal<number>;
  selectedCycle: Signal<Frequency>;
  cyclehaschanged: Signal<boolean>;
  menu: Signal<string | null>;
  selectedYear: Signal<number>;
}

export interface CycleOptionProps {
  selectedCycle: Signal<Frequency>;
  menu: Signal<React.SetStateAction<string | null>>;
  cyclehaschanged: Signal<boolean>;
}

export interface YearOptionProps {
  selectedYear: Signal<number>;
  menu: Signal<React.SetStateAction<string | null>>;
  selectedTimeCycleIndex: Signal<number>;
}

export interface CumulativeSpendingProps {
  selectedCycle: Signal<Frequency>;
  selectedYear: Signal<number>;
  currentWeekIndex: number;
  monthsAndDaysArrays: string[][];
  cyclehaschanged: Signal<boolean>;
  allWeeksPerYear: Date[][];
  menu: Signal<string | null>;
  selectedTimeCycleIndex: Signal<number>;
  startDate: Signal<string>;
  endDate: Signal<string>;
  currency: string;
  backendData: SpendingChartsResponse | undefined;
  isSuccess: boolean;
  timeZone: string;
}

export interface BarChartProps extends CumulativeSpendingProps { }
export interface TotalLentBorrowedProps extends CumulativeSpendingProps { }
export interface PeriodOptionProps {
  menu: Signal<string | null>;
  selectedCycle: Signal<Frequency>;
  selectedTimeCycleIndex: Signal<number>;
  monthsAndDaysArrays: string[][];
}

export interface SpendingCycleSelectorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  error?: boolean;
  children: any;
  open: boolean;
  inputError?: boolean;
}
export interface SpendingCycleInfoProps {
  menu: Signal<React.SetStateAction<string | null>>;
}

export interface ProgressBarProps {
  data: BudgetInfoResponse | undefined;
}
export interface ManageBudgetMenuProps {
  menu: Signal<string | null>;
}

export interface DeleteBudgetConfirmationAnimationProps {
  menu: Signal<string | null>;
  removeBudget: () => Promise<void>;
}

export interface ConfirmationForBudgetDeletionProps
  extends DeleteBudgetConfirmationAnimationProps { }
export interface ManageBudgetAnimationProps {
  menu: Signal<string | null>;
}

export interface CalendarProps {
  children: any;
  budgettype: Signal<Frequency>;
  calendarDay: Signal<string>;
}

export interface CalendarOptionsButtonProps {
  isactive: boolean;
}

export interface ConfirmationForBudgetSubmissionProps {
  submitBudget: () => Promise<void>;
  menu: Signal<React.SetStateAction<string | null>>;
}

export interface SetUpSpendingGoalProps {
  menu: Signal<string | null>;
  displayedAmount: Signal<string>;
  currency: string;
  submitBudgetErrors: Signal<any[]>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SpendingCycleProps {
  menu: Signal<React.SetStateAction<string | null>>;
  submitBudgetErrors: Signal<any[]>;
  calendarDay: Signal<string>;
  budgettype: Signal<Frequency>;
  isStale: boolean;
  openCalendar: Signal<boolean>;
  hasSwitchedBudgetType: Signal<boolean>;
}

export interface InfoBoxAnimationProps {
  menu: Signal<string | null>;
}

export interface CreateBudgetConfirmationAnimationProps {
  submitBudget: () => Promise<void>;
  menu: Signal<string | null>;
}

export interface ShareGroupProps {
  groupName: string;
  isPending: boolean;
  qrRef: React.RefObject<HTMLDivElement>;
  invitationCode: string | null;
  mutate: UseMutateFunction<
    any,
    Error,
    {
      groupId: string;
    },
    unknown
  >;
  groupId: string;
  setInvitationCode: React.Dispatch<React.SetStateAction<string | null>>;
  expires: string;
}
export interface RevokeAccessProps {
  groupId: string;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<GetJoinCodesResponse, unknown>,
      Error
    >
  >;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  data: InfiniteData<GetJoinCodesResponse, unknown> | undefined;
  groupName: string;

  invitationCode: string | null;
  mostRecentCodeHasBeenRevoked: Signal<boolean>;
}

export interface RevokeAccessItemProps {
  expires: string;
  id: string;
  maxUses: number;
  timesUsed: number;

  groupId: string;
  invitationCode: string | null;
  mostRecentCodeHasBeenRevoked: Signal<boolean>;
}

export interface LabelsDisplayProps {
  labels: Label[];
  setLabels: (labels: Label[]) => void;
  labelMenuIsOpen: Signal<boolean>;
}

export interface SendMenuWrapperInterface {
  title: string;
  idError: {
    isSenderError: boolean;
    isReceiverError: boolean;
    error: string;
  };
  showIdError: boolean;
  sortedMembers: ReadonlySignal<(Member | Guest)[]>;
  id: string;
  userMemberId: string | undefined;
  setId: (value: React.SetStateAction<string>) => void;
  setShowIdError: (value: React.SetStateAction<boolean>) => void;
}


export interface DetailedSharedExpenseTextProps {
  nonGroupGroup: Signal<Group | null> | undefined;
  isCreateExpense: boolean;
  isPendingCreateExpense: boolean;
  isPendingEditExpense: boolean;
  amountNumber: number;
  adjustParticipants: PickerMember[];
  setParticipants: (newParticipants: PickerMember[]) => void;
  participantsError: string;
  currencySymbol: string;
  participantsCategory: Signal<SplitMethod>;
  userMemberId: string;
  setParticipantsError: (msgOrUpdater: string | ((prev: string) => string)) => void;
  isnonGroupExpense: Signal<boolean> | undefined;
  userInfo: UserInfo;
  groupMembers: Signal<(Member | Guest)[]>;
  nonGroupUsers: Signal<User[]>;
  nonGroupMenu: Signal<string | null> | undefined
  adjustPayers: PickerMember[];
  setPayers: (newPayers: PickerMember[]) => void;
  payersError: string;
  setPayersError: (msgOrUpdater: string | ((prev: string) => string)) => void;
  payersCategory: Signal<SplitMethod>;
  isPersonal: Signal<boolean>;
  userExistsInCategory: Signal<Record<SplitCategory, boolean | undefined>>
}