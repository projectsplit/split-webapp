import Tree from "../../../../components/Tree/Tree";
import { DescriptionAndTreeProps } from "../../../../interfaces";
import { MemberDetailedDescription } from "../MemberDetailedDescription/MemberDetailedDescription";
import { StyledDescriptionAndTree } from "./DescriptionAndTree.Styled";
import { Mode } from "@/types";


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
  mode
}: DescriptionAndTreeProps) => {

  const conditionForTree = (showTree && mode === Mode.Group) || (showTree && isLogedUser);
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
        mode={mode}
      />
      {conditionForTree && <Tree items={treeItems} />}

    </StyledDescriptionAndTree>
  );
};
