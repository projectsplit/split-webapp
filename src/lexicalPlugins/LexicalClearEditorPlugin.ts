import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_EDITOR,
} from 'lexical';

import {useEffect, useLayoutEffect} from 'react';

const CAN_USE_DOM: boolean =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

// This workaround is no longer necessary in React 19,
// but we currently support React >=17.x
// https://github.com/facebook/react/pull/26395

const useLayoutEffectImpl: typeof useLayoutEffect = CAN_USE_DOM
  ? useLayoutEffect
  : useEffect;

export default useLayoutEffectImpl;
type Props = Readonly<{
  onClear?: () => void;
}>;

export function ClearEditorPlugin({onClear}: Props): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    return editor.registerCommand(
      CLEAR_EDITOR_COMMAND,
      (payload) => {
        editor.update(() => {
          if (onClear == null) {
            const root = $getRoot();
            const selection = $getSelection();
            const paragraph = $createParagraphNode();
            root.clear();
            root.append(paragraph);

            if (selection !== null) {
              paragraph.select();
            }
            if ($isRangeSelection(selection)) {
              selection.format = 0;
            }
          } else {
            onClear();
          }
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor, onClear]);

  return null;
}