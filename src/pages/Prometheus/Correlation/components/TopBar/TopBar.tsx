import { MdArrowBack } from 'react-icons/md';
import { Bar, LeftCluster, IconButton, Title, FinalizeButton } from './TopBar.styled';

interface TopBarProps {
  onBack: () => void;
  onFinalize: () => void;
}

export const TopBar = ({ onBack, onFinalize }: TopBarProps) => {
  return (
    <Bar>
      <LeftCluster>
        <IconButton aria-label="Go back" onClick={onBack}>
          <MdArrowBack />
        </IconButton>
        <Title>Risk Correlation</Title>
      </LeftCluster>
      <FinalizeButton onClick={onFinalize}>Finalize</FinalizeButton>
    </Bar>
  );
};
