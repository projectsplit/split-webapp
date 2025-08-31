import { significantDigitsFromTicker } from "./openExchangeRates";

export const currencyMask = (
  e: React.ChangeEvent<HTMLInputElement>,
  ticker: string,
  oldDisplayed: string,
  allowNegative: boolean,
): React.ChangeEvent<HTMLInputElement> => {
  const input = e.target;
  const originalValue = input.value;
  let cursorPosition = input.selectionStart ?? 0;
  let processingValue = originalValue;
  let isReplaced = false;
  let addedPos = -1;

  // Handle comma replacement with period
  if (originalValue.length === oldDisplayed.length + 1) {
    const added = findAddedChar(oldDisplayed, originalValue);
    if (added && added.char === ',') {
      processingValue = oldDisplayed.slice(0, added.pos) + '.' + oldDisplayed.slice(added.pos);
      isReplaced = true;
      addedPos = added.pos;
    }
  }

  const oldValue = processingValue;
  const valueBeforeCursor = originalValue.substring(0, cursorPosition);
  let commasCountBeforeCursor = (valueBeforeCursor.match(/,/g) || []).length;

  if (isReplaced && addedPos < cursorPosition) {
    commasCountBeforeCursor -= 1;
  }

  let sign = '';
  if (allowNegative && oldValue.startsWith('-')) {
    sign = '-';
  }
  let value = sign ? oldValue.slice(1) : oldValue;
  const signLength = sign.length;
  const unsignedCursorPosition = cursorPosition - signLength;

  // Handle multiple dots
  if ((value.match(/\./g) || []).length > 1) {
    value = value.replace(/\.(?=[^.]*$)/, "");
  }

  // Remove non-numeric characters except dot and handle negative sign
  value = value.replace(/[^\d.]/g, "");
  if (!allowNegative) {
    value = value.replace(/^-/, "");
  }
  value = value.replace(/^0+(?=\d)/, "");

  const decimalPoints = significantDigitsFromTicker(ticker.toUpperCase());

  // Restrict decimal places without truncating integer part
  const decimalIndex = value.indexOf(".");
  if (decimalIndex !== -1) {
    if (decimalPoints === 0) {
      value = value.slice(0, decimalIndex);
    } else {
      value = value.slice(0, decimalIndex + decimalPoints + 1);
    }
  }

  const cleanValue = value;

  // Add commas for thousands
  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  value = parts.join(".");

  let isHiddenLeading = false;
  if (value.startsWith('0.') && value.length > 2) {
    value = value.slice(1);
    isHiddenLeading = true;
  } else if (value === '0.') {
    value = '.';
    isHiddenLeading = true;
  }

  input.value = sign + value;

  // Calculate new cursor position
  const cleanInt = cleanValue.includes('.') ? cleanValue.slice(0, cleanValue.indexOf('.')) : cleanValue;
  const cleanIntLength = cleanInt.length;
  const newValueInt = value.includes('.') ? value.slice(0, value.indexOf('.')) : value;
  const newCommas = (newValueInt.match(/,/g) || []).length;

  // Adjust cursor position based on the difference in commas
  let newCursorPosition = unsignedCursorPosition;

  // If cursor is before a comma that was added, adjust it
  const newValueBeforeCursor = (sign + value).substring(0, newCursorPosition + signLength);
  const newCommasBeforeCursor = (newValueBeforeCursor.match(/,/g) || []).length;
  newCursorPosition += newCommasBeforeCursor - commasCountBeforeCursor;

  if (isHiddenLeading && newCursorPosition > 0) {
    newCursorPosition -= 1;
  }

  if (cleanValue.includes('.') && unsignedCursorPosition > cleanIntLength) {
    newCursorPosition = cleanIntLength + newCommas + (unsignedCursorPosition - cleanIntLength);
  }

  newCursorPosition += signLength;
  newCursorPosition = Math.max(0, Math.min(newCursorPosition, input.value.length));

  input.setSelectionRange(newCursorPosition, newCursorPosition);

  return e;
};

export function findAddedChar(oldStr: string, newStr: string): { pos: number; char: string } | null {
  if (newStr.length !== oldStr.length + 1) return null;
  for (let i = 0; i < oldStr.length; i++) {
    if (oldStr[i] !== newStr[i]) return { pos: i, char: newStr[i] };
  }
  return { pos: oldStr.length, char: newStr[oldStr.length] };
}