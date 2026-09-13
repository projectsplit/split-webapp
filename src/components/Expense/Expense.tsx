import { ExpenseProps } from '../../interfaces';
import { StyledExpense } from './Expense.styled';
import { MdLocationOn, MdGroup, MdPersonOff } from 'react-icons/md';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import { TimeOnly } from '../../helpers/timeHelpers';
import Pill from '../Pill/Pill';
import labelColors from '../../labelColors';
import { Mode } from '@/types';
import { useLongPress } from '../../hooks/useLongPress';
import { useFittedCount } from '../../hooks/useFittedCount';
import { memo, useCallback, useRef } from 'react';

const MORE_LABELS_WIDTH = 7.5;
const MORE_LABELS_DIGIT_WIDTH = 7.3;
const GROUP_ICON_STYLE = { marginRight: '4px' };

const Expense = ({
  timeZoneId,
  expense,
  onClick,
  onLongPress,
  amount,
  currency,
  description,
  location,
  occurred,
  userAmount,
  labels,
  mode,
}: ExpenseProps) => {
  const handleClick = useCallback(() => onClick(expense), [onClick, expense]);
  const handleLongPress = useCallback(
    () => onLongPress?.(expense),
    [onLongPress, expense]
  );
  const longPressHandlers = useLongPress(handleLongPress);

  const isPersonal = mode === Mode.Personal;
  const place = location?.google?.name;
  const title = description || place || '';
  const labelsRef = useRef<HTMLSpanElement>(null);
  const visibleCount = useFittedCount(
    labelsRef,
    labels.map((l) => l.id).join('|'),
    labels.length,
    MORE_LABELS_WIDTH + MORE_LABELS_DIGIT_WIDTH * String(labels.length).length
  );
  const visibleLabels = labels.slice(0, visibleCount);
  const hiddenLabelCount = labels.length - visibleCount;

  return (
    <StyledExpense onClick={handleClick} {...longPressHandlers}>
      <div
        className={
          !isPersonal && userAmount === 0 ? 'descr noShareDescr' : 'descr'
        }
      >
        {title}
      </div>

      <span className="userShare">
        {isPersonal
          ? amount === 0
            ? ''
            : displayCurrencyAndAmount(Math.abs(amount).toString(), currency)
          : userAmount === 0
            ? (
                <MdPersonOff
                  className="noShare"
                  title="No share"
                  aria-label="No share"
                />
              )
            : displayCurrencyAndAmount(
                Math.abs(userAmount).toString(),
                currency
              )}
      </span>

      <div className="meta">
        <span className="time">{TimeOnly(occurred, timeZoneId)}</span>
        {place ? <MdLocationOn className="locationIcon" title={place} /> : null}
        {labels.length > 0 ? (
          <span className="labels" ref={labelsRef}>
            {visibleLabels.map((l) => (
              <Pill
                key={l.id}
                title={l.text}
                color={l.color === '' ? 'white' : labelColors[l.color]}
                closeButton={false}
                $border={false}
                $vivid
                fontSize="11px"
              >
                {isPersonal && !l.id.includes('_') && (
                  <MdGroup style={GROUP_ICON_STYLE} />
                )}
              </Pill>
            ))}
            {hiddenLabelCount > 0 ? (
              <span className="moreLabels">+{hiddenLabelCount}</span>
            ) : null}
          </span>
        ) : null}
      </div>

      {!isPersonal && amount !== 0 ? (
        <span className="groupTotal">
          {displayCurrencyAndAmount(Math.abs(amount).toString(), currency)}
        </span>
      ) : null}
    </StyledExpense>
  );
};

export default memo(Expense);
