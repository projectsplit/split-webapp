import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { StyledDetailedSharedExpenseText } from './DetailedSharedExpenseText.styled';
import MemberPicker2 from '@/components/MemberPicker/MemberPicker2';
import { TiGroup } from 'react-icons/ti';
import { FaRegEdit } from 'react-icons/fa';
export default function DetailedSharedExpenseText({ fromHomeGroup, isCreateExpense, isPendingCreateExpense, isPendingEditExpense, amountNumber, adjustParticipants, setParticipants, participantsError, currencySymbol, participantsCategory, userMemberId, setParticipantsError, isnonGroupExpense, userInfo, groupMembers, nonGroupUsers, nonGroupMenu, adjustPayers, setPayers, payersError, setPayersError, payersCategory, isPersonal, userExistsInCategory, }) {
    const userIdToCheck = nonGroupUsers.value.length > 0 || isnonGroupExpense?.value
        ? userInfo?.userId
        : userMemberId;
    const isUserSelectedInParticipants = adjustParticipants.some((m) => m.id === userIdToCheck && m.selected);
    const isUserSelectedInPayers = adjustPayers.some((m) => m.id === userIdToCheck && m.selected);
    userExistsInCategory.value = {
        Participants: isUserSelectedInParticipants,
        Payers: isUserSelectedInPayers,
    };
    const showDetailedSharedExpenseText = (nonGroupUsers?.value.length > 0 || groupMembers?.value.length > 0) &&
        !!amountNumber &&
        !isPersonal.value;
    return (_jsxs(_Fragment, { children: [' ', showDetailedSharedExpenseText ? (_jsxs(StyledDetailedSharedExpenseText, { children: [_jsxs("div", { className: "textStyleInfo", children: [fromHomeGroup && fromHomeGroup.value ? (_jsxs("div", { className: "definition", children: [_jsx("span", { className: "labelStyle", children: _jsxs("div", { className: "info", children: [' ', _jsx(TiGroup, {}), fromHomeGroup.value.name] }) }), ":"] })) : null, _jsx(MemberPicker2, { isLoading: isCreateExpense ? isPendingCreateExpense : isPendingEditExpense, description: 'Participants', totalAmount: amountNumber, memberAmounts: adjustParticipants, error: participantsError, setMemberAmounts: setParticipants, 
                                // group={group}
                                selectedCurrency: currencySymbol, category: participantsCategory, userMemberId: userMemberId, setError: setParticipantsError, isnonGroupExpense: isnonGroupExpense, userId: userInfo.userId, groupMembers: groupMembers, nonGroupUsers: nonGroupUsers, isCreateExpense: isCreateExpense }), _jsx(MemberPicker2, { isLoading: isCreateExpense ? isPendingCreateExpense : isPendingEditExpense, description: 'Payers', totalAmount: amountNumber, memberAmounts: adjustPayers, error: payersError, setMemberAmounts: setPayers, 
                                // group={group}
                                selectedCurrency: currencySymbol, category: payersCategory, userMemberId: userMemberId, setError: setPayersError, isnonGroupExpense: isnonGroupExpense, userId: userInfo.userId, groupMembers: groupMembers, nonGroupUsers: nonGroupUsers, isCreateExpense: isCreateExpense }), isCreateExpense && nonGroupMenu ? (_jsx("div", { className: "editButton", onClick: () => (nonGroupMenu.value = 'nonGroupExpenseUsers'), children: _jsx(FaRegEdit, {}) })) : null] }), _jsxs("div", { className: "errors", children: [' ', participantsError && (_jsx("div", { className: "errorMsg", children: participantsError })), payersError && payersError !== participantsError && (_jsx("div", { className: "errorMsg", children: payersError }))] })] })) : null] }));
}
