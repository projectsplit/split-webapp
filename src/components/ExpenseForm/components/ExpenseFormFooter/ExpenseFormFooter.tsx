import { Signal, signal } from "@preact/signals-react";
import MyButton from "@/components/MyButton/MyButton";
import LocationPicker from "@/components/LocationPicker/LocationPicker";
import { DateTime } from "@/components/DateTime";
import { StyledExpenseFormFooter } from "./ExpenseFormFooter.styled";
import { GeoLocation, Coordinates } from "@/types";

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
      <DateTime
        selectedDateTime={expenseTime}
        setSelectedDateTime={setExpenseTime}
        timeZoneId={timeZoneId}
        isEdit={!isCreateExpense}
        category={signal("Expense")}
        isDateShowing={isDateShowing}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
      />
    </StyledExpenseFormFooter>
  );
};
