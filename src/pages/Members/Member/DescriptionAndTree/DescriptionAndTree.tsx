import { useOutletContext } from "react-router-dom";
import Tree from "../../../../components/Tree/Tree";
import { DescriptionAndTreeProps } from "../../../../interfaces";
import { MemberDetailedDescription } from "../MemberDetailedDescription/MemberDetailedDescription";
import { StyledDescriptionAndTree } from "./DescriptionAndTree.Styled";
import { TransactionType } from "@/types";


export const DescriptionAndTree = ({
  memberTransactions,
  pendingTransactions,
  isLogedUser,
  id,
  name,
  isOwed,
  showTree,
  treeItems,
  participants,
  userOrMemberId,
  transactionType
}: DescriptionAndTreeProps) => {

  const conditionForTree = (showTree && transactionType === "Group") || (showTree && isLogedUser);
  return (
    <StyledDescriptionAndTree>
      <MemberDetailedDescription
        memberTransactions={memberTransactions}
        pendingTransactions={pendingTransactions}
        isOwed={isOwed}
        isLogedUser={isLogedUser}
        id={id}
        name={name}
        participants={participants}
        userOrMemberId={userOrMemberId}
        transactionType={transactionType}
      />
      {conditionForTree && <Tree items={treeItems} />}

    </StyledDescriptionAndTree>
  );
};
