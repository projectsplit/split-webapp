import { RiWifiOffLine } from "react-icons/ri";
import MyButton from "../../components/MyButton/MyButton";
import { MdOutlineGroupOff, MdOutlineTimerOff } from "react-icons/md";
import { LuServerOff } from "react-icons/lu";
import { GroupErrorProps } from "../../interfaces";

const GroupError = ({ groupError }:GroupErrorProps) => {
  if (groupError?.value?.code === "ERR_NETWORK") {
    return (
      <div className="group">
        <div className="noData">
          <div className="msg">
            Unable to connect to the server. Please check your connection
          </div>
          <RiWifiOffLine className="icon" />
        </div>
        <div className="retry">
          <MyButton onClick={()=> window.location.reload()}>Retry</MyButton>
        </div>
      </div>
    );
  }

  if (groupError?.value?.code === "ERR_CANCELED") {
    return (
      <div className="group">
        <div className="noData">
          <div className="msg">
            Request timed out or was canceled. Please try again
          </div>
          <MdOutlineTimerOff className="icon" />
        </div>
        <div className="retry">
          <MyButton onClick={()=> window.location.reload()}>Retry</MyButton>
        </div>
      </div>
    );
  }

  if (
    groupError?.value &&
    typeof groupError.value.status === "number" &&
    groupError.value.status >= 500
  ) {
    return (
      <div className="group">
        <div className="noData">
          <div className="msg">Server error. Please try again later</div>
          <LuServerOff className="icon" />
        </div>
        <div className="retry">
          <MyButton onClick={()=>window.location.reload()}>Retry</MyButton>
        </div>
      </div>
    );
  }

  if (
    groupError?.value &&
    typeof groupError.value.status === "number" &&
    groupError.value.status === 404
  ) {
    return (
      <div className="group">
        <div className="noData">
          <div className="msg">No Group was found</div>
          <MdOutlineGroupOff className="icon" />
        </div>
        <div className="bottomMenu" />
      </div>
    );
  }

  return null;
};

export default GroupError;
