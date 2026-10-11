import { Signal } from '@preact/signals-react';
import { currencyMask } from './currencyMask';
import { removeCommas } from './removeCommas';
import {
  editAmountExpression,
  evaluateAmountExpression,
  hasOperator,
  isValidAmount,
} from './amountExpression';

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  currencySymbol: string,
  displayedAmount: Signal<string>,
  setAmount: (value: string) => void
) => {
  const input = e.target;
  if (hasOperator(input.value) || hasOperator(displayedAmount.value)) {
    const edit = editAmountExpression(
      input.value,
      input.selectionStart ?? input.value.length,
      displayedAmount.value,
      currencySymbol,
      (e.nativeEvent as InputEvent).inputType === 'deleteContentForward'
    );
    if (!edit) return;
    input.value = edit.text;
    if (input === document.activeElement) {
      input.setSelectionRange(edit.caret, edit.caret);
    }
    if (hasOperator(edit.text)) {
      displayedAmount.value = edit.text;
      const result = evaluateAmountExpression(edit.text, currencySymbol);
      setAmount(result !== null && isValidAmount(result) ? String(result) : '');
      return;
    }
    // The last operator is gone, so what is left is a plain number for the mask below.
  }

  const oldDisplayedLength = displayedAmount.value.length;
  const rawLength = e.target.value.length;
  const isAddition = rawLength > oldDisplayedLength;
  const isDeletion = rawLength < oldDisplayedLength;
  const newValue = currencyMask(e, currencySymbol, displayedAmount.value, false)
    .target.value;
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
