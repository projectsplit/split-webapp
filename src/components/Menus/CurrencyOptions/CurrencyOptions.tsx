import { useState } from "react";
import { StyledCurrencyOptions } from "./CurrencyOptions.styled";
import { Currency } from "../../../types";
import { currencyData } from "../../../helpers/openExchangeRates";
import { CurrencyOptionProps } from "../../../interfaces";

export default function CurrencyOptions({
  clickHandler,
  userInfo,
  visualCurrency,
}: CurrencyOptionProps) {
  const [searchItem, setSearchItem] = useState<string>("");
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<Currency[]>(currencyData);

  const userCurrency = userInfo?.currency;

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

  const onClickHandler = (currencySymbol: string) => {
    clickHandler(currencySymbol);
    const newCurrency = filteredCurrencies.find((c) => c.symbol === currencySymbol);
    visualCurrency.value = newCurrency;
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
          className={`currencyOption ${
            (!userCurrency && currency.symbol === "USD") ||
            userCurrency === currency.symbol
              ? "clicked"
              : ""
          }`}
          onClick={() => onClickHandler(currency.symbol)}
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
