import { ReactNode } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { StyledLongPressMenu } from './LongPressMenu.styled';
import { useDragToClose } from '@/hooks/useDragToClose';

interface LongPressMenuProps {
  onEdit?: () => void;
  onDelete: () => void;
  onClose: () => void;
  extraOptions?: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
  }[];
}

export default function LongPressMenu({
  onEdit,
  onDelete,
  onClose,
  extraOptions,
}: LongPressMenuProps) {
  const sheetRef = useDragToClose(onClose);

  return (
    <StyledLongPressMenu>
      <div className="backdrop" onClick={onClose} />
      <div className="sheet" ref={sheetRef}>
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
        {extraOptions?.map((option) => (
          <button
            key={option.label}
            className="option edit"
            onClick={() => {
              onClose();
              option.onClick();
            }}
          >
            <span className="icon">{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
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
