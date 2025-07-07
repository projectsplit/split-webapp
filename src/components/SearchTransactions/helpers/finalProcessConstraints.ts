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