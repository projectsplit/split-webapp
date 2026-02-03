import { ExpenseFilter, TransferFilter } from "../../../types";

export const getFilterStorageKey = (type: "expense" | "transfer", groupId?: string) => {
  const suffix = groupId && groupId !== "" ? groupId : "nonGroup";
  return `${type}Filter_${suffix}`;
};

export const localStorageStringParser = (
  expenseFilterRaw: string | null,
  transferFilterRaw: string | null
) => {
  const expenseFilterDefault = {
    groupId: "",
    participantsIds: [],
    payersIds: [],
    freeText: "",
    before: null,
    during: null,
    after: null,
    labels: [],
  };

  const transferFilterDefault = {
    groupId: "",
    receiversIds: [],
    sendersIds: [],
    freeText: "",
    before: null,
    during: null,
    after: null,
  };

  const sanitizeExpense = (f: any): ExpenseFilter => ({
    ...expenseFilterDefault, //this is the safe base
    ...f, //brings in user's values
    participantsIds: Array.isArray(f.participantsIds) ? f.participantsIds.filter((id: any) => typeof id === "string") : [],
    payersIds: Array.isArray(f.payersIds) ? f.payersIds.filter((id: any) => typeof id === "string") : [],
    labels: Array.isArray(f.labels) ? f.labels.filter((id: any) => typeof id === "string") : [],
  });

  const sanitizeTransfer = (f: any): TransferFilter => ({
    ...transferFilterDefault,
    ...f,
    receiversIds: Array.isArray(f.receiversIds) ? f.receiversIds.filter((id: any) => typeof id === "string") : [],
    sendersIds: Array.isArray(f.sendersIds) ? f.sendersIds.filter((id: any) => typeof id === "string") : [],
  });

  const expenseFilter: ExpenseFilter = expenseFilterRaw
    ? sanitizeExpense(JSON.parse(expenseFilterRaw))
    : expenseFilterDefault;

  const transferFilter: TransferFilter = transferFilterRaw
    ? sanitizeTransfer(JSON.parse(transferFilterRaw))
    : transferFilterDefault;

  return { expenseFilter, transferFilter };
};
