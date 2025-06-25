import { $getRoot, EditorState } from "lexical";
import { isBeautifulMentionNode, isElementNode } from "./isElementNode";
import { Signal } from "@preact/signals-react";
import {
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
} from "../../../types";

export const handleSubmitButton = (
  editorState: EditorState | null,
  expenseFilterState: Signal<CreateExpenseFilterRequest>,
  transferFilterState: Signal<CreateTransferFilterRequest>,
  menu: Signal<string | null>,
  category: Signal<string>
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

    //TODO actual submit
    const expenseFilter = {
      groupId: expenseFilterState.value.groupId,
      participantsIds: expenseFilterState.value.participantsIds,
      payersIds: expenseFilterState.value.payersIds,
      freeText: expenseFilterState.value.freeText,
      before: expenseFilterState.value.before[0],
      during: expenseFilterState.value.during[0],
      after: expenseFilterState.value.after[0],
      labels: expenseFilterState.value.labels,
    };

    const transferFilter = {
      groupId: transferFilterState.value.groupId,
      receiversIds: transferFilterState.value.receiversIds,
      sendersIds: transferFilterState.value.sendersIds,
      freeText: transferFilterState.value.freeText,
      before: transferFilterState.value.before[0],
      during: transferFilterState.value.during[0],
      after: transferFilterState.value.after[0],
    };
    
    menu.value = null;
    localStorage.setItem("expenseFilter", JSON.stringify(expenseFilter));
    localStorage.setItem("transferFilter", JSON.stringify(transferFilter));


    // queryClient.invalidateQueries([
    //   "transactions",
    //   "active",
    //   params.groupid as string,
    // ]);

  }
};
