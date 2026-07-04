import { useDeleteUserLabel } from './useDeleteUserLabel';
import { useDeleteGroupLabel } from './useDeleteGroupLabel';
export const useDeleteLabel = (isPersonal, errorMessage, menu) => {
    const deleteUserLabel = useDeleteUserLabel(errorMessage, menu);
    const deleteGroupLabel = useDeleteGroupLabel(errorMessage, menu);
    if (isPersonal)
        return deleteUserLabel;
    return deleteGroupLabel;
};
