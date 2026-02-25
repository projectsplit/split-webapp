import { StyledDetailedExpense } from "./DetailedExpense.Styled";
import MembersInfoBox from "./MembersInfoBox/MembersInfoBox";
import IonIcon from "@reacticons/ionicons";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import MyButton from "../MyButton/MyButton";
import { DetailedExpenseProps } from "../../interfaces";
import Pill from "../Pill/Pill";
import { DateOnly, TimeOnly, YearOnly } from "../../helpers/timeHelpers";
import MapsInfoBox from "./MapsInfoBox/MapsInfoBox";
import MenuAnimationBackground from "../Animations/MenuAnimationBackground";
import { signal, useSignal } from "@preact/signals-react";
import DeleteExpenseAnimation from "../Animations/DeleteExpenseAnimation";
import { Mode, TransactionType, GeoLocation } from "../../types";
import EditExpenseAnimation from "../Animations/EditExpenseAnimation";
import labelColors from "../../labelColors";
import { buildFormExpense, toUser } from "./utils";
import NavigateToExpenseAnimation from "../Animations/NavigateToExpenseAnimation";

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
  timeZoneCoordinates,
  creator,
  created,
  participants,
  errorMessage,
  userMemberId,
  group,
  userId,
  mode
}: DetailedExpenseProps) {
  const expenseType = selectedExpense.value?.transactionType;
  const googleUrl = "https://www.google.com/maps/search/?api=1&query=";
  // const theme = {
  //   text: {
  //     bold: "editor-bold",
  //   },
  // };

  const menu = useSignal<string | null>(null);
  // const onError = (error: Error): void => {
  //   console.error(error);
  // };
  // const initialConfig = {
  //   namespace: "MyEditor",
  //   theme,
  //   onError,
  //   nodes: [HeadingNode],
  // };

  const googleMapsUrlBuilder = (location: GeoLocation | undefined) => {
    if (location?.google?.id) {
      return `${googleUrl}${encodeURIComponent(
        location.google?.name!
      )}&query_place_id=${location.google?.id}`;
    } else {
      return `${googleUrl}${location?.coordinates.latitude},${location?.coordinates.longitude}`;
    }
  };
  const googleMapsUrl = googleMapsUrlBuilder(location);

  const expenseToEdit = buildFormExpense(selectedExpense, mode, group);

  return (
    <StyledDetailedExpense mode={mode}>
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
      {labels.length > 0 ? (
        <div className="dateAndLabels">
          <div className="labelsWrapper">
            <div className="labels">
              {labels.map((l: { text: string; color: string }, i: number) => (
                <Pill
                  key={i}
                  title={l.text}
                  $textColor="#000000c8"
                  color={labelColors[l.color]}
                  closeButton={false}
                  fontSize="18px"
                  $border={false}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div className="total">
        {displayCurrencyAndAmount(amount.toString(), currency)}
      </div>
      {mode !== Mode.Personal && <div>
        <MembersInfoBox
          transactions={shares}
          areShares={true}
          currency={currency}
          participants={participants}
          userMemberId={userMemberId}
          userId={userId}
          expenseType={expenseType}
        />
        <MembersInfoBox
          transactions={payments}
          areShares={false}
          currency={currency}
          participants={participants}
          userMemberId={userMemberId}
          userId={userId}
          expenseType={expenseType}
        />
      </div>}
      {mode === Mode.Personal && !location ? null : <MapsInfoBox location={location} googleMapsUrl={googleMapsUrl} />}

      <div className="editDeleteButtons">
        <div className="dummyDiv" />

        {(group && !group.isArchived) || (mode === Mode.NonGroup && !group) || expenseType === TransactionType.Personal ? (
          <div className="buttons">
            <div className="editButton">
              <MyButton onClick={() => (menu.value = "editExpense")}>
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
        ) : <div>
          <div className= "navigatePrompt">
            <span className="info">{`This is your share from a ${expenseType === TransactionType.Group ? "group" : "non group"} expense`}</span>
            <div className="navigateButton">
              <MyButton
                onClick={() => (menu.value = "navigateToExpense")}
                variant="primary"
              >
                <div className="buttonChildren">

                  <span>{`Go to ${expenseType === TransactionType.Group ? "group" : "non group"} expense`}</span>
                </div>
              </MyButton>
            </div>
          </div>
        </div>}

        <div className="dummyDiv" />
      </div>
      <div className="createdBy">
        Created {mode === Mode.Personal ? "" : participants.find((x) => x.id === creator)?.name} {" "}
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
        {/* {!group.isArchived ? (
          <div>
            <LexicalComposer initialConfig={initialConfig}>
              <EditorContent />
            </LexicalComposer>
          </div>
        ) : null} */}
      </div>
      <MenuAnimationBackground menu={menu} />
      <DeleteExpenseAnimation
        menu={menu}
        description={description}
        selectedExpense={selectedExpense}
        errorMessage={errorMessage}
      />
      <EditExpenseAnimation
        expense={expenseToEdit || null}
        groupId={group?.id}
        timeZoneId={timeZoneId}
        menu={menu}
        selectedExpense={selectedExpense}
        timeZoneCoordinates={timeZoneCoordinates}
        currency={currency}
        groupMembers={group ? signal([...group.members, ...group.guests]) : signal([])}
        nonGroupUsers={signal(participants.map(p => toUser(p)))}
        isPersonal={mode === Mode.Personal ? signal(true) : signal(false)}
        isnonGroupExpense={mode === Mode.NonGroup ? signal(true) : signal(false)}
      />
      <NavigateToExpenseAnimation
        menu={menu}
        selectedExpense={selectedExpense}
        errorMessage={errorMessage}
      />
    </StyledDetailedExpense>
  );
}
