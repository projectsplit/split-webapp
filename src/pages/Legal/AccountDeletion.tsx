import { Link } from 'react-router-dom';
import routes from '../../routes';
import LegalPage from './LegalPage';
import { legalDetails } from './legalDetails';

/**
 * The page Google Play links to for "delete your account", which has to work for someone who does
 * not have the app installed and may not be able to sign in. So it says how to do it yourself,
 * and gives a second way that needs neither.
 */
export default function AccountDeletion() {
  const { contactEmail } = legalDetails;

  return (
    <LegalPage title="Delete your Buqs account">
      <p>
        You can delete your Buqs account, and the data that goes with it,
        yourself at any time.
      </p>

      <h2>How to delete it</h2>
      <ol>
        <li>
          Open Buqs, either the Android app or{' '}
          <Link to={routes.ROOT}>buqs.uk</Link> in a browser, and sign in.
        </li>
        <li>Tap your initials in the top-left corner to open Settings.</li>
        <li>
          Scroll to the bottom and tap <strong>Delete account</strong>.
        </li>
        <li>Type your username to confirm.</li>
      </ol>
      <p>Deletion is immediate and cannot be undone.</p>

      <h2>If you cannot sign in</h2>
      <p>
        Use <strong>Forgot password?</strong> or{' '}
        <strong>Forgot username?</strong> on the sign-in page to get back into
        your account, then follow the steps above.
      </p>
      <p>
        If that does not work, email{' '}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a> from the address
        on your account and tell us your username. We will delete the account
        within 30 days and confirm when it is done.
      </p>

      <h2>What is deleted</h2>
      <ul>
        <li>Your account: username, email address and sign-in details.</li>
        <li>Your settings, budgets, labels and notifications.</li>
        <li>Your personal expenses and recurring expenses.</li>
        <li>
          Expenses in shared groups that involve only you: ones you paid for and
          nobody else shares.
        </li>
        <li>Any group that only you are in, with everything in it.</li>
        <li>
          Your sessions on every device, and your push notification
          registrations.
        </li>
      </ul>

      <h2>What is kept</h2>
      <ul>
        <li>
          Expenses and transfers you shared with other people stay visible to
          those people, because they are their records too. In a group you then
          appear as a guest named after your username. In an expense split
          directly with someone you appear as a deleted user. They are deleted
          once nobody with an account can see them any more.
        </li>
        <li>
          Records of contributions made through Google Play are kept as
          financial records. If you give monthly, the monthly contribution is
          cancelled when you delete your account.
        </li>
        <li>
          Server logs, which can include your IP address, are kept only as long
          as they are needed for security and troubleshooting.
        </li>
      </ul>

      <p>
        More detail is in the <Link to={routes.PRIVACY}>privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
