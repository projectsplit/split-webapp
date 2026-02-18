import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectToNonGroupExpenses() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/shared/nongroup/expenses`);
  }, []);

  return null;

}
