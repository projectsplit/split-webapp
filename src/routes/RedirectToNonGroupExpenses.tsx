import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '@/routes';

export default function RedirectToNonGroupExpenses() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.NON_GROUP_EXPENSES, { replace: true });
  }, [navigate]);

  return null;
}
