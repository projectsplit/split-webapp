import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { BeautifulMentionsPlugin, } from 'lexical-beautiful-mentions';
import { Menu } from '../Menu/Menu';
import MentionsToolbar from '../Toolbars/MentionsToolbar';
import OptionsToolBar from '../Toolbars/OptionsToolbar/OptionsToolBar';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { CLEAR_EDITOR_COMMAND } from 'lexical';
import { useSignal } from '@preact/signals-react';
import { MenuItem } from '../MenuItem/MenuItem';
import { updateMembersMentions } from '../helpers/updateMembersMentions';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { onChangeEditorContent } from '../helpers/onChangeEditorContent';
import FilterCalendar from '../FilterCalendar/FilterCalendar';
import { PreventEnterCommandPlugin } from '../../../lexicalPlugins/PreventEnterCommandPlugin';
import { OnChangePlugin } from '../../../lexicalPlugins/OnChangePlugin';
import { ClearEditorPlugin } from '../../../lexicalPlugins/LexicalClearEditorPlugin';
import { updateFiltersMentions } from '../helpers/updateFiltersMentions';
export const EditorContent = forwardRef((props, ref) => {
    const { 
    // contentEditableHeight,
    enhancedPeopleWithProps, submitButtonIsActive, expenseFilterState, transferFilterState, setEditorState, people, cancelled, filteredPeople, timeZoneId, labels, filteredLabels, category, searchKeyword, isPersonal, } = props;
    const [editor] = useLexicalComposerContext();
    const [isEmpty, setIsEmpty] = useState(true);
    const [contentEditableHeight, setContentEditableHeight] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [editorStateString, setEditorStateString] = useState();
    const contentEditableWrapRef = useRef(null);
    const showOptions = useSignal(true);
    const calendarIsOpen = useSignal(false);
    const removedFilter = useSignal(false);
    const datePeriodClicked = useSignal('');
    const showFreeTextPill = useSignal(true);
    const mentionItems = useMemo(() => {
        const items = {
            'payer:': [],
            'participant:': [],
            'sender:': [],
            'receiver:': [],
            'category:': [],
        };
        updateMembersMentions(people, items);
        updateFiltersMentions(labels, items);
        return items;
    }, [people, labels]);
    useEffect(() => {
        const handleResize = () => {
            if (contentEditableWrapRef.current) {
                setContentEditableHeight(contentEditableWrapRef.current.offsetHeight);
            }
        };
        const resizeObserver = new ResizeObserver(handleResize);
        const element = contentEditableWrapRef.current;
        if (element) {
            resizeObserver.observe(element);
        }
        return () => {
            if (element) {
                resizeObserver.unobserve(element);
            }
        };
    }, [setContentEditableHeight]);
    const clearEditor = () => {
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        setIsEmpty(true);
        submitButtonIsActive.value = false;
        cancelled.value = true;
        showOptions.value = true;
    };
    useImperativeHandle(ref, () => ({
        clearEditor,
    }));
    return (_jsxs(_Fragment, { children: [_jsx(ClearEditorPlugin, {}), _jsx(RichTextPlugin, { contentEditable: _jsx("div", { ref: contentEditableWrapRef, className: "contentEditableWrap", children: _jsx(ContentEditable, { className: "contentEditable" }) }), placeholder: isEmpty ? (_jsx("div", { className: "contentEditablePlaceholder", children: "Search" })) : null, ErrorBoundary: LexicalErrorBoundary }), _jsx(HistoryPlugin, {}), _jsx(OnChangePlugin, { onChange: (editorState) => onChangeEditorContent(editorState, setEditorState, showOptions, setFilteredResults, enhancedPeopleWithProps, submitButtonIsActive, removedFilter, setEditorStateString, setIsEmpty, calendarIsOpen, datePeriodClicked, labels, searchKeyword) }), _jsx(BeautifulMentionsPlugin, { items: mentionItems, menuComponent: (props) => (_jsx(Menu, { ...props, contentEditableHeight: contentEditableHeight })), menuItemComponent: MenuItem, onMenuItemSelect: () => {
                    showOptions.value = true;
                }, insertOnBlur: false, menuItemLimit: false, onMenuOpen: () => (showOptions.value = false) }), calendarIsOpen.value ? (_jsx(FilterCalendar, { calendarIsOpen: calendarIsOpen, showOptions: showOptions, datePeriodClicked: datePeriodClicked, timeZoneId: timeZoneId, category: category })) : filteredResults.length === 0 || editorStateString === '' ? (_jsx(MentionsToolbar, { showOptions: showOptions, filteredPeople: filteredPeople, submitButtonIsActive: submitButtonIsActive, expenseFilterState: expenseFilterState, transferFilterState: transferFilterState, cancelled: cancelled, removedFilter: removedFilter, calendarIsOpen: calendarIsOpen, datePeriodClicked: datePeriodClicked, filteredLabels: filteredLabels, category: category, showFreeTextPill: showFreeTextPill, isPersonal: isPersonal })) : (_jsx(OptionsToolBar, { editorStateString: editorStateString, filteredResults: filteredResults, setFilteredResults: setFilteredResults, submitButtonIsActive: submitButtonIsActive })), _jsx(AutoFocusPlugin, {}), _jsx(PreventEnterCommandPlugin, {})] }));
});
