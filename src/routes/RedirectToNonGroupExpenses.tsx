import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RedirectToNonGroupExpenses() {
  const { groupid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/shared/nongroup/expenses`);
  }, [groupid]);

  return null;

}
