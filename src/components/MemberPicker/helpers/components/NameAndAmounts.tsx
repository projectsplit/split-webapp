import { FaCheck } from "react-icons/fa";
import { NameAndAmountsProps } from "../../../../interfaces";
import { displayCurrencyAndAmount } from "../../../../helpers/displayCurrencyAndAmount";

export const NameAndAmounts = ({
  category,
  m,
  onClick,
  currency
}: NameAndAmountsProps) => {

  return (
    <>
      {category.value === "Shares"||category.value==='Percentages' ? (
        <div className="textAndCheck">
          
          <div className="tick-cube" onClick={onClick}>
            <FaCheck className="checkmark" />
          </div>
          <div className="nameAndAmount">
            <div className="name"> {m.name}</div>
            <div className="amount">{
            displayCurrencyAndAmount(m.actualAmount === '' ? '0' : m.actualAmount,currency)}</div>
          </div>
        </div>
      ) : (
        <div className="textAndCheck">
          <div className="tick-cube" onClick={onClick}>
            <FaCheck className="checkmark" />
          </div>
          {m.name}
        </div>
      )}
    </>
  );
};

export default NameAndAmounts;
