export var Frequency;
(function (Frequency) {
    Frequency[Frequency["Weekly"] = 0] = "Weekly";
    Frequency[Frequency["Monthly"] = 1] = "Monthly";
    Frequency[Frequency["Annually"] = 2] = "Annually";
    Frequency[Frequency["Custom"] = 3] = "Custom";
})(Frequency || (Frequency = {}));
export var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Personal"] = 0] = "Personal";
    TransactionType[TransactionType["Group"] = 1] = "Group";
    TransactionType[TransactionType["NonGroup"] = 2] = "NonGroup";
})(TransactionType || (TransactionType = {}));
export var Mode;
(function (Mode) {
    Mode[Mode["Personal"] = 0] = "Personal";
    Mode[Mode["Group"] = 1] = "Group";
    Mode[Mode["NonGroup"] = 2] = "NonGroup";
})(Mode || (Mode = {}));
export var BudgetScope;
(function (BudgetScope) {
    BudgetScope[BudgetScope["Personal"] = 1] = "Personal";
    BudgetScope[BudgetScope["NonGroup"] = 2] = "NonGroup";
    BudgetScope[BudgetScope["Group"] = 4] = "Group";
})(BudgetScope || (BudgetScope = {}));
