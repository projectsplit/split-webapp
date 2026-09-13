import { useEffect, useRef, useState } from 'react';
import { FaRepeat } from 'react-icons/fa6';
import { DateTime } from 'luxon';
import ScrollPicker from '@/components/ScrollPicker/ScrollPicker';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';
import { RecurrenceFrequency, RecurrenceSchedule } from '@/types';
import {
  daysInMonthForPicker,
  defaultScheduleFor,
  firstOccurrenceLabel,
  monthShortNames,
  recurrenceFrequencyLabel,
  recurrenceFrequencyOptions,
  requiresDayOfMonth,
  requiresDayOfWeek,
  requiresMonth,
  scheduleTimeLabel,
  weekDayShortNames,
} from '@/helpers/recurrence';
import {
  StyledRecurrenceMenu,
  StyledRecurrencePicker,
  StyledRecurrenceBackdrop,
} from './RecurrencePicker.styled';

interface RecurrencePickerProps {
  schedule: RecurrenceSchedule | null;
  setSchedule: (schedule: RecurrenceSchedule | null) => void;
  showPicker: boolean;
  setShowPicker: (value: boolean) => void;
  timeZoneId: string;
  isExistingSeries: boolean;
}

const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, '0')
);

const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, '0')
);

export const RecurrencePicker = ({
  schedule,
  setSchedule,
  showPicker,
  setShowPicker,
  timeZoneId,
  isExistingSeries,
}: RecurrencePickerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useCloseOnBack(showPicker, () => {
    setShowPicker(false);
    setShowTimePicker(false);
  });

  useEffect(() => {
    const closePicker = (event: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(event.target as Node)) return;
      setShowPicker(false);
      setShowTimePicker(false);
    };

    window.addEventListener('mousedown', closePicker);

    return () => window.removeEventListener('mousedown', closePicker);
  }, [setShowPicker]);

  const update = (patch: Partial<RecurrenceSchedule>) => {
    if (!schedule) return;
    setSchedule({ ...schedule, ...patch });
  };

  const selectFrequency = (frequency: RecurrenceFrequency) => {
    setSchedule(defaultScheduleFor(frequency, timeZoneId, schedule));
    setShowTimePicker(false);
  };

  const monthDayRows = buildMonthDayRows(daysInMonthForPicker(schedule?.month));

  return (
    <StyledRecurrencePicker ref={ref}>
      <div
        className="main"
        onClick={() => {
          setShowPicker(!showPicker);
          setShowTimePicker(false);
        }}
      >
        <FaRepeat
          className={`recurringIcon ${schedule !== null ? 'active' : ''}`}
        />
      </div>

      {showPicker && (
        <StyledRecurrenceBackdrop
          onClick={() => {
            setShowPicker(false);
            setShowTimePicker(false);
          }}
        />
      )}

      {showPicker && (
        <StyledRecurrenceMenu>
          <div className="header">Repeat</div>

          <div className="cycles">
            <div
              className={`cycle ${schedule === null ? 'active' : ''}`}
              onClick={() => {
                setSchedule(null);
                setShowTimePicker(false);
              }}
            >
              Never
            </div>
            {recurrenceFrequencyOptions.map((option) => (
              <div
                key={option}
                className={`cycle ${schedule?.frequency === option ? 'active' : ''}`}
                onClick={() => selectFrequency(option)}
              >
                {recurrenceFrequencyLabel(option)}
              </div>
            ))}
          </div>

          {schedule && (
            <>
              {requiresMonth(schedule.frequency) && (
                <>
                  <div className="sectionLabel">Month</div>
                  <div className="grid">
                    {buildMonthRows().map((row, rowIndex) => (
                      <div key={rowIndex} className="grid-row">
                        {row.map((month) => (
                          <div
                            key={month}
                            className={`grid-cell ${schedule.month === month ? 'selected' : ''}`}
                            onClick={() =>
                              update({
                                month,
                                dayOfMonth: Math.min(
                                  schedule.dayOfMonth ?? 1,
                                  daysInMonthForPicker(month)
                                ),
                              })
                            }
                          >
                            {monthShortNames[month - 1]}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {requiresDayOfWeek(schedule.frequency) && (
                <>
                  <div className="sectionLabel">Day</div>
                  <div className="grid">
                    <div className="grid-row">
                      {weekDayShortNames.map((name, dayOfWeek) => (
                        <div
                          key={name}
                          className={`grid-cell ${schedule.dayOfWeek === dayOfWeek ? 'selected' : ''}`}
                          onClick={() => update({ dayOfWeek })}
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {requiresDayOfMonth(schedule.frequency) && (
                <>
                  <div className="sectionLabel">Day</div>
                  <div className="grid">
                    {monthDayRows.map((row, rowIndex) => (
                      <div key={rowIndex} className="grid-row">
                        {row.map((day, dayIndex) => (
                          <div
                            key={`${day}-${dayIndex}`}
                            className={`grid-cell ${day === '' ? 'empty' : ''} ${
                              day !== '' && schedule.dayOfMonth === day
                                ? 'selected'
                                : ''
                            }`}
                            onClick={() =>
                              day !== '' && update({ dayOfMonth: day })
                            }
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="timeRow">
                <div className="sectionLabel">Time</div>
                <div
                  className="time"
                  onClick={() => setShowTimePicker(!showTimePicker)}
                >
                  {scheduleTimeLabel(schedule)}
                </div>
                <div className="timezone">
                  {DateTime.now().setZone(timeZoneId).toFormat('ZZ')}
                </div>
              </div>

              {showTimePicker && (
                <div className="time-picker">
                  <ScrollPicker
                    items={hours}
                    selectedIndex={schedule.hour}
                    setSelectedIndex={(hour) => update({ hour })}
                  />
                  <ScrollPicker
                    items={minutes}
                    selectedIndex={schedule.minute}
                    setSelectedIndex={(minute) => update({ minute })}
                  />
                </div>
              )}

              {schedule.frequency === RecurrenceFrequency.Monthly &&
                (schedule.dayOfMonth ?? 1) > 28 && (
                  <div className="footnote">
                    Months without a {schedule.dayOfMonth} use their last day.
                  </div>
                )}

              <div className="footnote">
                {isExistingSeries ? 'Next' : 'First'} on{' '}
                {firstOccurrenceLabel(schedule, timeZoneId)}
              </div>
            </>
          )}
        </StyledRecurrenceMenu>
      )}
    </StyledRecurrencePicker>
  );
};

const buildMonthRows = (): number[][] => [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

const buildMonthDayRows = (daysInMonth: number): (number | '')[][] => {
  const rows: (number | '')[][] = [];

  for (let start = 1; start <= daysInMonth; start += 7) {
    const row: (number | '')[] = [];

    for (let offset = 0; offset < 7; offset++) {
      const day = start + offset;
      row.push(day <= daysInMonth ? day : '');
    }

    rows.push(row);
  }

  return rows;
};

export default RecurrencePicker;
