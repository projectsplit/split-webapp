import { StyledMembers } from "./Members.styled";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { groupTransactions } from "../../helpers/groupTransactions";
import { Group, TransactionType, UserInfo } from "../../types";
import { Signal, useSignal } from "@preact/signals-react";
import MenuAnimationBackground from "../../components/Animations/MenuAnimationBackground";
import MemberFC from "./Member/MemberFC";
import SettleUpAnimation from "../../components/Animations/SettleUpAnimation";
import Spinner from "../../components/Spinner/Spinner";
import AddNewUserAnimation from "../../components/Animations/AddNewUserAnimation";
import { useDebts } from "@/api/auth/QueryHooks/useDebts";
import getAllDebtsParticipants from "@/helpers/getAllDebtsParticipants";

export default function Members() {
  const idSelectedToSettleUp = useSignal<string>("");
  const menu = useSignal<string | null>(null);
  const guestToBeReplaced = useSignal<{ guestId: string; guestName: string }>({ guestId: "", guestName: "" });

  const { groupid } = useParams();
  const { userInfo, group, showBottomBar, transactionType } = useOutletContext<{
    userInfo: UserInfo;
    group: Group;
    showBottomBar: Signal<boolean>;
    transactionType: TransactionType;
  }>();

  const { data, isFetching, isLoading } = useDebts(groupid);
  const { debts, totalSpent } = data ?? { debts: [], totalSpent: {} };

  const members = group?.members;
  const guests = group?.guests;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;

  const allParticipants = getAllDebtsParticipants(debts,
    transactionType,
    members,
    guests);

  const { groupedTransactions } = useMemo(() => {
    const groupedTransactions = groupTransactions(
      debts ?? [],
      allParticipants ?? [],
      userMemberId || ""
    );

    return { groupedTransactions };
  }, [debts]);

  useEffect(() => {
    isFetching ? (showBottomBar.value = false) : (showBottomBar.value = true);
  }, [isFetching]);

  if (!userInfo && !group) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
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
            group={group}
            key={p.id}
            pendingTransactions={debts ?? []}
            groupedTransactions={groupedTransactions}
            id={p.id}
            name={p.name}
            isLogedUser={p.id === userMemberId}
            isGuest={guests?.some((g) => g.id === p.id) ?? false}
            menu={menu}
            idSelectedToSettleUp={idSelectedToSettleUp}
            participants={allParticipants || []}
            totalSpent={totalSpent}
            guestToBeReplaced={guestToBeReplaced}
          />
        ))
      )}

      <MenuAnimationBackground menu={menu} />
      <SettleUpAnimation
        menu={menu}
        pendingTransactions={debts ?? []}
        idSelectedToSettleUp={idSelectedToSettleUp}
        members={allParticipants || []}
      />
      <AddNewUserAnimation menu={menu} guestToBeReplaced={guestToBeReplaced.value} />
    </StyledMembers>
  );
}
