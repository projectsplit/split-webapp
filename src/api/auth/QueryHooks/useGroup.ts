import { useQuery } from "@tanstack/react-query";
import { Group } from "../../../types";
import { apiClient } from "../../apiClients";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const useGroup = (groupId: string | undefined) => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: [groupId],
    queryFn: async () => {
      if (!groupId) {
        throw new Error("No group ID provided");
      }
      return await getGroup(groupId, navigate);
    },
    enabled: !!groupId,
  });
};

const getGroup = async (
  groupId: string,
  navigate: (path: string) => void
): Promise<Group> => {
  try {
    const response = await apiClient.get<void, AxiosResponse<Group>>(
      `/groups/${groupId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      navigate("/shared");
    }
    throw error;
  }
};

export default useGroup;
