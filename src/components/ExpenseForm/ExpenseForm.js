import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import CurrencyOptionsAnimation from '@/components/Animations/CurrencyOptionsAnimation';
import InputMonetary from '@/components/InputMonetary/InputMonetary';
import { useSignal } from '@preact/signals-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { StyledExpenseForm } from './ExpenseForm.styled';
import { useCreateExpenseMutation } from './hooks/useCreateExpenseMutation';
import { LocationDisplay } from './components/LocationDisplay/LocationDisplay';
import DateDisplay from './components/DateDisplay/DateDisplay';
import { LabelMenu } from './components/LabelMenu/LabelMenu';
import LabelsDisplay from './components/LabelsDisplay/LabelsDisplay';
import FormInputWithTag from './components/FormInputWithTag/FormInputWithTag';
import DetailedSharedExpenseText from './components/DetailedSharedExpenseText/DetailedSharedExpenseText';
import { ShareExpenseButtons } from './components/ShareExpenseButtons/ShareExpenseButtons';
import { useAdjustedMembers } from './hooks/useAdjustedMembers';
import { useExpenseFormStore } from './hooks/useExpenseFormStore';
import { ExpenseFormHeader } from './components/ExpenseFormHeader/ExpenseFormHeader';
import { ExpenseFormFooter } from './components/ExpenseFormFooter/ExpenseFormFooter';
import { useHandlers } from './hooks/useHandlers';
import { useEditExpenseMutation } from '@/api/auth/CommandHooks/useEditExpenseMutation';
import GeneralWarningMenuAnimation from '../Animations/GeneralWarningMenuAnimation';
import { currencyData } from '@/helpers/openExchangeRates';
import { useGetGroupLabels } from '@/api/auth/QueryHooks/useGetGroupLabels';
import { useLabels } from '@/api/auth/QueryHooks/useGetLabels';
export default function ExpenseForm({ groupMembers, nonGroupUsers, groupId, expense, timeZoneId, menu, timeZoneCoordinates, header, selectedExpense, isCreateExpense, isPersonal, isnonGroupExpense, currency, nonGroupMenu, fromHomeGroup, fromHome, fromPersonal, }) {
    const isInitialRender = useRef(true);
    const userExistsInCategory = useSignal({ Participants: false, Payers: false });
    const navigate = useNavigate();
    const { userInfo } = useOutletContext();
    const inputs = useExpenseFormStore();
    useEffect(() => {
        if (isCreateExpense) {
            inputs.participantsCategory.value = 'Amounts';
            inputs.payersCategory.value = 'Amounts';
        }
        inputs.initialize({
            isCreateExpense,
            expense,
            currency,
            groupMembers,
            nonGroupUsers,
            userInfo,
            userMemberId: inputs.userMemberId,
            isnonGroupExpense,
        });
    }, [inputs.initialize, isCreateExpense, expense?.id, currency, userInfo]);
    useEffect(() => {
        if (inputs.isSubmitting)
            return;
        inputs.updateMembers({
            groupMembers,
            nonGroupUsers,
            expense,
            isCreateExpense,
            isnonGroupExpense,
            userInfo,
            userMemberId: inputs.userMemberId,
        });
    }, [
        inputs.updateMembers,
        groupMembers?.value,
        nonGroupUsers?.value,
        isnonGroupExpense?.value,
        expense,
        isCreateExpense,
        userInfo,
        inputs.userMemberId,
    ]);
    // Prefetch labels so they're cached when the label menu opens
    useGetGroupLabels(groupId);
    useLabels(userInfo?.userId, isPersonal?.value, groupId);
    const currencyMenu = useSignal(null);
    const warningMenu = useSignal(null);
    const isMapOpen = useSignal(false);
    const isDateShowing = useSignal(!isCreateExpense);
    const labelMenuIsOpen = useSignal(false);
    const displayedAmount = useSignal(isCreateExpense || !expense ? '' : expense.amount);
    const { participants, payers, adjustParticipants, adjustPayers } = useAdjustedMembers({
        participantsByCategory: inputs.participantsByCategory,
        payersByCategory: inputs.payersByCategory,
        participantsCategory: inputs.participantsCategory,
        payersCategory: inputs.payersCategory,
        nonGroupUsers,
        isnonGroupExpense,
        userInfo,
        userMemberId: inputs.userMemberId,
    });
    const setParticipants = (newParticipants) => {
        inputs.setParticipantsByCategory((prev) => ({
            ...prev,
            [inputs.participantsCategory.value]: newParticipants,
        }));
        inputs.validateForm({ showErrors: true });
    };
    const setPayers = (newPayers) => {
        inputs.setPayersByCategory((prev) => ({
            ...prev,
            [inputs.payersCategory.value]: newPayers,
        }));
        inputs.validateForm({ showErrors: true });
    };
    const { mutate: createExpenseMutation, isPending: isPendingCreateExpense } = useCreateExpenseMutation(menu, groupId, navigate, inputs.setIsSubmitting, inputs.makePersonalClicked, nonGroupUsers, fromHomeGroup, groupMembers, fromHome, isnonGroupExpense, isPersonal);
    const { mutate: editExpenseMutation, isPending: isPendingEditExpense } = useEditExpenseMutation(menu, inputs.setIsSubmitting, nonGroupUsers, fromHomeGroup, groupMembers, inputs.makePersonalClicked, isnonGroupExpense, selectedExpense);
    const onSubmit = () => {
        if (isnonGroupExpense?.value &&
            !userExistsInCategory.value.Participants &&
            !userExistsInCategory.value.Payers &&
            !isPersonal?.value) {
            warningMenu.value = 'generalWarning';
            return;
        }
        inputs.submitExpense({
            groupId,
            createExpenseMutation,
            editExpenseMutation: editExpenseMutation,
            isnonGroupExpense,
            fromPersonal,
            isPersonal,
            isCreateExpense,
            expense,
            fromHomeGroup,
        });
    };
    const amountNumber = !inputs.amountError ? Number(inputs.amount) : 0;
    const { handleInputBlur, handleCurrencyOptionsClick, handleInputChangeCallback, handleDescriptionChange, } = useHandlers(participants, payers, inputs.setShowAmountError, inputs.amount, inputs.setAmountError, inputs.setCurrencySymbol, currencyMenu, displayedAmount, inputs.setAmount, inputs.setParticipantsError, inputs.setPayersError, isInitialRender, inputs.validateForm, isCreateExpense, inputs.setDescription, inputs.setDescriptionError, inputs.currencySymbol);
    const allCurrencies = useSignal(currencyData);
    const selectedCurrency = allCurrencies.value.find((c) => c.symbol === inputs.currencySymbol);
    return (_jsxs(StyledExpenseForm, { children: [_jsx(ExpenseFormHeader, { header: header, isnonGroupExpense: isnonGroupExpense, fromHome: fromHome, nonGroupUsers: nonGroupUsers, groupMembers: groupMembers, isPersonal: isPersonal, fromHomeGroup: fromHomeGroup, menu: menu }), _jsxs("div", { className: "inputAndErrorsWrapper", children: [_jsx(InputMonetary, { currencyMenu: currencyMenu, value: displayedAmount.value, onChange: handleInputChangeCallback, onBlur: handleInputBlur, selectedCurrency: selectedCurrency, autoFocus: true, "$inputError": inputs.showAmountError && !!inputs.amountError }), _jsx("span", { className: "errorMsg", children: inputs.showAmountError && inputs.amountError
                            ? inputs.amountError
                            : '' })] }), _jsx(DetailedSharedExpenseText, { fromHomeGroup: fromHomeGroup, isCreateExpense: isCreateExpense, isPendingCreateExpense: isPendingCreateExpense, isPendingEditExpense: isPendingEditExpense, amountNumber: amountNumber, adjustParticipants: adjustParticipants, setParticipants: setParticipants, participantsError: inputs.participantsError, currencySymbol: inputs.currencySymbol, participantsCategory: inputs.participantsCategory, userMemberId: inputs.userMemberId, setParticipantsError: inputs.setParticipantsError, isnonGroupExpense: isnonGroupExpense, userInfo: userInfo, groupMembers: groupMembers, nonGroupUsers: nonGroupUsers, nonGroupMenu: nonGroupMenu, adjustPayers: adjustPayers, setPayers: setPayers, payersError: inputs.payersError, setPayersError: inputs.setPayersError, payersCategory: inputs.payersCategory, isPersonal: isPersonal, userExistsInCategory: userExistsInCategory }), _jsx(FormInputWithTag, { description: "Description", placeholder: "Description", value: inputs.description, error: inputs.descriptionError, onChange: handleDescriptionChange, labelMenuIsOpen: labelMenuIsOpen }), fromPersonal?.value ? null : (_jsx(ShareExpenseButtons, { isPersonal: isPersonal, amountNumber: amountNumber, nonGroupUsers: nonGroupUsers, adjustParticipants: adjustParticipants, adjustPayers: adjustPayers, fromHome: fromHome, nonGroupMenu: nonGroupMenu, setMakePersonalClicked: inputs.setMakePersonalClicked })), labelMenuIsOpen.value && (_jsx(LabelMenu, { labelMenuIsOpen: labelMenuIsOpen, labels: inputs.labels, setLabels: inputs.setLabels, groupId: isPersonal?.value ? undefined : groupId, userId: userInfo?.userId, isPersonal: isPersonal?.value ?? false })), _jsx(LocationDisplay, { location: inputs.location, isMapOpen: isMapOpen, setLocation: inputs.setLocation }), isDateShowing.value && (_jsx(DateDisplay, { selectedDateTime: inputs.expenseTime, timeZoneId: timeZoneId, setTime: inputs.setExpenseTime, isDateShowing: isDateShowing, setShowPicker: inputs.setShowPicker })), inputs.labels.length > 0 ? (_jsx(LabelsDisplay, { labels: inputs.labels, setLabels: inputs.setLabels, labelMenuIsOpen: labelMenuIsOpen })) : null, _jsx("div", { className: "spacer" }), _jsx(ExpenseFormFooter, { onSubmit: onSubmit, isCreateExpense: isCreateExpense, isPendingCreateExpense: isPendingCreateExpense, isPendingEditExpense: isPendingEditExpense, location: inputs.location, isMapOpen: isMapOpen, timeZoneCoordinates: timeZoneCoordinates, setLocation: inputs.setLocation, setDescriptionError: inputs.setDescriptionError, expenseTime: inputs.expenseTime, setExpenseTime: inputs.setExpenseTime, timeZoneId: timeZoneId, isDateShowing: isDateShowing, showPicker: inputs.showPicker, setShowPicker: inputs.setShowPicker }), _jsx(MenuAnimationBackground, { menu: currencyMenu }), _jsx(MenuAnimationBackground, { menu: warningMenu }), _jsx(CurrencyOptionsAnimation, { currencyMenu: currencyMenu, clickHandler: handleCurrencyOptionsClick, selectedCurrency: inputs.currencySymbol }), _jsx(GeneralWarningMenuAnimation, { menu: warningMenu, message: 'You need to be either a participant or a payer in order to submit a non-group expense.' })] }));
}
