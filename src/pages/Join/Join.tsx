import React, { useEffect } from "react";
import { StyledJoin } from "./Join.styled";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useJoinWithCode } from "../../api/services/useJoinWithCode";
import MyButton from "../../components/MyButton/MyButton";
import { useGetJoinCode } from "../../api/services/useGetJoinCode";
import routes from "../../routes";
import Spinner from "../../components/Spinner/Spinner";
import Separator from "../../components/Separator/Separator";
import { useSignal } from "@preact/signals-react";

const Join: React.FC = () => {
  const errorMessage = useSignal<string>("");
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  if (!code) {
    navigate(routes.ROOT);
    return null;
  }

  const { data, isPending: getJoinCodeLoading, isError } = useGetJoinCode(code);
  const { mutate, isPending } = useJoinWithCode(errorMessage);

  const navigateToGroup = (groupId: string) =>
    navigate(generatePath(routes.GROUP, { groupid: groupId }), {
      replace: true,
    });

  useEffect(() => {
    if (data?.isAlreadyMember) {
      navigateToGroup(data.groupId);
    }
  }, [data, navigate]);

  
  if (getJoinCodeLoading|| !data) {
    return (
      <StyledJoin>
        <div className="spinner">
          <Spinner />
        </div>
      </StyledJoin>
    );
  }

  if (isError) {
    return (
      <StyledJoin>
        <div className="errors">
          <div className="text">
            <div>Snap! Something went wrong! 😵</div>
          </div>
          <div className="buttons">
            <MyButton
              variant="secondary"
              onClick={() => navigate(routes.ROOT, { replace: true })}
            >
              Close
            </MyButton>
          </div>
        </div>
      </StyledJoin>
    );
  }

   if (data.isAlreadyMember) {
    return null; 
  }

  return (
    <StyledJoin>
      <div className="headerSeparator">
        <div className="header">
          <div className="info">
            <strong>Invitation</strong>
          </div>
        </div>
        <div className="separator">
          <Separator />
        </div>
      </div>
      {errorMessage.value.length > 0 ? (
        <div className="errors">
          <div className="text">
            <div>{errorMessage.value} 😖</div>
          </div>
          <div className="buttons">
            <MyButton
              variant="secondary"
              onClick={() => navigate(routes.ROOT, { replace: true })}
            >
              Decline
            </MyButton>
          </div>
        </div>
      ) : (
        <div className="NoErrors">
          <div className="text">
            <div>
              You have been invited to join <strong>{data.groupName}</strong>
            </div>
          </div>
          <div className="buttons">
            <MyButton
              isLoading={isPending}
              onClick={() =>
                mutate({
                  code,
                  onSuccess: () => navigateToGroup(data.groupId),
                })
              }
            >
              {" "}
              Accept{" "}
            </MyButton>
            <MyButton
              variant="secondary"
              onClick={() => navigate(routes.ROOT, { replace: true })}
            >
              Decline
            </MyButton>
          </div>
        </div>
      )}
    </StyledJoin>
  );
};

export default Join;
