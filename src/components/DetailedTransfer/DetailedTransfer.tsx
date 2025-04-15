import IonIcon from "@reacticons/ionicons";
import { DetailedTransferProps } from "../../interfaces";
import { StyledDetailedTransfer } from "./DetailedTransfer.styled";
import MyButton from "../MyButton/MyButton";
import { AiFillDelete } from "react-icons/ai";
import { useSignal } from "@preact/signals-react";
import { DateOnly, TimeOnly, YearOnly } from "../../helpers/timeHelpers";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EditorContent } from "../DetailedExpense/EditorContent/EditorContent";

import { HeadingNode } from "@lexical/rich-text";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import DeleteTransferAnimation from "../Menus/MenuAnimations/DeleteTransferAnimation";

export default function DetailedTransfer({
  selectedTransfer,
  amount,
  created,
  creator,
  currency,
  occurred,
  timeZoneId,
  userMemberId,
  members,
  errorMessage,
  groupIsArchived,
}: DetailedTransferProps) {
  const menu = useSignal<string | null>(null);

  const onError = (error: Error): void => {
    console.error(error);
  };
  const theme = {
    text: {
      bold: "editor-bold",
    },
  };
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode],
  };

  const outlineColor =
    selectedTransfer.value?.senderId === userMemberId
      ? "#0CA0A0"
      : selectedTransfer.value?.receiverId === userMemberId
      ? "#D79244"
      : "rgb(54,54,54)";

  return (
    <StyledDetailedTransfer $outlineColor={outlineColor}>
      <div className="headlineAndClose">
        <div className="head"></div>
        <div
          className="closeButton"
          onClick={() => (selectedTransfer.value = null)}
        >
          <IonIcon name="close-outline" className="close" />
        </div>
      </div>

      <div className="total">
        <strong>{displayCurrencyAndAmount(amount.toString(), currency)}</strong>
      </div>
      <div className="transfer">
        <div className="sentFrom">
          <span>Sent from</span>&nbsp;
          <span className="name">
            {
              members.find((x) => x.id === selectedTransfer.value?.senderId)
                ?.name
            }
          </span>
        </div>
        <span className="to">to</span>
        <div className="sentTo">
          {
            members.find((x) => x.id === selectedTransfer.value?.receiverId)
              ?.name
          }
        </div>
        <div className="descr">
          {selectedTransfer.value?.description
            ? `“ ${selectedTransfer.value?.description} ”`
            : ""}
        </div>
      </div>

      {!groupIsArchived ? (
        <div className="deleteButton">
          <MyButton onClick={() => (menu.value = "deleteTransfer")}>
            <div className="buttonChildren">
              <AiFillDelete className="icon" />
              <span>Delete</span>
            </div>
          </MyButton>
        </div>
      ) : null}

      <div className="createdBy">
        Created by {members.find((x) => x.id === creator)?.name}{" "}
        {DateOnly(occurred, timeZoneId) === "Today" ||
        DateOnly(occurred, timeZoneId) === "Yesterday"
          ? DateOnly(created, timeZoneId)
          : "on" +
            " " +
            DateOnly(occurred, timeZoneId) +
            " " +
            YearOnly(occurred, timeZoneId)}{" "}
        at {TimeOnly(created, timeZoneId)}
      </div>
      <div className="date">
        Occurred{" "}
        {DateOnly(occurred, timeZoneId) === "Today" ||
        DateOnly(occurred, timeZoneId) === "Yesterday"
          ? DateOnly(occurred, timeZoneId)
          : "on" +
            " " +
            DateOnly(occurred, timeZoneId) +
            " " +
            YearOnly(occurred, timeZoneId)}{" "}
        at {TimeOnly(occurred, timeZoneId)}
      </div>
      <div className="commentSection">
        <div className="comments">
          {/* <Comment />
          <Comment /> */}
        </div>
        {!groupIsArchived ?
        <div>
          <LexicalComposer initialConfig={initialConfig}>
            <EditorContent />
          </LexicalComposer>
        </div>:null}
      </div>
      <MenuAnimationBackground menu={menu} />
      <DeleteTransferAnimation
        menu={menu}
        selectedTransfer={selectedTransfer}
        errorMessage={errorMessage}
      />
    </StyledDetailedTransfer>
  );
}
