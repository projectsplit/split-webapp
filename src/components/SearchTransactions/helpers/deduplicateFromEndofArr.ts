import { DateConstraint } from "../../../types";

export const deduplicateFromEndofArr = (arr: DateConstraint[]): DateConstraint[] => {
  const seen = new Set<string>();
  const result: DateConstraint[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i].trigger;
    if (!seen.has(item)) {
      seen.add(item);
      result.unshift(arr[i]);
    }
  }

  return result;
};