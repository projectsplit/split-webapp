import { MdArrowBack } from 'react-icons/md';
import { Bar, LeftCluster, IconButton, RightCluster } from './TopBar.styled';
import { Pulse, Tagline, TaglineText } from '../Hero/Hero.styled';

interface TopBarProps {
  onBack: () => void;
}

export const TopBar = ({ onBack }: TopBarProps) => {
  return (
    <Bar>
      <LeftCluster>
        <IconButton aria-label="Go back" onClick={onBack}>
          <MdArrowBack />
        </IconButton>
        <Tagline>
          <Pulse />
          <TaglineText>System Configuration</TaglineText>
        </Tagline>
      </LeftCluster>
      <RightCluster></RightCluster>
    </Bar>
  );
};
