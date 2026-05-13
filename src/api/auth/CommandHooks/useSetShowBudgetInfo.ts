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

    onMutate: async (newSetting) => {

      await queryClient.cancelQueries({ queryKey });
      
      const previousUserInfo = queryClient.getQueryData<UserInfo>(queryKey);
      if (previousUserInfo) {
        queryClient.setQueryData<UserInfo>(queryKey, {
          ...previousUserInfo,
          showBudgetInfo: newSetting,
        });
      }
      return { previousUserInfo };
    },

    onError: (err, newSetting, context) => {
      if (context?.previousUserInfo) {
        queryClient.setQueryData(queryKey, context.previousUserInfo);
      }
      console.error("Failed to update budget info:", err);
    },

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
