import { Signal } from "@preact/signals-react";
import { useDeleteUserLabel } from "./useDeleteUserLabel"
import { useDeleteGroupLabel } from "./useDeleteGroupLabel";


export const useDeleteLabel = (isPersonal: boolean, errorMessage: Signal<string>, menu: Signal<string | null>) => {

    const deleteUserLabel = useDeleteUserLabel(errorMessage, menu)
    const deleteGroupLabel = useDeleteGroupLabel(errorMessage, menu);

    if (isPersonal) return deleteUserLabel
    return deleteGroupLabel;
}