import { Link } from 'react-router-dom';
import routes from '../../routes';
import LegalPage from './LegalPage';
import { legalDetails } from './legalDetails';

/**
 * Everything here is a statement about what the code does, so it has to change when the code does.
 * The parts most likely to go stale: the list of companies data passes through, the 60 days the
 * notification feed is kept for (NotificationsMongoDbRepository), and what survives an account
 * being deleted (DeleteAccountCommandHandler).
 */
export default function PrivacyPolicy() {
  const { operator, contactEmail, lastUpdated } = legalDetails;

  return (
    <LegalPage title="Privacy policy">
      <p className="updated">Last updated {lastUpdated}</p>
      <p>
        This policy explains what Buqs keeps about you, why, and what you can do
        about it. Buqs is the expense-splitting and budgeting app at buqs.uk and
        on Google Play.
      </p>

      <h2>Who runs Buqs</h2>
      <p>
        Buqs is run by {operator}, who is the data controller. Questions and
        requests go to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>

      <h2>What Buqs keeps</h2>
      <ul>
        <li>
          <strong>Your account.</strong> Your username and email address. If you
          sign in with Google, the ID Google gives us for your account. If you
          use a password, a hash of it, never the password itself.
        </li>
        <li>
          <strong>What you enter.</strong> Groups, expenses, transfers, budgets,
          labels and recurring expenses: amounts, descriptions, dates, who paid
          and who shares.
        </li>
        <li>
          <strong>Locations you attach.</strong> If you add a location to an
          expense, its map position is saved with the expense, along with the
          name and address of the place if you picked one.
        </li>
        <li>
          <strong>Your settings.</strong> Currency, time zone and whether you
          want notifications.
        </li>
        <li>
          <strong>Notifications.</strong> If you turn on push notifications, the
          address your browser or phone gives us to deliver them to. The list of
          notifications in the app is deleted after 60 days.
        </li>
        <li>
          <strong>Contributions.</strong> If you support Buqs through Google
          Play, Google takes the payment. We receive the order reference, the
          product and the time, and never your card or bank details.
        </li>
        <li>
          <strong>Technical records.</strong> Our server logs record requests,
          including IP address and browser or device type, for security and for
          finding faults.
        </li>
      </ul>

      <h2>Your device&apos;s location</h2>
      <p>
        Buqs reads your device&apos;s location only while you are adding a
        location to an expense, and only if you allow it. It is used to show the
        map where you are and to search Google Maps for places nearby. The last
        position is remembered on your device. Our servers store only the
        location you choose to save with an expense.
      </p>

      <h2>What Buqs does not do</h2>
      <p>
        Buqs shows no adverts, does not sell or rent your data, and has no
        advertising or analytics trackers.
      </p>

      <h2>Who can see your data</h2>
      <ul>
        <li>
          <strong>People you share with.</strong> Members of a group see the
          group&apos;s expenses and transfers and each other&apos;s usernames.
          Someone you split an expense with directly sees that expense.
        </li>
        <li>
          <strong>Other Buqs users.</strong> Signed-in users can find your
          username so that they can add you to a group or an expense. Nothing
          else about you is shown to them.
        </li>
        <li>
          <strong>Companies that process data for us.</strong> Google (sign-in,
          Maps, Firebase Cloud Messaging for notifications, and Google Play for
          contributions), MongoDB (database hosting), our server hosting
          provider, Resend (account emails), and the push service of your
          browser&apos;s maker for web notifications.
        </li>
        <li>
          <strong>Authorities</strong>, when the law requires it.
        </li>
      </ul>

      <h2>Why we are allowed to use it</h2>
      <ul>
        <li>
          <strong>To provide the service you asked for:</strong> your account
          and everything you enter.
        </li>
        <li>
          <strong>Legitimate interests:</strong> keeping Buqs secure, and
          keeping shared records accurate for the other people in them.
        </li>
        <li>
          <strong>Your consent:</strong> device location and notifications. You
          can withdraw it at any time in your device or browser settings.
        </li>
      </ul>

      <h2>How long it is kept</h2>
      <p>
        Your data is kept for as long as you have an account. The notification
        list is deleted after 60 days. Server logs are kept only as long as they
        are needed for security and troubleshooting.
      </p>

      <h2>Deleting your account</h2>
      <p>
        You can delete your account at any time from Settings in the app.
        Deletion is immediate and permanent. It removes your account and sign-in
        details, your settings, budgets, labels, notifications and personal
        expenses, and any group that only you are in.
      </p>
      <p>
        Expenses and transfers you shared with other people stay visible to
        those people, because they are their records too. In a group you then
        appear as a guest named after your username. In an expense split
        directly with someone you appear as a deleted user. They are deleted
        once nobody with an account can see them any more.
      </p>
      <p>
        Records of contributions made through Google Play are kept as financial
        records.
      </p>
      <p>
        If you cannot sign in, see{' '}
        <Link to={routes.DELETE_ACCOUNT}>how to delete your account</Link>.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask for a copy of your data, ask us to correct or delete it,
        object to how it is used or ask us to restrict that, and ask for it in a
        form you can take elsewhere. Write to{' '}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. You can also
        complain to the Information Commissioner&apos;s Office at{' '}
        <a href="https://ico.org.uk/make-a-complaint/">
          ico.org.uk/make-a-complaint
        </a>
        .
      </p>

      <h2>Where data is processed</h2>
      <p>
        The companies listed above may process data outside the United Kingdom.
        Where they do, it is under the safeguards UK data protection law
        requires.
      </p>

      <h2>Cookies and storage</h2>
      <p>
        Buqs sets one cookie, which keeps you signed in. It also keeps your
        sign-in token and the last location you allowed in your browser&apos;s
        storage on your device. There are no advertising or tracking cookies.
      </p>

      <h2>Children</h2>
      <p>
        Buqs is not directed at children under 13, and we do not knowingly keep
        data about them.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the new version is posted here with a new date.
      </p>
    </LegalPage>
  );
}
