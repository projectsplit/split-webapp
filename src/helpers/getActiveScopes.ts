import { BudgetScope } from '@/types';

export const getActiveScopes = (
  mask: number | undefined,
  targetGroupIds?: string[] | null
): string[] => {
  if (mask === undefined) return [];

  const all =
    BudgetScope.Personal | BudgetScope.NonGroup | BudgetScope.Group;
  const allGroups = !targetGroupIds || targetGroupIds.length === 0;
  if ((mask & all) === all && allGroups) return ['All expenses'];

  const scopes: string[] = [];

  if ((mask & BudgetScope.Personal) === BudgetScope.Personal)
    scopes.push('Personal');
  if ((mask & BudgetScope.Group) === BudgetScope.Group) {
    if (targetGroupIds && targetGroupIds.length > 0) {
      scopes.push(`(${targetGroupIds.length}) Groups`);
    } else {
      scopes.push('(All) Groups');
    }
  }
  if ((mask & BudgetScope.NonGroup) === BudgetScope.NonGroup)
    scopes.push('Quick splits');

  return scopes;
};