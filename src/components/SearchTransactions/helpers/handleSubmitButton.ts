import { $getRoot, EditorState } from "lexical";
import { isBeautifulMentionNode, isElementNode } from "./isElementNode";
import { Signal } from "@preact/signals-react";
import {
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
  ExpenseParsedFilters,
  TransferParsedFilters,
} from "../../../types";
import { QueryClient } from "@tanstack/react-query";


type DateConstraint = {
  trigger: "before:" | "after:" | "during:";
  value: string; // Format: "dd-mm-yyyy"
};



export const handleSubmitButton = (
  editorState: EditorState | null,
  expenseFilterState: Signal<CreateExpenseFilterRequest>,
  transferFilterState: Signal<CreateTransferFilterRequest>,
  menu: Signal<string | null>,
  category: Signal<string>,
  queryClient: QueryClient,
  expenseParsedFilters:Signal<ExpenseParsedFilters>,
  transferParsedFilters:Signal<TransferParsedFilters>
) => {
  if (editorState === null) return;

  const searchTerm = editorState.read(() => {
    const root = $getRoot();
    return root.getTextContent();
  });

  const mentionRegex =
    /(\S*)(payer|receiver|sender|participant|before|after|category|during):\S+/g;

  const cleanedInput = (
    searchTerm.replace(mentionRegex, "").trim() +
    " " +
    (expenseFilterState.value.freeText || "")
  ).trim();

  const jsonObject = editorState.toJSON().root.children;
  const expensesDateTriggerOrder: DateConstraint[] = [];
  const transfersDateTriggerOrder: DateConstraint[] = [];

  if (isElementNode(jsonObject[0])) {
    const children = jsonObject[0].children;

    children.map((c) => {
      if (
        c.type === "beautifulMention" &&
        ["before:", "during:", "after:"].includes(c.trigger) &&
        c.data.category === "expenses"
      ) {
        // Record the trigger in the order it appears
        expensesDateTriggerOrder.push({ trigger: c.trigger, value: c.value });
      }
      if (
        c.type === "beautifulMention" &&
        ["before:", "during:", "after:"].includes(c.trigger) &&
        c.data.category === "transfers"
      ) {
        // Record the trigger in the order it appears
        transfersDateTriggerOrder.push({ trigger: c.trigger, value: c.value });
      }
      // Deduplicate
      if (
        c.trigger === "payer:" &&
        !expenseFilterState.value.payersIds.includes(c.data.memberId)
      ) {
        expenseFilterState.value.payersIds.push(c.data.memberId);
      }

      if (
        c.trigger === "participant:" &&
        !expenseFilterState.value.participantsIds.includes(c.data.memberId)
      ) {
        expenseFilterState.value.participantsIds.push(c.data.memberId);
      }

      if (
        c.trigger === "sender:" &&
        !transferFilterState.value.sendersIds.includes(c.data.memberId)
      ) {
        transferFilterState.value.sendersIds.push(c.data.memberId);
      }

      if (
        c.trigger === "receiver:" &&
        !transferFilterState.value.receiversIds.includes(c.data.memberId)
      ) {
        transferFilterState.value.receiversIds.push(c.data.memberId);
      }

      if (c.trigger === "before:") {
        if (
          isBeautifulMentionNode(c) &&
          c.data.category === "expenses" &&
          !expenseFilterState.value.before.includes(c.value)
        ) {
          expenseFilterState.value.before.push(c.value);
        }
        if (
          isBeautifulMentionNode(c) &&
          c.data.category === "transfers" &&
          !transferFilterState.value.before.includes(c.value)
        ) {
          transferFilterState.value.before.push(c.value);
        }
      }
      if (c.trigger === "during:") {
        if (
          isBeautifulMentionNode(c) &&
          c.data.category === "expenses" &&
          !expenseFilterState.value.during.includes(c.value)
        ) {
          expenseFilterState.value.during.push(c.value);
        }
        if (
          isBeautifulMentionNode(c) &&
          c.data.category === "transfers" &&
          !transferFilterState.value.during.includes(c.value)
        ) {
          transferFilterState.value.during.push(c.value);
        }
      }
      if (c.trigger === "after:") {
        if (
          isBeautifulMentionNode(c) &&
          c.data.category === "expenses" &&
          !expenseFilterState.value.after.includes(c.value)
        ) {
          expenseFilterState.value.after.push(c.value);
        }
        if (
          isBeautifulMentionNode(c) &&
          c.data.category === "transfers" &&
          !transferFilterState.value.after.includes(c.value)
        ) {
          transferFilterState.value.after.push(c.value);
        }
      }
      // Deduplicate labels
      if (
        c.trigger === "category:" &&
        !expenseFilterState.value.labels.includes(c.data.id)
      ) {
        expenseFilterState.value.labels.push(c.data.id);
      }

      if (category.value === "expenses") {
        expenseFilterState.value.freeText = cleanedInput;
      }
      if (category.value === "transfers") {
        transferFilterState.value.freeText = cleanedInput;
      }
    });

    const expenseDatesBackend = finalProcessConstraints(
      addExistingTriggerElement(expenseFilterState, expensesDateTriggerOrder)
    );
    const transferDatesBackend = finalProcessConstraints(
      addExistingTriggerElement(transferFilterState, transfersDateTriggerOrder)
    );

    //TODO actual submit

    const expenseFilter = {
      groupId: expenseFilterState.value.groupId,
      participantsIds: expenseFilterState.value.participantsIds,
      payersIds: expenseFilterState.value.payersIds,
      freeText: expenseFilterState.value.freeText,
      before:
        expenseDatesBackend?.find((e) => e.trigger === "before:")?.value ||
        null,
      after:
        expenseDatesBackend?.find((e) => e.trigger === "after:")?.value || null,
      labels: expenseFilterState.value.labels,
    };


    const transferFilter = {
      groupId: transferFilterState.value.groupId,
      receiversIds: transferFilterState.value.receiversIds,
      sendersIds: transferFilterState.value.sendersIds,
      freeText: transferFilterState.value.freeText,
      before:
        transferDatesBackend?.find((e) => e.trigger === "before:")?.value ||
        null,
      after:
        transferDatesBackend?.find((e) => e.trigger === "after:")?.value ||
        null,
    };

    localStorage.setItem("expenseFilter", JSON.stringify(expenseFilter));
    localStorage.setItem("transferFilter", JSON.stringify(transferFilter));
    expenseParsedFilters.value = expenseFilter;
    transferParsedFilters.value = transferFilter;
    queryClient.invalidateQueries({ queryKey: ["groupExpenses"], exact: false });
    queryClient.invalidateQueries({ queryKey: ["groupTransfers"], exact: false });
    menu.value = null;
   
  }
};

const addExistingTriggerElement = (
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

const deduplicateFromEndofArr = (arr: DateConstraint[]): DateConstraint[] => {
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

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getDateIntersection(
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


const finalProcessConstraints = (array: DateConstraint[]) => {
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
