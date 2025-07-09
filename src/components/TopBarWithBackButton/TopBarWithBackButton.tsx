import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { StyledTopBarWithBackButton } from "./TopBarWithBackButton.styled";
import { TopBarWithBackButtonProps } from "../../interfaces";


export default function TopBarWithBackButton({onClick, header}:TopBarWithBackButtonProps) {
  return (
    <StyledTopBarWithBackButton>
      <div className="backButtonContainer">
        <BiArrowBack
          className="backButton"
          onClick={onClick}
        />
      </div>
      <div className="descr">{header}</div>
    </StyledTopBarWithBackButton>
  );
}
