import { GoHomeFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { StyledBottomMainMenu } from "./BottomMainMenu.styled";
import { BottomMainMenuProps } from "../../interfaces";

export default function BottomMainMenu({onClick}: BottomMainMenuProps) {
  const navigate = useNavigate();
  return (
    <StyledBottomMainMenu className="bottom-bar">
      <div className="bottomMainBar">
        <div className="home" onClick={() => navigate("/")}>
          <GoHomeFill />
        </div>
        <div className="add" onClick={onClick}>
          <FaPlus />
        </div>
        <div className="search">
          <IoMdSearch />
        </div>
      </div>
    </StyledBottomMainMenu>
  );
}