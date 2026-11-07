import { RefObject } from 'react';
import IonIcon from '@reacticons/ionicons';
import { Group } from '@/types';
import { Destination, PERSONAL } from '@/helpers/paymentCapture/reviewItems';
import { StyledPaymentDestinationSheet } from './PaymentDestinationSheet.styled';

type Props = {
  nodeRef: RefObject<HTMLDivElement | null>;
  /** Null when they could not be loaded, which without a connection they cannot. */
  groups: Group[] | null;
  chosen: Destination | undefined;
  onChoose: (destination: Destination) => void;
};

const isChosen = (destination: Destination, chosen: Destination | undefined) =>
  destination.kind === 'personal'
    ? chosen?.kind === 'personal'
    : chosen?.kind === 'group' && chosen.groupId === destination.groupId;

/**
 * Where a payment from a notification is filed: the person's own expenses or one of their groups,
 * where it is split equally among everyone. Whatever is chosen is remembered for the merchant.
 */
export default function PaymentDestinationSheet({
  nodeRef,
  groups,
  chosen,
  onChoose,
}: Props) {
  return (
    <StyledPaymentDestinationSheet ref={nodeRef}>
      <div className="sheetHandle" />
      <div className="sheetTitle">Add to</div>

      <div className="options">
        <button
          type="button"
          className={`option${isChosen(PERSONAL, chosen) ? ' chosen' : ''}`}
          onClick={() => onChoose(PERSONAL)}
        >
          <IonIcon name="person-outline" className="optionIcon" />
          <span className="optionText">
            <span className="optionName">Personal</span>
            <span className="optionNote">Only your expenses</span>
          </span>
          {isChosen(PERSONAL, chosen) ? (
            <IonIcon name="checkmark-outline" className="optionCheck" />
          ) : null}
        </button>

        {groups === null ? (
          <p className="unavailable">
            Your groups show here once Buqs can reach the server.
          </p>
        ) : (
          groups.map((group) => {
            const destination: Destination = {
              kind: 'group',
              groupId: group.id,
              groupName: group.name,
            };
            const people = group.members.length + group.guests.length;

            return (
              <button
                type="button"
                key={group.id}
                className={`option${isChosen(destination, chosen) ? ' chosen' : ''}`}
                onClick={() => onChoose(destination)}
              >
                <IonIcon name="people-outline" className="optionIcon" />
                <span className="optionText">
                  <span className="optionName">{group.name}</span>
                  <span className="optionNote">
                    {people === 1
                      ? 'Only you so far'
                      : `Split equally between ${people}`}
                  </span>
                </span>
                {isChosen(destination, chosen) ? (
                  <IonIcon name="checkmark-outline" className="optionCheck" />
                ) : null}
              </button>
            );
          })
        )}
      </div>
    </StyledPaymentDestinationSheet>
  );
}
