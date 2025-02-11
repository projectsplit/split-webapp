export const currencyMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const oldValue = input.value;
    const oldCursorPosition = input.selectionStart;
    // console.log('old pos', oldCursorPosition)

    const valueBeforeCursor = oldValue.substring(0, oldCursorPosition ?? 0);
    const commasCountBeforeCursor = (valueBeforeCursor.match(/,/g) || []).length;
    let value = oldValue;

    // Prevent multiple dots (decimal points)
    if (
      (value.match(/\./g) || []).length > 1 ||
      (value.match(/110/g) || []).length > 1
    ) {
      // If there are already multiple dots, remove the last one
      value = value.replace(/\.(?=[^.]*$)/, "").replace(/110(?=[^.]*$)/, "");
    }
    // Remove all non-digit characters except the dot (.)
    value = value.replace(/[^\d.]/g, "");
    // Remove leading zeros before the decimal point
    value = value.replace(/^0+(?=\d)/, "");
    // Separate thousands with commas
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Ensure only up to two decimal places are allowed
    const decimalIndex = value.indexOf(".");
    if (decimalIndex !== -1) {
      value = value.slice(0, decimalIndex + 3); // Keep only up to 2 decimal places
    }

    input.value = value;

    const diff = value.length - oldValue.length;
    const commasCountAdded = (value.substring(0, oldCursorPosition ?? 0).match(/,/g) || []).length - commasCountBeforeCursor;

    let newCursorPosition = Math.max(0, oldCursorPosition ?? + diff)

    if (commasCountAdded > 0) {
      newCursorPosition += 1;

    }
    if (commasCountAdded < 0) {
      newCursorPosition -= 1;

    }

    if (commasCountAdded === 0 && diff === -1) {

      if (newCursorPosition === 0) {
        newCursorPosition = 0
      } else {
        newCursorPosition -= 1;
      }
    }

    input.setSelectionRange(newCursorPosition, newCursorPosition);

    return e;

  };