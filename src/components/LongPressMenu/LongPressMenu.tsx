import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { StyledLongPressMenu } from './LongPressMenu.styled';

interface LongPressMenuProps {
  onEdit?: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function LongPressMenu({
  onEdit,
  onDelete,
  onClose,
}: LongPressMenuProps) {
  return (
    <StyledLongPressMenu>
      <div className="backdrop" onClick={onClose} />
      <div className="sheet">
        <div className="handle" />
        {onEdit && (
          <button
            className="option edit"
            onClick={() => {
              onClose();
              onEdit();
            }}
          >
            <AiFillEdit className="icon" />
            <span>Edit</span>
          </button>
        )}
        <button
          className="option delete"
          onClick={() => {
            onClose();
            onDelete();
          }}
        >
          <AiFillDelete className="icon" />
          <span>Delete</span>
        </button>
      </div>
    </StyledLongPressMenu>
  );
}
