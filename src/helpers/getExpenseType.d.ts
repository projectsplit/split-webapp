import { ExpenseResponseItem, GroupExpenseResponseItem, NonGroupExpenseResponseItem, PersonalExpenseResponseItem } from '../types';
export declare function isGroupExpense(expense: ExpenseResponseItem): expense is GroupExpenseResponseItem;
export declare function isNonGroupExpense(expense: ExpenseResponseItem): expense is NonGroupExpenseResponseItem;
export declare function isPersonalExpense(expense: ExpenseResponseItem): expense is PersonalExpenseResponseItem;
