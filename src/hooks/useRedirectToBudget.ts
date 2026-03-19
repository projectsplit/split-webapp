import { useNavigate } from 'react-router-dom';
import { BudgetInfoResponse } from '../types';
import { useEffect } from 'react';

export const useRedirectToBudget = (
  data: BudgetInfoResponse | undefined,
  isLoading: boolean,
  hasUserInfo: boolean
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !hasUserInfo) return;
    if (data && data?.budgetSubmitted) {
      navigate(`/budget/current`, { replace: true }); //TODO will be replaced with manage
    } else {
      navigate(`/budget/actions`, { replace: true });
    }
  }, [isLoading, data, hasUserInfo]);

  return null;
};
