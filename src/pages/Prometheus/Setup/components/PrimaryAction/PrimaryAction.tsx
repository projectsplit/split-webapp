import { MdBolt } from 'react-icons/md';
import { Wrapper, Button } from './PrimaryAction.styled';

interface PrimaryActionProps {
  onClick: () => void;
}

export const PrimaryAction = ({ onClick }: PrimaryActionProps) => {
  return (
    <Wrapper>
      <Button onClick={onClick}>
        <span>Complete Engine Set Up</span>
        <MdBolt />
      </Button>
    </Wrapper>
  );
};
