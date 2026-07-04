import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { StyledCurrencyOptions } from './CurrencyOptions.styled';
import { currencyData } from '../../../helpers/openExchangeRates';
export default function CurrencyOptions({ clickHandler, selectedCurrency, }) {
    const [searchItem, setSearchItem] = useState('');
    const [filteredCurrencies, setFilteredCurrencies] = useState(currencyData);
    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        const filteredItems = currencyData.filter((currency) => currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currency.symbol.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredCurrencies(filteredItems);
    };
    return (_jsxs(StyledCurrencyOptions, { height: "75vh", children: [_jsxs("div", { className: "headerAndSearchbar", children: [_jsxs("div", { className: "header", children: [' ', _jsx("strong", { children: "Select Currency" })] }), _jsx("input", { className: "searchBar", placeholder: "Search", onChange: handleInputChange, value: searchItem })] }), filteredCurrencies.length === 0 && (_jsx("div", { className: "noResults", children: "No results found" })), filteredCurrencies.map((currency, index) => (_jsxs("div", { className: `currencyOption ${(!selectedCurrency && currency.symbol === 'USD') ||
                    selectedCurrency === currency.symbol
                    ? 'clicked'
                    : ''}`, onClick: () => clickHandler(currency.symbol), children: [_jsx("div", { className: currency.flagClass }), _jsxs("div", { className: "currency", children: [_jsx("div", { className: "currencyTicker", children: _jsx("strong", { children: currency.symbol }) }), _jsx("div", { className: "currencyDescr", children: currency.name })] })] }, index)))] }));
}
