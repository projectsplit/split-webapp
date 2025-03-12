import { forwardRef, useRef, useState } from "react";

import IonIcon from "@reacticons/ionicons";
import { EditorContentHandle } from "../../../interfaces";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";


export const EditorContent = forwardRef<EditorContentHandle>((props, ref) => {
  const {} = props;

  const [editor] = useLexicalComposerContext();
  const contentEditableWrapRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  return (
    <>
      <ClearEditorPlugin />
      <div className="textEditor">
        <RichTextPlugin
          contentEditable={
            <div ref={contentEditableWrapRef} className="contentEditableWrap">
              <ContentEditable className="contentEditable" />
            </div>
          }
          placeholder={
            isEmpty ? (
              <div className="contentEditablePlaceholder">Write a note</div>
            ) : null
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
       
      </div>
      <div className="options"><IonIcon name="send" className="sendIcon"/></div>
      <HistoryPlugin />
      <OnChangePlugin onChange={(editorState) => console.log("")} />

    </>
  );
});
