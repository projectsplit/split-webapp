import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineGroupOff } from "react-icons/md";
import { GoArchive } from "react-icons/go";

export default function NoGroupsFound({ activeGroupCatAsState, filteredGroups, keyword }: { activeGroupCatAsState: any, filteredGroups: any, keyword: string }) {
  return (
    <>
      {activeGroupCatAsState.value === "Active" && filteredGroups?.length === 0 && keyword.length !== 0 ? (
        <div className="noData">
          <div className="msg">No active groups found based on current search 🤔</div>
          <FaMagnifyingGlass className="icon" />
        </div>
      ) : activeGroupCatAsState.value === "Active" && filteredGroups?.length === 0 ? (
        <div className="noData">
          <div className="msg">There are currently no active groups </div>
          <MdOutlineGroupOff className="icon" />
        </div>
      ) : activeGroupCatAsState.value === "Archived" && filteredGroups?.length === 0 && keyword.length !== 0 ? (
        <div className="noData">
          <div className="msg">No archived groups found based on current search 🤔</div>
          <FaMagnifyingGlass className="icon" />
        </div>
      ) : activeGroupCatAsState.value === "Archived" && filteredGroups?.length === 0 ? (
        <div className="noData">
          <div className="msg">There are currently no archived groups</div>
          <GoArchive className="icon" />
        </div>
      ) :
        null}</>
  )
}