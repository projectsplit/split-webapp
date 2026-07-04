import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { StyledSearchCategoryButton } from '../SearchCategoryButton.styled';
import { useBeautifulMentions } from 'lexical-beautiful-mentions';
import Pill from '../../../Pill/Pill';
export default function SearchDateButton({ category, type, submitButtonIsActive, showOptions, calendarIsOpen, datePeriodClicked, filterState, cancelled, removedFilter, }) {
    const { insertMention } = useBeautifulMentions();
    const [showDate, setShowDate] = useState([]);
    const updateShowDate = () => {
        switch (category) {
            case 'before':
                setShowDate(filterState.value.before || []);
                break;
            case 'during':
                setShowDate(filterState.value.during || []);
                break;
            case 'after':
                setShowDate(filterState.value.after || []);
                break;
            default:
                setShowDate([]);
                break;
        }
    };
    useEffect(() => {
        updateShowDate();
        if (cancelled.value === true) {
            cancelled.value = false;
        }
    }, [filterState.value, category, cancelled.value]);
    const removeFilter = (dateToBeRemoved) => {
        removedFilter.value = true;
        setShowDate([]);
        switch (category) {
            case 'before':
                filterState.value.before = filterState.value.before.filter((date) => date !== dateToBeRemoved);
                break;
            case 'during':
                filterState.value.during = filterState.value.during.filter((date) => date !== dateToBeRemoved);
                break;
            case 'after':
                filterState.value.after = filterState.value.after.filter((date) => date !== dateToBeRemoved);
                break;
        }
        submitButtonIsActive.value = true;
    };
    return (_jsxs(StyledSearchCategoryButton, { children: [_jsxs("div", { className: "category", onClick: () => {
                    insertMention({ trigger: category + ':', value: '' });
                    showOptions.value = false;
                    calendarIsOpen.value = true;
                    datePeriodClicked.value = category;
                }, children: [category, ":"] }), "\u00A0", _jsx("div", { className: "pills", children: showDate.length > 0 ? (showDate.map((date, index) => (_jsx("div", { children: _jsx(Pill, { title: showDate[0], color: "#ffffff", closeButton: true, onClose: () => removeFilter(date), "$textColor": "#000000c8", "$border": false, fontSize: "16px" }) }, index)))) : (_jsx("div", { className: "type", children: "date" })) })] }));
}
