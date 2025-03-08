import IonIcon from "@reacticons/ionicons";
import { RenderBothScenariosProps, RenderScenariosProps, RenderSettledProps } from "../../../../interfaces";
import { DescriptionAndTree } from "../DescriptionAndTree/DescriptionAndTree";

export const RenderOwedOnly = ({
  memberTransactions,
  pendingTransactions,
  isUser,
  memberId,
  name,
  showTree,
  treeItems,
  members
}: RenderScenariosProps) => {
  return (
    <div className="isOwed">
      <DescriptionAndTree
        memberTransactions={memberTransactions}
        pendingTransactions={pendingTransactions}
        isUser={isUser}
        memberId={memberId}
        name={name}
        isOwed={true}
        showTree={showTree}
        treeItems={treeItems}
        members={members}
      />
    </div>
  );
};

export const RenderOwesOnly = ({
  memberTransactions,
  pendingTransactions,
  isUser,
  memberId,
  name,
  showTree,
  treeItems,
  members
}: RenderScenariosProps) => {
  return (
    <div className="owes">
      <DescriptionAndTree
        memberTransactions={memberTransactions}
        pendingTransactions={pendingTransactions}
        isUser={isUser}
        memberId={memberId}
        name={name}
        isOwed={false}
        showTree={showTree}
        treeItems={treeItems}
        members={members}
      />
    </div>
  );
};

export const RenderSettled = ({ isUser, name }: RenderSettledProps) => {
  return (
    <div className="settled">
      {isUser ? (
        <div>
          <strong>You</strong>&nbsp;<span className="are">are</span>
        </div>
      ) : (
        <div>
          <strong>{name}</strong>&nbsp;<span className="is">is</span>
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
  isUser,
  memberId,
  name,
  doNotshowTreeWhenMemberIsOwed,
  doNotshowTreeWhenMemberOwes,
  memberIsOwedItems,
  memberOwesItems,
  members
}: RenderBothScenariosProps) => {
  const showOwedFirst =
    !doNotshowTreeWhenMemberIsOwed && doNotshowTreeWhenMemberOwes;

  if (!showOwedFirst) {
    return (
      <div className="owesAndIsOwed">
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isUser={isUser}
          memberId={memberId}
          name={name}
          isOwed={false}
          showTree={!doNotshowTreeWhenMemberOwes}
          treeItems={memberOwesItems}
          members={members}
        />
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isUser={isUser}
          memberId={memberId}
          name={name}
          isOwed={true}
          showTree={!doNotshowTreeWhenMemberIsOwed}
          treeItems={memberIsOwedItems}
          members={members}
        />
      </div>
    );
  } else if (showOwedFirst) {
    return (
      <div className="owesAndIsOwed">
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isUser={isUser}
          memberId={memberId}
          name={name}
          isOwed={true}
          showTree={!doNotshowTreeWhenMemberIsOwed}
          treeItems={memberIsOwedItems}
          members={members}
        />
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isUser={isUser}
          memberId={memberId}
          name={name}
          isOwed={false}
          showTree={!doNotshowTreeWhenMemberOwes}
          treeItems={memberOwesItems}
          members={members}
        />
      </div>
    );
  } else {
    return (
      <div className="owesAndIsOwed">
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isUser={isUser}
          memberId={memberId}
          name={name}
          isOwed={true}
          showTree={!doNotshowTreeWhenMemberIsOwed}
          treeItems={memberIsOwedItems}
          members={members}
        />
        <DescriptionAndTree
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isUser={isUser}
          memberId={memberId}
          name={name}
          isOwed={false}
          showTree={!doNotshowTreeWhenMemberOwes}
          treeItems={memberOwesItems}
          members={members}
        />
      </div>
    );
  }
};
