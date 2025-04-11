import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RedirectToExpenses() {
  const { groupid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/groups/${groupid}/expenses`);
  }, [groupid]);

  return null;

}
