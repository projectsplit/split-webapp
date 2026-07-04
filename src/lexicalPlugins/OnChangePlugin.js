import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
export function OnChangePlugin(props) {
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
