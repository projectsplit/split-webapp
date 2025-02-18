import { StyledArchivedGroups } from "./ArchivedGroups.styled";

export default function ArchivedGroups() {
  return (
    <StyledArchivedGroups>
      <div className="groups">
      <div className="noGroupMsg">There are currently no&nbsp;<strong>archived</strong>&nbsp;groups</div>
      </div>
    </StyledArchivedGroups>
  );
}
