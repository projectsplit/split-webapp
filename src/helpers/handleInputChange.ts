import { Signal } from "@preact/signals-react";
import { currencyMask } from "./currencyMask";
import { removeCommas } from "./removeCommas";

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  currencySymbol: string,
  displayedAmount: Signal<string>,
  setAmount: (value: React.SetStateAction<string>) => void
) => {
  const newValue = currencyMask(e, currencySymbol).target.value;
  const numericValue = Number(removeCommas(newValue));
  if (numericValue <= 999999999999.99) {
    displayedAmount.value = newValue;
    setAmount(removeCommas(newValue));
  }
};
