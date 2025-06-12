import { useBeautifulMentions } from "lexical-beautiful-mentions";
import { removeWordFromEditor } from "./removeWordFromEditor";
import { Signal } from "@preact/signals-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DateTime } from "luxon";

export const insertDateMention = (
  day: DateTime,
  datePeriodClicked: Signal<string>,
  calendarIsOpen: Signal<boolean>,
  showOptions: Signal<boolean>,
  editor: ReturnType<typeof useLexicalComposerContext>[0],
  insertMention: ReturnType<typeof useBeautifulMentions>["insertMention"]
) => {
  if (!day.isValid) {
    console.warn("Invalid date provided to insertDateMention");
    return;
  }

  const formattedDate = day.toFormat("dd-MM-yyyy");

  switch (datePeriodClicked.value) {
    case "before":
      removeWordFromEditor(editor, "before:");
      insertMention({
        trigger: "before" + ":",
        value: formattedDate,
      });

      break;
    case "during":
      removeWordFromEditor(editor, "during:");
      insertMention({
        trigger: "during" + ":",
        value: formattedDate,
      });

      break;
    case "after":
      removeWordFromEditor(editor, "after:");
      insertMention({
        trigger: "after" + ":",
        value: formattedDate,
      });

      break;
    default:
      console.warn("Unknown period:", datePeriodClicked.value);
      break;
  }

  calendarIsOpen.value = false;
  showOptions.value = true;
};
