import { Params } from "react-router-dom";
import { Signal } from "@preact/signals-react";
import {
  
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
  ExpenseFilterResponse,
  FetchedLabel,
  FilteredMembers,
  TransferFilterResponse,
} from "../../../types";

export const initializeFilterState = (
  groupExpenseFiltersData: ExpenseFilterResponse,
  groupTransferFiltersData:TransferFilterResponse,
  params: Readonly<Params<string>>,
  expenseFilterState: Signal<CreateExpenseFilterRequest>,
  transferFilterState:Signal<CreateTransferFilterRequest>,
  filteredMembers: Signal<FilteredMembers>,
  filteredLabels:Signal<FetchedLabel[]>
) => {
  expenseFilterState.value = {
    groupId: params.groupid || "",
    participantsIds:groupExpenseFiltersData.participants?.map( (participant) => participant.memberId) || [],
    payersIds: groupExpenseFiltersData.payers?.map((payer) => payer.memberId) || [],
    description: groupExpenseFiltersData.description,
    before: groupExpenseFiltersData.before.map((date) => date) || [],
    during: groupExpenseFiltersData.during.map((date) => date) || [],
    after: groupExpenseFiltersData.after.map((date) => date) || [],
    labels: groupExpenseFiltersData.labels.map((label) => label.id) || [],
  };
  transferFilterState.value = {
    groupId: params.groupid || "",
    receiversIds:groupTransferFiltersData.receivers?.map((receiver) => receiver.memberId) || [],
    sendersIds: groupTransferFiltersData.senders?.map((sender) => sender.memberId) || [],
    description: groupTransferFiltersData.description,
    before: groupTransferFiltersData.before.map((date) => date) || [],
    during: groupTransferFiltersData.during.map((date) => date) || [],
    after: groupTransferFiltersData.after.map((date) => date) || [],
  };

  filteredMembers.value.participants = groupExpenseFiltersData?.participants ?? [];
  filteredMembers.value.payers = groupExpenseFiltersData?.payers ?? [];
  filteredMembers.value.senders = groupTransferFiltersData?.senders ?? [];
  filteredMembers.value.receivers = groupTransferFiltersData?.receivers ?? [];

  filteredLabels.value = groupExpenseFiltersData?.labels??[]
};
