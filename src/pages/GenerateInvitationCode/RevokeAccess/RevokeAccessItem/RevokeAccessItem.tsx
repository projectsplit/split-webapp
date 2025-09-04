import React from "react";
import { StyledRevokeAccessItem } from "./RevokeAccessItem.styled";
import MyButton from "../../../../components/MyButton/MyButton";
import { RevokeAccessItemProps } from "../../../../interfaces";
import {  FormatDateTime } from "../../../../helpers/timeHelpers";

export default function RevokeAccessItem({
  expires,
  id,
  maxUses,
  timesUsed,
  timeZone
}: RevokeAccessItemProps) {

  return (
    <StyledRevokeAccessItem>
      {" "}
      <div className="code">{id}</div>
      <div className="infoAndRevokeButton">
        <div className="infoContainer">
          <div className="infoAndData">
            <div className="info">Expires:</div> <div className="data">{FormatDateTime(expires,timeZone)}</div>
          </div>
          <div className="infoAndData">
             <div className="info">Times Used:</div><div className="data">{timesUsed}/{maxUses}</div>
          </div>
        </div>
        <div className="revokeButton">
          <MyButton>Revoke</MyButton>
        </div>
      </div>
    </StyledRevokeAccessItem>
  );
}
