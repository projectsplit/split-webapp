import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IonIcon from '@reacticons/ionicons';
import { DescriptionAndTree } from '../DescriptionAndTree/DescriptionAndTree';
export const RenderOwedOnly = ({ memberTransactions, pendingTransactions, isLogedUser, id, name, showTree, treeItems, participants, userOrMemberId, mode, }) => {
    return (_jsx("div", { className: "isOwed", children: _jsx(DescriptionAndTree, { memberTransactions: memberTransactions, pendingTransactions: pendingTransactions, isLogedUser: isLogedUser, id: id, name: name, isOwed: true, showTree: showTree, treeItems: treeItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode }) }));
};
export const RenderOwesOnly = ({ memberTransactions, pendingTransactions, isLogedUser, id, name, showTree, treeItems, participants, userOrMemberId, mode, }) => {
    return (_jsx("div", { className: "owes", children: _jsx(DescriptionAndTree, { memberTransactions: memberTransactions, pendingTransactions: pendingTransactions, isLogedUser: isLogedUser, id: id, name: name, isOwed: false, showTree: showTree, treeItems: treeItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode }) }));
};
export const RenderSettled = ({ isLogedUser, name }) => {
    return (_jsxs("div", { className: "settled", children: [isLogedUser ? (_jsxs("div", { children: [_jsx("span", { className: "you", children: "You" }), "\u00A0", _jsx("span", { className: "are", children: "are" })] })) : (_jsxs("div", { children: [_jsx("span", { className: "you", children: name }), "\u00A0", _jsx("span", { className: "is", children: "is" })] })), ' ', "\u00A0settled", _jsx(IonIcon, { name: "checkmark-sharp", className: "checkmark" })] }));
};
export const RenderBoth = ({ memberTransactions, pendingTransactions, isLogedUser, id, name, doNotshowTreeWhenMemberIsOwed, doNotshowTreeWhenMemberOwes, memberIsOwedItems, memberOwesItems, participants, userOrMemberId, mode, }) => {
    const showOwedFirst = !doNotshowTreeWhenMemberIsOwed && doNotshowTreeWhenMemberOwes;
    if (!showOwedFirst) {
        return (_jsxs("div", { className: "owesAndIsOwed", children: [_jsx(DescriptionAndTree, { memberTransactions: memberTransactions, pendingTransactions: pendingTransactions, isLogedUser: isLogedUser, id: id, name: name, isOwed: false, showTree: !doNotshowTreeWhenMemberOwes, treeItems: memberOwesItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode }), _jsx(DescriptionAndTree, { memberTransactions: memberTransactions, pendingTransactions: pendingTransactions, isLogedUser: isLogedUser, id: id, name: name, isOwed: true, showTree: !doNotshowTreeWhenMemberIsOwed, treeItems: memberIsOwedItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode })] }));
    }
    else if (showOwedFirst) {
        return (_jsxs("div", { className: "owesAndIsOwed", children: [_jsx(DescriptionAndTree, { memberTransactions: memberTransactions, pendingTransactions: pendingTransactions, isLogedUser: isLogedUser, id: id, name: name, isOwed: true, showTree: !doNotshowTreeWhenMemberIsOwed, treeItems: memberIsOwedItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode }), _jsx(DescriptionAndTree, { memberTransactions: memberTransactions, pendingTransactions: pendingTransactions, isLogedUser: isLogedUser, id: id, name: name, isOwed: false, showTree: !doNotshowTreeWhenMemberOwes, treeItems: memberOwesItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode })] }));
    }
    else {
        return (_jsxs("div", { className: "owesAndIsOwed", children: [_jsx(DescriptionAndTree, { memberTransactions: memberTransactions, pendingTransactions: pendingTransactions, isLogedUser: isLogedUser, id: id, name: name, isOwed: true, showTree: !doNotshowTreeWhenMemberIsOwed, treeItems: memberIsOwedItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode }), _jsx(DescriptionAndTree, { memberTransactions: memberTransactions, pendingTransactions: pendingTransactions, isLogedUser: isLogedUser, id: id, name: name, isOwed: false, showTree: !doNotshowTreeWhenMemberOwes, treeItems: memberOwesItems, participants: participants, userOrMemberId: userOrMemberId, mode: mode })] }));
    }
};
