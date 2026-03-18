import { Frequency } from '@/types';
import { Signal } from '@preact/signals-react';

export const validateBudgetForm = (
  amount: string,
  description: string,
  scopeState: Signal<{
    none: boolean;
    personal: boolean;
    group: boolean;
    nonGroup: boolean;
  }>,
  step: number,
  budgetFrequency: Signal<Frequency>,
  targetGroupIds?: Signal<string[]>,
  startDate?: Signal<string>,
  endDate?: Signal<string>,
  commencementDay?: Signal<string>
) => {
  let amountError = '';
  let descriptionError = '';
  let spendingCycleError = '';
  let scopeError = '';
  let commencementDayError = '';

  if (step === 1) {
    if (amount === '') {
      amountError = 'Amount is required';
    } else if (Number(amount) <= 0) {
      amountError = 'Amount must be greater than 0';
    }

    if (
      budgetFrequency.value === Frequency.Weekly ||
      budgetFrequency.value === Frequency.Monthly
    ) {
      if (!commencementDay?.value) {
        commencementDayError = 'Commencement day must be provided.';
      }
    }

    if (budgetFrequency.value === Frequency.Custom) {
      const start = startDate?.value;
      const end = endDate?.value;

      if (!start || !end) {
        spendingCycleError = 'Start and end dates are required';
      } else {
        const startDateObj = new Date(start);
        const endDateObj = new Date(end);

        if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
          spendingCycleError = 'Invalid date format';
        } else if (startDateObj > endDateObj) {
          spendingCycleError = 'Start date must be before end date';
        }
      }

      const dayValue = commencementDay?.value?.trim();

      if (dayValue) {
        const dayAsNumber = parseInt(dayValue, 10);
        const weekdays = [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ];

        if (!isNaN(dayAsNumber)) {
          if (dayAsNumber < 1 || dayAsNumber > 31) {
            commencementDayError =
              'Commencement day must be between 1 and 31 or a weekday name.';
          }
        } else if (!weekdays.includes(dayValue.toLowerCase())) {
          commencementDayError =
            'Commencement day must be between 1 and 31 or a weekday name.';
        }
      }
    }
  } else {
    if (description === '') {
      descriptionError = 'Description is required';
    }

    const { personal, group, nonGroup } = scopeState.value;
    if (!personal && !group && !nonGroup) {
      scopeError = 'Scope is required';
    }

    if (targetGroupIds?.value && targetGroupIds.value.length > 0 && !group) {
      scopeError =
        'Target groups were provided but the "Group" scope is not selected.';
    }
  }

  return {
    amountError,
    descriptionError,
    spendingCycleError,
    scopeError,
    commencementDayError,
  };
};
