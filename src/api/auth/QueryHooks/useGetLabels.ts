import { useGetUserAndGroupsLabels } from './useGetUserAndGroupsLabels';
import { useGetUserLabels } from './useGetUserLabels';

export const useLabels = (
  userId: string | undefined,
  isPersonal: boolean | undefined,
  groupId: string | undefined
) => {
  const labelsForPersonalAndGroupSearch = useGetUserAndGroupsLabels(
    userId,
    isPersonal,
    groupId
  );
  const labelsForNonGroupExpense = useGetUserLabels(userId, isPersonal);

  if (isPersonal || !!groupId) return labelsForPersonalAndGroupSearch;
  else return labelsForNonGroupExpense;
};
