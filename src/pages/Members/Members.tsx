import { StyledMembers } from "./Members.styled";
import useDebts from "../../hooks/useDebts";
import { useOutletContext, useParams } from "react-router-dom";
import { useMemo } from "react";
import { groupTransactions } from "../../helpers/groupTransactions";
import { Group, Member, TruncatedMember, UserInfo } from "../../types";
import { useSignal } from "@preact/signals-react";
import MenuAnimationBackground from "../../components/MenuAnimations/MenuAnimationBackground";
import MemberFC from "./Member/MemberFC";
import Spinner from "../../components/Spinner/Spinner";
import SettleUpAnimation from "../../components/MenuAnimations/SettleUpAnimation";

export default function Members() {
  const memberIdSelectedToSettleUp = useSignal<string>("");
  const menu = useSignal<string | null>(null);
  const { groupid } = useParams();
  const { userInfo, group } = useOutletContext<{ userInfo: UserInfo, group: Group }>();
  const { data: debts, isFetching } = useDebts(groupid);

  if (!userInfo || !group) {
    return <Spinner/>;
  }
  const members = group?.members;
  const guests = group?.guests;
  const userMemberId = members?.find((m) => m.userId === userInfo.userId)?.id;

  const mergeMembersAndGuests = (
    members: Member[],
    guests: TruncatedMember[]
  ): TruncatedMember[] => {
    const truncatedMembers: TruncatedMember[] = members.map(({ id, name }) => ({
      id,
      name,
    }));

    return [...truncatedMembers, ...guests];
  };

  const allParticipants = mergeMembersAndGuests(members || [], guests || []);
  const { groupedTransactions } = useMemo(() => {
    const groupedTransactions = groupTransactions(
      debts ?? [],
      allParticipants ?? [],
      userMemberId || ""
    );

    return { groupedTransactions };
  }, [debts]);

  return (
    <StyledMembers>
      {isFetching ? (
        <Spinner />
      ) : (
        allParticipants?.map((p) => (
          <MemberFC
            key={p.id}
            pendingTransactions={debts ?? []}
            groupedTransactions={groupedTransactions}
            memberId={p.id}
            name={p.name}
            isUser={p.id === userMemberId}
            isGuest={guests?.some((g) => g.id === p.id) ?? false}
            menu={menu}
            memberIdSelectedToSettleUp={memberIdSelectedToSettleUp}
            members={allParticipants || []}

          />
        ))
      )}

      <MenuAnimationBackground menu={menu} />
      <SettleUpAnimation
        menu={menu}
        pendingTransactions={debts??[]}
        memberIdSelectedToSettleUp={memberIdSelectedToSettleUp}
        members={allParticipants || []}
      />
    </StyledMembers>
  );
}
