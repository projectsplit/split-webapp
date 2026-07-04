import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition } from 'react-transition-group';
import CurrencyOptions from '../Menus/CurrencyOptions/CurrencyOptions';
import '../../styles/freakflags/freakflags.css';
import { useRef } from 'react';
export default function CurrencyOptionsAnimation({ currencyMenu, clickHandler, selectedCurrency, }) {
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { nodeRef: nodeRef, in: currencyMenu.value === 'currencyOptions', timeout: 100, classNames: "bottomslide", unmountOnExit: true, children: _jsx(CurrencyOptions, { clickHandler: clickHandler, selectedCurrency: selectedCurrency }) }));
}
