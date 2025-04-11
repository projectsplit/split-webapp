import { useNavigate, useOutletContext } from "react-router-dom";
import { ConfirmArchiveGroupProps } from "../../../interfaces";
import Confirmation from "./Confirmation";
import { useArchiveGroup } from "../../../api/services/useArchiveGroup";
import { Signal, useSignal } from "@preact/signals-react";

export default function ConfirmUnArchiveGroup({
  menu,
  groupId,
  openGroupOptionsMenu
}: ConfirmArchiveGroupProps) {
  const noGroupFoundError = useSignal<string>("");
  const navigate = useNavigate();
  const { activeGroupCatAsState } = useOutletContext<{
    activeGroupCatAsState: Signal<string>;
  }>();

  const { mutate: archiveGroup, isPending } = useArchiveGroup(
    groupId,
    noGroupFoundError,
    menu
  );

  const handleConfirm = () => {
    archiveGroup(false);
    openGroupOptionsMenu.value = false;
    activeGroupCatAsState.value = "Active";
    navigate("/groups");
  };

  return (
    <Confirmation
      menu={menu}
      isLoading={isPending}
      onClick={handleConfirm}
      header={"Confirmation"}
    >
      <div className="archiveGroupText">
        <span>Would you like to un-archive this group? </span>
      </div>
    </Confirmation>
  );
}
