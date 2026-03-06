import { useGetUserAndGroupsLabels } from "./useGetUserAndGroupsLabels";
import { useGetUserLabels } from "./useGetUserLabels";

export const useLabels = (userId: string | undefined, isPersonal: boolean | undefined) => {

    const labelsForPersonalSearch = useGetUserAndGroupsLabels(userId, isPersonal);
    const labelsForNonGroupExpense = useGetUserLabels(userId, isPersonal);

    if (isPersonal) return labelsForPersonalSearch
    else return labelsForNonGroupExpense

}