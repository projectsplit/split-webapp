import { ExpenseFilter, TransferFilter } from "../../../types";

export const localStorageStringParser = (expenseFilterRaw: string | null,transferFilterRaw: string | null ) => {

  const expenseFilter: ExpenseFilter = expenseFilterRaw
    ? (JSON.parse(expenseFilterRaw) as ExpenseFilter)
    : {
        groupId: "",
        participantsIds: [],
        payersIds: [],
        freeText: "",
        before: "",
        during: "",
        after: "",
        labels: [],
      }; 

  const transferFilter: TransferFilter = transferFilterRaw
    ? (JSON.parse(transferFilterRaw) as TransferFilter)
    : {
        groupId: "",
        receiversIds: [],
        sendersIds: [],
        freeText: "",
        before: "",
        during: "",
        after: "",
      };

  return {expenseFilter, transferFilter}
};
