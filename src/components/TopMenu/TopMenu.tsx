import { TopMenuProps } from "../../interfaces";
import UserOptionsButton from "../UserOptionsButton/UserOptionsButton";
import QRscanner from "../QRscanner/QRscanner";
import { StyledTopMenu } from "./TopMenu.styled";


export default function TopMenu({ title ,menu,username}: TopMenuProps) {

    return (
      <StyledTopMenu>
        <div className="useOptionsContainer">
          <UserOptionsButton username={username} onClick={()=>menu.value="settings"}/>
        </div>
        <div className="titleStripe">
          <div className="title">{title}</div>
        </div>
          <QRscanner />
      </StyledTopMenu>
    );
  }
  