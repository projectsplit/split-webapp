import React from "react";
import { StyledMembersInfoBox } from "./MembersInfoBox.Styled";
import InfoBox from "../InfoBox/InfoBox";

export default function MembersInfoBox() {
  const [hide, setHide] = React.useState<boolean>(false);
  
  return (
    <StyledMembersInfoBox>
      <InfoBox>
        <div className="topStripe">
          <div className="info">Split among 3 members</div>
          <div
            className="hideDetalailsButton"
            onClick={() => setHide((hide) => !hide)}
          >
            {" "}
            {hide ? "unhide" : "hide"}{" "}
          </div>
        </div>

        {!hide && (
          <div className="memberInfoStripe">
            <div className="member">
              <span className="memberName">You</span>
              <span className="amount">260.45E</span>
              <span className="percentage"> 10%</span>
            </div>

            <div className="member">
              <span className="memberName">You</span>
              <span className="amount">260.45E</span>
              <span className="percentage"> 10%</span>
            </div>

            <div className="member">
              <span className="memberName">You</span>
              <span className="amount">260.45E</span>
              <span className="percentage"> 10%</span>
            </div>
          </div>
        )}
      </InfoBox>
    </StyledMembersInfoBox>
  );
}
