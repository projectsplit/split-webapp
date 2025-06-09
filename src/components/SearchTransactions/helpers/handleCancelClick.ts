import { EditorContentHandle } from "../../../interfaces";


export const handleCancelClick = (editorContentRef: React.MutableRefObject<EditorContentHandle | null>) => {
    if (editorContentRef.current) {
      editorContentRef.current.clearEditor();
    }
  };