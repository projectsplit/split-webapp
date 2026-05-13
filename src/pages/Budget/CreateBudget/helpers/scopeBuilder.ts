import { Signal } from '@preact/signals-react';
import { BudgetScope } from '../../../../types';

export const scopeBuilder = (
  scopeState: Signal<{ personal: boolean; group: boolean; nonGroup: boolean }>,
  allGroupsSelected: Signal<boolean>,
  targetGroupIds: Signal<string[]>
) => {
  const { group, nonGroup, personal } = scopeState.value;

  let flags = 0;
  if (personal) flags |= BudgetScope.Personal;
  if (nonGroup) flags |= BudgetScope.NonGroup;
  if (group) flags |= BudgetScope.Group;

  let text = 'No scope selected';

  if (group && nonGroup && personal) {
    if (allGroupsSelected.value) {
      text = 'All expenses';
    } else {
      text = `(${targetGroupIds.value.length}) groups, non-group and personal expenses`;
    }
  } else if (group && nonGroup) {
    if (allGroupsSelected.value) {
      text = 'Groups and non-group expenses';
    } else {
      text = `(${targetGroupIds.value.length}) groups and non-group expenses`;
    }
  } else if (group && personal) {
    if (allGroupsSelected.value) {
      text = 'Groups and personal expenses';
    } else {
      text = `(${targetGroupIds.value.length}) groups and personal expenses`;
    }
  } else if (nonGroup && personal) {
    text = 'Non-group and personal expenses';
  } else if (group) {
    if (allGroupsSelected.value) {
      text = 'All group expenses';
    } else {
      text = `(${targetGroupIds.value.length}) group expenses`;
    }
  } else if (nonGroup) {
    text = 'Non-group expenses';
  } else if (personal) {
    text = 'Personal expenses';
  }

  return { text, flags };
};
