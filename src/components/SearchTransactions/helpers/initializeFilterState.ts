import { Params } from "react-router-dom";
import { Signal } from "@preact/signals-react";
import { CreateFiltersRequest, FilteredMembers, FilterResponse } from "../../../types";

export const initializeFilterState = (
  groupFiltersData: FilterResponse,
  params: Readonly<Params<string>>,
  filterState: Signal<CreateFiltersRequest>,
  filteredMembers: Signal<FilteredMembers>
) => {
  filterState.value = {
    groupId: params.groupid || "",
    participantsIds:
      groupFiltersData.participants?.map(
        (participant) => participant.memberId
      ) || [],
    payersIds: groupFiltersData.payers?.map((payer) => payer.memberId) || [],
    receiversIds:
      groupFiltersData.receivers?.map((receiver) => receiver.memberId) || [],
    sendersIds:
      groupFiltersData.senders?.map((sender) => sender.memberId) || [],
    description: groupFiltersData.description,
    before: groupFiltersData.before.map((date) => date) || [],
    during: groupFiltersData.during.map((date) => date) || [],
    after: groupFiltersData.after.map((date) => date) || [],
  };

  filteredMembers.value.participants = groupFiltersData?.participants ?? [];
  filteredMembers.value.payers = groupFiltersData?.payers ?? [];
  filteredMembers.value.senders = groupFiltersData?.senders ?? [];
  filteredMembers.value.receivers = groupFiltersData?.receivers ?? [];
};
