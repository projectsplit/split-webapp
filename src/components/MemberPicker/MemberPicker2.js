import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import { useSignal } from '@preact/signals-react';
import { StyledMemberPicker } from './MemberPicker.styled';
import { significantDigitsFromTicker } from '../../helpers/openExchangeRates';
import { CategorySelector } from '../CategorySelector/CategorySelector';
import Right from './helpers/components/Right';
import Text from './helpers/components/Text';
import NameAndAmounts from './helpers/components/NameAndAmounts';
import { isEquallySplitFn } from './helpers/isEquallySplitFn';
import { recalculateAmounts } from './helpers/recalculateAmounts';
import { useRecalculateAmounts } from './helpers/hooks/useRecalculateAmounts';
import { removeCommas } from '../../helpers/removeCommas';
import { currencyMask } from '../../helpers/currencyMask';
import { BiArrowBack } from 'react-icons/bi';
import MyButton from '../MyButton/MyButton';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import ParticipantsPayersAnimation from '../Animations/ParticipantsPayersAnimation';
import { handleDoneClick } from './helpers/handleDoneClick';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import { errorSettingFn } from './helpers/errorSettingFn';
import IonIcon from '@reacticons/ionicons';
import { useTotalSelectedAmount } from './helpers/hooks/useTotalSelectedAmount';
import { BuildRemainingAmountText } from './helpers/components/BuildRemainingAmountText';
const MemberPickerPreMemo2 = ({ memberAmounts, setMemberAmounts, totalAmount, description, error, category, userMemberId, selectedCurrency, setError, isnonGroupExpense, userId, groupMembers, nonGroupUsers, isLoading, isCreateExpense, }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const mainRef = useRef(null);
    const renderCounter = useRef(0);
    const isEquallySplit = useSignal(true);
    const inputRefs = useRef(new Map());
    const errorMenu = useSignal('');
    const [decimalDigits, setDecimalDigits] = useState(2);
    renderCounter.current++;
    const clickOutsideListener = (event) => {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            mainRef.current &&
            !mainRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };
    useEffect(() => {
        setDecimalDigits(significantDigitsFromTicker(selectedCurrency));
    }, [selectedCurrency]);
    useEffect(() => {
        document.addEventListener('mousedown', clickOutsideListener);
        return () => {
            document.removeEventListener('mousedown', clickOutsideListener);
        };
    }, []);
    useEffect(() => {
        if (isCreateExpense)
            return;
        errorSettingFn(description, memberAmounts, setError, errorMenu, selectedCurrency, totalAmount);
    }, [totalAmount]);
    useRecalculateAmounts(memberAmounts, setMemberAmounts, totalAmount, userMemberId, decimalDigits, description, renderCounter, category, selectedCurrency, userId, groupMembers, nonGroupUsers, isCreateExpense, isnonGroupExpense);
    useLayoutEffect(() => {
        if (isLoading)
            return;
        const selected = memberAmounts.filter((m) => m.selected);
        const sum = selected.reduce((acc, m) => acc + Number(m.actualAmount || 0), 0);
        const sumsMatch = selected.length > 0 &&
            Number(sum.toFixed(decimalDigits)) ===
                Number(Number(totalAmount).toFixed(decimalDigits));
        // Only update split label when amounts actually add up to the total.
        // During editing, stale amounts would wrongly flip "equally" to "unequally".
        if (sumsMatch) {
            isEquallySplit.value = isEquallySplitFn(memberAmounts, totalAmount, decimalDigits);
        }
    }, [memberAmounts, totalAmount]);
    const selectMember = (selectedId) => {
        const newFormMembers = memberAmounts.map((m) => {
            if (m.id === selectedId) {
                return { ...m, selected: true, order: renderCounter.current };
            }
            return m;
        });
        setMemberAmounts(recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category, selectedCurrency, isCreateExpense));
    };
    const deselectMember = (id) => {
        const newFormMembers = memberAmounts.map((m) => {
            // if (
            //   isnonGroupExpense?.value &&
            //   m.id === userId &&
            //   description === "Participants"
            // )
            //   return m;
            if (m.id === id) {
                return {
                    ...m,
                    selected: false,
                    actualAmount: '',
                    screenQuantity: '',
                    locked: false,
                };
            }
            return m;
        });
        setMemberAmounts(recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category, selectedCurrency, isCreateExpense));
    };
    const toggleLock = (e, id) => {
        e.stopPropagation();
        const newFormMembers = memberAmounts.map((m) => {
            if (m.id === id) {
                return { ...m, locked: !m.locked };
            }
            return m;
        });
        setMemberAmounts(recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category, selectedCurrency, isCreateExpense));
    };
    const changeAmount = (id, e) => {
        if (category.value !== 'Amounts') {
            let value = e.target.value.replace(/,/g, '.'); // Replace comma with dot
            const updatedMembers = memberAmounts.map((m) => m.id === id ? { ...m, screenQuantity: value, locked: true } : m);
            setMemberAmounts(recalculateAmounts(updatedMembers, totalAmount, decimalDigits, category, selectedCurrency, isCreateExpense));
            return;
        }
        const oldMember = memberAmounts.find((m) => m.id === id);
        const oldDisplayed = oldMember ? oldMember.screenQuantity : '';
        const oldDisplayedLength = oldDisplayed.length;
        const rawLength = e.target.value.length;
        const isAddition = rawLength > oldDisplayedLength;
        const isDeletion = rawLength < oldDisplayedLength;
        let formattedValue = currencyMask(e, selectedCurrency, oldDisplayed, true)
            .target.value;
        const clean = removeCommas(formattedValue);
        let actualAmount = clean;
        if (isNaN(Number(clean))) {
            if (clean === '.' || clean === '') {
                if (isDeletion || clean === '') {
                    formattedValue = '';
                    actualAmount = '';
                }
                else if (isAddition) {
                    formattedValue = '.';
                    actualAmount = '0.';
                }
            }
        }
        else {
            const numericValue = Number(clean);
            if (numericValue > 999999999999.99) {
                formattedValue = oldDisplayed;
                actualAmount = removeCommas(oldDisplayed);
            }
            else if (clean.startsWith('.')) {
                actualAmount = '0' + clean;
            }
        }
        const updatedMembers = memberAmounts.map((m) => m.id === id
            ? { ...m, screenQuantity: formattedValue, actualAmount, locked: true }
            : m);
        setMemberAmounts(recalculateAmounts(updatedMembers, totalAmount, decimalDigits, category, selectedCurrency, isCreateExpense));
    };
    const handleInputBlur = (id) => {
        const updatedMembers = memberAmounts.map((m) => {
            if (m.id === id) {
                const cleanedValue = m.screenQuantity;
                const numericValue = Number(m.actualAmount);
                const isZero = numericValue === 0 || isNaN(numericValue);
                switch (category.value) {
                    case 'Amounts':
                        return {
                            ...m,
                            screenQuantity: isZero ? '0.00' : cleanedValue,
                            locked: isZero ? false : m.locked,
                        };
                    case 'Shares':
                        return {
                            ...m,
                            screenQuantity: isZero ? '' : cleanedValue,
                            locked: isZero ? false : m.locked,
                        };
                    case 'Percentages':
                        return {
                            ...m,
                            screenQuantity: isZero ? '0.00' : cleanedValue,
                            locked: isZero ? false : m.locked,
                        };
                    default:
                        return m;
                }
            }
            return m;
        });
        setMemberAmounts(recalculateAmounts(updatedMembers, totalAmount, decimalDigits, category, selectedCurrency, isCreateExpense));
    };
    const handleMainClick = () => {
        setMemberAmounts(recalculateAmounts(memberAmounts, totalAmount, decimalDigits, category, selectedCurrency, isCreateExpense));
        setIsMenuOpen(!isMenuOpen);
    };
    const memoizedHandleDoneClick = useCallback(() => {
        handleDoneClick(description, memberAmounts, setError, errorMenu, selectedCurrency, totalAmount, setIsMenuOpen);
    }, [
        description,
        memberAmounts,
        setError,
        errorMenu,
        category,
        selectedCurrency,
        totalAmount,
        setIsMenuOpen,
    ]);
    const sortedMemberAmounts = useMemo(() => {
        return [...memberAmounts].sort((a, b) => Number(b.selected) - Number(a.selected));
    }, [memberAmounts]);
    const selectedCount = useMemo(() => memberAmounts.filter((m) => m.selected).length, [memberAmounts]);
    const selectedMembersForText = useMemo(() => {
        return memberAmounts
            .filter((m) => m.selected)
            .sort((a, b) => (b.order ?? 0) - (a.order ?? 0)) // stable order
            .map((m) => ({ id: m.id, name: m.name }));
    }, [memberAmounts]);
    const isEquallySplitValue = isEquallySplit.value;
    const totalSelectedAmount = useTotalSelectedAmount(memberAmounts, selectedCurrency);
    return (_jsxs(StyledMemberPicker, { "$selectedCount": selectedCount, "$isOpen": isMenuOpen, "$hasError": !!error, tabIndex: 0, "$category": category.value, role: "button", onKeyDown: (e) => {
            if (e.key === 'Enter') {
                handleMainClick();
            }
        }, children: [_jsx("div", { className: "main", onClick: handleMainClick, ref: mainRef, children: _jsx(Text, { description: description, isEquallySplit: isEquallySplitValue, selectedCount: selectedCount, selectedMembers: selectedMembersForText, error: error }) }), isMenuOpen && (_jsxs("div", { className: "menu", ref: dropdownRef, children: [_jsxs("div", { className: "header", children: [_jsxs("div", { className: "closeButtonContainer", children: [' ', _jsx(BiArrowBack, { className: "backButton", onClick: memoizedHandleDoneClick })] }), _jsx("div", { className: "title", children: description === 'Participants'
                                    ? `Split ${displayCurrencyAndAmount(totalAmount.toString(), selectedCurrency)} by`
                                    : `${displayCurrencyAndAmount(totalAmount.toString(), selectedCurrency)} paid by` }), _jsx("div", { className: "gap" })] }), _jsx("div", { className: "categories", children: _jsx(CategorySelector, { activeCat: 'Amounts', categories: {
                                cat1: 'Amounts',
                                cat2: 'Shares',
                                cat3: 'Percentages',
                            }, navLinkUse: false, activeCatAsState: category }) }), _jsxs("div", { className: "member-list", children: [sortedMemberAmounts
                                .filter((m) => m.selected)
                                .map((m) => (_jsxs("div", { className: "selected option", children: [_jsx(NameAndAmounts, { category: category, m: m, onClick: () => deselectMember(m.id), currency: selectedCurrency }), _jsx(Right, { screenQuantity: m.screenQuantity, category: category, changeAmount: changeAmount, handleInputBlur: handleInputBlur, id: m.id, locked: m.locked, selectedCurrency: selectedCurrency, toggleLock: toggleLock, memberAmounts: memberAmounts, inputRef: (el) => {
                                            if (el) {
                                                inputRefs.current.set(m.id, el);
                                            }
                                            else {
                                                inputRefs.current.delete(m.id);
                                            }
                                        } })] }, m.id))), sortedMemberAmounts
                                .filter((m) => !m.selected)
                                .map((m) => (_jsx("div", { className: "available option", children: _jsxs("div", { className: "textAndCheck", children: [_jsx("div", { className: "tick-cube", onClick: (_) => selectMember(m.id) }), m.name] }) }, m.id)))] }), _jsx("div", { className: "spacer" }), _jsxs("div", { className: "remainders", children: [_jsxs("div", { className: "firstRow", children: [' ', _jsxs("div", { className: "amounts", children: [displayCurrencyAndAmount(totalSelectedAmount.toString(), selectedCurrency), ' ', _jsx("span", { className: "text", children: "out of" }), ' ', displayCurrencyAndAmount(totalAmount.toString(), selectedCurrency)] }), totalSelectedAmount === totalAmount ? (_jsx(IonIcon, { name: "checkmark-sharp", className: "checkmark" })) : null] }), BuildRemainingAmountText(totalSelectedAmount, selectedCurrency, totalAmount)] }), _jsx(MyButton, { fontSize: "16", onClick: memoizedHandleDoneClick, children: "Done" }), _jsx(MenuAnimationBackground, { menu: errorMenu }), _jsx(ParticipantsPayersAnimation, { menu: errorMenu, error: error })] }))] }));
};
export const MemberPicker2 = memo(MemberPickerPreMemo2, (prev, next) => {
    return (prev.description === next.description &&
        prev.totalAmount === next.totalAmount &&
        prev.memberAmounts === next.memberAmounts &&
        prev.error === next.error &&
        prev.selectedCurrency === next.selectedCurrency &&
        prev.category.value === next.category.value &&
        prev.isLoading === next.isLoading &&
        prev.userMemberId === next.userMemberId &&
        prev.isnonGroupExpense?.value === next.isnonGroupExpense?.value &&
        prev.userId === next.userId &&
        prev.isCreateExpense === next.isCreateExpense);
});
export default MemberPicker2;
