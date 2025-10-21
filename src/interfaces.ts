import { CSSProperties, MouseEventHandler } from "react";
import {
  Coordinates,
  Debt,
  ExpenseResponseItem,
  FetchedMembers,
  FetchedLabel,
  FilteredMembers,
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
} from "./types";
import { Signal } from "@preact/signals-react";
import { EditorState } from "lexical";
import {
  BeautifulMentionsItem,
  BeautifulMentionsItemData,
  BeautifulMentionsMenuProps,
} from "lexical-beautiful-mentions";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  UseMutateFunction,
} from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";

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
  transactions: {
    memberId: string;
    amount: number;
  }[];
  areShares: boolean;
  currency: string;
  members: TruncatedMember[];
  userMemberId: string;
}

export interface DetailedExpenseProps {
  timeZoneId: string;
  timeZoneCoordinates: Coordinates;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  payments: Payment[];
  shares: Share[];
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
  members: TruncatedMember[];
  errorMessage: Signal<string>;
  userMemberId: string;
  group: Group;
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
  isDateShowing: Signal<boolean>;
}

export interface DateTimeProps {
  selectedDateTime: string;
  setSelectedDateTime: React.Dispatch<React.SetStateAction<string>>;
  timeZoneId: string;
  isEdit: boolean;
  withLexicalContext?: boolean;
  category: Signal<string>;
  isDateShowing: Signal<boolean>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  showPicker: boolean;
}

export interface DateDisplayProps {
  timeZoneId: string;
  selectedDateTime: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  isDateShowing: Signal<boolean>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MemberPickerProps {
  totalAmount: number;
  memberAmounts: PickerMember[];
  setMemberAmounts: (newParticipants: PickerMember[]) => void;
  description: "Participants" | "Payers";
  error?: string;
  // group: Group;
  selectedCurrency: string;
  category: Signal<string>;
  userMemberId: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isnonGroupExpense: boolean|undefined;
  userId: string;
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
  isDateShowing: Signal<boolean>;
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
  location: Signal<GeoLocation | undefined>;
  timeZoneCoordinates: Coordinates;
}

export interface LocationDisplayProps {
  location: Signal<GeoLocation | undefined>;
  isMapOpen: Signal<boolean>;
}
export interface PlacePickerProps {
  location: Signal<GeoLocation | undefined>;
  isMapOpen: Signal<boolean>;
  defaultCoordinates: Coordinates;
}

export interface PlacePickerAnimationProps extends PlacePickerProps {}
export interface TimeZoneOptionsAnimationProps {
  clickHandler: (curr: string) => void;
  timeZoneMenu: Signal<string | null>;
  userInfo: UserInfo | undefined;
}
export interface LabelPickerProps {
  labels: Label[];
  setLabels: React.Dispatch<React.SetStateAction<Label[]>>;
  groupId?: string;
}

export interface LabelMenuProps {
  labelMenuIsOpen: Signal<boolean>;
  labels: Label[];
  setLabels: React.Dispatch<React.SetStateAction<Label[]>>;
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

export interface MenuAnimationBackgroundProps extends MenuProps {}
export interface SettingsMenuAnimationProps extends MenuProps {
  userInfo: UserInfo | undefined;
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
  isPersonal?: boolean;
  allGroupMembers: (Member | Guest)[];
  currency: string;
  isnonGroupExpense?: boolean;
  allNonGroupUsers: User[];
}

export interface NewTransferAnimationProps {
  group: Group;
  timeZoneId: string;
  menu: Signal<string | null>;
}

export interface ExpenseFormProps {
  allGroupMembers: (Member | Guest)[];
  allNonGroupUsers: Signal<User[]>;
  groupId?: string;
  expense: FormExpense | null;
  timeZoneId: string;
  menu: Signal<string | null>;
  timeZoneCoordinates: Coordinates;
  header: string;
  selectedExpense?: Signal<ExpenseResponseItem | null>;
  isCreateExpense: boolean;
  isPersonal?: boolean;
  isnonGroupExpense?: boolean;
  currency: string;
  nonGroupMenu?: Signal<string | null>;
}

export interface EditExpenseFormProps extends ExpenseFormProps {
  selectedExpense?: Signal<ExpenseResponseItem | null>;
}

export interface TransferFormProps {
  group: Group;
  timeZoneId: string;
  menu: Signal<string | null>;
}

export interface GroupQuickActionsAnimationProps extends MenuProps {}
export interface HomeQuickActionsAnimationProps extends MenuProps {
  isNonGroupExpense: Signal<boolean>;
}
export interface NonGroupUsersAnimationProps extends MenuProps {
  nonGroupUsers: Signal<User[]>;
  isPersonal: Signal<boolean>;
}
export interface NonGroupUsersProps extends MenuProps {
  nonGroupUsers: Signal<User[]>;
  isPersonal: Signal<boolean>;
}
export interface LocationPickerAnimationProps extends MenuProps {
  location: GeoLocation | undefined;
  setLocation: React.Dispatch<React.SetStateAction<GeoLocation | undefined>>;
}
export interface UserItemProps {
  name: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export interface GroupQuickActionsMenuprops extends MenuProps {}
export interface HomeQuickActionsMenuprops extends MenuProps {
  isNonGroupExpense: Signal<boolean>;
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
  memberId: string;
  name: string;
  isLogedUser: boolean;
  menu: Signal<string | null>;
  memberIdSelectedToSettleUp: Signal<string>;
  members: TruncatedMember[];
  isGuest: boolean;
  totalSpent: Record<string, Record<string, number>>;
  group: Group;
  guestToBeReplaced: Signal<{ guestId: string; guestName: string }>;
}

export interface RenderScenariosProps {
  memberTransactions: GroupedTransaction[];
  pendingTransactions: Debt[];
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
  pendingTransactions: Debt[];
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
  pendingTransactions: Debt[];
  memberTransactions: GroupedTransaction[];
  memberId: string;
  isLogedUser: boolean;
  isOwed: boolean;
  name: string;
  members: TruncatedMember[];
}

export interface DescriptionAndTreeProps {
  memberTransactions: GroupedTransaction[];
  pendingTransactions: Debt[];
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
  children: any;
}

export interface SettleUpAnimationProps {
  menu: Signal<string | null>;
  pendingTransactions: Debt[];
  memberIdSelectedToSettleUp: Signal<string>;
  members: TruncatedMember[];
}
export interface SettleUpOptionsProps {
  pendingTransactions: Debt[];
  memberIdSelectedToSettleUp: Signal<string>;
  menu: Signal<string | null>;
  members: TruncatedMember[];
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
  groupName: string | undefined;
  guestToBeReplaced?: { guestId: string; guestName: string };
}

export interface SearchUsersToInviteProps extends MenuProps {
  groupName: string | undefined;
  guestToBeReplaced?: { guestId: string; guestName: string };
}
export interface DetailedExpenseAnimationProps extends DetailedExpenseProps {}

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
export interface RemoveGuestWarningProps extends MenuProps {}
export interface ParticipantsPayersErrorMenuProps extends MenuProps {
  error: string | undefined;
}
export interface RemoveGuestWarningAnimationProps extends MenuProps {}
export interface ParticipantsPayersAnimationProps extends MenuProps {
  error: string | undefined;
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
  category: Signal<String>;
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
  enhancedMembersWithProps: EnhancedMembersWithProps;
  submitButtonIsActive: Signal<boolean>;

