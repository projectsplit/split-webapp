import React, { useEffect } from "react";
import { StyledJoin } from "./Join.styled";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useJoinWithCode } from "../../api/services/useJoinWithCode";
import MyButton from "../../components/MyButton/MyButton";
import { useGetJoinCode } from "../../api/services/useGetJoinCode";
import routes from "../../routes";
import Spinner from "../../components/Spinner/Spinner";

const Join: React.FC = () => {

  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate()

  if (!code) {
    navigate(routes.ROOT);
    return null;
  }

  const getJoinCode = useGetJoinCode(code)
  const joinWithCode = useJoinWithCode();

  const navigateToGroup = (groupId: string) => navigate(generatePath(routes.GROUP, { groupid: groupId }));

  useEffect(() => {
    if (getJoinCode.data?.isAlreadyMember) {
      navigateToGroup(getJoinCode.data.groupId)
    }
  }, [getJoinCode.data, navigate]);

  if (getJoinCode.isPending) {
    return (
      <StyledJoin>
        <Spinner />
      </StyledJoin>
    );
  }

  if (getJoinCode.isError) {
    return (
      <StyledJoin>
        ERROR
      </StyledJoin>
    );
  }

  return (
    <StyledJoin>
      You have been invited to join {getJoinCode.data.groupName}
      <MyButton onClick={() => joinWithCode.mutate({ code, onSuccess: () => navigateToGroup(getJoinCode.data.groupId) })}> JOIN GROUP </MyButton>
    </StyledJoin>
  );
};

export default Join;
