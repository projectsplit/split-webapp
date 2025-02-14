
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../api/services/api";

const Protected: React.FC = () => {
  const { data: userInfo } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  const isUserAuthenticated = () => {
    return !!localStorage.getItem("accessToken");
  };

  return isUserAuthenticated() ? <Outlet context={{ userInfo }} /> : <Navigate to="/welcome" />;
};

export default Protected;
