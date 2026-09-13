import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '@/routes';

const useRedirectToAnalytics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.ANALYTICS, { replace: true });
  }, [navigate]);

  return null;
};

export default function RedirectToAnalytics() {
  useRedirectToAnalytics();

  return <></>;
}
