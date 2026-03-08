import { BiArrowBack } from "react-icons/bi";
import { StyledLabelMenu } from "./LabelMenu.styled";
import { LabelMenuProps } from "../../../../interfaces";
import LabelPicker from "../../../LabelPicker/LabelPicker";
import MyButton from "../../../MyButton/MyButton";
import { useSignal } from "@preact/signals-react";
import GeneralWarningMenuAnimation from "@/components/Animations/GeneralWarningMenuAnimation";
import MenuAnimationBackground from "@/components/Animations/MenuAnimationBackground";

export const LabelMenu = ({
  labelMenuIsOpen,
  groupId,
  labels,
  setLabels,
  userId,
  isPersonal
}: LabelMenuProps) => {

  const errorMessage = useSignal<string>("");
  const menu = useSignal<string | null>(null)

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
      <div className="info">
        Type to add a new label (press space to confirm) or pick an existing one.
      </div>
      <div className="label-picker-wrapper">
        <LabelPicker labels={labels} setLabels={setLabels} groupId={groupId} errorMessage={errorMessage} userId={userId} isPersonal={isPersonal} menu={menu} />
      </div>
      <MyButton fontSize="16" onClick={() => (labelMenuIsOpen.value = false)}>
        Done
      </MyButton>

      <MenuAnimationBackground menu={menu} />
      <GeneralWarningMenuAnimation message={errorMessage.value} menu={menu} />

    </StyledLabelMenu>
  );
};

export default name;
