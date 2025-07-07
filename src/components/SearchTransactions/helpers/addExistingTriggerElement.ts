import { Signal } from "@preact/signals-react";
import { CreateExpenseFilterRequest, CreateTransferFilterRequest, DateConstraint } from "../../../types";
import { deduplicateFromEndofArr } from "./deduplicateFromEndofArr";



export const addExistingTriggerElement = (
  filterState: Signal<CreateExpenseFilterRequest | CreateTransferFilterRequest>,
  arrayToAddElement: DateConstraint[]
) => {
  const { before, during, after } = filterState.value;

  if (before.length > 0) {
    arrayToAddElement.unshift({ trigger: "before:", value: before[0] });
  }
  if (during.length > 0) {
    arrayToAddElement.unshift({ trigger: "during:", value: during[0] });
  }
  if (after.length > 0) {
    arrayToAddElement.unshift({ trigger: "after:", value: after[0] });
  }

  return deduplicateFromEndofArr(arrayToAddElement);
};