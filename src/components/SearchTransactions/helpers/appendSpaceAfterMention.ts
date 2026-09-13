import {
  $createTextNode,
  $getRoot,
  $isElementNode,
  LexicalEditor,
} from 'lexical';
import { $isBeautifulMentionNode } from 'lexical-beautiful-mentions';

export const appendSpaceAfterMention = (editor: LexicalEditor) => {
  editor.update(() => {
    const paragraph = $getRoot().getLastChild();
    if (!$isElementNode(paragraph)) return;

    const last = paragraph.getLastChild();
    if (!$isBeautifulMentionNode(last)) return;

    const space = $createTextNode(' ');
    last.insertAfter(space);
    space.select();
  });
};
