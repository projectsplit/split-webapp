import { RefObject, useCallback, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import { signal, useSignal } from '@preact/signals-react';
import MyButton from '../MyButton/MyButton';
import MemberPicker from '../MemberPicker/MemberPicker';
import { recalculateAmounts } from '../MemberPicker/helpers/recalculateAmounts';
import { validateMemberAmounts } from '../MemberPicker/helpers/validateMemberAmounts';
import { SplitMethod } from '../ExpenseForm/formStore/formStoreTypes';
import { Group, Guest, Member, PickerMember, User } from '@/types';
import { displayMoneyFixed } from '@/helpers/displayCurrencyAndAmount';
import { significantDigitsFromTicker } from '@/helpers/openExchangeRates';
import {
  addsUp,
  Destination,
  equalShares,
  PERSONAL,
  Person,
} from '@/helpers/expenseSplit';
import { StyledExpenseDestinationSheet } from './ExpenseDestinationSheet.styled';
import { useDragToClose } from '@/hooks/useDragToClose';

type Props = {
  nodeRef: RefObject<HTMLDivElement | null>;
  /** Null when they could not be loaded, which without a connection they cannot. */
  groups: Group[] | null;
  /** The people the person can quick-split with; null when they could not be loaded. */
  people: Person[] | null;
  me: Person;
  chosen: Destination | undefined;
  /** The expense's amount, to show each share as people are picked, when it can be read. */
  amount: number | null;
  currency: string;
  onChoose: (destination: Destination) => void;
  /** Closes the sheet without a choice, as pulling it down does. */
  onClose: () => void;
  /** "Add to" for a payment that has nowhere yet; "Split with" for one already personal. */
  title?: string;
  /** Left out when the expense is personal already and the point is to share it. */
  showPersonal?: boolean;
  /** What finishing the pick of people does: "Done" just chooses; "Split" acts at once. */
  doneLabel?: string;
};

type Step =
  | { kind: 'list' }
  | { kind: 'group'; group: Group }
  | { kind: 'quickSplit' };

type PeopleStep = Exclude<Step, { kind: 'list' }>;

/** Someone who can share a payment, by the id the expense records them under. */
type Candidate = { id: string; name: string; guest: boolean };

// The split screen reads these only to pick who paid, which here is always the person.
const NO_MEMBERS = signal<(Member | Guest)[]>([]);
const NO_USERS = signal<User[]>([]);

/**
 * Who can share it, in the order shown: the person first, then the group's other members and its
 * guests, or the people they are connected to. Null while those people cannot be loaded.
 */
const candidatesFor = (
  step: PeopleStep,
  me: Person,
  people: Person[] | null
): Candidate[] | null => {
  if (step.kind === 'quickSplit') {
    return people === null
      ? null
      : [me, ...people].map((person) => ({
          id: person.userId,
          name: person.username,
          guest: false,
        }));
  }

  const { members, guests } = step.group;

  return [
    ...members.filter((member) => member.userId === me.userId),
    ...members.filter((member) => member.userId !== me.userId),
  ]
    .map(({ id, name }) => ({ id, name, guest: false }))
    .concat(guests.map(({ id, name }) => ({ id, name, guest: true })));
};

/** The id the person goes by in the split: their member id in a group, their user id otherwise. */
const payerIdFor = (step: PeopleStep, me: Person) =>
  step.kind === 'group'
    ? (step.group.members.find((member) => member.userId === me.userId)?.id ??
      '')
    : me.userId;

/**
 * The candidates as the split screen takes them, with `sharing` ticked: without it, whoever `shares`
 * names, or everyone. Amounts set before come back locked, as an edited expense's do in the expense
 * form, unless they no longer add up to the amount; then it starts again from an equal split.
 */
const pickerMembers = (
  candidates: Candidate[],
  payerId: string,
  sharing: string[] | undefined,
  shares: Record<string, number> | undefined,
  amount: number,
  currency: string
): PickerMember[] => {
  const ticked = candidates
    .map((candidate) => candidate.id)
    .filter((id) =>
      sharing ? sharing.includes(id) : !shares || shares[id] !== undefined
    );

  const kept =
    shares &&
    ticked.every((id) => shares[id] !== undefined) &&
    addsUp(
      ticked.map((id) => shares[id]),
      amount,
      currency
    )
      ? shares
      : undefined;

  const digits = significantDigitsFromTicker(currency);

  return candidates.map((candidate) => {
    const isTicked = ticked.includes(candidate.id);
    const share = isTicked ? kept?.[candidate.id] : undefined;
    const quantity = share === undefined ? '' : share.toFixed(digits);
    const isPayer = candidate.id === payerId;

    return {
      id: candidate.id,
      // What the expense form calls the person, which the split screen shows as "You".
      name: isPayer ? 'you' : candidate.name,
      avatarName: isPayer ? candidate.name : undefined,
      screenQuantity: quantity,
      actualAmount: quantity,
      selected: isTicked,
      locked: share !== undefined,
      order: 0,
    };
  });
};

/**
 * Where an expense goes and who shares it: the person's own expenses, a quick split with people
 * they are connected to, or one of their groups. Picking a group or a quick split opens a second
 * step to tick who shares it, everyone in the group to begin with; the person paid it. They share it
 * equally unless the person sets the amounts on the expense form's split screen, opened from there.
 *
 * Used for payments read from notifications, and to split an expense that is personal so far.
 */
export default function ExpenseDestinationSheet({
  nodeRef,
  groups,
  people,
  me,
  chosen,
  amount,
  currency,
  onChoose,
  onClose,
  title = 'Add to',
  showPersonal = true,
  doneLabel = 'Done',
}: Props) {
  const [step, setStep] = useState<Step>({ kind: 'list' });
  const [members, setMembers] = useState<PickerMember[]>([]);
  const [splitError, setSplitError] = useState('');
  const splitMethod = useSignal<SplitMethod>('Amounts');

  // The transition that slides it in and out holds the sheet too.
  const dragRef = useDragToClose(onClose);
  const sheetRef = useCallback(
    (sheet: HTMLDivElement | null) => {
      nodeRef.current = sheet;
      const release = dragRef(sheet);

      return () => {
        release?.();
        nodeRef.current = null;
      };
    },
    [nodeRef, dragRef]
  );

  const total = amount ?? 0;
  const hasAmount = total > 0;

  const open = (
    next: PeopleStep,
    sharing: string[] | undefined,
    shares: Record<string, number> | undefined
  ) => {
    setMembers(
      pickerMembers(
        candidatesFor(next, me, people) ?? [],
        payerIdFor(next, me),
        sharing,
        shares,
        total,
        currency
      )
    );
    splitMethod.value = 'Amounts';
    setSplitError('');
    setStep(next);
  };

  const openGroup = (group: Group) => {
    const sameGroup = chosen?.kind === 'group' && chosen.groupId === group.id;

    open(
      { kind: 'group', group },
      sameGroup ? chosen.memberIds : undefined,
      sameGroup ? chosen.shares : undefined
    );
  };

  const openQuickSplit = () => {
    const before = chosen?.kind === 'quickSplit' ? chosen : undefined;

    open(
      { kind: 'quickSplit' },
      before
        ? [
            ...(before.withMe ? [me.userId] : []),
            ...before.people.map((person) => person.userId),
          ]
        : [me.userId],
      before?.shares
    );
  };

  if (step.kind === 'list') {
    const quickSplitChosen = chosen?.kind === 'quickSplit';

    return (
      <StyledExpenseDestinationSheet ref={sheetRef}>
        <div className="sheetHandle" />
        <div className="sheetTitle">{title}</div>

        <div className="options">
          {showPersonal ? (
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
          ) : null}

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
      </StyledExpenseDestinationSheet>
    );
  }

  const candidates = candidatesFor(step, me, people);
  const payerId = payerIdFor(step, me);

  const sharing = members.filter((member) => member.selected);
  const sharingIds = sharing.map((member) => member.id);
  const others = sharingIds.filter((id) => id !== payerId);

  // With nobody's amount set by hand it is an equal split, shown as filing will work it out. The
  // split screen's own figures can be to two decimals whatever the currency until it first opens.
  const even = !sharing.some((member) => member.locked);

  const shown =
    hasAmount && sharing.length > 0
      ? even
        ? equalShares(total, sharingIds, payerId, currency)
        : new Map(
            sharing.map((member) => [member.id, Number(member.actualAmount)])
          )
      : null;

  const canFinish =
    step.kind === 'group' ? sharing.length > 0 : others.length > 0;

  // What ticking someone does on the split screen itself.
  const toggle = (id: string) => {
    const toggled = members.map((member) =>
      member.id !== id
        ? member
        : member.selected
          ? {
              ...member,
              selected: false,
              actualAmount: '',
              screenQuantity: '',
              locked: false,
            }
          : { ...member, selected: true, order: Date.now() }
    );

    setSplitError('');
    setMembers(
      hasAmount
        ? recalculateAmounts(
            toggled,
            total,
            significantDigitsFromTicker(currency),
            splitMethod,
            currency,
            true
          )
        : toggled
    );
  };

  const finish = () => {
    let shares: Record<string, number> | undefined;

    if (hasAmount && !even) {
      const { areNumbersValid, isSumInvalid } = validateMemberAmounts(
        'Participants',
        members,
        currency,
        total
      );

      if (!areNumbersValid || isSumInvalid) {
        setSplitError(
          !areNumbersValid
            ? 'Amounts must be positive'
            : 'Amounts must add up to total'
        );
        return;
      }

      const equal = equalShares(total, sharingIds, payerId, currency);

      // Amounts set by hand that come to the equal split anyway are kept as an equal split.
      shares = sharing.every(
        (member) => Number(member.actualAmount) === equal.get(member.id)
      )
        ? undefined
        : Object.fromEntries(
            sharing.map((member) => [member.id, Number(member.actualAmount)])
          );
    }

    if (step.kind === 'group') {
      onChoose({
        kind: 'group',
        groupId: step.group.id,
        groupName: step.group.name,
        // Everyone ticked is kept as "everyone", so whoever joins later shares an equal split too.
        memberIds: sharing.length === members.length ? undefined : sharingIds,
        shares,
      });
      return;
    }

    onChoose({
      kind: 'quickSplit',
      people: (people ?? []).filter((person) => others.includes(person.userId)),
      withMe: sharingIds.includes(me.userId),
      shares,
    });
  };

  return (
    <StyledExpenseDestinationSheet ref={sheetRef}>
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
        {hasAmount
          ? `Paid by you, ${displayMoneyFixed(total, currency)}. Tick who shares it; to share it unequally, open Split.`
          : 'Paid by you. Tick who shares it; they share it equally.'}
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
            const isPicked = sharingIds.includes(candidate.id);
            const share = shown?.get(candidate.id);

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

      {hasAmount && members.length > 1 ? (
        <div className="split">
          <MemberPicker
            description="Participants"
            totalAmount={total}
            memberAmounts={members}
            setMemberAmounts={setMembers}
            error={splitError}
            setError={setSplitError}
            selectedCurrency={currency}
            category={splitMethod}
            userMemberId={step.kind === 'group' ? payerId : undefined}
            userId={me.userId}
            groupMembers={NO_MEMBERS}
            nonGroupUsers={NO_USERS}
            isLoading={false}
            isCreateExpense
          />
        </div>
      ) : null}

      {splitError ? <p className="splitError">{splitError}</p> : null}

      <div className="done">
        <MyButton fontSize="16" onClick={finish} disabled={!canFinish}>
          {doneLabel}
        </MyButton>
      </div>
    </StyledExpenseDestinationSheet>
  );
}
