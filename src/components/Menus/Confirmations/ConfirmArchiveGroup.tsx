import { ConfirmArchiveGroupProps } from "../../../interfaces";
import Confirmation from "./Confirmation";

export default function ConfirmArchiveGroup({
  menu,
}: ConfirmArchiveGroupProps) {
  const handleConfirm = () => {
    console.log("confirm");
  };

  return (
    <Confirmation menu={menu} isLoading={false} onClick={handleConfirm}>
      <div className="archiveGroupText">
        <span>
          Are you sure you want to archive this group? Once archived, members
          won’t be able to add, edit, or delete expenses, transfers and settle
          debts.{" "}
        </span>
        <span> You can always un-archive the group later if needed. </span>
        <span className="handshake">🤝</span>
      </div>
    </Confirmation>
  );
}
