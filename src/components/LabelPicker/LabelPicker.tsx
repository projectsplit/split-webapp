import { useEffect, useRef, useState } from "react";
import AutoWidthInput from "../AutoWidthInput";
import { useQuery } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import useDebounce from "../../hooks/useDebounce";
import { getLabels } from "../../api/services/api";
import { StyledLabelPicker } from "./LabelPicker.styled";
import { LabelPickerProps } from "../../interfaces";
import { FiChevronDown } from "react-icons/fi";

const LabelPicker = ({ labels, setLabels, groupId }: LabelPickerProps) => {
  const [text, setText] = useState<string>("");
  const [debouncedText, _isDebouncing] = useDebounce<string>(text, 500);

  const { data: suggestedLabelsResponse, isLoading: _isLoading } = useQuery({
    queryKey: ["labels", groupId, 5, debouncedText],
    queryFn: () => getLabels(groupId, 5, debouncedText),
    refetchOnMount: true,
    staleTime: 10000,
  });

  const suggestedLabels = suggestedLabelsResponse?.labels ?? [];

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

  const handleRemoveClick = (id: string) => {
    setLabels(labels.filter((x) => x !== id));
  };

  const handleSuggestedLabelClick = (labelName: string): void => {
    setLabels([...labels, suggestedLabels!.find((x: any) => x === labelName)!]);
    setText("");
    inputRef.current?.focus();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value;

    if (newText.trim().length === 0) {
      setText("");
      return;
    }

    if (newText.slice(-1) === " ") {
      if (!labels.includes(newText.trim())) {
        setLabels([...labels, newText.trim()]);
      }
      setText("");
      return;
    }

    setText(newText);
  };

  const remainingSuggestedLabels = suggestedLabels.filter(
    (x: any) => !labels.includes(x)
  );
  const isEmpty = labels.length === 0 && text.length === 0;

  const handleArrowMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent focus from shifting to the main container.
    e.preventDefault();
    e.stopPropagation();
  
    if (isMenuOpen) {
      setIsMenuOpen(false);
      inputRef.current?.blur(); // Remove focus when closing the menu.
    } else {
      setIsMenuOpen(true);
      inputRef.current?.focus(); // Focus the input when opening the menu.
    }
  };

  return (
    <StyledLabelPicker $isOpen={isMenuOpen}>
      <div
        className="main"
        onFocus={() => handleFocus()}
        ref={mainRef}
        tabIndex={0}
      >
        {labels.map((x) => {
          return (
            <span
              key={x}
              style={{
                backgroundColor: generateColorPairFromHue(hashStringToHue(x))
                  .backgroundcolor,
                color: generateColorPairFromHue(hashStringToHue(x)).textColor,
              }}
              onClick={() => handleRemoveClick(x)}
              className="selected-label"
            >
              {x}
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
          onChange={handleTextChange}
          ref={inputRef}
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
          {remainingSuggestedLabels.map((x: any) => (
            <div
              key={x}
              onClick={() => handleSuggestedLabelClick(x)}
              className="suggested-label"
            >
              {x}
            </div>
          ))}
        </div>
      )}
      <div className="meta">{<span className="description">Labels</span>}</div>
    </StyledLabelPicker>
  );
};

export default LabelPicker;

function generateColorPairFromHue(hue: number) {
  hue = hue % 360;
  const backgroundcolor = `hsl(${hue}, 40%, 70%, 100%)`; // Darker color for background
  const textColor = `hsl(${hue}, 30%, 25%)`; // Lighter color for text
  return { backgroundcolor, textColor };
}

function hashStringToHue(str: string) {
  // Generate a hash using the Fowler-Noll-Vo hash function (FNV-1a)
  let hash = 2166136261; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i); // XOR the character code
    hash = (hash * 16777619) >>> 0; // Multiply by FNV prime and ensure it's a 32-bit number
  }

  // Map the hash to a value between 0 and 360
  return hash % 360;
}
