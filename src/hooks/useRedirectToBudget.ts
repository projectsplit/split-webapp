import { useNavigate, useLocation } from 'react-router-dom';
import { BudgetInfoResponse } from '../types';
import { useEffect } from 'react';

export const useRedirectToBudget = (
  data: BudgetInfoResponse | undefined,
  isLoading: boolean,
  hasUserInfo: boolean
) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const validPaths = [
      '/budget',
      '/budget/manage',
      '/budget/create',
    ];
    if (validPaths.includes(pathname)) return;

    if (pathname.includes('/manage')) {
      navigate(`/budget/manage`, { replace: true });
    } else if (pathname.includes('/create')) {
      navigate(`/budget/create`, { replace: true });
    } else {
      navigate(`/budget`, { replace: true });
    }
  }, [isLoading, data, hasUserInfo, pathname, navigate]);

  return null;
};
