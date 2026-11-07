import { RefObject, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import MyButton from '../MyButton/MyButton';
import { Group } from '@/types';
import { displayMoneyFixed } from '@/helpers/displayCurrencyAndAmount';
import { equalShares } from '@/helpers/paymentCapture/paymentDraft';
import {
  Destination,
  PERSONAL,
  Person,
} from '@/helpers/paymentCapture/reviewItems';
import { StyledPaymentDestinationSheet } from './PaymentDestinationSheet.styled';

type Props = {
  nodeRef: RefObject<HTMLDivElement | null>;
  /** Null when they could not be loaded, which without a connection they cannot. */
  groups: Group[] | null;
  /** The people the person can quick-split with; null when they could not be loaded. */
  people: Person[] | null;
  me: Person;
  chosen: Destination | undefined;
  /** The row's amount, to show each share as people are picked, when it can be read. */
  amount: number | null;
  currency: string;
  onChoose: (destination: Destination) => void;
};

type Step =
  | { kind: 'list' }
  | { kind: 'group'; group: Group }
  | { kind: 'quickSplit' };

/** Someone who can share a payment, by the id the expense records them under. */
type Candidate = { id: string; name: string; guest: boolean };

/**
 * Where a payment from a notification is filed and who shares it: the person's own expenses, a
 * quick split with people they are connected to, or one of their groups. Picking a group or a
 * quick split opens a second step to tick who shares it, everyone in the group to begin with; the
 * person paid, since it was their card. Whatever is chosen is remembered for the merchant.
 */
export default function PaymentDestinationSheet({
  nodeRef,
  groups,
  people,
  me,
  chosen,
  amount,
  currency,
  onChoose,
}: Props) {
  const [step, setStep] = useState<Step>({ kind: 'list' });
  const [picked, setPicked] = useState<string[]>([]);

  const openGroup = (group: Group) => {
    const everyone = [...group.members, ...group.guests].map((x) => x.id);
    const sameGroup = chosen?.kind === 'group' && chosen.groupId === group.id;

    setPicked(sameGroup ? (chosen.memberIds ?? everyone) : everyone);
    setStep({ kind: 'group', group });
  };

  const openQuickSplit = () => {
    setPicked(
      chosen?.kind === 'quickSplit'
        ? [
            ...(chosen.withMe ? [me.userId] : []),
            ...chosen.people.map((person) => person.userId),
          ]
        : [me.userId]
    );
    setStep({ kind: 'quickSplit' });
  };

  if (step.kind === 'list') {
    const quickSplitChosen = chosen?.kind === 'quickSplit';

    return (
      <StyledPaymentDestinationSheet ref={nodeRef}>
        <div className="sheetHandle" />
        <div className="sheetTitle">Add to</div>

        <div className="options">
          <button
            type="button"
            className={`option${chosen?.kind === 'personal' ? ' chosen' : ''}`}
            onClick={() => onChoose(PERSONAL)}
          >
            <IonIcon name="person-outline" className="optionIcon" />
            <span className="optionText">
              <span className="optionName">Personal</span>
              <span className="optionNote">Only your expenses</span>
            </span>
            {chosen?.kind === 'personal' ? (
              <IonIcon name="checkmark-outline" className="optionCheck" />
            ) : null}
          </button>

          <button
            type="button"
            className={`option${quickSplitChosen ? ' chosen' : ''}`}
            onClick={openQuickSplit}
          >
            <IonIcon name="person-add-outline" className="optionIcon" />
            <span className="optionText">
              <span className="optionName">Quick split</span>
              <span className="optionNote">
                With people you&apos;re connected to
              </span>
            </span>
            <IonIcon name="chevron-forward-outline" className="optionNext" />
          </button>

          {groups === null ? (
            <p className="unavailable">
              Your groups show here once Buqs can reach the server.
            </p>
          ) : (
            groups.map((group) => {
              const isChosen =
                chosen?.kind === 'group' && chosen.groupId === group.id;
              const size = group.members.length + group.guests.length;

              return (
                <button
                  type="button"
                  key={group.id}
                  className={`option${isChosen ? ' chosen' : ''}`}
                  onClick={() => openGroup(group)}
                >
                  <IonIcon name="people-outline" className="optionIcon" />
                  <span className="optionText">
                    <span className="optionName">{group.name}</span>
                    <span className="optionNote">
                      {size === 1 ? 'Only you so far' : `${size} people`}
                    </span>
                  </span>
                  <IonIcon
                    name="chevron-forward-outline"
                    className="optionNext"
                  />
                </button>
              );
            })
          )}
        </div>
      </StyledPaymentDestinationSheet>
    );
  }

  const myMember =
    step.kind === 'group'
      ? step.group.members.find((member) => member.userId === me.userId)
      : undefined;
  const payerId = step.kind === 'group' ? (myMember?.id ?? '') : me.userId;

  const candidates: Candidate[] | null =
    step.kind === 'group'
      ? [
          ...(myMember ? [myMember] : []),
          ...step.group.members.filter((member) => member.id !== myMember?.id),
        ]
          .map((member) => ({ id: member.id, name: member.name, guest: false }))
          .concat(
            step.group.guests.map((guest) => ({
              id: guest.id,
              name: guest.name,
              guest: true,
            }))
          )
      : people === null
        ? null
        : [
            { id: me.userId, name: me.username, guest: false },
            ...people.map((person) => ({
              id: person.userId,
              name: person.username,
              guest: false,
            })),
          ];

  // In the order shown, so the extra cent lands where the list says it does.
  const sharing = (candidates ?? [])
    .filter((candidate) => picked.includes(candidate.id))
    .map((candidate) => candidate.id);

  const shares =
    amount !== null && sharing.length > 0
      ? equalShares(amount, sharing, payerId, currency)
      : null;

  const others = sharing.filter((id) => id !== payerId);
  const canFinish =
    step.kind === 'group' ? sharing.length > 0 : others.length > 0;

  const toggle = (id: string) =>
    setPicked((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );

  const finish = () => {
    if (step.kind === 'group') {
      const everyone = candidates?.length ?? 0;

      onChoose({
        kind: 'group',
        groupId: step.group.id,
        groupName: step.group.name,
        // Everyone ticked is kept as "everyone", so whoever joins later shares too.
        memberIds: sharing.length === everyone ? undefined : sharing,
      });
      return;
    }

    onChoose({
      kind: 'quickSplit',
      people: (people ?? []).filter((person) => others.includes(person.userId)),
      withMe: sharing.includes(me.userId),
    });
  };

  return (
    <StyledPaymentDestinationSheet ref={nodeRef}>
      <div className="sheetHandle" />
      <div className="stepHeader">
        <button
          type="button"
          className="back"
          aria-label="Back"
          onClick={() => setStep({ kind: 'list' })}
        >
          <IonIcon name="chevron-back-outline" />
        </button>
        <div className="sheetTitle">
          {step.kind === 'group' ? step.group.name : 'Quick split'}
        </div>
      </div>

      <p className="paidBy">
        Paid by you
        {amount !== null ? `, ${displayMoneyFixed(amount, currency)}` : ''}.
        Tick who shares it; they share it equally.
      </p>

      <div className="options">
        {candidates === null ? (
          <p className="unavailable">
            The people you&apos;re connected to show here once Buqs can reach
            the server.
          </p>
        ) : candidates.length === 1 && step.kind === 'quickSplit' ? (
          <p className="unavailable">
            You aren&apos;t connected to anyone yet. People you connect with in
            Quick splits show up here.
          </p>
        ) : (
          candidates.map((candidate) => {
            const isPicked = picked.includes(candidate.id);
            const share = isPicked ? shares?.get(candidate.id) : undefined;

            return (
              <button
                type="button"
                key={candidate.id}
                className={`option${isPicked ? ' chosen' : ''}`}
                aria-pressed={isPicked}
                onClick={() => toggle(candidate.id)}
              >
                <IonIcon
                  name={isPicked ? 'checkmark-circle' : 'ellipse-outline'}
                  className={`tickIcon${isPicked ? ' on' : ''}`}
                />
                <span className="optionText">
                  <span className="optionName">
                    {candidate.id === payerId ? 'You' : candidate.name}
                  </span>
                  {candidate.guest ? (
                    <span className="optionNote">Guest</span>
                  ) : null}
                </span>
                {/* Fixed decimals, so €5.00 lines up under €3.34. */}
                {share !== undefined ? (
                  <span className="share">
                    {displayMoneyFixed(share, currency)}
                  </span>
                ) : null}
              </button>
            );
          })
        )}
      </div>

      <div className="done">
        <MyButton fontSize="16" onClick={finish} disabled={!canFinish}>
          Done
        </MyButton>
      </div>
    </StyledPaymentDestinationSheet>
  );
}
