import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useBeautifulMentions } from 'lexical-beautiful-mentions';
import { StyledLabelsPillsDisplay } from './LabelsPillsDisplay.styled';
import Pill from '../../../../Pill/Pill';
import { useEffect, useState } from 'react';
import labelColors from '../../../../../labelColors';
import { MdGroup } from 'react-icons/md';
export default function LabelsPillsDisplay({ category, filteredLabels, showOptions, submitButtonIsActive, filterState, cancelled, removedFilter, isPersonal, }) {
    const { insertMention } = useBeautifulMentions();
    const [showFilteredLabels, setShowFilteredLabels] = useState([]);
    useEffect(() => {
        setShowFilteredLabels(filteredLabels.value);
        if (cancelled.value) {
            cancelled.value = false;
        }
    }, [filteredLabels.value, cancelled.value]);
    const removeFilter = (filterId) => {
        removedFilter.value = true;
        setShowFilteredLabels((prev) => prev.filter((filter) => filter.id !== filterId));
        filterState.value.labels = filterState.value.labels.filter((id) => id !== filterId);
        filteredLabels.value = filteredLabels.value.filter((label) => label.id !== filterId);
        submitButtonIsActive.value = true;
    };
    return (_jsxs(StyledLabelsPillsDisplay, { children: [_jsxs("div", { className: "category", onClick: () => {
                    insertMention({ trigger: category + ':', value: '' });
                    showOptions.value = false;
                    submitButtonIsActive.value = true;
                }, children: [category, ":"] }), "\u00A0", _jsx("div", { className: "pills", children: showFilteredLabels.length > 0 ? (showFilteredLabels.map((label) => (_jsx("div", { children: _jsx(Pill, { title: label?.value, color: labelColors[label?.color], closeButton: true, onClose: () => removeFilter(label?.id), "$textColor": "#000000c8", "$border": false, fontSize: "16px", children: isPersonal && !label.id.includes('_') && (_jsx(MdGroup, { style: { marginRight: '4px' } })) }, label?.id) }, label.id)))) : (_jsx("div", { className: "type", children: "label" })) })] }));
}
