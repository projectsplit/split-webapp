import useGroupDebts from "./useGroupDebts";
import useNonGroupDebts from "./useNonGroupDebts";

export const useDebts = (groupId?: string) => {
  const normal = useGroupDebts(groupId);
  const nonGroup = useNonGroupDebts();

  return !!groupId ? normal : nonGroup;
};