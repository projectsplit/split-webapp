import Tree from "../../../../components/Tree/Tree";
import { DescriptionAndTreeProps } from "../../../../interfaces";
import { MemberDetailedDescription } from "../MemberDetailedDescription/MemberDetailedDescription";
import { StyledDescriptionAndTree } from "./DescriptionAndTree.Styled";

export const DescriptionAndTree = ({
  memberTransactions,
    pendingTransactions,
    isLogedUser,
    memberId,
    name,
    isOwed,
    showTree,
    treeItems,
    members
  }: DescriptionAndTreeProps) => {
    

    return (
      <StyledDescriptionAndTree>
        <MemberDetailedDescription
          memberTransactions={memberTransactions}
          pendingTransactions={pendingTransactions}
          isOwed={isOwed}
          isLogedUser={isLogedUser}
          memberId={memberId}
          name={name}
          members={members}
        />
        {showTree && <Tree items={treeItems} />}
   
      </StyledDescriptionAndTree>
    );
  };

  