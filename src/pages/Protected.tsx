import { styled } from "styled-components";
import Button from "../components/Button";
import { getMe } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import { useState } from "react";

const Protected: React.FC = () => {

  let location = useLocation();
  const navigate = useNavigate()

  if (!isUserAuthenticated()) {
    return <Navigate to={routes.AUTH} state={{ from: location }} />;
  }

  const {
    data: userInfo,
    isSuccess,
  } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  const buttonText = () => isSuccess && userInfo.username;

  const [selectedGroupName, setSelectedGroupName] = useState<string | null>(null);

  const handleGroupNameClick = () => {
    setSelectedGroupName(null)
    navigate(routes.ROOT)
  }

  return (
    <StyledProtected>
      <div className="top-bar">
        <div className="logo">🔥</div>
        {selectedGroupName && <Button onClick={handleGroupNameClick} disabled={false}>{selectedGroupName}</Button>}
        <Button disabled={false}>{buttonText()}</Button>
      </div>
      <div className="outlet-container">
        {isSuccess && <Outlet context={{ userInfo, setSelectedGroupName }} />}
      </div>
    </StyledProtected>
  );
};

export default Protected;

const StyledProtected = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .top-bar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 10px;
    flex: 0;
  
    .logo {
      font-size: 28px;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
  }
  
  .outlet-container {
    overflow: hidden;
    height: 100%;
  }
`;

const isUserAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};
