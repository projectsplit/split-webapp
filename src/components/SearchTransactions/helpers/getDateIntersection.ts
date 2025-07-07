import { DateConstraint } from "../../../types";
import { parseDate } from "./parseDate";

export function getDateIntersection(
  constraint1: DateConstraint,
  constraint2: DateConstraint
): DateConstraint[] {
  const date1 = parseDate(constraint1.value);
  const date2 = parseDate(constraint2.value);

  // If there's no overlap (e.g., before X and after Y where Y > X)
  if (
    (constraint1.trigger === "before:" &&
      constraint2.trigger === "after:" &&
      date1 < date2) ||
    (constraint2.trigger === "before:" &&
      constraint1.trigger === "after:" &&
      date2 < date1)
  ) {
    // Return the second constraint
    return [{ trigger: constraint2.trigger, value: constraint2.value }];
  }

  // Handle 'during' as a single point
  if (constraint1.trigger === "during:") {
    if (constraint2.trigger === "after:") {
      return date1 >= parseDate(constraint2.value)
        ? [{ trigger: "after:", value: constraint2.value }]
        : [{ trigger: "after:", value: constraint1.value }];
    }
    if (constraint2.trigger === "before:") {
      return date1 <= parseDate(constraint2.value)
        ? [{ trigger: "before:", value: constraint2.value }]
        : [{ trigger: "before:", value: constraint1.value }];
    }
  }

  if (constraint2.trigger === "during:") {
    if (constraint1.trigger === "after:") {
      return date2 >= parseDate(constraint1.value)
        ? [{ trigger: "after:", value: constraint1.value }]
        : [{ trigger: "after:", value: constraint2.value }];
    }
    if (constraint1.trigger === "before:") {
      return date2 <= parseDate(constraint1.value)
        ? [{ trigger: "before:", value: constraint1.value }]
        : [{ trigger: "before:", value: constraint2.value }];
    }
  }

  // Handle before + after or after + before
  if (constraint1.trigger === "after:" && constraint2.trigger === "before:") {
    return date1 <= date2
      ? [
          { trigger: "after:", value: constraint1.value },
          { trigger: "before:", value: constraint2.value },
        ]
      : [{ trigger: "after:", value: constraint2.value }]; // No intersection, return second constraint
  }

  if (constraint1.trigger === "before:" && constraint2.trigger === "after:") {
    return date2 <= date1
      ? [
          { trigger: "after:", value: constraint2.value },
          { trigger: "before:", value: constraint1.value },
        ]
      : [{ trigger: "after:", value: constraint2.value }];
  }

  if (constraint1.trigger === constraint2.trigger) {
    if (constraint1.trigger === "after:") {
      return date1 >= date2
        ? [{ trigger: "after:", value: constraint1.value }]
        : [{ trigger: "after:", value: constraint2.value }];
    }
    if (constraint1.trigger === "before:") {
      return date1 <= date2
        ? [{ trigger: "before:", value: constraint1.value }]
        : [{ trigger: "before:", value: constraint2.value }];
    }
  }

  return []; 
}