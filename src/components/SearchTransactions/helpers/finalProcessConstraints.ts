import { DateConstraint } from "../../../types";
import { deduplicateFromEndofArr } from "./deduplicateFromEndofArr";
import { getDateIntersection } from "./getDateIntersection";

export const finalProcessConstraints = (array: DateConstraint[]) => {
  const dedupedArray = deduplicateFromEndofArr(array);
  if (dedupedArray.length === 1) {
    if (dedupedArray[0].trigger === "during:") {
      return [
        { trigger: "before:", value: dedupedArray[0].value },
        { trigger: "after:", value: dedupedArray[0].value },
      ];
    }
    return dedupedArray;
  }
  if (dedupedArray.length === 2) {
    return getDateIntersection(dedupedArray[0], dedupedArray[1]);
  }
  if (dedupedArray.length === 3) {
    const firstTwoArgsResult = getDateIntersection(
      dedupedArray[0],
      dedupedArray[1]
    );

    if (firstTwoArgsResult.length === 1) {
      return getDateIntersection(firstTwoArgsResult[0], dedupedArray[2]);
    }
    if (firstTwoArgsResult.length === 2) {
      const deduplicatedResult = deduplicateFromEndofArr([
        firstTwoArgsResult[0],
        firstTwoArgsResult[1],
        dedupedArray[2],
      ]);
      return getDateIntersection(deduplicatedResult[0], dedupedArray[2]);
    }
  }
};

//finalProcessConstraints:

// input will be an array {trigger:string, value:string}[]
// we need to use deduplicateFromEndOfArr and getDateIntersection.
// if array length is one then check if trigger is during. In that case return before and after the date
// if array length is 2 then calculate using getDateIntersection
// if array length is 3
// a) Take first two arguments and intersect. If result is length one then intersect with third
// b) Take first two arguments and intersect. If length===2 then deduplicate with current order.
// This will bring it down to 2. Then intersect.