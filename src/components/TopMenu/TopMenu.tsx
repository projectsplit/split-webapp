import { useOutletContext } from "react-router-dom";
import { TopMenuProps } from "../../interfaces";
import UserOptionsButton from "../UserOptionsButton/UserOptionsButton";
import { UserInfo } from "../../types";
import QRscanner from "../QRscanner/QRscanner";
import { StyledTopMenu } from "./TopMenu.styled";


export default function TopMenu({ title }: TopMenuProps) {
  
    const { userInfo } = useOutletContext<{
      userInfo: UserInfo;
    }>();
  
    return (
      <StyledTopMenu>
        <div className="useOptionsContainer">
          <UserOptionsButton username={userInfo?.username}/>
        </div>
        <div className="titleStripe">
          <div className="title">{title}</div>
        </div>
          <QRscanner />
      </StyledTopMenu>
    );
  }
  