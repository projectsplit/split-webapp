import { useLayoutEffect, useRef, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import { StyledCurrencyOptions } from './CurrencyOptions.styled';
import { Currency } from '../../../types';
import { currencyData } from '../../../helpers/openExchangeRates';
import { CurrencyOptionProps } from '../../../interfaces';
import CurrencyFlag from '../../CurrencyFlag/CurrencyFlag';
import { centerSelectedOption } from '@/helpers/centerSelectedOption';

export default function CurrencyOptions({
  clickHandler,
  selectedCurrency,
}: CurrencyOptionProps) {
  const [searchItem, setSearchItem] = useState<string>('');
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<Currency[]>(currencyData);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    centerSelectedOption(containerRef.current, selectedRef.current);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = currencyData.filter(
      (currency) =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCurrencies(filteredItems);
  };

  return (
    <StyledCurrencyOptions height="75vh">
      <div className="headerAndSearchbar">
        <div className="sheetHandle" />
        <div className="header">Select currency</div>
        <input
          className="searchBar"
          placeholder="Search"
          onChange={handleInputChange}
          value={searchItem}
        />
      </div>

      {filteredCurrencies.length === 0 ? (
        <div className="noResults">No results found</div>
      ) : (
        <div className="currencyList" ref={containerRef}>
          {filteredCurrencies.map((currency) => {
            const isSelected =
              (!selectedCurrency && currency.symbol === 'USD') ||
              selectedCurrency === currency.symbol;

            return (
              <div
                key={currency.symbol}
                ref={isSelected ? selectedRef : undefined}
                className={`currencyOption ${isSelected ? 'clicked' : ''}`}
                onClick={() => clickHandler(currency.symbol)}
              >
                <CurrencyFlag code={currency.symbol} />
                <div className="currency">
                  <div className="currencyTicker">{currency.symbol}</div>
                  <div className="currencyDescr">
                    <span className="currencyName">{currency.name}</span>
                  </div>
                </div>
                {isSelected && (
                  <IonIcon name="checkmark-outline" className="currencyCheck" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </StyledCurrencyOptions>
  );
}
