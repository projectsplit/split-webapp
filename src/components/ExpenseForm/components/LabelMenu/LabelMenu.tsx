import { BiArrowBack } from "react-icons/bi";
import { StyledLabelMenu } from "./LabelMenu.styled";
import { LabelMenuProps } from "../../../../interfaces";
import LabelPicker from "../../../LabelPicker/LabelPicker";
import MyButton from "../../../MyButton/MyButton";

export const LabelMenu = ({
  labelMenuIsOpen,
  groupId,
  labels,
  setLabels,
}: LabelMenuProps) => {
  return (
    <StyledLabelMenu>
      <div className="header">
        <div className="closeButtonContainer">
          {" "}
          <BiArrowBack
            className="backButton"
            onClick={() => (labelMenuIsOpen.value = false)}
          />
        </div>

        <div className="title">Tag expense</div>
        <div className="gap"></div>
      </div>

      <LabelPicker labels={labels} setLabels={setLabels} groupId={groupId} />
       <div className="spacer"></div>
      <MyButton fontSize="16" onClick={() => (labelMenuIsOpen.value = false)}>
        Done
      </MyButton>
    </StyledLabelMenu>
  );
};

export default name;
