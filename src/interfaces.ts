import { CSSProperties } from "react";
import { ExpenseItem, Frequency, PickerMember, TransferItem } from "./types";

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
  submitButtonIsActive?: boolean;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export interface LoadingSpinnerProps {
  name: string;
  fontSize: number;
}

export interface OptionsContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
  hasarrow: boolean | string;
}

export interface TreeAdjustedContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
  hasarrow: boolean | string;
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
  children: any;
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
