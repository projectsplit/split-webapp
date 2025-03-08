import { useQuery } from "@tanstack/react-query";
import { getGroup } from "../api/services/api";

const useGroup = (groupId: string | undefined) => {
  return useQuery({
    queryKey: [groupId],
    queryFn: () =>
      groupId ? getGroup(groupId) : Promise.reject("No group ID"),
    enabled: !!groupId,
  });
};
export default useGroup;