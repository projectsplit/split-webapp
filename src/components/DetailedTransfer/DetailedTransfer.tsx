import IonIcon from "@reacticons/ionicons";
import { DetailedTransferProps } from "../../interfaces";
import { StyledDetailedTransfer } from "./DetailedTransfer.styled";
import MyButton from "../MyButton/MyButton";
import { AiFillDelete } from "react-icons/ai";
import { useSignal } from "@preact/signals-react";
import { DateOnly, TimeOnly, YearOnly } from "../../helpers/timeHelpers";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import { HeadingNode } from "@lexical/rich-text";
import MenuAnimationBackground from "../Animations/MenuAnimationBackground";
import DeleteTransferAnimation from "../Animations/DeleteTransferAnimation";

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
  userId,
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
    selectedTransfer.value?.senderId === userMemberId || selectedTransfer.value?.senderId === userId
      ? "#0CA0A0"
      : selectedTransfer.value?.receiverId === userMemberId || selectedTransfer.value?.receiverId === userId
        ? "#D79244"
        : "rgb(54,54,54)";

  const sender = members.find((x) => x.id === selectedTransfer.value?.senderId);
  const receiver = members.find((x) => x.id === selectedTransfer.value?.receiverId);

  const isUserSender = sender?.id === userMemberId || sender?.id === userId;
  const isUserReceiver = receiver?.id === userMemberId || receiver?.id === userId;

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
            {isUserSender ? "You" : sender?.name}
          </span>
        </div>
        <span className="to">to</span>
        <div className="sentTo">
          {isUserReceiver ? "You" : receiver?.name}
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
        {/* {!groupIsArchived ?
        <div>
          <LexicalComposer initialConfig={initialConfig}>
            <EditorContent />
          </LexicalComposer>
        </div>:null} */}
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
