import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Signal } from '@preact/signals-react';
import PaymentCaptureMenu from '../Menus/PaymentCaptureMenu/PaymentCaptureMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function PaymentCaptureMenuAnimation({
  menu,
  timeZoneId,
}: {
  menu: Signal<string | null>;
  timeZoneId: string;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  useCloseOnBack(menu.value === 'paymentCapture', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'paymentCapture'}
      classNames="leftslide"
      timeout={100}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <PaymentCaptureMenu
        menu={menu}
        timeZoneId={timeZoneId}
        nodeRef={nodeRef}
      />
    </CSSTransition>
  );
}
