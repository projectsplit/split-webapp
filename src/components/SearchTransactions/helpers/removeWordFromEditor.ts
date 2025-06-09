import { $getRoot, LexicalEditor } from "lexical";

export const removeWordFromEditor = (
  editor: LexicalEditor,
  wordToRemove: string
): void => {
  const escapedWord = wordToRemove.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(`\\s*${escapedWord}\\s*`, "g");

  editor.update(() => {
    const root = $getRoot();
    const allTextNodes = root.getAllTextNodes();
    for (const node of allTextNodes) {
      const textContent = node.getTextContent();
      const newTextContent = textContent.replace(regex, " ");
      if (newTextContent !== textContent) {
        node.setTextContent(newTextContent);
      }
    }
  });
};
