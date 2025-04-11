import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RedirectToGroups() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/groups", { replace: true });
  }, []);

  return null;
}
