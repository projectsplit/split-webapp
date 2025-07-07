import { $getRoot, EditorState } from "lexical";
import { isBeautifulMentionNode, isElementNode } from "./isElementNode";
import { Signal } from "@preact/signals-react";
import {
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
  DateConstraint,
  ExpenseParsedFilters,
  TransferParsedFilters,
} from "../../../types";
import { QueryClient } from "@tanstack/react-query";
import { addExistingTriggerElement } from "./addExistingTriggerElement";
import { finalProcessConstraints } from "./finalProcessConstraints";


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