import React from "react";
import { StyledSpendingCycle } from "./SpendingCycle.styled";
import IonIcon from "@reacticons/ionicons";
import SpendingCycleSelector from "../../SpendingCycleSelector/SpendingCycleSelector";
import { getWeekday } from "../../../../helpers/getWeekDay";
import { getOrdinalSuffix } from "../../../../helpers/getOrdinalSuffix";
import CalendarOptionsButton from "../../CalendarOptionButton/CalendarOptionsButton";
import Calendar from "../../Calendar/Calendar";
import { Frequency } from "../../../../types";
import { SpendingCycleProps } from "../../../../interfaces";
import { useQueryClient } from "@tanstack/react-query";
import CustomDateCalendar from "../../CustomDateCalendar/CustomDateCalendar";

export default function SpendingCycle({
  submitBudgetErrors,
  calendarDay,
  budgettype,
  menu,
  isStale,
  openCalendar,
  hasSwitchedBudgetType,
  timeZoneId,
  openCustomDateCalendar,
  startDate,
  endDate,
  pickingTarget,
}:
  SpendingCycleProps) {
  const queryClient = useQueryClient();

  const getDayNumber = (day: string): string | null => {
    const index = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].indexOf(day);
    if (index !== -1) return (index + 1).toString();
    return null;
  };

  const daysArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const monthDaysArray = Array.from({ length: 5 }, (_, weekIndex) =>
    weekIndex < 4
      ? Array.from({ length: 7 }, (_, dayIndex) => weekIndex * 7 + dayIndex + 1)
      : [29, 30, 31, "", "", "", ""]
  );

  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };


  const calendarTypeHandler = (budgetType: Frequency) => {
    if (calendarDay.value !== "" && budgetType === budgettype.value) {
      budgettype.value = budgetType;
    } else {
      budgettype.value = budgetType;
      calendarDay.value = "";
    }

    if (budgetType === Frequency.Custom) {
      if (startDate.value === "" && endDate.value === "") {
        openCustomDateCalendar.value = true;
        pickingTarget.value = "start";
      }
    } else {
      openCustomDateCalendar.value = false;
      startDate.value = "";
      endDate.value = "";
    }

    if (!hasSwitchedBudgetType.value || isStale) {
      queryClient.invalidateQueries({ queryKey: ["budget"], exact: false });
    }
    if (!hasSwitchedBudgetType.value) {
      //setHasSwitchedBudgetType(true);
      hasSwitchedBudgetType.value = true;
    }
  };

  React.useEffect(() => {
    if (
      budgettype.value === Frequency.Custom &&
      startDate.value !== "" &&
      endDate.value === "" &&
      !openCustomDateCalendar.value
    ) {
      openCustomDateCalendar.value = true;
      pickingTarget.value = "end";
    }
  }, [startDate.value]);

  return (
    <StyledSpendingCycle>
      <div className="spendingCycleHeader">
        <div className="prompt">Select your spending cycle</div>
        <IonIcon
          onClick={() => (menu.value = "infoBox")}
          name="information-circle-outline"
          className="information"
        />
      </div>
      <div className="calendarAndErrorsWrapper">
        <SpendingCycleSelector
          onClick={() => {
            openCalendar.value = !openCalendar.value;
          }}
          open={openCalendar.value}
          inputError={submitBudgetErrors.value.find(
            (item) => item.field === "Day" || item.field === "BudgetType"
          )}
        >
          {budgettype.value === Frequency.Custom ? (
            !startDate.value ? (
              <span onClick={(e) => {
                e.stopPropagation();
                pickingTarget.value = "start";
                openCustomDateCalendar.value = true;
              }}>
                Select start date
              </span>
            ) : !endDate.value ? (
              <div className="customPropmtPills">
                <span onClick={(e) => {
                  e.stopPropagation();
                  pickingTarget.value = "start";
                  openCustomDateCalendar.value = true;
                }}>
                  {formatDate(startDate.value)}
                </span>
                {" "} - {" "}
                <span onClick={(e) => {
                  e.stopPropagation();
                  pickingTarget.value = "end";
                  openCustomDateCalendar.value = true;
                }}>
                  Select end date
                </span>
              </div>
            ) : (
              <div className="customPropmtPills">
                <span onClick={(e) => {
                  e.stopPropagation();
                  pickingTarget.value = "start";
                  openCustomDateCalendar.value = true;
                }}>
                  {formatDate(startDate.value)}
                </span>
                {" "} - {" "}
                <span onClick={(e) => {
                  e.stopPropagation();
                  pickingTarget.value = "end";
                  openCustomDateCalendar.value = true;
                }}>
                  {formatDate(endDate.value)}
                </span>
              </div>
            )
          ) : calendarDay.value === "" ? (
            budgettype.value === Frequency.Monthly ? (
              "Monthly"
            ) : (
              "Weekly"
            )
          ) : budgettype.value === Frequency.Monthly ? (
            <div className="monthlyPropmt">
              Monthly on the {calendarDay.value}{" "}
              <sup className="sup">{getOrdinalSuffix(calendarDay.value)}</sup>
            </div>
          ) : (
            <>Weekly on {getWeekday(getDayNumber(calendarDay.value))}</>
          )}
        </SpendingCycleSelector>
        {submitBudgetErrors.value.find(
          (item) => item.field === "Day" || item.field === "BudgetType"
        ) && (
            <span className="errorMsg">
              {
                submitBudgetErrors.value.find(
                  (item) => item.field === "Day" || item.field === "BudgetType"
                ).errorMessage
              }
            </span>
          )}
      </div>

      <div className="categoryButtons">
        {openCalendar.value && (
          <>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(Frequency.Monthly);
              }}
              isactive={budgettype.value === Frequency.Monthly}
            >
              Monthly
            </CalendarOptionsButton>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(Frequency.Weekly);
              }}
              isactive={budgettype.value === Frequency.Weekly}
            >
              Weekly
            </CalendarOptionsButton>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(Frequency.Custom);
              }}
              isactive={budgettype.value === Frequency.Custom}
            >
              Custom
            </CalendarOptionsButton>
          </>
        )}
      </div>

      {openCalendar.value && budgettype.value !== Frequency.Custom && (
        <Calendar
          // setCalendarDay={setCalendarDay}
          budgettype={budgettype}
          calendarDay={calendarDay}
        >
          {budgettype.value === Frequency.Monthly ? monthDaysArray : daysArray}
        </Calendar>
      )}
      {openCustomDateCalendar.value && budgettype.value === Frequency.Custom && (
        <CustomDateCalendar
          calendarIsOpen={openCustomDateCalendar}
          datePeriodClicked={calendarDay}
          timeZoneId={timeZoneId}
          startDate={startDate}
          endDate={endDate}
          pickingTarget={pickingTarget}
        />
      )}
    </StyledSpendingCycle >
  );
}
