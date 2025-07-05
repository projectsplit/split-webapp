import { Params } from "react-router-dom";
import { Signal } from "@preact/signals-react";
import {
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
  ExpenseFilter,
  FetchedLabel,
  FetchedMember,
  FilteredMembers,
  Group,
  TransferFilter,
} from "../../../types";

export const initializeFilterState = (
  groupExpenseFiltersData: ExpenseFilter,
  groupTransferFiltersData:TransferFilter,
  params: Readonly<Params<string>>,
  expenseFilterState: Signal<CreateExpenseFilterRequest>,
  transferFilterState:Signal<CreateTransferFilterRequest>,
  filteredMembers: Signal<FilteredMembers>,
  filteredLabels:Signal<FetchedLabel[]>,
  group:Group
) => {
  
  const allMembers = [...group.members, ...group.guests]
  const allLabels = group.labels

  const showExpenseDuring = groupExpenseFiltersData.before===groupExpenseFiltersData.after&&groupExpenseFiltersData.before!==null && groupExpenseFiltersData.before!==''
  const showTransferDuring = groupTransferFiltersData.before===groupTransferFiltersData.after&&groupTransferFiltersData.before!==null && groupTransferFiltersData.before!==''

  expenseFilterState.value = {
    groupId: params.groupid || "",
    participantsIds:groupExpenseFiltersData.participantsIds?.map( (id) => id) || [],
    payersIds: groupExpenseFiltersData.payersIds?.map((id) => id) || [],
    freeText: groupExpenseFiltersData.freeText,
    before: showExpenseDuring? [] : groupExpenseFiltersData.before ? [groupExpenseFiltersData.before] : [],
    during: showExpenseDuring ? [groupExpenseFiltersData.after] : [],
    after:  showExpenseDuring ? [] : groupExpenseFiltersData.after ? [groupExpenseFiltersData.after] : [],
    labels: groupExpenseFiltersData.labels?.map((id) => id) || [],
  };

  transferFilterState.value = {
    groupId: params.groupid || "",
    receiversIds:groupTransferFiltersData.receiversIds?.map((id) => id) || [],
    sendersIds: groupTransferFiltersData.sendersIds?.map((id) => id) || [],
    freeText: groupTransferFiltersData.freeText,
    before: showTransferDuring ? [] : groupTransferFiltersData.before? [groupTransferFiltersData.before]:[],
    during: showTransferDuring ? [groupTransferFiltersData.after] : [],
    after: showTransferDuring ? [] : groupTransferFiltersData.after? [groupTransferFiltersData.after]:[],
  };

  

    const createFetchedMember = (id: string): FetchedMember | null => {
    const member = allMembers.find((m) => m.id === id);
    if (!member) return null; 
    return {
      memberId: id,
      value: member.name,
      isUser: 'userId' in member, 
    };
  };

filteredMembers.value = {
    participants: groupExpenseFiltersData.participantsIds
      ?.map(createFetchedMember)
      .filter((m): m is FetchedMember => m !== null) || [],
    payers: groupExpenseFiltersData.payersIds
      ?.map(createFetchedMember)
      .filter((m): m is FetchedMember => m !== null) || [],
    senders: groupTransferFiltersData.sendersIds
      ?.map(createFetchedMember)
      .filter((m): m is FetchedMember => m !== null) || [],
    receivers: groupTransferFiltersData.receiversIds
      ?.map(createFetchedMember)
      .filter((m): m is FetchedMember => m !== null) || [],
  };

 filteredLabels.value = groupExpenseFiltersData.labels
    ?.map((id) => {
      const label = allLabels.find((l) => l.id === id);
      if (!label) return null;
      return {
        id: label.id,
        value: label.text, 
        color: label.color,
        prop: "", 
      };
    })
    .filter((label): label is FetchedLabel => label !== null) || [];
};
