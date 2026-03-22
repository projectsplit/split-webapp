import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { SetShowBudgetInfoRequest, UserInfo } from '../../../types';
import { apiClient } from '../../apiClients';

export const useSetShowBudgetInfo = () => {
  const queryClient = useQueryClient();
  const queryKey = ['getMe'];

  return useMutation<any, AxiosError, boolean, { previousUserInfo: UserInfo | undefined }>({
    mutationFn: (showBudgetInfo) => {
      return setShowBudgetInfo({ showBudgetInfo });
    },
    // 1. When mutate is called:
    onMutate: async (newSetting) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousUserInfo = queryClient.getQueryData<UserInfo>(queryKey);

      // Optimistically update to the new value
      if (previousUserInfo) {
        queryClient.setQueryData<UserInfo>(queryKey, {
          ...previousUserInfo,
          showBudgetInfo: newSetting,
        });
      }

      // Return a context object with the snapshotted value
      return { previousUserInfo };
    },
    // 2. If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newSetting, context) => {
      if (context?.previousUserInfo) {
        queryClient.setQueryData(queryKey, context.previousUserInfo);
      }
      console.error("Failed to update budget info:", err);
    },
    // 3. Always refetch after error or success to ensure we are in sync with the server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

const setShowBudgetInfo = async (
  req: SetShowBudgetInfoRequest
): Promise<void> => {
  const response = await apiClient.put<void, AxiosResponse<void>>(
    '/users/activity/show-budget-info',
    req
  );
  return response.data;
};
