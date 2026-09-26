import { PickerMember } from '../../../types';
import { Signal } from '@preact/signals-react';
import { validateMemberAmounts } from './validateMemberAmounts';

export const errorSettingFn = (
  description: string,
  memberAmounts: PickerMember[],
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMenu: Signal<string>,
  selectedCurrency: string,
  totalAmount: number
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
    !areNumbersValid && description === 'Participants'
      ? 'Participation amounts must be positive'
      : !areNumbersValid && description === 'Payers'
        ? 'Payment amounts must be positive'
        : isSumInvalid
          ? 'Review amounts due to edit'
          : ''
  );
};
