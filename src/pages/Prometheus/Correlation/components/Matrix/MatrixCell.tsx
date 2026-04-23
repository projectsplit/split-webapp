import { useEffect, useRef, useState } from 'react';
import {
  Cell,
  Display,
  SignedGroup,
  Sign,
  Digits,
  Input,
} from './MatrixCell.styled';
import {
  formatCorrelation,
  splitCorrelation,
  toneForValue,
} from '../../utils/colors';

interface MatrixCellProps {
  value: number;
  onCommit: (value: number) => void;
}

export const MatrixCell = ({ value, onCommit }: MatrixCellProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(formatCorrelation(value));
  const inputRef = useRef<HTMLInputElement>(null);

  const tone = toneForValue(value);
  const { sign, magnitude } = splitCorrelation(value);

  useEffect(() => {
    if (!editing) setDraft(formatCorrelation(value));
  }, [value, editing]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const DRAFT_PATTERN = /^[+-]?(\d+(\.\d{0,2})?|\.\d{0,2})?$/;

  const commit = () => {
    setEditing(false);
    const normalized = draft.replace(/^\+/, '').trim();
    const parsed = Number(normalized);
    if (normalized !== '' && Number.isFinite(parsed)) {
      onCommit(parsed);
    } else {
      setDraft(formatCorrelation(value));
    }
  };

  const handleChange = (next: string) => {
    if (DRAFT_PATTERN.test(next)) setDraft(next);
  };

  return (
    <Cell $tone={tone} onClick={() => !editing && setEditing(true)}>
      {editing ? (
        <Input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={draft}
          $color={tone.text}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
            if (e.key === 'Escape') {
              setDraft(formatCorrelation(value));
              setEditing(false);
            }
          }}
        />
      ) : (
        <Display>
          <SignedGroup $color={tone.text}>
            <Sign>{sign}</Sign>
            <Digits>{magnitude}</Digits>
          </SignedGroup>
        </Display>
      )}
    </Cell>
  );
};
