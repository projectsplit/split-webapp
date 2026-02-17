import { TiGroup } from "react-icons/ti";
import { StyledNonGroupMenu } from "./NonGroupMenu.styled";
import { TransferState } from "../formStore/formStoreTypes";
import { Signal } from "@preact/signals-react";

interface NonGroupMenuProps {
  $noReceiverSelected?: boolean;
  $isSamePersonError: boolean;
  data: Pick<TransferState, 'currencySymbol' | 'errors'>;
  actions: Pick<TransferState, 'setError'>;
  fromHome: boolean | undefined;
  nonGroupMenu: Signal<{ attribute: string; menu: string | null; senderId: string; receiverId: string; senderName: string; receiverName: string; }>
  noReceiverSelected: boolean;
}

export const NonGroupMenu = ({ $noReceiverSelected, $isSamePersonError, data, actions, fromHome, nonGroupMenu, noReceiverSelected }: NonGroupMenuProps) => {

  return (
    <StyledNonGroupMenu $noReceiverSelected={$noReceiverSelected} $isSamePersonError={$isSamePersonError}>
      <div className="nonGroupMenu">
        <div className="textAndButton">
          <div className="text"> Sent from </div>
          <div
            className="button senderButton"
            onClick={() => {
              nonGroupMenu.value = {
                ...nonGroupMenu.value,
                attribute: "sender",
                menu: "nonGroupTransfer",
              };
              actions.setError('showSamePersonError', false);
              actions.setError('isSameUserError', "");
              actions.setError('showIdError', false);
            }}
          >
            {nonGroupMenu.value.senderName}
          </div>{" "}
        </div>
        <div className="textAndButton">
          <div className="text"> and received by </div>
          <div
            className="button receiverButton"
            onClick={() => {
              nonGroupMenu.value = {
                ...nonGroupMenu.value,
                attribute: "receiver",
                menu: "nonGroupTransfer",
              };
              actions.setError('showSamePersonError', false);
              actions.setError('isSameUserError', "");
              actions.setError('showIdError', false);
            }}
          >
            {nonGroupMenu.value.receiverName === ""
              ? "select user"
              : nonGroupMenu.value.receiverName}
          </div>
        </div>
      </div>
      <span className="errorMsg">
        {data.errors.showAmountError &&
          data.errors.recipientError &&
          noReceiverSelected
          ? data.errors.recipientError
          : ""}
        {data.errors.showAmountError && data.errors.isSameUserError
          ? data.errors.isSameUserError
          : ""}
        {data.errors.showIdError && data.errors.idErrorMessage ? data.errors.idErrorMessage : ""}
      </span>
      {fromHome && <div className="buttonWrapper">
        <div
          className="groupButton"
          onClick={() => {
            actions.setError('showAmountError', false);
            actions.setError('showIdError', false);
            nonGroupMenu.value = {
              ...nonGroupMenu.value,
              attribute: "groups",
              menu: "nonGroupTransfer",
            };
          }}
        >
          <TiGroup className="groupIcon" />
          <span className="descr">Groups</span>
        </div>
      </div>}
    </StyledNonGroupMenu>
  );
};