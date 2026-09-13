import IonIcon from '@reacticons/ionicons';
import { DetailedTransferProps } from '../../interfaces';
import { StyledDetailedBackdrop } from '../DetailSheet.styled';
import { StyledDetailedTransfer } from './DetailedTransfer.styled';
import MyButton from '../MyButton/MyButton';
import { useSignal } from '@preact/signals-react';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import DeleteTransferAnimation from '../Animations/DeleteTransferAnimation';
import SectionLabel from '../SectionLabel/SectionLabel';
import { DateTime } from 'luxon';

export default function DetailedTransfer({
  selectedTransfer,
  amount,
  created,
  creator,
  currency,
  occurred,
  timeZoneId,
  userMemberId,
  members,
  errorMessage,
  groupIsArchived,
  userId,
}: DetailedTransferProps) {
  const menu = useSignal<string | null>(null);

  const sender = members.find((x) => x.id === selectedTransfer.value?.senderId);
  const receiver = members.find(
    (x) => x.id === selectedTransfer.value?.receiverId
  );

  const isUserSender = sender?.id === userMemberId || sender?.id === userId;
  const isUserReceiver =
    receiver?.id === userMemberId || receiver?.id === userId;

  const direction = isUserSender
    ? 'sent'
    : isUserReceiver
      ? 'received'
      : 'other';

  const cardLabel = isUserSender
    ? 'You sent'
    : isUserReceiver
      ? 'You received'
      : 'Transfer';

  const stamp = (eventTimeUtc: string) =>
    DateTime.fromISO(eventTimeUtc, { zone: 'utc' })
      .setZone(timeZoneId)
      .toFormat('EEE, d LLL yyyy HH:mm');

  return (
    <>
      <StyledDetailedBackdrop
        onClick={() => (selectedTransfer.value = null)}
      />
      <StyledDetailedTransfer>
        <div className="header">
          <div className="slot" />
          <div className="title">
            {selectedTransfer.value?.description
              ? selectedTransfer.value.description
              : 'Transfer'}
          </div>
          <div
            className="slot closeButtonContainer"
            onClick={() => (selectedTransfer.value = null)}
          >
            <IonIcon name="close-outline" className="closeButton" />
          </div>
        </div>

        <div className="detailsScroll">
          <div className="summary">
            <div className={`amount ${direction}`}>
              {displayCurrencyAndAmount(amount.toString(), currency)}
            </div>
          </div>

          <div className="partiesCard">
            <SectionLabel title={cardLabel} />

            <div className="partyLines">
              {isUserSender ? null : (
                <div className="partyLine">
                  <span className="partyRole">From</span>
                  <span className="partyName">{sender?.name}</span>
                </div>
              )}
              {isUserReceiver ? null : (
                <div className="partyLine">
                  <span className="partyRole">To</span>
                  <span className="partyName">{receiver?.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="meta">
            <span className="metaLine">
              <span className="metaLabel">Occurred</span>
              <span className="metaSep">&middot;</span>
              <span className="metaStamp">{stamp(occurred)}</span>
            </span>
            <span className="metaLine">
              <span className="metaLabel">
                {`Created by ${members.find((x) => x.id === creator)?.name}`}
              </span>
              <span className="metaSep">&middot;</span>
              <span className="metaStamp">{stamp(created)}</span>
            </span>
          </div>
        </div>

        {!groupIsArchived ? (
          <div className="footer">
            <MyButton
              onClick={() => (menu.value = 'deleteTransfer')}
              variant="secondary"
            >
              Delete
            </MyButton>
          </div>
        ) : null}

        <MenuAnimationBackground menu={menu} />
        <DeleteTransferAnimation
          menu={menu}
          selectedTransfer={selectedTransfer}
          errorMessage={errorMessage}
        />
      </StyledDetailedTransfer>
    </>
  );
}
