import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from "lexical";
import { useEffect } from "react";


export const PreventEnterCommandPlugin=()=> {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      return editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event:KeyboardEvent) => {
          event.preventDefault();
          return true;
        },
        COMMAND_PRIORITY_HIGH
      );
    }, [editor]);

    return null;
  }