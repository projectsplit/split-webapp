import { displayCurrencyAndAmount } from "./displayCurrencyAndAmount";

  export const joinAmounts = (entries: [string, number][]): JSX.Element => {
    const amounts = entries.map(([currency, amount]) =>
      displayCurrencyAndAmount(Math.abs(amount).toString(), currency)
    );
    if (amounts.length === 1) {
      return <>{amounts[0]}</>;
    } else if (amounts.length === 2) {
      return (
        <>
          {amounts[0]}
          <span style={{ color: '#a3a3a3' }}> and </span>
          {amounts[1]}
        </>
      );
    } else {
      const result: React.ReactNode[] = [];
      for (let i = 0; i < amounts.length; i++) {
        if (i > 0 && i < amounts.length - 1) {
          result.push(
          <span style={{ color: '#a3a3a3' }} key={`comma-${i}`}>
          {', '}
        </span>)
        }
        if (i === amounts.length - 1) {
          result.push(
            <span style={{ color: '#a3a3a3' }} key={`and-${i}`}>
              {' and '}
            </span>
          );
        }
        result.push(amounts[i]);
      }
      return <>{result}</>;
    }
  };
