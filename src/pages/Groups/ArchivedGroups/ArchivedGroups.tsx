import { StyledArchivedGroups } from "./ArchivedGroups.styled";
import { GoArchive } from "react-icons/go";

export default function ArchivedGroups() {
  return (
    <StyledArchivedGroups>
      <div className="groups">
        <div className="noData">
          {" "}
          <div className="msg">There are currently no archived groups</div>
          <GoArchive className="icon" />
        </div>
      </div>
    </StyledArchivedGroups>
  );
}
