import { FaCheck } from 'react-icons/fa';
import { NameAndAmountsProps } from '../../../../interfaces';
import { displayCurrencyAndAmount } from '../../../../helpers/displayCurrencyAndAmount';
import { getInitials } from '../../../../helpers/getInitials';

export const NameAndAmounts = ({
  category,
  m,
  onClick,
  currency,
}: NameAndAmountsProps) => {
  const showsSecondaryAmount =
    category.value === 'Shares' || category.value === 'Percentages';

  return (
    <div className="textAndCheck">
      <div className="tick-cube" onClick={onClick}>
        <FaCheck className="checkmark" />
      </div>
      <span
        className={`memberAvatar ${m.name === 'You' || m.name === 'you' ? 'you' : ''}`}
      >
        {getInitials(m.avatarName ?? m.name)}
      </span>
      <div className="nameAndAmount">
        <div className="name">{m.name}</div>
        {showsSecondaryAmount ? (
          <div className="amount">
            {displayCurrencyAndAmount(
              m.actualAmount === '' ? '0' : m.actualAmount,
              currency
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NameAndAmounts;
