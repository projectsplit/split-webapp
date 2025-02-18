import { useState } from "react";
import { StyledCurrencyOptions } from "./CurrencyOptions.styled";
import { Currency } from "../../types";
import { currencyData } from "../../helpers/openExchangeRates";
import { CurrencyOptionProps } from "../../interfaces";


export default function CurrencyOptions({
  clickHandler
}: CurrencyOptionProps) {
  const [searchItem, setSearchItem] = useState<string>("");
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<Currency[]>(currencyData);

  const handleInputChange = (e: any) => {
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
        <div className="header">
          {" "}
          <strong>Select Currency</strong>
        </div>
        <input
          className="searchBar"
          placeholder="Search"
          onChange={handleInputChange}
          value={searchItem}
        />
      </div>
      {filteredCurrencies.length === 0 && (
        <div className="noResults">No results found</div>
      )}

      {filteredCurrencies.map((currency, index) => (
        <div
          key={index}
          className={`currencyOption ${localStorage.getItem("currency") === currency.symbol
              ? "clicked"
              : ""
            }`}
          onClick={() => clickHandler(currency.symbol)}
        >
          <div className={currency.flagClass} />
          <div className="currency">
            <div className="currencyTicker">
              <strong>{currency.symbol}</strong>
            </div>
            <div className="currencyDescr">{currency.name}</div>
          </div>
        </div>
      ))}
    </StyledCurrencyOptions>
  );
}
