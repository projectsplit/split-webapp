import { CSSProperties } from "react";
import {
  ExpenseItem,
  FormExpense,
  Frequency,
  Group,
  PickerMember,
  TransferItem,
} from "./types";
import { Signal } from "@preact/signals-react";
import { StringUnitLength } from "luxon";

export interface ExpenseProps {
  expense: ExpenseItem;
  timeZoneId: string;
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
  submitbuttonisactive?: boolean;
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

export interface QRscannerProps {
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
export interface SettingsMenuAnimationProps extends MenuProps {}
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
}

export interface TopMenuProps {
  title: string;
  menu: Signal<string | null>;
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
