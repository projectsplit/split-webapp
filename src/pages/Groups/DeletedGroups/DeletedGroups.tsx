import { StyledDeletedGroups } from "./DeletedGroups.styled";

export default function DeletedGroups() {
  return (
    <StyledDeletedGroups>
      <div className="groups">
      <div className="noGroupMsg">There are currently no&nbsp;<strong>deleted</strong>&nbsp;groups</div>
      </div>
    </StyledDeletedGroups>
  );
}
