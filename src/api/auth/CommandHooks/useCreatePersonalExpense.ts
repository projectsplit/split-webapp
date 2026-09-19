import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { PersonalExpenseRequest } from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';

export const useCreatePersonalExpense = (
  menu: Signal<string | null>,
  navigate: NavigateFunction,
  setIsSubmitting: (value: boolean) => void,
  makePersonalClicked?: boolean,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, PersonalExpenseRequest>({
    meta: { errorHandled: true },
    mutationFn: (expense) => createPersonalExpense(expense),
    onSuccess: async () => {
      menu.value = null;
      if (makePersonalClicked) {
        sessionStorage.removeItem('submittedFromHomePersistData');
      }
      navigate(`/personal`);
      await invalidateQueryKeys(queryClient, [
        'personalExpenses',
        'cumulativeArray',
      ]);
    },
    onError: (err) => {
      const error = err as AxiosError;
      onError?.(
        error.response?.data
          ? String(error.response.data)
          : 'Could not create the expense. Please try again.'
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
};

const createPersonalExpense = async (
  req: PersonalExpenseRequest
): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(
    '/expenses/create-personal',
    req
  );
};
