import { useNavigate, useLocation } from 'react-router-dom';
import { BudgetInfoResponse } from '../types';
import { useEffect } from 'react';
import routes from '@/routes';

export const useRedirectToBudget = (
  data: BudgetInfoResponse | undefined,
  isLoading: boolean,
  hasUserInfo: boolean
) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const validPaths = [
      routes.BUDGET,
      routes.BUDGET_MANAGE,
      routes.BUDGET_CREATE,
    ];
    if (validPaths.includes(pathname)) return;

    if (pathname.includes('/manage')) {
      navigate(routes.BUDGET_MANAGE, { replace: true });
    } else if (pathname.includes('/create')) {
      navigate(routes.BUDGET_CREATE, { replace: true });
    } else {
      navigate(routes.BUDGET, { replace: true });
    }
  }, [isLoading, data, hasUserInfo, pathname, navigate]);

  return null;
};
