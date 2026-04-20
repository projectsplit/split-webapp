import { MdArrowBack } from 'react-icons/md';
import {
  Bar,
  LeftCluster,
  IconButton,
  Title,
  RightCluster,
  Version,
  SaveButton,
} from './TopBar.styled';

interface TopBarProps {
  onBack: () => void;
  onSave: () => void;
}

export const TopBar = ({ onBack, onSave }: TopBarProps) => {
  return (
    <Bar>
      <LeftCluster>
        <IconButton aria-label="Go back" onClick={onBack}>
          <MdArrowBack />
        </IconButton>
        <Title>Risk Architecture</Title>
      </LeftCluster>
      <RightCluster>
        <Version>ORACLE v2.4</Version>
        <SaveButton onClick={onSave}>SAVE</SaveButton>
      </RightCluster>
    </Bar>
  );
};
