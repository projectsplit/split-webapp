import { useEffect, useRef, useState } from 'react';
import { StyledBottomDatePickerOverlay } from './BottomDatePicker.styled';
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker';

import { Signal } from '@preact/signals-react';

interface BottomDatePickerProps {
  isOpen: Signal<boolean>;
  pickingTarget: Signal<'start' | 'end' | null>;
  startDate: Signal<string>;
  endDate: Signal<string>;
  timeZoneId: string;
  datePeriodClicked: Signal<string>;
  setError: (
    key:
      | 'amountError'
      | 'descriptionError'
      | 'spendingCycleError'
      | 'scopeError'
      | 'showAmountError'
      | 'showDescriptionError'
      | 'showSpendingCycleError'
      | 'showScopeError'
      | 'commencementDayError'
      | 'showCommencementDayError',
    value: string | boolean
  ) => void;
}

export default function BottomDatePicker({
  isOpen,
  pickingTarget,
  startDate,
  endDate,
  timeZoneId,
  datePeriodClicked,
  setError,
}: BottomDatePickerProps) {
  const lastClickRef = useRef<HTMLElement | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<string>(
    pickingTarget.value === 'start' && startDate.value
      ? new Date(startDate.value).toISOString()
      : pickingTarget.value === 'end' && endDate.value
        ? new Date(endDate.value).toISOString()
        : new Date().toISOString()
  );

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      lastClickRef.current = e.target as HTMLElement;
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  const close = () => {
    isOpen.value = false;
    pickingTarget.value = null;
  };

  const handleDateSelection = (
    newValue: string | ((prev: string) => string)
  ) => {
    let finalValue = '';
    if (typeof newValue === 'function') {
      finalValue = newValue(selectedDateTime);
    } else {
      finalValue = newValue;
    }

    setSelectedDateTime(finalValue);

    // Navigation clicks (month/year arrows) should not close
    if (lastClickRef.current?.closest('.top-menu')) {
      return;
    }

    if (pickingTarget.value === 'start') {
      startDate.value = finalValue;
    } else if (pickingTarget.value === 'end') {
      endDate.value = finalValue;
    } else if (!startDate.value) {
      startDate.value = finalValue;
    } else {
      endDate.value = finalValue;
    }

    setError('spendingCycleError', '');
    setError('showSpendingCycleError', false);
    setError('commencementDayError', '');
    setError('showCommencementDayError', false);
    close();
  };

  const title =
    pickingTarget.value === 'end' ? 'Select End Date' : 'Select Start Date';

  return (
    <StyledBottomDatePickerOverlay>
      <div className="backdrop" onClick={close} />
      <div className="sheet">
        <div className="sheet-header">
          <div className="sheet-title">{title}</div>
        </div>
        <div className="calendar-container">
          <DateTimePicker
            selectedDateTime={selectedDateTime}
            setSelectedDateTime={handleDateSelection}
            timeZoneId={timeZoneId}
            showTimeControls={false}
            datePeriodClicked={datePeriodClicked}
            calendarIsOpen={isOpen}
          />
        </div>
      </div>
    </StyledBottomDatePickerOverlay>
  );
}
