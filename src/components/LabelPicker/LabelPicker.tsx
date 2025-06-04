import { useEffect, useRef, useState } from "react";
import AutoWidthInput from "../AutoWidthInput";
import { IoClose } from "react-icons/io5";
import { StyledLabelPicker } from "./LabelPicker.styled";
import { LabelPickerProps } from "../../interfaces";
import { FiChevronDown } from "react-icons/fi";
import { useGetGroupLabels } from "../../api/services/useGetGroupLabels";
import { Label } from "../../types";
import labelColors from "../../labelColors";
import { AiFillDelete } from "react-icons/ai";
import { useRemoveLabel } from "../../api/services/useRemoveLabel";

const LabelPicker = ({ labels, setLabels, groupId }: LabelPickerProps) => {

  const [text, setText] = useState<string>("");
  const removeLabelMutation = useRemoveLabel()

  const { data: suggestedLabelsResponse } = useGetGroupLabels(groupId);

  const groupLabels = suggestedLabelsResponse?.labels ?? [];
  const usedColors = groupLabels?.map(x => x.color)?.concat(labels?.map(x => x.color)) ?? []
  const availableColors = Object.keys(labelColors).filter(x => !usedColors.includes(x))

  const addLabel = (labelText: string) => {

    if (labels.map(x => x.text).includes(labelText)) {
      setText("");
      return
    }

    const existingGroupLabel = groupLabels.find(x => x.text == labelText);

    const newExpenseLabel: Label = !!existingGroupLabel
      ? { id: existingGroupLabel.id, color: existingGroupLabel.color, text: existingGroupLabel.text }
      : { id: labelText, color: availableColors[0], text: labelText };

    setLabels([...labels, newExpenseLabel]);
    setText("");
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const clickOutsideListener = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      mainRef.current &&
      !mainRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideListener);
    return () => {
      document.removeEventListener("mousedown", clickOutsideListener);
    };
  }, []);

  const handleFocus = () => {
    setIsMenuOpen(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    if (text.length > 0) {
      addLabel(text)
    }
  };

  const handleSelectedLabelClick = (labelText: string) => {
    setLabels(labels.filter(x => x.text !== labelText));
  };

  const handleSuggestedLabelClick = (labelName: string): void => {
    addLabel(labelName)
    inputRef.current?.focus();
  };

  const removeLabel = (e: React.MouseEvent<SVGElement, MouseEvent>, labelId: string): void => {
    e.stopPropagation()
    removeLabelMutation.mutate({ groupId, labelId })
    inputRef.current?.focus();
  };

  const handleInpuTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value;
    const trimmedText = newText.trim()

    if (trimmedText.length === 0) {
      setText("");
      return;
    }

    if (newText.slice(-1) === " ") {
      addLabel(trimmedText);
      return;
    }

    setText(trimmedText);
  };

  const remainingSuggestedLabels = groupLabels.filter(x => !labels.map(x => x.text).includes(x.text));


  const isEmpty = labels?.length === 0 && text.length === 0;

  const handleArrowMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {

    e.preventDefault();
    e.stopPropagation();

    if (isMenuOpen) {
      setIsMenuOpen(false);
      inputRef.current?.blur();
    } else {
      setIsMenuOpen(true);
      inputRef.current?.focus();
    }
  };

  return (
    <StyledLabelPicker $isOpen={isMenuOpen}>
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
              key={x.text}
              style={{
                backgroundColor: labelColors[x.color],
                color: "#000000c8",
              }}
              onClick={() => handleSelectedLabelClick(x.text)}
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
          <div style={{ position: "absolute", flex: 1 }}>Select label</div>
        )}
        <div className="icon" onMouseDown={handleArrowMouseDown} ref={arrowRef}>
          <FiChevronDown />
        </div>
      </div>
      {isMenuOpen && remainingSuggestedLabels.length > 0 && (
        <div className="dropdown" ref={dropdownRef}>
          {remainingSuggestedLabels.map(x => (
            <div
              onClick={() => handleSuggestedLabelClick(x.text)}
              key={x.text}
              className="suggested-label-container"
            >
              <div
                className="suggested-label-text"
                style={{
                  backgroundColor: labelColors[x.color],
                  color: "#000000c8",
                }}>{x.text}
              </div>
              {x.count == 0 &&
                <AiFillDelete
                  style={{ color: "gray" }}
                  onClick={e => removeLabel(e, x.id)}
                />
              }
            </div>
          ))}
        </div>
      )}
      <div className="meta">{<span className="description">Labels</span>}</div>
    </StyledLabelPicker>
  );
};

export default LabelPicker;