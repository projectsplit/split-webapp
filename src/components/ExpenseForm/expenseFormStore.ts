import { GeoLocation, Label } from "../../types";

interface ExpenseState {
  amount: string;
  description: string;
  labels: Label[];
  expenseTime: string;
  location: GeoLocation | undefined;
  currencySymbol: string;
  amountError: string;
  showAmountError: boolean;
  participantsError: string;
  payersError: string;
  descriptionError: string;
  isSubmitting: boolean;
}