  labels: FetchedLabel[];
  expenseFilterState: Signal<CreateExpenseFilterRequest>;
  transferFilterState: Signal<CreateTransferFilterRequest>;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState | null>>;
  contentEditableHeight: number;
  members: FetchedMembers | undefined;
  cancelled: Signal<boolean>;
  filteredMembers: Signal<FilteredMembers>;
  timeZoneId: string;
  filteredLabels: Signal<FetchedLabel[]>;
  category: Signal<string>;
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
    BeautifulMentionsMenuProps {}

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

export interface MembersPillsDisplayProps {
  category: string;
  filteredMembers: Signal<FilteredMembers>;
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

export interface SearchMemberButtonProps extends SearchCategoryButtonProps {
  showOptions: Signal<boolean>;
  filteredMembers: Signal<FilteredMembers>;
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
  filteredMembers: Signal<FilteredMembers>;
  calendarIsOpen: Signal<boolean>;
  datePeriodClicked: Signal<string>;
  filteredLabels: Signal<FetchedLabel[]>;
  category: Signal<string>;
  showFreeTextPill: Signal<boolean>;
}
export interface SearchTransactionsProps {
  menu: Signal<string | null>;
  group: Group;
  userInfo: UserInfo | undefined;
  timeZoneId: string;
  expenseParsedFilters: Signal<ExpenseParsedFilters>;
  transferParsedFilters: Signal<TransferParsedFilters>;
}
export interface SearchTransactionAnimationProps {
  menu: Signal<string | null>;
  group: Group;
  userInfo: UserInfo | undefined;
  timeZoneId: string;
  expenseParsedFilters: Signal<ExpenseParsedFilters>;
  transferParsedFilters: Signal<TransferParsedFilters>;
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
  extends AnalyticsSelectionAnimationProps {}

export interface AnalyticsTimePeriodSelectionAnimationProps
  extends AnalyticsSelectionAnimationProps {}

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
}

export interface BarChartProps extends CumulativeSpendingProps {}
export interface TotalLentBorrowedProps extends CumulativeSpendingProps {}
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
  extends DeleteBudgetConfirmationAnimationProps {}
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
  setLabels: React.Dispatch<React.SetStateAction<Label[]>>;
  labelMenuIsOpen: Signal<boolean>;
}
