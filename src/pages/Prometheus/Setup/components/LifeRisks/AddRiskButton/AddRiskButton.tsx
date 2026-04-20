import { MdAdd } from 'react-icons/md';
import { Button, Label } from './AddRiskButton.styled';

interface AddRiskButtonProps {
  onClick?: () => void;
}

export const AddRiskButton = ({ onClick }: AddRiskButtonProps) => {
  return (
    <Button onClick={onClick}>
      <MdAdd />
      <Label>Add New Risk Parameter</Label>
    </Button>
  );
};
