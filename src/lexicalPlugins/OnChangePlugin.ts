import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useEffect } from "react";

export function OnChangePlugin(props: {
  onChange: (editorState: EditorState) => void;
}): null {
  // Access the editor through the LexicalComposerContext
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;

  useEffect(() => {

    return editor.registerUpdateListener(({ editorState }) => {

      onChange(editorState);

    });
    
  }, [editor, onChange]);

  return null;
}
