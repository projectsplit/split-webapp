import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useRef, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
export const EditorContent = forwardRef((props, ref) => {
    const {} = props;
    const [editor] = useLexicalComposerContext();
    const contentEditableWrapRef = useRef(null);
    const [isEmpty, setIsEmpty] = useState(true);
    return (_jsxs(_Fragment, { children: [_jsx(ClearEditorPlugin, {}), _jsx("div", { className: "textEditor", children: _jsx(RichTextPlugin, { contentEditable: _jsx("div", { ref: contentEditableWrapRef, className: "contentEditableWrap", children: _jsx(ContentEditable, { className: "contentEditable" }) }), placeholder: isEmpty ? (_jsx("div", { className: "contentEditablePlaceholder", children: "Write a note" })) : null, ErrorBoundary: LexicalErrorBoundary }) }), _jsx("div", { className: "options", children: _jsx(IonIcon, { name: "send", className: "sendIcon" }) }), _jsx(HistoryPlugin, {}), _jsx(OnChangePlugin, { onChange: (editorState) => console.log('') })] }));
});
