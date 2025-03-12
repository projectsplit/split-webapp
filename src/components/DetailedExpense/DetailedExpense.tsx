import { StyledDetailedExpense } from "./DetailedExpense.Styled";
import InfoBox from "./InfoBox/InfoBox";
import MembersInfoBox from "./MembersInfoBox/MembersInfoBox";
import { EditorContent } from "./EditorContent/EditorContent";
import Comment from "./Comment/Comment";
import IonIcon from "@reacticons/ionicons";
import { HeadingNode } from "@lexical/rich-text";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import MyButton from "../MyButton/MyButton";
import { DetailedExpenseProps } from "../../interfaces";
import Pill from "../Pill/Pill";

export default function DetailedExpense({
  openDetailedExpense,
  amount,
  currency,
  description,
  labels,
  location,
  occured,
  payments,
  shares,
  timeZoneId,
  userAmount,
  creator
}: DetailedExpenseProps) {
  const theme = {
    text: {
      bold: "editor-bold",
    },
  };

  const onError = (error: Error): void => {
    console.error(error);
  };
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode],
  };
  console.log(description)
  return (
    <StyledDetailedExpense>
      <div className="descriptionAndCloseButton">
        <div />
        <div className="descreption">{description}</div>
        <div className="closeButton" onClick={() => (openDetailedExpense.value = false)}>
          <IonIcon name="close-outline" className="close" />
        </div>
      </div>
      <div className="dateAndLabels">
        <div className="labels">
          <div className="dummyDiv" />
          <Pill title="food" color="blue" closeButton={false} fontSize="18px" />
          <Pill title="rent" color="red" closeButton={false} fontSize="18px" />
          <Pill
            title="drinks"
            color="yellow"
            closeButton={false}
            fontSize="18px"
          />
          <div className="dummyDiv" />
        </div>
        <div className="date">08 Jan 20:40</div>
      </div>

      <div className="total">{displayCurrencyAndAmount("23654", "EUR")}</div>
      <MembersInfoBox />
      <MembersInfoBox />
      <InfoBox>show map box box</InfoBox>
      <div className="editDeleteButtons">
        <div className="dummyDiv" />
        <div className="buttons">
          <div className="editButton">
            <MyButton onClick={() => console.log("edit")}>
              <AiFillEdit className="icon" />
              Edit
            </MyButton>
          </div>
          <div className="deleteButton">
            <MyButton onClick={() => console.log("delete")}>
              <AiFillDelete className="icon" />
              Delete
            </MyButton>
          </div>
        </div>
        <div className="dummyDiv" />
      </div>
      <div className="createdBy">
        Created by Kristiani on Wednesday, April 19, 2023 at 15.30
      </div>

      <div className="commentSection">
        <div className="comments">
          <Comment />
          <Comment />
        </div>
        <div>
          <LexicalComposer initialConfig={initialConfig}>
            <EditorContent />
          </LexicalComposer>
        </div>
      </div>
    </StyledDetailedExpense>
  );
}
