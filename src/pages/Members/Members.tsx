import { StyledMembers } from "./Members.styled";
import useDebts from "../../api/services/useDebts";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { groupTransactions } from "../../helpers/groupTransactions";
import { Group,UserInfo } from "../../types";
import { Signal, useSignal } from "@preact/signals-react";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import MemberFC from "./Member/MemberFC";
import Spinner from "../../components/Spinner/Spinner";
import SettleUpAnimation from "../../components/Menus/MenuAnimations/SettleUpAnimation";
import { mergeMembersAndGuests } from "../../helpers/mergeMembersAndGuests";

export default function Members() {

  const memberIdSelectedToSettleUp = useSignal<string>("");
  const menu = useSignal<string | null>(null);

  const { groupid } = useParams();
  const { userInfo, group, showBottomBar } = useOutletContext<{
    userInfo: UserInfo;
    group: Group;
    showBottomBar: Signal<boolean>;
  }>();
  const { data: debts, isFetching } = useDebts(groupid);


  const members = group?.members;
  const guests = group?.guests;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;

  const allParticipants = mergeMembersAndGuests(members || [], guests || []);

  const { groupedTransactions } = useMemo(() => {
    const groupedTransactions = groupTransactions(
      debts ?? [],
      allParticipants ?? [],
      userMemberId || ""
    );

    return { groupedTransactions };
  }, [debts]);

  useEffect(() => {
    isFetching
      ? (showBottomBar.value = false)
      : (showBottomBar.value = true);
  }, [isFetching]);

  if (!userInfo || !group) {
    return <Spinner />;
  }

  const sortedParticipants = [...allParticipants].sort((a, b) => {
    if (a.id === userMemberId) return -1;
    if (b.id === userMemberId) return 1;
    return 0;
  });

  return (
    <StyledMembers>
      {isFetching ? (
        <Spinner />
      ) : (
        sortedParticipants?.map((p) => (
          <MemberFC
            key={p.id}
            pendingTransactions={debts ?? []}
            groupedTransactions={groupedTransactions}
            memberId={p.id}
            name={p.name}
            isLogedUser={p.id === userMemberId}
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
        pendingTransactions={debts ?? []}
        memberIdSelectedToSettleUp={memberIdSelectedToSettleUp}
        members={allParticipants || []}
      />
    </StyledMembers>
  );
}
