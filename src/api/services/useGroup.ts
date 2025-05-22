import { useQuery } from "@tanstack/react-query";
import { getGroup } from "./api";

const useGroup = (groupId: string | undefined) => {
  return useQuery({
    queryKey: [groupId],
    queryFn: async () => {
      if (!groupId) {
        throw new Error("No group ID provided");
      }
      return await getGroup(groupId);
    },
    enabled: !!groupId,
  });
};
export default useGroup;