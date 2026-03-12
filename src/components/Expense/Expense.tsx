import { ExpenseProps } from '../../interfaces';
import { StyledExpense } from './Expense.styled';
import { MdLocationOn, MdGroup } from 'react-icons/md';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import { TimeOnly } from '../../helpers/timeHelpers';
import Pill from '../Pill/Pill';
import labelColors from '../../labelColors';
import { Mode } from '@/types';

const Expense = ({
  timeZoneId,
  onClick,
  amount,
  currency,
  description,
  location,
  occurred,
  userAmount,
  labels,
  mode,
}: ExpenseProps) => {
  // console.log(labels)
  return (
    <StyledExpense onClick={onClick} userAmount={userAmount}>
      <div className="topRow">
        <div className="icons">
          {location ? <MdLocationOn className="locationIcon" /> : null}
          {labels.length > 0 ? (
            <div className="labels">
              {labels.map((l) => (
                <Pill
                  $textColor={'#000000c8'}
                  key={l.id}
                  title={l.text}
                  color={l.color === '' ? 'white' : labelColors[l.color]}
                  closeButton={false}
                  $border={false}
                  fontSize="14px"
                >
                  {mode === Mode.Personal && !l.id.includes('_') && (
                    <MdGroup style={{ marginRight: '4px' }} />
                  )}
                </Pill>
              ))}
            </div>
          ) : null}
        </div>
        <strong className="time">{TimeOnly(occurred, timeZoneId)}</strong>
      </div>
      <div className="descrAndAmounts">
        <div className="descr">
          {description ? (
            <span>{description}</span>
          ) : location ? (
            <span>{location.google?.name}</span>
          ) : (
            ''
          )}
        </div>
        {mode === Mode.Personal ? (
          <div className="amounts">
            <div className="userShare">
              {amount === 0 ? '' : <div className="legendUser" />}
              <div className="amount">
                {amount === 0
                  ? ''
                  : displayCurrencyAndAmount(
                      Math.abs(amount).toString(),
                      currency
                    )}
              </div>
            </div>
          </div>
        ) : (
          <div className="amounts">
            <div className="groupTotal">
              {amount === 0 ? '' : <div className="legendGroup" />}
              <div className="amount">
                {displayCurrencyAndAmount(
                  Math.abs(amount).toString(),
                  currency
                )}
              </div>
            </div>
            <div className="userShare">
              {userAmount === 0 ? '' : <div className="legendUser" />}
              <div className="amount">
                {userAmount === 0
                  ? ''
                  : displayCurrencyAndAmount(
                      Math.abs(userAmount).toString(),
                      currency
                    )}
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledExpense>
  );
};

export default Expense;
