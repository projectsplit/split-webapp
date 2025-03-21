import { useEffect, useRef, useState } from 'react'
import { keyframes, styled } from 'styled-components'
import AutoWidthInput from './AutoWidthInput'
import { useQuery } from '@tanstack/react-query'

import { IoClose } from 'react-icons/io5'
import useDebounce from '../hooks/useDebounce'
import { getLabels } from '../api/services/api'
const LabelPicker = ({ labels, setLabels, groupId }: LabelPickerProps) => {

  const [text, setText] = useState<string>('')
  const [debouncedText, _isDebouncing] = useDebounce<string>(text, 500);
  
  const { data: suggestedLabelsResponse, isLoading: _isLoading } = useQuery({
    queryKey: ['labels', groupId, 5, debouncedText],
    queryFn: () => getLabels(groupId, 5, debouncedText),
    refetchOnMount: true,
    staleTime: 10000
  })

  const suggestedLabels = suggestedLabelsResponse?.labels ?? [];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    document.addEventListener('mousedown', clickOutsideListener);
    return () => {
      document.removeEventListener('mousedown', clickOutsideListener);
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
    setLabels([...labels, suggestedLabels!.find((x:any) => x === labelName)!])
    setText('')
    inputRef.current?.focus();
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value

    if (newText.trim().length === 0) {
      setText('')
      return
    }

    if (newText.slice(-1) === ' ') {

      if (!labels.includes(newText.trim())) {
        setLabels([...labels, newText.trim()]);
      }
      setText('')
      return
    }

    setText(newText)
  }

  const remainingSuggestedLabels = suggestedLabels.filter((x:any) => !labels.includes(x))
  const isEmpty = labels.length === 0 && text.length === 0

  return (
    <StyledLabelPicker $isOpen={isMenuOpen}>
      <div className="main" onFocus={handleFocus} ref={mainRef} tabIndex={0}>
        {labels.map((x) => {
          return (
            <span key={x}
              style={{ backgroundColor: generateColorPairFromHue(hashStringToHue(x)).backgroundcolor, color: generateColorPairFromHue(hashStringToHue(x)).textColor }}
              onClick={() => handleRemoveClick(x)} className="selected-label">
              {x}
              <IoClose />
            </span>
          )
        })}
        <AutoWidthInput
          className='input'
          inputMode='text'
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={text}
          onChange={handleTextChange}
          ref={inputRef} />
        {isEmpty && <div style={{ position: 'absolute' }}>Select label...</div>}
      </div>
      {isMenuOpen && remainingSuggestedLabels.length > 0 && (
        <div className="dropdown" ref={dropdownRef}>
          {remainingSuggestedLabels.map((x:any) => (
            <div key={x} onClick={() => handleSuggestedLabelClick(x)} className="suggested-label">{x}</div>
          ))}
        </div>
      )}
      <div className="meta">
        {<span className="description">Labels</span>}
      </div>
    </StyledLabelPicker>
  );
};

export default LabelPicker;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const StyledLabelPicker = styled.div<{ $hasError?: boolean, $isOpen?: boolean }>`
  color: ${({ theme }) => theme.secondaryTextColor};
  display: flex;
  flex-direction: column;
  position: relative;
  background-color:  ${({ theme }) => theme.layer2};
  .main {
    display: flex;
    gap: 4px;
    align-items: center;
    border: 1px solid ${({ theme, $hasError, $isOpen }) => ($hasError ? theme.errorColor : $isOpen ? theme.highlightColor : theme.lineColor)};
    border-radius: 8px;
    padding: 8px 16px;
    flex-wrap: wrap;
    /* white-space: nowrap; */
    text-overflow: clip;
    /* overflow: hidden; */
    
    .selected-label {
      color: #000000a2;
      /* font-size: 16px; */
      display: flex;
      gap: 8px;
      align-items: center;
      /* border: 1px solid ${({ theme }) => (theme.lineColor)}; */
      border-radius: 2px;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
      
      .text {
      }
      
      .remove-icon {
        
      }
    }
    
    .input {
      flex: 1;
    }
    
    .icon {
      &:hover {
        color: #DDDDDD;
      }
    }
  }

  .meta {
    background-color:  ${({ theme }) => theme.backgroundcolor};
    display: flex;
    justify-content: space-between;
    padding: 0px 4px; 
    font-size: 12px;

    .description {
      color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    }

    .error {
      color: ${({ theme }) => theme.errorColor};
      font-weight: 400;
    }
  }
  
  .dropdown {
    background-color: ${({ theme }) => theme.backgroundcolor};
    color: ${({ theme }) => theme.textActiveColor};
    border-color: ${({ theme }) => theme.lineColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    max-height: 300px;
    top: calc(100% - 12px);
    
    .suggested-label {
      animation: ${fadeIn} 0.15s linear;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      box-sizing: content-box;
      
      .right {
        display: flex;
        flex-direction: row;
        justify-items: end;
        align-items: center;
        gap: 10px;
        
        .currency {
          color: #777777;
        }
        
        .amount-input {
          background-color: ${({ theme }) => theme.backgroundcolor};
          color: ${({ theme }) => theme.textActiveColor};
          border-color: ${({ theme }) => theme.lineColor};
          border-style: none;
          border-width: 1px;
          border-radius: 5px;
          text-align: right;
          width: 100px;
          outline: solid;
          outline-width: 1px;
          outline-color: transparent;
          font-size: 16px;
        }
        
        .locked-icon{
          color: ${({ theme }) => theme.primaryTextColor};
        }
        
        .unlocked-icon{
          color: ${({ theme }) => theme.lineColor};
        }
      }
    }
  }
`

export interface LabelPickerProps {
  labels: string[]
  setLabels: React.Dispatch<React.SetStateAction<string[]>>
  groupId: string
}

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
