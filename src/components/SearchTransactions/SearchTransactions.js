import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { StyledSearchTransactions } from './SearchTransactions.styled';
import { IoClose } from 'react-icons/io5';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useQueryClient } from '@tanstack/react-query';
import { EditorContent } from './EditorContent/EditorContent';
import { handleSubmitButton } from './helpers/handleSubmitButton';
import { handleCancelClick } from './helpers/handleCancelClick';
import { initialConfig } from './utils/lexicalThemeConfiguration';
import MyButton from '../MyButton/MyButton';
import { CategorySelector } from '../CategorySelector/CategorySelector';
import { usePeople } from './hooks/usePeople';
import { useSearchFilters } from './hooks/useSearchFilters';
import { useLabels } from '@/api/auth/QueryHooks/useGetLabels';
export default function SearchTransactions({ menu, group, userInfo, timeZoneId, expenseParsedFilters, transferParsedFilters, isPersonal,
// nonGroupUsers
 }) {
    const [editorState, setEditorState] = useState(null);
    const queryClient = useQueryClient();
    const { fetchedPeople, enhancedPeopleWithProps, allUsers } = usePeople(group, userInfo, isPersonal);
    const { data: suggestedLabels } = useLabels(userInfo?.userId, isPersonal, group?.id);
    const { category, expenseFilterState, transferFilterState, filteredPeople, filteredLabels, submitButtonIsActive, cancelled, searchKeyword, path, } = useSearchFilters(group, allUsers, suggestedLabels, isPersonal);
    const editorContentRef = useRef(null);
    useEffect(() => {
        const handleBackNavigation = () => {
            if (menu.value) {
                menu.value = null;
            }
        };
        window.addEventListener('popstate', handleBackNavigation);
        return () => {
            window.removeEventListener('popstate', handleBackNavigation);
        };
    }, [menu]);
    const fetchedLabels = group
        ? group?.labels.map((l) => ({
            id: l.id,
            value: l.text,
            color: l.color,
            prop: 'category',
        }))
        : suggestedLabels?.labels.map((l) => ({
            id: l.id,
            value: l.text,
            color: l.color,
            prop: 'category',
            isPersonal: isPersonal,
        })) || [];
    return (_jsx(StyledSearchTransactions, { children: _jsxs(_Fragment, { children: [_jsxs("div", { className: "header", children: [_jsx("div", { className: "gap" }), _jsxs("div", { className: "searchingIn", children: ["Searching In:\u00A0", _jsx("span", { className: "groupName", children: isPersonal
                                        ? 'Personal'
                                        : group?.name
                                            ? group?.name
                                            : 'Non Group' })] }), _jsx("div", { className: "closeSign", onClick: () => (menu.value = null), children: _jsx(IoClose, { name: "close-outline", className: "close" }) })] }), !isPersonal && (_jsx("div", { className: "catSelector", children: _jsx(CategorySelector, { activeCat: path, categories: {
                            cat1: 'Expenses',
                            cat2: 'Transfers',
                        }, navLinkUse: true, activeCatAsState: category }) })), _jsx("div", { className: "searchBarAndCategories", children: _jsx("div", { className: "lexicalSearch", children: _jsx(LexicalComposer, { initialConfig: initialConfig, children: _jsx(EditorContent, { searchKeyword: searchKeyword, ref: editorContentRef, enhancedPeopleWithProps: enhancedPeopleWithProps, submitButtonIsActive: submitButtonIsActive, expenseFilterState: expenseFilterState, transferFilterState: transferFilterState, setEditorState: setEditorState, people: fetchedPeople, labels: fetchedLabels, cancelled: cancelled, filteredPeople: filteredPeople, timeZoneId: timeZoneId, filteredLabels: filteredLabels, category: category, isPersonal: isPersonal }) }) }) }), _jsxs("div", { className: "submitButtons", children: [_jsx(MyButton, { fontSize: "16", onClick: () => handleSubmitButton(editorState, expenseFilterState, transferFilterState, menu, category, queryClient, expenseParsedFilters, transferParsedFilters, isPersonal), disabled: !submitButtonIsActive.value, variant: submitButtonIsActive.value ? 'primary' : 'secondary', children: "Apply" }), submitButtonIsActive.value ? (_jsx(MyButton, { onClick: () => handleCancelClick(editorContentRef), fontSize: "16", children: "Cancel" })) : null] })] }) }));
}
