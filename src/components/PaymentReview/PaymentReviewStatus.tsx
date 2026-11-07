import { Signal } from '@preact/signals-react';
import IonIcon from '@reacticons/ionicons';
import { paymentReviewItems } from '@/helpers/paymentCapture/paymentReview';
import { StyledConnectionStatus } from '../ConnectionStatus/ConnectionStatus.styled';

/**
 * A line under the page title while payments from notifications wait to be looked at: the way back
 * to them after closing the list, and the only sign of one that arrived while the app was open.
 * Shares the connection line's look, being the same kind of note.
 */
export default function PaymentReviewStatus({
  menu,
}: {
  menu: Signal<string | null>;
}) {
  const count = paymentReviewItems.value.length;
  if (count === 0) return null;

  return (
    <StyledConnectionStatus
      as="button"
      type="button"
      onClick={() => (menu.value = 'paymentReview')}
    >
      <IonIcon name="card-outline" className="icon" />
      <span className="text">
        {count === 1 ? '1 payment to review' : `${count} payments to review`}
      </span>
    </StyledConnectionStatus>
  );
}
