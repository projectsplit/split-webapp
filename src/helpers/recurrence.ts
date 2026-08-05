import { DateTime } from 'luxon';
import { RecurrenceFrequency, RecurrenceSchedule } from '@/types';
import { getOrdinalSuffix } from './getOrdinalSuffix';

export const recurrenceFrequencyOptions: RecurrenceFrequency[] = [
  RecurrenceFrequency.Daily,
  RecurrenceFrequency.Weekly,
  RecurrenceFrequency.Biweekly,
  RecurrenceFrequency.Monthly,
  RecurrenceFrequency.Annually,
];

const labels: Record<RecurrenceFrequency, string> = {
  [RecurrenceFrequency.Daily]: 'Daily',
  [RecurrenceFrequency.Weekly]: 'Weekly',
  [RecurrenceFrequency.Biweekly]: 'Biweekly',
  [RecurrenceFrequency.Monthly]: 'Monthly',
  [RecurrenceFrequency.Annually]: 'Annually',
};

export const recurrenceFrequencyLabel = (
  frequency: RecurrenceFrequency
): string => labels[frequency] ?? '';

/** Sunday first, to line up with System.DayOfWeek on the server. */
export const weekDayShortNames = [
  'Su',
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
] as const;

export const weekDayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const monthShortNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const daysInMonthForPicker = (month?: number | null): number =>
  // A leap year, so 29 February stays selectable; the server clamps it in the years that lack it.
  month ? DateTime.local(2024, month, 1).daysInMonth ?? 31 : 31;

export const requiresDayOfWeek = (frequency: RecurrenceFrequency): boolean =>
  frequency === RecurrenceFrequency.Weekly ||
  frequency === RecurrenceFrequency.Biweekly;

export const requiresDayOfMonth = (frequency: RecurrenceFrequency): boolean =>
  frequency === RecurrenceFrequency.Monthly ||
  frequency === RecurrenceFrequency.Annually;

export const requiresMonth = (frequency: RecurrenceFrequency): boolean =>
  frequency === RecurrenceFrequency.Annually;

/**
 * Seeds a schedule from the current moment in the user's zone, so switching cycle never leaves the
 * form in a state that cannot be submitted. The user changes what they care about from there.
 */
export const defaultScheduleFor = (
  frequency: RecurrenceFrequency,
  timeZoneId: string,
  previous?: RecurrenceSchedule | null
): RecurrenceSchedule => {
  const now = DateTime.now().setZone(timeZoneId);

  return {
    frequency,
    hour: previous?.hour ?? now.hour,
    minute: previous?.minute ?? now.minute,
    dayOfWeek: requiresDayOfWeek(frequency)
      ? (previous?.dayOfWeek ?? now.weekday % 7)
      : null,
    dayOfMonth: requiresDayOfMonth(frequency)
      ? (previous?.dayOfMonth ?? now.day)
      : null,
    month: requiresMonth(frequency) ? (previous?.month ?? now.month) : null,
  };
};

const pad = (value: number): string => value.toString().padStart(2, '0');

const ordinal = (day: number): string => `${day}${getOrdinalSuffix(String(day))}`;

export const scheduleTimeLabel = (schedule: RecurrenceSchedule): string =>
  `${pad(schedule.hour)}:${pad(schedule.minute)}`;

/** The row description in the manage list, and the confirmation under the cycle picker. */
export const scheduleSentence = (schedule: RecurrenceSchedule): string => {
  const time = scheduleTimeLabel(schedule);

  switch (schedule.frequency) {
    case RecurrenceFrequency.Daily:
      return `Every day at ${time}`;

    case RecurrenceFrequency.Weekly:
      return `Every ${weekDayNames[schedule.dayOfWeek ?? 0]} at ${time}`;

    case RecurrenceFrequency.Biweekly:
      return `Every two weeks on ${weekDayNames[schedule.dayOfWeek ?? 0]} at ${time}`;

    case RecurrenceFrequency.Monthly:
      return `Every month on the ${ordinal(schedule.dayOfMonth ?? 1)} at ${time}`;

    case RecurrenceFrequency.Annually:
      return `Every year on ${ordinal(schedule.dayOfMonth ?? 1)} ${monthShortNames[(schedule.month ?? 1) - 1]} at ${time}`;

    default:
      return '';
  }
};

/**
 * Mirrors the server's first-occurrence rule so the form can promise a date before anything is
 * saved. Strictly after now, matching RecurrenceCalculator.GetFirstOccurrence — a schedule set up
 * at exactly its own slot waits for the next one rather than firing immediately.
 */
export const nextOccurrenceFor = (
  schedule: RecurrenceSchedule,
  timeZoneId: string
): DateTime => {
  const now = DateTime.now().setZone(timeZoneId);

  const atTime = (dt: DateTime) =>
    dt.set({
      hour: schedule.hour,
      minute: schedule.minute,
      second: 0,
      millisecond: 0,
    });

  const onDayOfMonth = (year: number, month: number) => {
    const inMonth = DateTime.local(year, month, 1, { zone: timeZoneId });
    const day = Math.min(schedule.dayOfMonth ?? 1, inMonth.daysInMonth ?? 31);
    return atTime(inMonth.set({ day }));
  };

  switch (schedule.frequency) {
    case RecurrenceFrequency.Daily: {
      const candidate = atTime(now);
      return candidate > now ? candidate : candidate.plus({ days: 1 });
    }

    case RecurrenceFrequency.Weekly:
    case RecurrenceFrequency.Biweekly: {
      // Luxon weekday is 1=Monday..7=Sunday; the schedule uses 0=Sunday.
      const target = schedule.dayOfWeek ?? 0;
      const current = now.weekday % 7;
      const candidate = atTime(now.plus({ days: (target - current + 7) % 7 }));
      return candidate > now ? candidate : candidate.plus({ days: 7 });
    }

    case RecurrenceFrequency.Monthly: {
      const candidate = onDayOfMonth(now.year, now.month);
      if (candidate > now) return candidate;
      const next = now.plus({ months: 1 });
      return onDayOfMonth(next.year, next.month);
    }

    case RecurrenceFrequency.Annually: {
      const month = schedule.month ?? 1;
      const candidate = onDayOfMonth(now.year, month);
      return candidate > now ? candidate : onDayOfMonth(now.year + 1, month);
    }

    default:
      return now;
  }
};

export const firstOccurrenceLabel = (
  schedule: RecurrenceSchedule,
  timeZoneId: string
): string => nextOccurrenceFor(schedule, timeZoneId).toFormat('d LLL yyyy');
