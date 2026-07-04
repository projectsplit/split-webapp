import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledCurrentSearchField } from './StyledCurrentSearchField';
import Pill from '../../Pill/Pill';
export default function CurrentSearchField({ currentSearch, filterState, submitButtonIsActive, removedFilter, showFreeTextPill, }) {
    const removeFilter = () => {
        showFreeTextPill.value = false;
        filterState.value.freeText = '';
        submitButtonIsActive.value = true;
        removedFilter.value = true;
    };
    return (_jsxs(StyledCurrentSearchField, { children: [_jsx("div", { className: "category", children: "search term:" }), "\u00A0", _jsx("div", { className: "pills", children: _jsx(Pill, { title: currentSearch, color: "#ffffff", closeButton: true, onClose: () => removeFilter(), "$textColor": "#000000c8", "$border": false, fontSize: "16px" }) })] }));
}
