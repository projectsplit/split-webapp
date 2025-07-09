import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const useRedirectToAnalytics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/analytics`);
  }, []);

  return null;
};

export default function RedirectToAnalytics() {
  useRedirectToAnalytics();

  return <></>;
}

