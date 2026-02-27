import { ExpenseParsedFilters } from "../types";

export const hasActiveExpenseFilters = (filters: ExpenseParsedFilters): boolean => {
    return (
        (filters.participantsIds?.length ?? 0) > 0 ||
        (filters.payersIds?.length ?? 0) > 0 ||
        !!filters.freeText ||
        !!filters.before ||
        !!filters.after ||
        (filters.labels?.length ?? 0) > 0
    );
};

