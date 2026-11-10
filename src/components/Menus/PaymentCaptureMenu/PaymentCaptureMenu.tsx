import { RefObject, useEffect, useState } from 'react';
import { Signal } from '@preact/signals-react';
import { IoClose } from 'react-icons/io5';
import PropertyList, { PropertyRow } from '../../ListForms/PropertyList';
import SectionLabel from '../../SectionLabel/SectionLabel';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';
import MyButton from '../../MyButton/MyButton';
import PlusBadge from '../../Plus/PlusBadge';
import { StyledPaymentCaptureMenu } from './PaymentCaptureMenu.styled';
import { usePaymentCaptureStatus } from '@/hooks/usePaymentCaptureStatus';
import { FormatDateTime } from '@/helpers/timeHelpers';
import {
  PaymentCapture,
  SeenPaymentApp,
  turnOnPaymentCapture,
} from '@/helpers/paymentCapture/paymentCapture';

type Props = {
  menu: Signal<string | null>;
  timeZoneId: string;
  nodeRef: RefObject<HTMLDivElement | null>;
};

/**
 * Payments from notifications, in settings: the switch, whether Android is letting Buqs read
 * notifications, and the apps whose notifications are kept.
 *
 * The explanation sits above the switch on purpose. Android's own screen says only that Buqs can
 * read every notification, so what Buqs actually does with them has to be said here, before the
 * person is sent there.
 */
export default function PaymentCaptureMenu({
  menu,
  timeZoneId,
  nodeRef,
}: Props) {
  const { status, refresh } = usePaymentCaptureStatus();
  const [sources, setSources] = useState<string[]>([]);
  const [seen, setSeen] = useState<SeenPaymentApp[]>([]);
  const [isSwitching, setIsSwitching] = useState(false);

  // Read again with every status, which is re-read whenever the app comes back to the front: an app
  // may have posted its first payment in the meantime.
  useEffect(() => {
    if (!status) return;

    void PaymentCapture.getSources().then(({ packages, seen }) => {
      setSources(packages);
      setSeen([...seen].sort((a, b) => b.lastSeenAt - a.lastSeenAt));
    });
  }, [status]);

  const handleToggle = async () => {
    if (!status || isSwitching) return;

    setIsSwitching(true);

    try {
      if (status.enabled) {
        await PaymentCapture.setEnabled({ enabled: false });
      } else {
        await turnOnPaymentCapture();
        if (!status.access) await PaymentCapture.openAccessSettings();
      }

      await refresh();
    } finally {
      setIsSwitching(false);
    }
  };

  const toggleApp = (packageName: string) => {
    const next = sources.includes(packageName)
      ? sources.filter((x) => x !== packageName)
      : [...sources, packageName];

    setSources(next);
    void PaymentCapture.setSources({ packages: next });
  };

  const openAccessSettings = () => void PaymentCapture.openAccessSettings();

  return (
    <StyledPaymentCaptureMenu ref={nodeRef}>
      <div className="header">
        <div className="name plusLabel">
          Payments from notifications
          <PlusBadge />
        </div>
        <div
          className="closeButtonContainer"
          onClick={() => (menu.value = null)}
        >
          <IoClose className="closeButton" />
        </div>
      </div>

      <div className="optionsContainer">
        <div className="explainer">
          <p>
            When your bank or payment app tells you about a payment, Buqs keeps
            that notification and offers it as an expense the next time you open
            the app. You choose which ones to add, and nothing leaves this phone
            until you do.
          </p>
          <p>
            Android shows every app that reads notifications the same warning.
            On its page for Buqs, texts and chats are switched off and greyed
            out, so Buqs never receives them. Buqs also skips email, news and
            browser apps, keeps only payments from the apps listed below, and
            never replies to or clears a notification.
          </p>
        </div>

        <div className="section">
          <PropertyList>
            <PropertyRow
              className="toggleRow"
              label="Add payments from notifications"
            >
              {/* False until the status is read: undefined would make the checkbox switch from
                  uncontrolled to controlled under React. */}
              <ToggleSwitch
                isOn={status?.enabled ?? false}
                onToggle={handleToggle}
              />
            </PropertyRow>
          </PropertyList>
        </div>

        {status?.enabled ? (
          <div className="state">
            {!status.access ? (
              <>
                <p className="attention">
                  Android isn't letting Buqs read notifications yet.
                </p>
                <MyButton
                  variant="secondary"
                  fontSize="15"
                  onClick={openAccessSettings}
                >
                  Allow notification access
                </MyButton>
              </>
            ) : !status.connected ? (
              <>
                <p className="attention">
                  Android isn't passing notifications to Buqs right now. Turning
                  Buqs off and on again in Android's settings usually brings it
                  back.
                </p>
                <MyButton
                  variant="secondary"
                  fontSize="15"
                  onClick={openAccessSettings}
                >
                  Open Android settings
                </MyButton>
              </>
            ) : (
              <p>
                {status.lastCapturedAt
                  ? `Last payment kept ${FormatDateTime(
                      new Date(status.lastCapturedAt).toISOString(),
                      timeZoneId
                    )}.`
                  : 'Waiting for your first payment.'}
              </p>
            )}
          </div>
        ) : null}

        {status?.enabled ? (
          <div className="section">
            <SectionLabel title="Apps" />
            {seen.length === 0 ? (
              <p className="emptyApps">
                Apps appear here once they post a payment. Google Wallet,
                Revolut, Curve, Monzo, Starling, Wise, N26 and PayPal are read
                from the start; switch on any other you pay with when it shows
                up.
              </p>
            ) : (
              <PropertyList>
                {seen.map((app) => (
                  <PropertyRow
                    key={app.packageName}
                    className="toggleRow"
                    label={app.appName}
                    note={`${app.count} ${app.count === 1 ? 'payment' : 'payments'} seen`}
                  >
                    <ToggleSwitch
                      isOn={sources.includes(app.packageName)}
                      onToggle={() => toggleApp(app.packageName)}
                    />
                  </PropertyRow>
                ))}
              </PropertyList>
            )}
          </div>
        ) : null}
      </div>
    </StyledPaymentCaptureMenu>
  );
}
