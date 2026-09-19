import currency from 'currency.js';
import { significantDigitsFromTicker } from '../../../helpers/openExchangeRates';
import { PickerMember } from '../../../types';

export const validateMemberAmounts = (
  description: string,
  memberAmounts: PickerMember[],
  selectedCurrency: string,
  totalAmount: number
) => {
  const isParticipants = description === 'Participants';
  const memberType = isParticipants ? 'participant' : 'payer';
  const selectedMembers = memberAmounts.filter((p) => p.selected);
  const hasNoSelection =
    memberAmounts.length === memberAmounts.filter((p) => !p.selected).length;

  const areNumbersValid = selectedMembers.every(
    (x) => x.actualAmount !== 'NaN' && Number(x.actualAmount) > 0
  );

  const decimal = significantDigitsFromTicker(selectedCurrency);
  const isSumInvalid =
    selectedMembers.length > 0 &&
    (decimal >= 3
      ? Number(
          selectedMembers
            .reduce((acc, payer) => acc + Number(payer.actualAmount), 0)
            .toFixed(decimal)
        ) !== Number(Number(totalAmount).toFixed(decimal))
      : selectedMembers.reduce(
          (acc, payer) => currency(acc).add(payer.actualAmount).value,
          0
        ) !== currency(totalAmount).value);

  return { memberType, hasNoSelection, areNumbersValid, isSumInvalid };
};
