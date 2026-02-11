import IonIcon from "@reacticons/ionicons";
import { RenderBothScenariosProps, RenderScenariosProps, RenderSettledProps } from "../../../../interfaces";
import { DescriptionAndTree } from "../DescriptionAndTree/DescriptionAndTree";

export const RenderOwedOnly = ({
  memberTransactions,
  pendingTransactions,
  isLogedUser,
  id,
  name,
  showTree,
  treeItems,
  participants,
  userOrMemberId,
  transactionType
}: RenderScenariosProps) => {
  return (
    <div className="isOwed">
      <DescriptionAndTree
        memberTransactions={memberTransactions}
        pendingTransactions={pendingTransactions}
        isLogedUser={isLogedUser}
        id={id}
        name={name}
        isOwed={true}
        showTree={showTree}
        treeItems={treeItems}
        participants={participants}
        userOrMemberId={userOrMemberId}
        transactionType={transactionType}
      />
    </div>
  );
};

export const RenderOwesOnly = ({
  memberTransactions,
  pendingTransactions,
  isLogedUser,
  id,
  name,
  showTree,
  treeItems,
  participants,
  userOrMemberId,
  transactionType
}: RenderScenariosProps) => {
  return (
    <div className="owes">
      <DescriptionAndTree
        memberTransactions={memberTransactions}
        pendingTransactions={pendingTransactions}
        isLogedUser={isLogedUser}
        id={id}
        name={name}
        isOwed={false}
        showTree={showTree}
        treeItems={treeItems}
        participants={participants}
        userOrMemberId={userOrMemberId}
        transactionType={transactionType}
      />
    </div>
  );
};

export const RenderSettled = ({ isLogedUser, name }: RenderSettledProps) => {
  return (
    <div className="settled">
      {isLogedUser ? (
        <div>
          <span className="you">You</span>&nbsp;<span className="are">are</span>
        </div>
      ) : (
        <div>
          <span className="you">{name}</span>&nbsp;<span className="is">is</span>
        </div>
      )}{" "}
      &nbsp;settled
      <IonIcon name="checkmark-sharp" className="checkmark" />
    </div>
  );
};

export const RenderBoth = ({
  memberTransactions,
  pendingTransactions,
  isLogedUser,
  id,
  name,
  doNotshowTreeWhenMemberIsOwed,
  doNotshowTreeWhenMemberOwes,
  memberIsOwedItems,
  memberOwesItems,
  participants,
  userOrMemberId,
  transactionType
}: RenderBothScenariosProps) => {
  const showOwedFirst =
    !doNotshowTreeWhenMemberIsOwed && doNotshowTreeWhenMemberOwes;

  if (!showOwedFirst) {
    return (
      <div className="owesAndIsOwed">
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isLogedUser={isLogedUser}
          id={id}
          name={name}
          isOwed={false}
          showTree={!doNotshowTreeWhenMemberOwes}
          treeItems={memberOwesItems}
          participants={participants}
          userOrMemberId={userOrMemberId}
          transactionType={transactionType}
        />
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isLogedUser={isLogedUser}
          id={id}
          name={name}
          isOwed={true}
          showTree={!doNotshowTreeWhenMemberIsOwed}
          treeItems={memberIsOwedItems}
          participants={participants}
          userOrMemberId={userOrMemberId}
          transactionType={transactionType}
        />
      </div>
    );
  } else if (showOwedFirst) {
    return (
      <div className="owesAndIsOwed">
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isLogedUser={isLogedUser}
          id={id}
          name={name}
          isOwed={true}
          showTree={!doNotshowTreeWhenMemberIsOwed}
          treeItems={memberIsOwedItems}
          participants={participants}
          userOrMemberId={userOrMemberId}
          transactionType={transactionType}
        />
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isLogedUser={isLogedUser}
          id={id}
          name={name}
          isOwed={false}
          showTree={!doNotshowTreeWhenMemberOwes}
          treeItems={memberOwesItems}
          participants={participants}
          userOrMemberId={userOrMemberId}
          transactionType={transactionType}
        />
      </div>
    );
  } else {
    return (
      <div className="owesAndIsOwed">
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isLogedUser={isLogedUser}
          id={id}
          name={name}
          isOwed={true}
          showTree={!doNotshowTreeWhenMemberIsOwed}
          treeItems={memberIsOwedItems}
          participants={participants}
          userOrMemberId={userOrMemberId}
          transactionType={transactionType}
        />
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isLogedUser={isLogedUser}
          id={id}
          name={name}
          isOwed={false}
          showTree={!doNotshowTreeWhenMemberOwes}
          treeItems={memberOwesItems}
          participants={participants}
          userOrMemberId={userOrMemberId}
          transactionType={transactionType}
        />
      </div>
    );
  }
};
