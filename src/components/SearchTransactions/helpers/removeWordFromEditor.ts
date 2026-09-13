import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
  TextNode,
} from 'lexical';

export const removeWordFromEditor = (
  editor: LexicalEditor,
  wordToRemove: string
) => {
  editor.update(() => {
    const selection = $getSelection();
    const anchorNode = $isRangeSelection(selection)
      ? selection.anchor.getNode()
      : null;

    let target: TextNode | null =
      $isTextNode(anchorNode) &&
      anchorNode.getTextContent().includes(wordToRemove)
        ? anchorNode
        : null;

    if (!target) {
      const textNodes = $getRoot().getAllTextNodes();
      for (let i = textNodes.length - 1; i >= 0; i--) {
        if (textNodes[i].getTextContent().includes(wordToRemove)) {
          target = textNodes[i];
          break;
        }
      }
    }

    if (!target) return;

    const triggerIndex = target.getTextContent().lastIndexOf(wordToRemove);
    target.spliceText(triggerIndex, wordToRemove.length, '');
    target.select(triggerIndex, triggerIndex);
  });
};
