import { useNavigate, useOutletContext } from "react-router-dom";
import { ConfirmArchiveGroupProps } from "../../../interfaces";
import Confirmation from "./Confirmation";
import { useArchiveGroup } from "../../../api/auth/CommandHooks/useArchiveGroup";
import { Signal, useSignal } from "@preact/signals-react";

export default function ConfirmUnArchiveGroup({
  menu,
  groupId,
  openGroupOptionsMenu,
  navigateToGroups
}: ConfirmArchiveGroupProps) {
  const noGroupFoundError = useSignal<string>("");
  const navigate = useNavigate();
  const { activeGroupCatAsState, groupIsArchived } = useOutletContext<{
    activeGroupCatAsState: Signal<string>;
    groupIsArchived: Signal<boolean>
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
    if (navigateToGroups) {
      navigate("/shared");
    }
    groupIsArchived.value = false;
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
