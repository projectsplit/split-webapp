export const handleCancelClick = (editorContentRef) => {
    if (editorContentRef.current) {
        editorContentRef.current.clearEditor();
    }
};
