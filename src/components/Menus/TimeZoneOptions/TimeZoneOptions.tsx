import { useState } from "react";
import { StyledTimeZoneOptions } from "./TimeZoneOptions.styled";
import { TimeZoneOptionsProps } from "../../../interfaces";
import { timeZones } from "../../../helpers/timeZones";

export default function TimeZoneOptions({
  clickHandler,
  userInfo,
}: TimeZoneOptionsProps) {
  const [searchItem, setSearchItem] = useState<string>("");
  const [filteredTimeZones, setFilteredTimeZones] = useState<string[]>(
   timeZones
  );
  const timeZone = userInfo?.timeZone;
  const allTimeZones = timeZones;

  const handleInputChange = (e: any) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = allTimeZones.filter((tz: string) =>
      tz.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTimeZones(filteredItems);
  };

  return (
    <StyledTimeZoneOptions height="75vh">
      {" "}
      <div className="headerAndSearchbar">
        <div className="header">
          {" "}
          <strong>Select Timezone</strong>
        </div>
        <input
          className="searchBar"
          placeholder="Search"
          onChange={handleInputChange}
          value={searchItem}
        />
      </div>
      {filteredTimeZones.length === 0 && (
        <div className="noResults">No results found</div>
      )}
      {filteredTimeZones.map((ft, index) => (
        <div
          key={index}
          className={`timeZoneOption ${timeZone === ft ? "clicked" : ""}`}
          onClick={() => clickHandler(ft)}
        >
          <div className="timeZone">
            <div className="timeZoneDescr">{ft}</div>
          </div>
        </div>
      ))}
    </StyledTimeZoneOptions>
  );
}
