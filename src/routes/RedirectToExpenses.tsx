import { useEffect } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes from '@/routes';

export default function RedirectToExpenses() {
  const { groupid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(generatePath(routes.GROUP_EXPENSES, { groupid }), {
      replace: true,
    });
  }, [groupid, navigate]);

  return null;
}
