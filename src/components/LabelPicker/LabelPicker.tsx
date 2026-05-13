import { useRef, useState } from 'react';
import AutoWidthInput from '../AutoWidthInput';
import { IoClose } from 'react-icons/io5';
import { StyledLabelPicker } from './LabelPicker.styled';
import { LabelPickerProps } from '../../interfaces';
import { useGetGroupLabels } from '../../api/auth/QueryHooks/useGetGroupLabels';
import { Label } from '../../types';
import labelColors from '../../labelColors';
import { AiFillDelete } from 'react-icons/ai';
import { useLabels } from '@/api/auth/QueryHooks/useGetLabels';
import { useDeleteLabel } from '@/api/auth/CommandHooks/useDeleteLabel';
import { Spinner } from '../MyButton/MyButton';

const LabelPicker = ({
  labels,
  setLabels,
  groupId,
  errorMessage,
  userId,
  isPersonal,
  menu,
}: LabelPickerProps) => {
  const [text, setText] = useState<string>('');
  const [$deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [deletingLabelId, setDeletingLabelId] = useState<string | null>(null);

  const { mutate: removeLabelMutation, isPending } = useDeleteLabel(
    isPersonal,
    errorMessage,
    menu
  );

  const { data: suggestedLabelsResponse, isPending: isGroupLabelsPending } =
    useGetGroupLabels(groupId);
  const { data: suggestedUserLabelsResponse, isPending: isUserLabelsPending } =
    useLabels(userId, false, groupId);

  const groupLabels = suggestedLabelsResponse?.labels ?? [];
  const userLabels = suggestedUserLabelsResponse?.labels ?? [];

  const usedGroupColors =
    groupLabels?.map((x) => x.color)?.concat(labels?.map((x) => x.color)) ?? [];
  const usedUserColors =
    userLabels?.map((x) => x.color)?.concat(labels?.map((x) => x.color)) ?? [];

  const availableGroupColors = Object.keys(labelColors).filter(
    (x) => !usedGroupColors.includes(x)
  );
  const availableUserColors = Object.keys(labelColors).filter(
    (x) => !usedUserColors.includes(x)
  );

  const addLabel = (labelText: string) => {
    if (labels.map((x) => x.text).includes(labelText)) {
      setText('');
      return;
    }

    const existingGroupLabel = groupLabels.find((x) => x.text == labelText);
    const existingUserLabel = userLabels.find((x) => x.text == labelText);

    const newExpenseLabel: Label = !!groupId
      ? !!existingGroupLabel
        ? {
            id: existingGroupLabel.id,
            color: existingGroupLabel.color,
            text: existingGroupLabel.text,
          }
        : { id: labelText, color: availableGroupColors[0], text: labelText }
      : !!existingUserLabel
        ? {
            id: existingUserLabel.id,
            color: existingUserLabel.color,
            text: existingUserLabel.text,
          }
        : { id: labelText, color: availableUserColors[0], text: labelText };

    setLabels([...labels, newExpenseLabel]);
    setText('');
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setDeleteClicked(false);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    if (text.length > 0) {
      addLabel(text);
    }
  };

  const handleSelectedLabelClick = (labelId: string) => {
    setLabels(labels.filter((x) => x.id !== labelId));
  };

  const handleSuggestedLabelClick = (label: Label): void => {
    addLabel(label.text);
    inputRef.current?.focus();
  };

  const removeLabel = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    labelId: string
  ): void => {
    e.stopPropagation();
    setDeletingLabelId(labelId);
    removeLabelMutation({ groupId, labelId });
    setDeleteClicked(true);
  };

  const handleInpuTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value;
    const trimmedText = newText.trim();

    if (trimmedText.length === 0) {
      setText('');
      return;
    }

    if (newText.slice(-1) === ' ') {
      addLabel(trimmedText);
      return;
    }

    setText(trimmedText);
  };

  const isLabelsLoading = !!groupId ? isGroupLabelsPending : isUserLabelsPending;

  const remainingSuggestedLabels = !!groupId
    ? groupLabels.filter((x) => !labels.map((x) => x.text).includes(x.text))
    : userLabels.filter((x) => !labels.map((x) => x.text).includes(x.text));

  const isEmpty = labels?.length === 0 && text.length === 0;

  return (
    <StyledLabelPicker $deleteClicked={$deleteClicked}>
      <div
        className="main"
        onFocus={() => handleFocus()}
        onBlur={handleBlur}
        ref={mainRef}
        tabIndex={0}
      >
        {labels.map((x) => {
          return (
            <span
              key={x.id}
              style={{
                backgroundColor: labelColors[x.color],
                color: '#000000c8',
              }}
              onClick={() => handleSelectedLabelClick(x.id)}
              className="selected-label"
            >
              {x.text}
              <IoClose />
            </span>
          );
        })}
        <AutoWidthInput
          className="input"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={text}
          onChange={handleInpuTextChange}
          ref={inputRef}
          isText={true}
        />
        {isEmpty && (
          <div style={{ position: 'absolute', flex: 1 }}>
            Select or create label
          </div>
        )}
      </div>
      {
        <div className="dropdown" ref={dropdownRef}>
          {isLabelsLoading ? (
            <div className="loading-container">
              <Spinner variant="secondary" />
            </div>
          ) : remainingSuggestedLabels.map((x) => (
            <div
              onClick={() => handleSuggestedLabelClick(x)}
              key={x.id}
              className="suggested-label-container"
            >
              <div
                className="suggested-label-text"
                style={{
                  backgroundColor: labelColors[x.color],
                  color: '#000000c8',
                }}
              >
                {x.text}
              </div>

              <div className="spinnerAndTrash">
                {isPending && deletingLabelId === x.id ? (
                  <Spinner variant="secondary" />
                ) : (
                  <AiFillDelete
                    style={{ color: 'gray', cursor: 'pointer' }}
                    onClick={(e) => removeLabel(e, x.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      }
    </StyledLabelPicker>
  );
};

export default LabelPicker;
