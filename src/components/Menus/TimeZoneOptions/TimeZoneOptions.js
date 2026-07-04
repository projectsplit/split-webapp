import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { StyledTimeZoneOptions } from './TimeZoneOptions.styled';
import { timeZones } from '../../../helpers/timeZones';
export default function TimeZoneOptions({ clickHandler, userInfo, }) {
    const [searchItem, setSearchItem] = useState('');
    const [filteredTimeZones, setFilteredTimeZones] = useState(timeZones);
    const timeZone = userInfo?.timeZone;
    const allTimeZones = timeZones;
    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        const filteredItems = allTimeZones.filter((tz) => tz.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredTimeZones(filteredItems);
    };
    return (_jsxs(StyledTimeZoneOptions, { height: "75vh", children: [' ', _jsxs("div", { className: "headerAndSearchbar", children: [_jsxs("div", { className: "header", children: [' ', _jsx("strong", { children: "Select Timezone" })] }), _jsx("input", { className: "searchBar", placeholder: "Search", onChange: handleInputChange, value: searchItem })] }), filteredTimeZones.length === 0 && (_jsx("div", { className: "noResults", children: "No results found" })), filteredTimeZones.map((ft, index) => (_jsx("div", { className: `timeZoneOption ${timeZone === ft ? 'clicked' : ''}`, onClick: () => clickHandler(ft), children: _jsx("div", { className: "timeZone", children: _jsx("div", { className: "timeZoneDescr", children: ft }) }) }, index)))] }));
}
