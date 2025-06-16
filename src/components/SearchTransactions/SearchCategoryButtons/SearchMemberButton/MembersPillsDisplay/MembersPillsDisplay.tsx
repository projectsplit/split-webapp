import { useEffect, useState } from "react";
import { MembersPillsDisplayProps } from "../../../../../interfaces";

import { StyledMemberPillsDisplay } from "./MembersPillsDisplay.styled";
import { useBeautifulMentions } from "lexical-beautiful-mentions";
import { FetchedMembers } from "../../../../../types";
import Pill from "../../../../Pill/Pill";

export const MembersPillsDisplay: React.FC<MembersPillsDisplayProps> = ({
  category,
  filteredMembers,
  showOptions,
  submitButtonIsActive,
  expenseFilterState,
  transferFilterState,
  cancelled,
  removedFilter,
}) => {
  const [showFilteredMembers, setShowFilteredMembers] =
    useState<FetchedMembers>([]);
  const { insertMention } = useBeautifulMentions();

  const updateFilteredMembers = () => {
    switch (category) {
      case "payer":
        return filteredMembers.value.payers;
      case "participant":
        return filteredMembers.value.participants;
      case "sender":
        return filteredMembers.value.senders;
      case "receiver":
        return filteredMembers.value.receivers;
      default:
        return [];
    }
  };

  useEffect(() => {
    setShowFilteredMembers(updateFilteredMembers());
  }, [cancelled.value]);

  useEffect(() => {
    if (cancelled.value === true) {
      setShowFilteredMembers(updateFilteredMembers());
    }
    cancelled.value = false;
  }, [cancelled.value]);

  const removeFilter = (memberId: string) => {
    removedFilter.value = true;
    const updatedFilteredMembers = showFilteredMembers.filter(
      (member) => member.memberId !== memberId
    );

    setShowFilteredMembers(updatedFilteredMembers);

    switch (category) {
      case "payer":
        if (expenseFilterState) {
          expenseFilterState.value.payersIds =
            expenseFilterState.value.payersIds.filter((id) => id !== memberId);
          filteredMembers.value.payers = filteredMembers.value.payers.filter(
            (member) => member.memberId !== memberId
          );
        }
        break;
      case "participant":
        if (expenseFilterState) {
          expenseFilterState.value.participantsIds =
            expenseFilterState.value.participantsIds.filter(
              (id) => id !== memberId
            );
          filteredMembers.value.participants =
            filteredMembers.value.participants.filter(
              (member) => member.memberId !== memberId
            );
        }
        break;
      case "sender":
        if (transferFilterState) {
          transferFilterState.value.sendersIds =
            transferFilterState.value.sendersIds.filter(
              (id) => id !== memberId
            );
          filteredMembers.value.senders = filteredMembers.value.senders.filter(
            (member) => member.memberId !== memberId
          );
        }
        break;
      case "receiver":
        if (transferFilterState) {
          transferFilterState.value.receiversIds =
            transferFilterState.value.receiversIds.filter(
              (id) => id !== memberId
            );
          filteredMembers.value.receivers =
            filteredMembers.value.receivers.filter(
              (member) => member.memberId !== memberId
            );
        }
        break;
      default:
        // No action needed for unexpected categories
        break;
    }

    submitButtonIsActive.value = true;
  };

  return (
    <StyledMemberPillsDisplay>
      <div
        className="category"
        onClick={() => {
          insertMention({ trigger: category + ":", value: "" });
          //openMentionMenu({trigger:category + ":"})
          showOptions.value = false;
          submitButtonIsActive.value = true;
          console.log("Here1");
        }}
      >
        {category}:
      </div>
      &nbsp;
      <div className="pills">
        {showFilteredMembers.length > 0 ? (
          showFilteredMembers.map((member) => (
            <div key={member.value}>
              <Pill
                title={member.value}
                color="#ffffff"
                closeButton={true}
                onClose={() => removeFilter(member.memberId)}
                $textColor="#000000c8"
                $border={false}
              />
            </div>
          ))
        ) : (
          <div className="type">member</div>
        )}
      </div>
    </StyledMemberPillsDisplay>
  );
};
