import { SendMenuWrapperInterface } from "../../../interfaces";
import { StyledSendMenu } from "./SendMenu.styled";

const SendMenuWrapper = ({
  title,
  idError,
  showIdError,
  sortedMembers,
  id,
  userMemberId,
  setId,
  setShowIdError,
}: SendMenuWrapperInterface) => {
  
  const errorCondition =
    title === "Sender"
      ? idError.isSenderError && showIdError
      : idError.isReceiverError && showIdError;

  return (
    <StyledSendMenu inputError={showIdError}>
      <div
        className="sendMenu"
        style={{
          borderColor: errorCondition ? "#ba5d5d" : "#000000",
        }}
      >
        <div className="title">{title}</div>
        <div className="options">
          {sortedMembers.value.map((m, i) => (
            <div
              key={i}
              className="name"
              style={{
                backgroundColor: id === m.id ? "white" : "",
                color: id === m.id ? "#26272B" : "",
              }}
              onClick={() => {
                setId((prev) => (prev === m.id ? "" : m.id));
                setShowIdError(false);
              }}
            >
              {m.id === userMemberId ? "You" : m.name}
            </div>
          ))}
        </div>
      </div>
      <span className="errorMsg">{errorCondition ? idError.error : ""}</span>
    </StyledSendMenu>
  );
};

export default SendMenuWrapper;
