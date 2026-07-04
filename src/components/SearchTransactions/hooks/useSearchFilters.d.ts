import { CreateExpenseFilterRequest, CreateTransferFilterRequest, FetchedLabel, GetLabelsResponse, Group, User } from '../../../types';
export declare const useSearchFilters: (group: Group | null, allUsers: User[], suggestedLabels: GetLabelsResponse | undefined, isPersonal?: boolean) => {
    category: import("@preact/signals-core").Signal<string>;
    expenseFilterState: import("@preact/signals-core").Signal<CreateExpenseFilterRequest>;
    transferFilterState: import("@preact/signals-core").Signal<CreateTransferFilterRequest>;
    filteredPeople: import("@preact/signals-core").Signal<import("../../../types").People>;
    filteredLabels: import("@preact/signals-core").Signal<FetchedLabel[]>;
    submitButtonIsActive: import("@preact/signals-core").Signal<boolean>;
    cancelled: import("@preact/signals-core").Signal<boolean>;
    searchKeyword: import("@preact/signals-core").Signal<string>;
    path: string;
};
