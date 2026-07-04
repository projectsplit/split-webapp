export declare const useExpenseFormStore: () => {
    amount: string;
    description: string;
    currencySymbol: string;
    expenseTime: string;
    labels: import("../../../types").Label[];
    location: import("../../../types").GeoLocation | undefined;
    amountError: string;
    showAmountError: boolean;
    participantsError: string;
    payersError: string;
    descriptionError: string;
    isSubmitting: boolean;
    participantsByCategory: import("../formStore/formStoreTypes").CategoryMap<import("../../../types").PickerMember[]>;
    payersByCategory: import("../formStore/formStoreTypes").CategoryMap<import("../../../types").PickerMember[]>;
    userMemberId: string;
    participantsCategory: import("@preact/signals-core").Signal<import("../formStore/formStoreTypes").SplitMethod>;
    payersCategory: import("@preact/signals-core").Signal<import("../formStore/formStoreTypes").SplitMethod>;
    updateParticipantsInCategory: (category: import("../formStore/formStoreTypes").SplitMethod, updater: (prev: import("../../../types").PickerMember[]) => import("../../../types").PickerMember[]) => void;
    updatePayersInCategory: (category: import("../formStore/formStoreTypes").SplitMethod, updater: (prev: import("../../../types").PickerMember[]) => import("../../../types").PickerMember[]) => void;
    setParticipantsByCategory: (updater: import("../formStore/formStoreTypes").CategoryMap<import("../../../types").PickerMember[]> | ((prev: import("../formStore/formStoreTypes").CategoryMap<import("../../../types").PickerMember[]>) => import("../formStore/formStoreTypes").CategoryMap<import("../../../types").PickerMember[]>)) => void;
    setPayersByCategory: (updater: import("../formStore/formStoreTypes").CategoryMap<import("../../../types").PickerMember[]> | ((prev: import("../formStore/formStoreTypes").CategoryMap<import("../../../types").PickerMember[]>) => import("../formStore/formStoreTypes").CategoryMap<import("../../../types").PickerMember[]>)) => void;
    makePersonalClicked: boolean;
    showPicker: boolean;
    setMakePersonalClicked: (value: boolean) => void;
    setShowPicker: (value: boolean) => void;
    setAmount: (value: string) => void;
    setDescription: (value: string) => void;
    setCurrencySymbol: (value: string) => void;
    setExpenseTime: (value: string | ((prev: string) => string)) => void;
    setLabels: (labels: import("../../../types").Label[]) => void;
    setLocation: (location: import("../../../types").GeoLocation | undefined) => void;
    setAmountError: (msg: string) => void;
    setShowAmountError: (show: boolean) => void;
    setParticipantsError: (msgOrUpdater: string | ((prev: string) => string)) => void;
    setPayersError: (msgOrUpdater: string | ((prev: string) => string)) => void;
    setDescriptionError: (msg: string) => void;
    setIsSubmitting: (value: boolean) => void;
    initialize: (config: {
        isCreateExpense: boolean;
        expense: import("../../../types").FormExpense | null;
        currency: string;
        groupMembers: import("@preact/signals-core").Signal<(import("../../../types").Member | import("../../../types").Guest)[]>;
        nonGroupUsers: import("@preact/signals-core").Signal<import("../../../types").User[]>;
        userInfo: import("../../../types").UserInfo;
        userMemberId?: string;
        isnonGroupExpense?: import("@preact/signals-core").Signal<boolean>;
    }) => void;
    updateMembers: (config: {
        groupMembers: import("@preact/signals-core").Signal<(import("../../../types").Member | import("../../../types").Guest)[]>;
        nonGroupUsers: import("@preact/signals-core").Signal<import("../../../types").User[]>;
        expense: import("../../../types").FormExpense | null;
        isCreateExpense: boolean;
        isnonGroupExpense?: import("@preact/signals-core").Signal<boolean>;
        userInfo: import("../../../types").UserInfo;
        userMemberId?: string;
    }) => void;
    validateForm: (options?: {
        showErrors: boolean;
    } | undefined) => {
        isValid: boolean;
        errors: {
            amount: string;
            participants: string;
            payers: string;
        } | {
            amount?: undefined;
            participants?: undefined;
            payers?: undefined;
        };
    };
    submitExpense: (inputs: {
        groupId?: string;
        createExpenseMutation: (req: import("../../../types").ExpenseRequest) => void;
        editExpenseMutation: (req: import("../../../types").ExpenseRequest) => void;
        isCreateExpense: boolean;
        expense: import("../../../types").FormExpense | null;
        isnonGroupExpense?: import("@preact/signals-core").Signal<boolean>;
        isPersonal?: import("@preact/signals-core").Signal<boolean>;
        fromPersonal?: import("@preact/signals-core").Signal<boolean>;
        fromHomeGroup?: import("@preact/signals-core").Signal<import("../../../types").Group | null>;
    }) => void;
};
