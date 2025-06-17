import { $getRoot, EditorState } from "lexical";
import { isBeautifulMentionNode, isElementNode } from "./isElementNode";
import { Signal } from "@preact/signals-react";
import { UseMutateFunction } from "@tanstack/react-query";
import { DateTime } from "luxon";
import {
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
} from "../../../types";
import { AxiosError } from "axios";

export const handleSubmitButton = (
  editorState: EditorState | null,
  expenseFilterState: Signal<CreateExpenseFilterRequest>,
  transferFilterState: Signal<CreateTransferFilterRequest>,
  submitExpenseFilters: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    CreateExpenseFilterRequest,
    unknown
  >,
  submitTransferFilters: UseMutateFunction<
    any,
    AxiosError<unknown, any>,
    CreateTransferFilterRequest,
    unknown
  >,
  menu: Signal<string | null>,
  category: Signal<string>,

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

  if (isElementNode(jsonObject[0])) {
    const children = jsonObject[0].children;
    children.map((c) => {
      if (c.trigger === "payer:")
        expenseFilterState.value.payersIds.push(c.data.memberId);
      if (c.trigger === "participant:")
        expenseFilterState.value.participantsIds.push(c.data.memberId);
      if (c.trigger === "sender:")
        transferFilterState.value.sendersIds.push(c.data.memberId);
      if (c.trigger === "receiver:")
        transferFilterState.value.receiversIds.push(c.data.memberId);

      if (c.trigger === "before:") {
        // let normalizedDate = c.value
        //   .replace(/\b(\d)\b/g, "0$1")
        //   .replace(/-(\d)(?!\d)/g, "-0$1");
        // let date = DateTime.fromFormat(normalizedDate, "dd-MM-yyyy");
        // date.isValid
        //   ? date.toISODate()
        //   : (date = DateTime.invalid("Invalid date"));

        if (isBeautifulMentionNode(c) && c.data.category === "expenses") {
          expenseFilterState.value.before.push(c.value);
        }
        if (isBeautifulMentionNode(c) && c.data.category === "transfers") {
          transferFilterState.value.before.push(c.value);
        }
      }
      if (c.trigger === "during:") {
        // let normalizedDate = c.value
        //   .replace(/\b(\d)\b/g, "0$1")
        //   .replace(/-(\d)(?!\d)/g, "-0$1");
        // let date = DateTime.fromFormat(normalizedDate, "dd-MM-yyyy");
        // date.isValid
        //   ? date.toISODate()
        //   : (date = DateTime.invalid("Invalid date"));
        if (isBeautifulMentionNode(c) && c.data.category === "expenses") {
          expenseFilterState.value.during.push(c.value);
        }
        if (isBeautifulMentionNode(c) && c.data.category === "transfers") {
          transferFilterState.value.during.push(c.value);
        }
      }
      if (c.trigger === "after:") {
        // let normalizedDate = c.value
        //   .replace(/\b(\d)\b/g, "0$1")
        //   .replace(/-(\d)(?!\d)/g, "-0$1");
        // let date = DateTime.fromFormat(normalizedDate, "dd-MM-yyyy");
        // date.isValid
        //   ? date.toISODate()
        //   : (date = DateTime.invalid("Invalid date"));
        if (isBeautifulMentionNode(c) && c.data.after === "expenses") {
          expenseFilterState.value.after.push(c.value);
        }
        if (isBeautifulMentionNode(c) && c.data.category === "transfers") {
          transferFilterState.value.after.push(c.value);
        }
      }
      if (c.trigger === "category:") {
        expenseFilterState.value.labels.push(c.data.id);
      }
      if (category.value === "expenses") {
        expenseFilterState.value.freeText = cleanedInput;
      }
      if (category.value === "transfers") {
        transferFilterState.value.freeText = cleanedInput;
      }
    });

    //TODO actual submit
    // submitFilters({
    //   groupId: filterState.value.groupId,
    //   participantsIds: filterState.value.participantsIds,
    //   payersIds: filterState.value.payersIds,
    //   receiversIds: filterState.value.receiversIds,
    //   sendersIds: filterState.value.sendersIds,
    //   description: filterState.value.description,
    //   before: filterState.value.before,
    //   during: filterState.value.during,
    //   after: filterState.value.after,
    //   labels:filterState.value.labels
    // });

    console.log("expenses", {
      groupId: expenseFilterState.value.groupId,
      participantsIds: expenseFilterState.value.participantsIds,
      payersIds: expenseFilterState.value.payersIds,
      freeText: expenseFilterState.value.freeText,
      before: expenseFilterState.value.before,
      during: expenseFilterState.value.during,
      after: expenseFilterState.value.after,
      labels: expenseFilterState.value.labels,
    });

    console.log("transfers", {
      groupId: transferFilterState.value.groupId,
      receiversIds: transferFilterState.value.receiversIds,
      sendersIds: transferFilterState.value.sendersIds,
      freeText: transferFilterState.value.freeText,
      before: transferFilterState.value.before,
      during: transferFilterState.value.during,
      after: transferFilterState.value.after,
    });

    // queryClient.invalidateQueries([
    //   "transactions",
    //   "active",
    //   params.groupid as string,
    // ]);
    menu.value = null;
  }
};
