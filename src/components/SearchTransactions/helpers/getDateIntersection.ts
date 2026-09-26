import { DateConstraint } from '../../../types';
import { parseDate } from './parseDate';

export const duringDay = (value: string): DateConstraint[] => [
  { trigger: 'before:', value },
  { trigger: 'after:', value },
];

export function getDateIntersection(
  constraint1: DateConstraint,
  constraint2: DateConstraint
): DateConstraint[] {
  const date1 = parseDate(constraint1.value);
  const date2 = parseDate(constraint2.value);

  if (
    (constraint1.trigger === 'before:' &&
      constraint2.trigger === 'after:' &&
      date1 < date2) ||
    (constraint2.trigger === 'before:' &&
      constraint1.trigger === 'after:' &&
      date2 < date1)
  ) {
    return [{ trigger: constraint2.trigger, value: constraint2.value }];
  }

  if (constraint1.trigger === 'during:') {
    if (constraint2.trigger === 'after:') {
      return date1 >= date2
        ? duringDay(constraint1.value)
        : [{ trigger: 'after:', value: constraint1.value }];
    }
    if (constraint2.trigger === 'before:') {
      return date1 < date2
        ? duringDay(constraint1.value)
        : [{ trigger: 'before:', value: constraint1.value }];
    }
  }

  if (constraint2.trigger === 'during:') {
    if (constraint1.trigger === 'after:') {
      return date2 >= date1
        ? duringDay(constraint2.value)
        : [{ trigger: 'after:', value: constraint2.value }];
    }
    if (constraint1.trigger === 'before:') {
      return date2 < date1
        ? duringDay(constraint2.value)
        : [{ trigger: 'before:', value: constraint2.value }];
    }
  }

  if (constraint1.trigger === 'after:' && constraint2.trigger === 'before:') {
    return date1 <= date2
      ? [
          { trigger: 'after:', value: constraint1.value },
          { trigger: 'before:', value: constraint2.value },
        ]
      : [{ trigger: 'after:', value: constraint2.value }];
  }

  if (constraint1.trigger === 'before:' && constraint2.trigger === 'after:') {
    return date2 <= date1
      ? [
          { trigger: 'after:', value: constraint2.value },
          { trigger: 'before:', value: constraint1.value },
        ]
      : [{ trigger: 'after:', value: constraint2.value }];
  }

  if (constraint1.trigger === constraint2.trigger) {
    if (constraint1.trigger === 'after:') {
      return date1 >= date2
        ? [{ trigger: 'after:', value: constraint1.value }]
        : [{ trigger: 'after:', value: constraint2.value }];
    }
    if (constraint1.trigger === 'before:') {
      return date1 <= date2
        ? [{ trigger: 'before:', value: constraint1.value }]
        : [{ trigger: 'before:', value: constraint2.value }];
    }
  }

  return [];
}
