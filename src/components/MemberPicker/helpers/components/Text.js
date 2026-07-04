import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { StyledText } from './Text.styled';
import { memo } from 'react';
const Text = memo(function Text({ description, selectedCount, selectedMembers, isEquallySplit, error, }) {
    const firstSelectedName = selectedMembers[0]?.name;
    const splitLabel = isEquallySplit ? 'equally' : 'unequally';
    const conjunction = selectedCount === 2 ? 'between' : 'among';
    return (_jsx(StyledText, { "$error": error, children: description === 'Participants' ? (selectedCount === 0 ? ('') : selectedCount === 1 ? (_jsxs(_Fragment, { children: ["Billed to ", _jsxs("div", { className: "button", children: [firstSelectedName, " "] }), " and"] })) : (_jsxs(_Fragment, { children: ["Split ", _jsxs("div", { className: "button", children: [splitLabel, " "] }), " ", conjunction, ' ', selectedCount, " and"] }))) : description === 'Payers' ? (selectedCount === 0 ? ('') : selectedCount === 1 ? (_jsxs(_Fragment, { children: ["paid by ", _jsxs("div", { className: "button", children: [firstSelectedName, " "] })] })) : (_jsxs(_Fragment, { children: ["paid ", _jsxs("div", { className: "button", children: [splitLabel, " "] }), " by", ' ', selectedCount] }))) : null }));
}, 
// Dependency comparison function (optional, but safe)
(prevProps, nextProps) => {
    return (prevProps.description === nextProps.description &&
        prevProps.selectedCount === nextProps.selectedCount &&
        prevProps.isEquallySplit === nextProps.isEquallySplit &&
        prevProps.error === nextProps.error &&
        prevProps.selectedMembers[0]?.name === nextProps.selectedMembers[0]?.name);
});
export default Text;
