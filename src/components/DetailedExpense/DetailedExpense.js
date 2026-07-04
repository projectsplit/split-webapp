import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledDetailedExpense } from './DetailedExpense.Styled';
import MembersInfoBox from './MembersInfoBox/MembersInfoBox';
import IonIcon from '@reacticons/ionicons';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import MyButton from '../MyButton/MyButton';
import Pill from '../Pill/Pill';
import { DateOnly, TimeOnly, YearOnly } from '../../helpers/timeHelpers';
import MapsInfoBox from './MapsInfoBox/MapsInfoBox';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import { signal, useSignal } from '@preact/signals-react';
import DeleteExpenseAnimation from '../Animations/DeleteExpenseAnimation';
import { Mode, TransactionType } from '../../types';
import EditExpenseAnimation from '../Animations/EditExpenseAnimation';
import labelColors from '../../labelColors';
import { MdGroup } from 'react-icons/md';
import { buildFormExpense, toUser } from './utils';
import NavigateToExpenseAnimation from '../Animations/NavigateToExpenseAnimation';
export default function DetailedExpense({ selectedExpense, amount, currency, description, labels, location, occurred, payments, shares, timeZoneId, timeZoneCoordinates, creator, created, participants, errorMessage, userMemberId, group, userId, mode, }) {
    const expenseType = selectedExpense.value?.transactionType;
    const googleUrl = 'https://www.google.com/maps/search/?api=1&query=';
    // const theme = {
    //   text: {
    //     bold: "editor-bold",
    //   },
    // };
    const menu = useSignal(null);
    // const onError = (error: Error): void => {
    //   console.error(error);
    // };
    // const initialConfig = {
    //   namespace: "MyEditor",
    //   theme,
    //   onError,
    //   nodes: [HeadingNode],
    // };
    const googleMapsUrlBuilder = (location) => {
        if (location?.google?.id) {
            return `${googleUrl}${encodeURIComponent(location.google?.name)}&query_place_id=${location.google?.id}`;
        }
        else {
            return `${googleUrl}${location?.coordinates.latitude},${location?.coordinates.longitude}`;
        }
    };
    const googleMapsUrl = googleMapsUrlBuilder(location);
    const expenseToEdit = buildFormExpense(selectedExpense, mode, group);
    return (_jsxs(StyledDetailedExpense, { mode: mode, children: [_jsxs("div", { className: "descriptionAndCloseButton", children: [_jsx("div", {}), _jsx("div", { className: "descreption", children: description ? _jsxs("span", { children: ["\"", description, "\""] }) : '' }), _jsx("div", { className: "closeButton", onClick: () => (selectedExpense.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), labels.length > 0 ? (_jsx("div", { className: "dateAndLabels", children: _jsx("div", { className: "labelsWrapper", children: _jsx("div", { className: "labels", children: labels.map((l) => (_jsx(Pill, { title: l.text, "$textColor": "#000000c8", color: l.color === '' ? 'white' : labelColors[l.color], closeButton: false, fontSize: "18px", "$border": false, children: mode === Mode.Personal && !l.id.includes('_') && (_jsx(MdGroup, { style: { marginRight: '4px' } })) }, l.id))) }) }) })) : null, _jsx("div", { className: "total", children: displayCurrencyAndAmount(amount.toString(), currency) }), mode !== Mode.Personal && (_jsxs("div", { children: [_jsx(MembersInfoBox, { transactions: shares, areShares: true, currency: currency, participants: participants, userMemberId: userMemberId, userId: userId, expenseType: expenseType }), _jsx(MembersInfoBox, { transactions: payments, areShares: false, currency: currency, participants: participants, userMemberId: userMemberId, userId: userId, expenseType: expenseType })] })), mode === Mode.Personal && !location ? null : (_jsx(MapsInfoBox, { location: location, googleMapsUrl: googleMapsUrl })), _jsxs("div", { className: "editDeleteButtons", children: [_jsx("div", { className: "dummyDiv" }), (group && !group.isArchived) ||
                        (mode === Mode.NonGroup && !group) ||
                        expenseType === TransactionType.Personal ? (_jsxs("div", { className: "buttons", children: [_jsx("div", { className: "editButton", children: _jsx(MyButton, { onClick: () => (menu.value = 'editExpense'), children: _jsxs("div", { className: "buttonChildren", children: [_jsx(AiFillEdit, { className: "icon" }), _jsx("span", { children: "Edit" })] }) }) }), _jsx("div", { className: "deleteButton", children: _jsx(MyButton, { onClick: () => (menu.value = 'deleteExpense'), variant: "secondary", children: _jsxs("div", { className: "buttonChildren", children: [_jsx(AiFillDelete, { className: "icon" }), _jsx("span", { children: "Delete" })] }) }) })] })) : (_jsx("div", { children: mode === Mode.Personal && _jsxs("div", { className: "navigatePrompt", children: [_jsx("span", { className: "info", children: `This is your share from a ${expenseType === TransactionType.Group ? 'group' : 'non group'} expense` }), _jsx("div", { className: "navigateButton", children: _jsx(MyButton, { onClick: () => (menu.value = 'navigateToExpense'), variant: "primary", children: _jsx("div", { className: "buttonChildren", children: _jsx("span", { children: `Go to ${expenseType === TransactionType.Group ? 'group' : 'non group'} expense` }) }) }) })] }) })), _jsx("div", { className: "dummyDiv" })] }), _jsxs("div", { className: "createdBy", children: ["Created", ' ', mode === Mode.Personal
                        ? ''
                        : participants.find((x) => x.id === creator)?.name, ' ', DateOnly(occurred, timeZoneId) === 'Today' ||
                        DateOnly(occurred, timeZoneId) === 'Yesterday'
                        ? DateOnly(created, timeZoneId)
                        : 'on' +
                            ' ' +
                            DateOnly(occurred, timeZoneId) +
                            ' ' +
                            YearOnly(occurred, timeZoneId), ' ', "at ", TimeOnly(created, timeZoneId)] }), _jsxs("div", { className: "date", children: ["Occurred", ' ', DateOnly(occurred, timeZoneId) === 'Today' ||
                        DateOnly(occurred, timeZoneId) === 'Yesterday'
                        ? DateOnly(occurred, timeZoneId)
                        : 'on' +
                            ' ' +
                            DateOnly(occurred, timeZoneId) +
                            ' ' +
                            YearOnly(occurred, timeZoneId), ' ', "at ", TimeOnly(occurred, timeZoneId)] }), _jsx("div", { className: "commentSection", children: _jsx("div", { className: "comments" }) }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(DeleteExpenseAnimation, { menu: menu, description: description, selectedExpense: selectedExpense, errorMessage: errorMessage }), _jsx(EditExpenseAnimation, { expense: expenseToEdit || null, groupId: group?.id, timeZoneId: timeZoneId, menu: menu, selectedExpense: selectedExpense, timeZoneCoordinates: timeZoneCoordinates, currency: currency, groupMembers: group ? signal([...group.members, ...group.guests]) : signal([]), nonGroupUsers: signal(participants.map((p) => toUser(p))), isPersonal: mode === Mode.Personal ? signal(true) : signal(false), isnonGroupExpense: mode === Mode.NonGroup ? signal(true) : signal(false) }), _jsx(NavigateToExpenseAnimation, { menu: menu, selectedExpense: selectedExpense, errorMessage: errorMessage })] }));
}
