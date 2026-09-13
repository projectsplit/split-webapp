import { useEffect, useState } from 'react';
import { PeoplePillsDisplayProps } from '../../../../../interfaces';
import { StyledSearchFilterRow } from '../../../SearchFilterRow.styled';
import { useBeautifulMentions } from 'lexical-beautiful-mentions';
import { FetchedPeople } from '../../../../../types';
import Pill from '../../../../Pill/Pill';
import { tokens } from '../../../../../styles/tokens';

export const PeoplePillsDisplay: React.FC<PeoplePillsDisplayProps> = ({
  category,
  type,
  filteredPeople,
  showOptions,
  submitButtonIsActive,
  expenseFilterState,
  transferFilterState,
  cancelled,
  removedFilter,
}) => {
  const [showFilteredPeople, setShowFilteredPeople] = useState<FetchedPeople>(
    []
  );
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

  const removeFilter = (id: string) => {
    removedFilter.value = true;
    const updatedFilteredPeople = showFilteredPeople.filter(
      (person) => person.id !== id
    );

    setShowFilteredPeople(updatedFilteredPeople);

    switch (category) {
      case 'payer':
        if (expenseFilterState) {
          expenseFilterState.value.payersIds =
            expenseFilterState.value.payersIds.filter(
              (payerId) => payerId !== id
            );
          filteredPeople.value.payers = filteredPeople.value.payers.filter(
            (person) => person.id !== id
          );
        }
        break;
      case 'participant':
        if (expenseFilterState) {
          expenseFilterState.value.participantsIds =
            expenseFilterState.value.participantsIds.filter(
              (participantId) => participantId !== id
            );
          filteredPeople.value.participants =
            filteredPeople.value.participants.filter(
              (person) => person.id !== id
            );
        }
        break;
      case 'sender':
        if (transferFilterState) {
          transferFilterState.value.sendersIds =
            transferFilterState.value.sendersIds.filter(
              (senderId) => senderId !== id
            );
          filteredPeople.value.senders = filteredPeople.value.senders.filter(
            (person) => person.id !== id
          );
        }
        break;
      case 'receiver':
        if (transferFilterState) {
          transferFilterState.value.receiversIds =
            transferFilterState.value.receiversIds.filter(
              (receiverId) => receiverId !== id
            );
          filteredPeople.value.receivers =
            filteredPeople.value.receivers.filter((person) => person.id !== id);
        }
        break;
      default:
        break;
    }

    submitButtonIsActive.value = true;
  };

  return (
    <StyledSearchFilterRow>
      <div
        className="category"
        onClick={() => {
          insertMention({ trigger: category + ':', value: '' });
          showOptions.value = false;
          submitButtonIsActive.value = true;
        }}
      >
        {category}:
      </div>
      &nbsp;
      <div className="pills">
        {showFilteredPeople.length > 0 ? (
          showFilteredPeople.map((person) => (
            <div key={person.value}>
              <Pill
                title={person.value}
                color={tokens.ink.primary}
                closeButton={true}
                onClose={() => removeFilter(person.id)}
                $border={false}
                fontSize="12px"
                $textColor={tokens.ink.primary}
                $closeButtonColor={tokens.ink.tertiary}
                $radius="9px"
              />
            </div>
          ))
        ) : (
          <div className="type">{type}</div>
        )}
      </div>
    </StyledSearchFilterRow>
  );
};
