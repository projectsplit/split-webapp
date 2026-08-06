import { Signal, signal } from '@preact/signals-react';
import MyButton from '@/components/MyButton/MyButton';
import LocationPicker from '@/components/LocationPicker/LocationPicker';
import { DateTime } from '@/components/DateTime';
import { StyledExpenseFormFooter } from './ExpenseFormFooter.styled';
import { GeoLocation, Coordinates, RecurrenceSchedule } from '@/types';
import RecurrencePicker from '@/components/RecurrencePicker/RecurrencePicker';

interface ExpenseFormFooterProps {
  onSubmit: () => void;
  isCreateExpense: boolean;
  isPendingCreateExpense: boolean;
  isPendingEditExpense: boolean;
  location: GeoLocation | undefined;
  isMapOpen: Signal<boolean>;
  timeZoneCoordinates: Coordinates;
  setLocation: (location: GeoLocation | undefined) => void;
  setDescriptionError: (value: string) => void;
  expenseTime: string;
  setExpenseTime: (value: string | ((prev: string) => string)) => void;
  timeZoneId: string;
  isDateShowing: Signal<boolean>;
  showPicker: boolean;
  setShowPicker: (value: boolean) => void;
  recurrenceSchedule: RecurrenceSchedule | null;
  setRecurrenceSchedule: (schedule: RecurrenceSchedule | null) => void;
  showRecurrencePicker: boolean;
  setShowRecurrencePicker: (value: boolean) => void;
  /** The zone the chosen day and time are read in. */
  timeZoneIdForSchedule: string;
  /** True while editing a series that is already running. */
  isExistingSeries: boolean;
  /** Editing an existing one-off expense cannot turn it into a series after the fact. */
  canRecur: boolean;
  /**
   * A template's date is the anchor its whole schedule was derived from, not something an edit can
   * move. Offering the picker there would be a control that silently does nothing.
   */
  canPickDate: boolean;
}

export const ExpenseFormFooter = ({
  onSubmit,
  isCreateExpense,
  isPendingCreateExpense,
  isPendingEditExpense,
  location,
  isMapOpen,
  timeZoneCoordinates,
  setLocation,
  setDescriptionError,
  expenseTime,
  setExpenseTime,
  timeZoneId,
  isDateShowing,
  showPicker,
  setShowPicker,
  recurrenceSchedule,
  setRecurrenceSchedule,
  showRecurrencePicker,
  setShowRecurrencePicker,
  canRecur,
  canPickDate,
  timeZoneIdForSchedule,
  isExistingSeries,
}: ExpenseFormFooterProps) => {
  return (
    <StyledExpenseFormFooter>
      <div className="submitButton">
        <MyButton
          fontSize="16"
          onClick={onSubmit}
          isLoading={
            isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
          }
        >
          Submit
        </MyButton>
      </div>
      <LocationPicker
        location={location}
        isMapOpen={isMapOpen}
        timeZoneCoordinates={timeZoneCoordinates}
        setLocation={setLocation}
        isCreateExpense={isCreateExpense}
        setDescriptionError={setDescriptionError}
      />
      {canPickDate && (
        <DateTime
          selectedDateTime={expenseTime}
          setSelectedDateTime={setExpenseTime}
          timeZoneId={timeZoneId}
          isEdit={!isCreateExpense}
          category={signal('Expense')}
          isDateShowing={isDateShowing}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
        />
      )}
      {canRecur && (
        <RecurrencePicker
          schedule={recurrenceSchedule}
          setSchedule={setRecurrenceSchedule}
          showPicker={showRecurrencePicker}
          setShowPicker={setShowRecurrencePicker}
          timeZoneId={timeZoneIdForSchedule}
          isExistingSeries={isExistingSeries}
        />
      )}
    </StyledExpenseFormFooter>
  );
};
