import { BudgetScope } from '@/types';
export const getActiveScopes = (mask, targetGroupIds) => {
    if (mask === undefined)
        return [];
    const scopes = [];
    if ((mask & BudgetScope.Personal) === BudgetScope.Personal)
        scopes.push('Personal');
    if ((mask & BudgetScope.Group) === BudgetScope.Group) {
        if (targetGroupIds && targetGroupIds.length > 0) {
            scopes.push(`(${targetGroupIds.length}) Groups`);
        }
        else {
            scopes.push('(All) Groups');
        }
    }
    if ((mask & BudgetScope.NonGroup) === BudgetScope.NonGroup)
        scopes.push('Non-Group');
    return scopes;
};
