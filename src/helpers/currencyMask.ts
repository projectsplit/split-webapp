import { significantDigitsFromTicker } from "./openExchangeRates";

export const currencyMask = (
  e: React.ChangeEvent<HTMLInputElement>,
  ticker: string,
  oldDisplayed: string
) => {
  const input = e.target;
  const originalValue = input.value;
  let cursorPosition = input.selectionStart ?? 0;
  let processingValue = originalValue;
  let isReplaced = false;
  let addedPos = -1;

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

  let value = oldValue;

  if (
    (value.match(/\./g) || []).length > 1 ||
    (value.match(/110/g) || []).length > 1
  ) {
    value = value.replace(/\.(?=[^.]*$)/, "").replace(/110(?=[^.]*$)/, "");
  }

  value = value.replace(/[^\d.]/g, "");
  value = value.replace(/^0+(?=\d)/, "");

  const decimalPoints = significantDigitsFromTicker(ticker.toUpperCase());

  const decimalIndex = value.indexOf(".");
  if (decimalIndex !== -1) {
    if (decimalPoints === 0) {
      value = value.slice(0, decimalIndex);
    } else {
      value = value.slice(0, decimalIndex + decimalPoints + 1);
    }
  }

  const cleanValue = value;

  if (decimalPoints >= 3) {
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    value = parts.join(".");
  } else {
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let isHiddenLeading = false;
  if (value.startsWith('0.') && value.length > 2) {
    value = value.slice(1);
    isHiddenLeading = true;
  } else if (value === '0.') {
    value = '.';
    isHiddenLeading = true;
  }

  input.value = value;

  const beforeCursor = oldValue.substring(0, cursorPosition);
  const commasBefore = (beforeCursor.match(/,/g) || []).length;
  const logicalPos = cursorPosition - commasBefore;

  const hasDot = cleanValue.includes('.');
  const cleanInt = hasDot ? cleanValue.slice(0, cleanValue.indexOf('.')) : cleanValue;
  const cleanIntLength = cleanInt.length;

  let commasBeforePos = 0;
  const maxK = Math.floor((cleanIntLength - 1) / 3);
  for (let k = 1; k <= maxK; k++) {
    const insertPos = cleanIntLength - 3 * k;
    if (insertPos < logicalPos) {
      commasBeforePos++;
    }
  }

  let newCursorPosition = logicalPos + commasBeforePos;
  if (hasDot && logicalPos > cleanIntLength) {
    newCursorPosition = cleanIntLength + commasBeforePos + (logicalPos - cleanIntLength);
  }

  if (isHiddenLeading && newCursorPosition > 0) {
    newCursorPosition -= 1;
  }

  newCursorPosition = Math.max(0, Math.min(newCursorPosition, value.length));

  input.setSelectionRange(newCursorPosition, newCursorPosition);

  return e;
};

function findAddedChar(oldStr: string, newStr: string): { pos: number; char: string } | null {
  if (newStr.length !== oldStr.length + 1) return null;
  for (let i = 0; i < oldStr.length; i++) {
    if (oldStr[i] !== newStr[i]) return { pos: i, char: newStr[i] };
  }
  return { pos: oldStr.length, char: newStr[oldStr.length] };
}