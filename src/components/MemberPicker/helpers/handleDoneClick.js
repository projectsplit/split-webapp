import { significantDigitsFromTicker } from '../../../helpers/openExchangeRates';
import currency from 'currency.js';
export const handleDoneClick = (description, memberAmounts, setError, errorMenu, selectedCurrency, totalAmount, setIsMenuOpen) => {
    const isParticipants = description === 'Participants';
    const memberType = isParticipants ? 'participant' : 'payer';
    const selectedMembers = memberAmounts.filter((p) => p.selected);
    if (memberAmounts.length === memberAmounts.filter((p) => !p.selected).length) {
        setError(`Select at least one ${memberType}`);
        errorMenu.value = 'amountsError';
        return;
    }
    const areNumbersValid = selectedMembers.every((x) => x.actualAmount !== 'NaN' && Number(x.actualAmount) > 0);
    const decimal = significantDigitsFromTicker(selectedCurrency);
    const isSumInvalid = selectedMembers.length > 0 &&
        (decimal >= 3
            ? Number(selectedMembers
                .reduce((acc, payer) => acc + Number(payer.actualAmount), 0)
                .toFixed(decimal)) !== Number(Number(totalAmount).toFixed(decimal))
            : selectedMembers.reduce((acc, payer) => currency(acc).add(payer.actualAmount).value, 0) !== currency(totalAmount).value);
    setError(!areNumbersValid
        ? 'Amounts must be positive'
        : isSumInvalid
            ? 'Amounts must add up to total'
            : '');
    if (!areNumbersValid || isSumInvalid) {
        errorMenu.value = 'amountsError';
        return;
    }
    setIsMenuOpen(false);
};
