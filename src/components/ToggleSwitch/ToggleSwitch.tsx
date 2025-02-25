import { ToggleSwitchProps } from "../../interfaces";
import { Checkbox, Slider, ToggleLabel } from "./ToggleSwitch.styled";

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
    return (
      <ToggleLabel>
        <Checkbox checked={isOn} onChange={onToggle} />
        <Slider />
      </ToggleLabel>
    );
  };
  
  export default ToggleSwitch;