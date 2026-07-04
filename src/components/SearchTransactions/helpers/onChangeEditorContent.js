import { $getRoot } from 'lexical';
import { isElementNode } from './isElementNode';
import { handleInputChange } from './handleInputChange';
import { findLastTextNode } from './findLastTextNode';
export const onChangeEditorContent = (editorState, setEditorState, showOptions, setFilteredResults, enhancedPeopleWithProps, submitButtonIsActive, removedFilter, setEditorStateString, setIsEmpty, calendarIsOpen, datePeriodClicked, labels, searchKeyword) => {
    setEditorState(editorState);
    const excludedTerms = [
        'payer:',
        'participant:',
        'sender:',
        'receiver:',
        'category:',
    ];
    const timeTerms = ['before:', 'during:', 'after:'];
    const searchTerm = editorState.read(() => {
        const root = $getRoot();
        return root.getTextContent();
    });
    // Extract the query following any mention trigger (e.g., "j" from "payer:j")
    const triggerMatch = searchTerm.match(new RegExp(`(?:${excludedTerms.join('|')})([^\\s]*)`, 'i'));
    searchKeyword.value = triggerMatch ? triggerMatch[1] : searchTerm;
    if (excludedTerms.includes(searchTerm)) {
        showOptions.value = false;
    }
    if (searchTerm === '') {
        showOptions.value = true;
    }
    const matchesTimeTerm = timeTerms.some((term) => new RegExp(`\\b${term}(\\s|$)`).test(searchTerm) //checks whether there is anything following the timeTerm
    );
    // const mentionRegex = /(\S*)(payer|receiver|sender|participant|before|after):\S+/g;
    // const cleanedInput = searchTerm.replace(mentionRegex, "").trim();
    if (matchesTimeTerm) {
        calendarIsOpen.value = true;
        datePeriodClicked.value =
            timeTerms
                .find((term) => new RegExp(`\\b${term}(\\s|$)`).test(searchTerm))
                ?.replace(':', '') || '';
    }
    else {
        calendarIsOpen.value = false;
        datePeriodClicked.value = '';
    }
    const jsonObject = editorState.toJSON().root.children;
    if (isElementNode(jsonObject[0])) {
        const children = jsonObject[0].children;
        const lastTextNode = findLastTextNode(children);
        if (lastTextNode) {
            handleInputChange(lastTextNode.text.trimStart(), setFilteredResults, enhancedPeopleWithProps, labels);
        }
        const trimmedSearchTerm = searchTerm.trim();
        if (trimmedSearchTerm !== '' && !excludedTerms.includes(trimmedSearchTerm))
            submitButtonIsActive.value = true;
        else if (trimmedSearchTerm === '' && !removedFilter.value) {
            submitButtonIsActive.value = false;
        }
    }
    setEditorStateString(searchTerm);
    setIsEmpty(searchTerm === '');
};
