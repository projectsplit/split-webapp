import { StyledDetailedExpense } from "./DetailedExpense.Styled";
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
import { DateOnly, TimeOnly } from "../../helpers/timeHelpers";
import MapsInfoBox from "./MapsInfoBox/MapsInfoBox";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import { useSignal } from "@preact/signals-react";
import DeleteExpenseAnimation from "../Menus/MenuAnimations/DeleteExpenseAnimation";
import { MdLocationOn } from "react-icons/md";
import { GeoLocation } from "../../types";

export default function DetailedExpense({
  selectedExpense,
  amount,
  currency,
  description,
  labels,
  location,
  occurred,
  payments,
  shares,
  timeZoneId,
  userAmount,
  creator,
  created,
  members,
  errorMessage,
}: DetailedExpenseProps) {

  const googleIdUrl = "https://www.google.com/maps/place/?q=place_id:";
  const googleCoordsUrl = "https://www.google.com/maps/search/?api=1&query=";

  const theme = {
    text: {
      bold: "editor-bold",
    },
  };

  const menu = useSignal<string | null>(null);

  const onError = (error: Error): void => {
    console.error(error);
  };
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode],
  };

  const googleMapsUrlBuilder = (location: GeoLocation | undefined) => {
    if (location?.google?.id) {
      return `${googleIdUrl}${location?.google?.id}`;
    } else {
      return `${googleCoordsUrl}${location?.coordinates.latitude},${location?.coordinates.latitude}`;
    }
  };
const googleurl = googleMapsUrlBuilder(location)
  return (
    <StyledDetailedExpense>
      <div className="descriptionAndCloseButton">
        <div />
        <div className="descreption">
          {description ? <span>"{description}"</span> : ""}
        </div>
        <div
          className="closeButton"
          onClick={() => (selectedExpense.value = null)}
        >
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
        <div className="date">
          Occurred {DateOnly(occurred, timeZoneId)}{" "}
          {TimeOnly(occurred, timeZoneId)}
        </div>
      </div>

      <div className="total">
        {displayCurrencyAndAmount(amount.toString(), currency)}
      </div>
      <MembersInfoBox
        transactions={shares}
        areShares={true}
        currency={currency}
        members={members}
      />
      <MembersInfoBox
        transactions={payments}
        areShares={false}
        currency={currency}
        members={members}
      />
      <MapsInfoBox location={location} googleUrl={googleurl}/>

      <div className="editDeleteButtons">
        <div className="dummyDiv" />
        <div className="buttons">
          <div className="editButton">
            <MyButton onClick={() => console.log("edit")}>
              <div className="buttonChildren">
                <AiFillEdit className="icon" />
                <span>Edit</span>
              </div>
            </MyButton>
          </div>
          <div className="deleteButton">
            <MyButton
              onClick={() => (menu.value = "deleteExpense")}
              variant="secondary"
            >
              <div className="buttonChildren">
                <AiFillDelete className="icon" />
                <span>Delete</span>
              </div>
            </MyButton>
          </div>
        </div>
        <div className="dummyDiv" />
      </div>
      <div className="createdBy">
        Created by {members.find((x) => x.id === creator)?.name} on{" "}
        {DateOnly(created, timeZoneId)} at {TimeOnly(created, timeZoneId)}
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
      <MenuAnimationBackground menu={menu} />
      <DeleteExpenseAnimation
        menu={menu}
        description={description}
        selectedExpense={selectedExpense}
        errorMessage={errorMessage}
      />
    </StyledDetailedExpense>
  );
}
