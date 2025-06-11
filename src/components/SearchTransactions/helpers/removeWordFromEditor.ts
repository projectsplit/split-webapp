import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
} from "lexical";

export const removeWordFromEditor = (
  editor: LexicalEditor,
  wordToRemove: string
) => {
  editor.update(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();

      if ($isTextNode(anchorNode)) {
        const textContent = anchorNode.getTextContent();

        const triggerIndex = textContent.indexOf(wordToRemove);
        if (triggerIndex !== -1) {
          anchorNode.spliceText(triggerIndex, wordToRemove.length, "");
          selection.setTextNodeRange(
            anchorNode,
            triggerIndex,
            anchorNode,
            triggerIndex
          );
        }
      }
    }
  });
};
