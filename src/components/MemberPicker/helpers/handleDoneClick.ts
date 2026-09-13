import { Signal } from '@preact/signals-react';
import { PickerMember } from '../../../types';
import { validateMemberAmounts } from './validateMemberAmounts';

export const handleDoneClick = (
  description: string,
  memberAmounts: PickerMember[],
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMenu: Signal<string>,
  selectedCurrency: string,
  totalAmount: number,
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { memberType, hasNoSelection, areNumbersValid, isSumInvalid } =
    validateMemberAmounts(
      description,
      memberAmounts,
      selectedCurrency,
      totalAmount
    );

  if (hasNoSelection) {
    setError(`Select at least one ${memberType}`);
    errorMenu.value = 'amountsError';
    return;
  }

  setError(
    !areNumbersValid
      ? 'Amounts must be positive'
      : isSumInvalid
        ? 'Amounts must add up to total'
        : ''
  );

  if (!areNumbersValid || isSumInvalid) {
    errorMenu.value = 'amountsError';
    return;
  }

  setIsMenuOpen(false);
};
