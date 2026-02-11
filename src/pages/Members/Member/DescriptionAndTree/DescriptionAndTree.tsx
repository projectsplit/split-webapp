import Tree from "../../../../components/Tree/Tree";
import { DescriptionAndTreeProps } from "../../../../interfaces";
import { MemberDetailedDescription } from "../MemberDetailedDescription/MemberDetailedDescription";
import { StyledDescriptionAndTree } from "./DescriptionAndTree.Styled";

export const DescriptionAndTree = ({
  memberTransactions,
    pendingTransactions,
    isLogedUser,
    id,
    name,
    isOwed,
    showTree,
    treeItems,
    participants
  }: DescriptionAndTreeProps) => {
    

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
        />
        {showTree && <Tree items={treeItems} />}
   
      </StyledDescriptionAndTree>
    );
  };

  