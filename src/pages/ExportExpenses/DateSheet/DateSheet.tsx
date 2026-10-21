import { useEffect, useRef, useState } from 'react';
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker';
import { StyledBottomDatePickerOverlay } from '@/pages/Budget/BottomDatePicker/BottomDatePicker.styled';
import { dayToPickerIso, pickerIsoToDay } from '../helpers/period';

interface DateSheetProps {
  target: 'start' | 'end';
  /** yyyy-MM-dd */
  day: string;
  timeZone: string;
  onPick: (day: string) => void;
  onClose: () => void;
}

/**
 * The budget form's date dialog, without its form plumbing: one calendar, and the sheet closes
 * on the day that is tapped.
 */
export const DateSheet = ({
  target,
  day,
  timeZone,
  onPick,
  onClose,
}: DateSheetProps) => {
  const lastClickRef = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState<string>(() =>
    dayToPickerIso(day, timeZone)
  );

  // The month and year arrows go through the same setter as a day. Remembering what was last
  // pressed is how a browse is told apart from a choice.
  useEffect(() => {
    const remember = (event: MouseEvent) => {
      lastClickRef.current = event.target as HTMLElement;
    };
    document.addEventListener('mousedown', remember);
    return () => document.removeEventListener('mousedown', remember);
  }, []);

  const handleChange = (next: string | ((prev: string) => string)) => {
    const value = typeof next === 'function' ? next(selected) : next;
    setSelected(value);

    if (lastClickRef.current?.closest('.top-menu')) return;

    onPick(pickerIsoToDay(value, timeZone));
  };

  return (
    <StyledBottomDatePickerOverlay>
      <div className="backdrop" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-header">
          <div className="sheet-title">
            {target === 'start' ? 'From' : 'To'}
          </div>
        </div>
        <div className="calendar-container">
          <DateTimePicker
            selectedDateTime={selected}
            setSelectedDateTime={handleChange}
            timeZoneId={timeZone}
            showTimeControls={false}
          />
        </div>
      </div>
    </StyledBottomDatePickerOverlay>
  );
};
