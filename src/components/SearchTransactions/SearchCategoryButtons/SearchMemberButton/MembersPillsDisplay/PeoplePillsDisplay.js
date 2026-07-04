import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { StyledPeoplePillsDisplay } from './PeoplePillsDisplay.styled';
import { useBeautifulMentions } from 'lexical-beautiful-mentions';
import Pill from '../../../../Pill/Pill';
export const PeoplePillsDisplay = ({ category, type, filteredPeople, showOptions, submitButtonIsActive, expenseFilterState, transferFilterState, cancelled, removedFilter, }) => {
    const [showFilteredPeople, setShowFilteredPeople] = useState([]);
    const { insertMention } = useBeautifulMentions();
    const updateFilteredPeople = () => {
        switch (category) {
            case 'payer':
                return filteredPeople.value.payers;
            case 'participant':
                return filteredPeople.value.participants;
            case 'sender':
                return filteredPeople.value.senders;
            case 'receiver':
                return filteredPeople.value.receivers;
            default:
                return [];
        }
    };
    useEffect(() => {
        setShowFilteredPeople(updateFilteredPeople());
        if (cancelled.value === true) {
            cancelled.value = false;
        }
    }, [filteredPeople.value, category, cancelled.value]);
    const removeFilter = (id) => {
        removedFilter.value = true;
        const updatedFilteredPeople = showFilteredPeople.filter((person) => person.id !== id);
        setShowFilteredPeople(updatedFilteredPeople);
        switch (category) {
            case 'payer':
                if (expenseFilterState) {
                    expenseFilterState.value.payersIds =
                        expenseFilterState.value.payersIds.filter((payerId) => payerId !== id);
                    filteredPeople.value.payers = filteredPeople.value.payers.filter((person) => person.id !== id);
                }
                break;
            case 'participant':
                if (expenseFilterState) {
                    expenseFilterState.value.participantsIds =
                        expenseFilterState.value.participantsIds.filter((participantId) => participantId !== id);
                    filteredPeople.value.participants =
                        filteredPeople.value.participants.filter((person) => person.id !== id);
                }
                break;
            case 'sender':
                if (transferFilterState) {
                    transferFilterState.value.sendersIds =
                        transferFilterState.value.sendersIds.filter((senderId) => senderId !== id);
                    filteredPeople.value.senders = filteredPeople.value.senders.filter((person) => person.id !== id);
                }
                break;
            case 'receiver':
                if (transferFilterState) {
                    transferFilterState.value.receiversIds =
                        transferFilterState.value.receiversIds.filter((receiverId) => receiverId !== id);
                    filteredPeople.value.receivers =
                        filteredPeople.value.receivers.filter((person) => person.id !== id);
                }
                break;
            default:
                // No action needed for unexpected categories
                break;
        }
        submitButtonIsActive.value = true;
    };
    return (_jsxs(StyledPeoplePillsDisplay, { children: [_jsxs("div", { className: "category", onClick: () => {
                    insertMention({ trigger: category + ':', value: '' });
                    //openMentionMenu({trigger:category + ":"})
                    showOptions.value = false;
                    submitButtonIsActive.value = true;
                }, children: [category, ":"] }), "\u00A0", _jsx("div", { className: "pills", children: showFilteredPeople.length > 0 ? (showFilteredPeople.map((person) => (_jsx("div", { children: _jsx(Pill, { title: person.value, color: "#ffffff", closeButton: true, onClose: () => removeFilter(person.id), "$textColor": "#000000c8", "$border": false, fontSize: "16px" }) }, person.value)))) : (_jsx("div", { className: "type", children: type })) })] }));
};
