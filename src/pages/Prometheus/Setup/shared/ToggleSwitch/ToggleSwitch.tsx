import { SwitchLabel, HiddenInput, Track } from './ToggleSwitch.styled';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export const ToggleSwitch = ({
  checked,
  onChange,
  ariaLabel,
}: ToggleSwitchProps) => {
  return (
    <SwitchLabel>
      <HiddenInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel}
      />
      <Track $checked={checked} />
    </SwitchLabel>
  );
};
