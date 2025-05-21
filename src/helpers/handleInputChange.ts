import { currencyMask } from "./currencyMask";
import { removeCommas } from "./removeCommas";
import { ExpenseFormAction } from "../types";

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  currencySymbol: string,
  dispatch: (value: ExpenseFormAction) => void
) => {
  const newValue = currencyMask(e, currencySymbol).target.value;
  const numericValue = Number(removeCommas(newValue));
  if (numericValue <= 999999999999.99) {
    dispatch({ type: "SET_DISPLAYED_AMOUNT", payload:newValue });
    dispatch({ type: "SET_AMOUNT", payload:removeCommas(newValue)});
  }
};
