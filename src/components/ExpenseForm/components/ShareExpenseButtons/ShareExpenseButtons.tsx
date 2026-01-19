import { Signal } from "@preact/signals-react";
import { StyledShareExpenseButtons } from "./ShareExpenseButtons.styled";
import { PickerMember, User } from "../../../../types";

export const ShareExpenseButtons = ({ isPersonal, amountNumber, nonGroupUsers, adjustParticipants, adjustPayers, fromHome, nonGroupMenu, setMakePersonalClicked }: ShareExpenseButtonsProps) => {
  const showShareExpenseButton =
    isPersonal.value &&
    amountNumber &&
    nonGroupUsers.value.length === 0;


  const showMakePersonal =
    isPersonal.value === false &&
    amountNumber &&
    !(
      adjustParticipants.filter((m) => m.selected).length === 1 &&
      adjustParticipants[0].name === "you" &&
      adjustPayers.filter((m) => m.selected).length === 1 &&
      adjustPayers[0].name === "you"
    );

  return (
    <StyledShareExpenseButtons>
      {showShareExpenseButton && fromHome && nonGroupMenu ? (
        <div className="shareExpenseOption">
          <div
            className="button"
            onClick={() => (nonGroupMenu.value = "nonGroupExpenseUsers")}
          >
            Share Expense{" "}
          </div>
        </div>
      ) : null}
      {showMakePersonal && fromHome && nonGroupMenu ? (
        <div className="shareExpenseOption">
          <div
            className="button"
            onClick={() => {
              setMakePersonalClicked(true);
              isPersonal.value = true;
              nonGroupUsers.value = [];
            }}
          >
            Make Personal{" "}
          </div>
        </div>
      ) : null}
      {amountNumber && nonGroupMenu && !fromHome && adjustPayers.length === 0 && adjustParticipants.length === 0 ? (
        <div className="shareExpenseOption">
          <div
            className="button"
            onClick={() => (nonGroupMenu.value = "nonGroupExpenseUsers")}
          >
            Shared with you and...{" "}
          </div>
        </div>
      ) : null}
    </StyledShareExpenseButtons>
  );
};

interface ShareExpenseButtonsProps {
  isPersonal: Signal<boolean>;
  amountNumber: number;
  nonGroupUsers: Signal<User[]>;
  adjustParticipants: PickerMember[]
  adjustPayers: PickerMember[];
  fromHome: boolean | undefined
  nonGroupMenu: Signal<string | null> | undefined
  setMakePersonalClicked: (value: boolean) => void
}