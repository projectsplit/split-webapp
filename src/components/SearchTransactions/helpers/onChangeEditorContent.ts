import { $getRoot, EditorState } from "lexical";
import { isElementNode } from "./isElementNode";
import { handleInputChange } from "./handleInputChange";
import { Signal } from "@preact/signals-react";
import { BeautifulMentionsItemData } from "lexical-beautiful-mentions";
import { findLastTextNode } from "./findLastTextNode";
import { EnhancedMembersWithProps, FetchedLabel } from "../../../types";

export const onChangeEditorContent = (
  editorState: EditorState,
  setEditorState: (value: React.SetStateAction<EditorState | null>) => void,
  showOptions: Signal<boolean>,
  setFilteredResults: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: BeautifulMentionsItemData;
        value: string;
      }[]
    >
  >,
  enhancedMembersWithProps: EnhancedMembersWithProps,
  submitButtonIsActive: Signal<boolean>,
  removedFilter: Signal<boolean>,
  setEditorStateString: (
    value: React.SetStateAction<string | undefined>
  ) => void,
  setIsEmpty: (value: React.SetStateAction<boolean>) => void,
  calendarIsOpen: Signal<boolean>,
  datePeriodClicked: Signal<string>,
  labels: FetchedLabel[]
) => {
  setEditorState(editorState);
  const excludedTerms = [
    "payer:",
    "participant:",
    "sender:",
    "receiver:",
    "category:",
  ];

  const timeTerms = ["before:", "during:", "after:"];

  const searchTerm = editorState.read(() => {
    const root = $getRoot();
    return root.getTextContent();
  });
  if (excludedTerms.includes(searchTerm)) {
    showOptions.value = false;
  }
  if (searchTerm === "") {
    showOptions.value = true;
  }

  const matchesTimeTerm = timeTerms.some((term) =>
    new RegExp(`\\b${term}(\\s|$)`).test(searchTerm)//checks whether there is anything following the timeTerm
  );

  const mentionRegex = /(\S*)(payer|receiver|sender|participant|before|after):\S+/g;
  const cleanedInput = searchTerm.replace(mentionRegex, "").trim();


  if (matchesTimeTerm) {
    calendarIsOpen.value = true;
    datePeriodClicked.value =
      timeTerms.find((term) =>
        new RegExp(`\\b${term}(\\s|$)`).test(searchTerm)
      )?.replace(":", "") || "";
  } else {
    calendarIsOpen.value = false;
    datePeriodClicked.value = "";
  }


  const jsonObject = editorState.toJSON().root.children;
  if (isElementNode(jsonObject[0])) {
    const children = jsonObject[0].children;
    const lastTextNode = findLastTextNode(children);

    if (lastTextNode) {
      handleInputChange(
        lastTextNode.text.trimStart(),
        setFilteredResults,
        enhancedMembersWithProps,
        labels
      );
    }
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm !== "" && !excludedTerms.includes(trimmedSearchTerm))
      submitButtonIsActive.value = true;
    else if (trimmedSearchTerm === "" && !removedFilter.value) {
      submitButtonIsActive.value = false;
    }
  }

  setEditorStateString(searchTerm);
  setIsEmpty(searchTerm === "");
};
