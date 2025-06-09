import { $getRoot, EditorState } from "lexical";
import { isElementNode } from "./isElementNode";
import { Signal } from "@preact/signals-react";
import {  UseMutateFunction } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { CreateFiltersRequest } from "../../../types";
import { AxiosError } from "axios";

export const handleSubmitButton = (
  editorState: EditorState | null,
  filterState: Signal<CreateFiltersRequest>,
  submitFilters: UseMutateFunction<any, AxiosError<unknown, any>, CreateFiltersRequest, unknown>,
  menu: Signal<string | null>
) => {
  if (editorState === null) return;

  const searchTerm = editorState.read(() => {
    const root = $getRoot();
    return root.getTextContent();
  });

  const mentionRegex =
    /(\S*)(payer|receiver|sender|participant|before|after):\S+/g;
  const cleanedInput = (
    searchTerm.replace(mentionRegex, "").trim() +
    " " +
    (filterState.value.description || "")
  ).trim();

  const jsonObject = editorState.toJSON().root.children;

  if (isElementNode(jsonObject[0])) {
    const children = jsonObject[0].children;
    children.map((c) => {
      if (c.trigger === "payer:")
        filterState.value.payersIds.push(c.data.memberId);
      if (c.trigger === "participant:")
        filterState.value.participantsIds.push(c.data.memberId);
      if (c.trigger === "sender:")
        filterState.value.sendersIds.push(c.data.memberId);
      if (c.trigger === "receiver:")
        filterState.value.receiversIds.push(c.data.memberId);
      if (c.trigger === "before:") {
        let normalizedDate = c.value
          .replace(/\b(\d)\b/g, "0$1")
          .replace(/-(\d)(?!\d)/g, "-0$1");
        let date = DateTime.fromFormat(normalizedDate, "dd-MM-yyyy");
        date.isValid
          ? date.toISODate()
          : (date = DateTime.invalid("Invalid date"));
        filterState.value.before.push(date);
      }
      if (c.trigger === "during:") {
        let normalizedDate = c.value
          .replace(/\b(\d)\b/g, "0$1")
          .replace(/-(\d)(?!\d)/g, "-0$1");
        let date = DateTime.fromFormat(normalizedDate, "dd-MM-yyyy");
        date.isValid
          ? date.toISODate()
          : (date = DateTime.invalid("Invalid date"));
        filterState.value.during.push(date);
      }
      if (c.trigger === "after:") {
        let normalizedDate = c.value
          .replace(/\b(\d)\b/g, "0$1")
          .replace(/-(\d)(?!\d)/g, "-0$1");
        let date = DateTime.fromFormat(normalizedDate, "dd-MM-yyyy");
        date.isValid
          ? date.toISODate()
          : (date = DateTime.invalid("Invalid date"));
        filterState.value.after.push(date);
      }
      filterState.value.description=cleanedInput;
    });

    submitFilters({
      groupId: filterState.value.groupId,
      participantsIds: filterState.value.participantsIds,
      payersIds: filterState.value.payersIds,
      receiversIds: filterState.value.receiversIds,
      sendersIds: filterState.value.sendersIds,
      description: filterState.value.description,
      before: filterState.value.before,
      during: filterState.value.during,
      after: filterState.value.after,
    });

    // queryClient.invalidateQueries([
    //   "transactions",
    //   "active",
    //   params.groupid as string,
    // ]);

    // queryClient.invalidateQueries(["transactions", "filters"]);

    menu.value = null;
  }
};
