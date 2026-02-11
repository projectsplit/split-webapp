import { MdGroupOff } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { IoIosArchive } from "react-icons/io";
import { StyledOptionsButtons } from "./OptionsButtons.styled";

export default function OptionsButtons({ activeGroupCatAsState, generalRef, setKeyword, showSearchBar }: { activeGroupCatAsState: any, generalRef: any, setKeyword: any, showSearchBar: any }) {
  return (
    <StyledOptionsButtons $groupState={activeGroupCatAsState.value}>
      <div className="buttonWrapper" ref={generalRef}>
        {activeGroupCatAsState.value === "NonGroup" && (
          <div className="activeBar" />
        )}
        <div
          className="button"
          onClick={() => { setKeyword(""); (activeGroupCatAsState.value = "NonGroup"); showSearchBar.value = false }}
        >
          <MdGroupOff className="groupIcon non" />
          <span className="descr">Non</span>
          <span className="descr">Group</span>
        </div>
      </div>
      <div className="buttonWrapper" ref={generalRef}>
        {activeGroupCatAsState.value === "Active" && (
          <div className="activeBar" />
        )}
        <div
          className="button"
          onClick={() => { setKeyword(""); (activeGroupCatAsState.value = "Active"); showSearchBar.value = false }}
        >
          <TiGroup className="groupIcon active" />
          <span className="descr">Active</span>
          <span className="descr">Groups</span>
        </div>
      </div>

      <div className="buttonWrapper" ref={generalRef}>
        {activeGroupCatAsState.value === "Archived" && (
          <div className="activeBar" />
        )}

        <div
          className="button"
          onClick={() => { setKeyword(""); (activeGroupCatAsState.value = "Archived"); showSearchBar.value = false }}
        >
          <IoIosArchive className="groupIcon archived" />
          <span className="descr">Archived </span>
          <span className="descr">Groups</span>
        </div>
      </div>
    </StyledOptionsButtons>)
}