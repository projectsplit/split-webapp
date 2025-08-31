import { Signal } from "@preact/signals-react";
import { currencyMask } from "./currencyMask";
import { removeCommas } from "./removeCommas";

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  currencySymbol: string,
  displayedAmount: Signal<string>,
  setAmount: (value: React.SetStateAction<string>) => void
) => {
  const oldDisplayedLength = displayedAmount.value.length;
  const rawLength = e.target.value.length;
  const isAddition = rawLength > oldDisplayedLength;
  const isDeletion = rawLength < oldDisplayedLength;
  const newValue = currencyMask(e, currencySymbol, displayedAmount.value,false).target.value;
  const clean = removeCommas(newValue);
  let numericValue = Number(clean);
  if (isNaN(numericValue)) {
    if (clean === '.' || clean === '') {
      if (isDeletion || clean === '') {
        displayedAmount.value = '';
        setAmount('');
      } else if (isAddition) {
        displayedAmount.value = '.';
        setAmount('0.');
      }
    }
  } else if (numericValue <= 999999999999.99) {
    displayedAmount.value = newValue;
    setAmount(clean.startsWith('.') ? '0' + clean : clean);
  }
};