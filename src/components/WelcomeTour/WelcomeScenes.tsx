import IonIcon from '@reacticons/ionicons';
import PlusBadge from '../Plus/PlusBadge';
import { StyledScene } from './WelcomeScenes.styled';

/**
 * The pictures of the welcome tour, drawn from the app's own parts (rows, chips, avatars, the
 * budget bar) rather than screenshots, so they keep the app's look and never go out of date. Their
 * pieces rise into place when their slide comes into view.
 */

type SceneProps = { active: boolean };

const sceneClass = (name: string, active: boolean) =>
  `scene ${name}${active ? ' active' : ''}`;

export const WelcomeScene = ({ active }: SceneProps) => (
  <StyledScene className={sceneClass('welcome', active)} aria-hidden="true">
    <img className="appIcon piece" src="/icon-192x192.png" alt="" />

    <div className="card floater coffee piece">
      <span className="glyph">
        <IonIcon name="cafe-outline" />
      </span>
      <span className="name">Coffee</span>
      <span className="money">€3.20</span>
    </div>

    <div className="card floater budget piece">
      <span className="sub">Budget</span>
      <span className="bar">
        <span style={{ width: '62%' }} />
      </span>
    </div>

    <div className="card floater owed piece">
      <span className="avatars">
        <span className="avatar">M</span>
        <span className="avatar">E</span>
      </span>
      <span className="sub">You&apos;re owed</span>
      <span className="money owedInk">€12.00</span>
    </div>
  </StyledScene>
);

const LedgerRow = ({
  icon,
  name,
  note,
  amount,
  of,
}: {
  icon: React.ComponentProps<typeof IonIcon>['name'];
  name: string;
  note: string;
  amount: string;
  of?: string;
}) => (
  <div className="row piece">
    <span className="glyph">
      <IonIcon name={icon} />
    </span>
    <span className="rowText">
      <span className="name">{name}</span>
      <span className={`sub${of ? ' share' : ''}`}>{note}</span>
    </span>
    <span className="rowAmount">
      <span className="money youInk">{amount}</span>
      {of ? <span className="sub">of {of}</span> : null}
    </span>
  </div>
);

export const LedgerScene = ({ active }: SceneProps) => (
  <StyledScene className={sceneClass('ledger', active)} aria-hidden="true">
    <div className="card list">
      <div className="listHead piece">
        <span className="sub">This month</span>
        <span className="total">€30.70</span>
      </div>
      <LedgerRow
        icon="cafe-outline"
        name="Coffee"
        note="Yours"
        amount="€3.20"
      />
      <LedgerRow
        icon="restaurant-outline"
        name="Taverna"
        note="Your share · Quick split"
        amount="€15.00"
        of="€30.00"
      />
      <LedgerRow
        icon="cart-outline"
        name="Groceries"
        note="Your share · Flat"
        amount="€12.50"
        of="€50.00"
      />
    </div>
  </StyledScene>
);

export const SharingScene = ({ active }: SceneProps) => (
  <StyledScene className={sceneClass('sharing', active)} aria-hidden="true">
    <div className="card group piece">
      <div className="cardHead">
        <span className="glyph groupGlyph">
          <IonIcon name="people" />
        </span>
        <span className="name">Flat</span>
        <span className="avatars">
          <span className="avatar you">
            <IonIcon name="person" />
          </span>
          <span className="avatar">M</span>
          <span className="avatar">N</span>
        </span>
      </div>
      <div className="line">
        <span className="sub">maria owes you</span>
        <span className="money owedInk">€12.00</span>
      </div>
      <div className="line">
        <span className="sub">You owe nikos</span>
        <span className="money oweInk">€4.50</span>
      </div>
    </div>

    <div className="card quick piece">
      <div className="cardHead">
        <span className="avatars">
          <span className="avatar you">
            <IonIcon name="person" />
          </span>
          <span className="avatar">E</span>
        </span>
        <span className="name">You and eleni</span>
        <span className="tag">Quick split</span>
      </div>
      <div className="line">
        <span className="sub">Taxi · €17.00</span>
        <span className="money youInk">€8.50 each</span>
      </div>
    </div>
  </StyledScene>
);

// A week of spending, Monday first, as fractions of the busiest day.
const WEEK = [0.45, 0.7, 0.3, 0.85, 0.55, 1, 0.4];

export const BudgetScene = ({ active }: SceneProps) => (
  <StyledScene className={sceneClass('budgets', active)} aria-hidden="true">
    <div className="card budgetCard piece">
      <div className="cardHead">
        <span className="sub">November budget</span>
        <PlusBadge />
      </div>
      <div className="figures">
        <span className="figure">€412</span>
        <span className="sub">of €600</span>
      </div>
      <span className="bar big">
        <span style={{ width: '69%' }} />
      </span>
      <div className="line">
        <span className="sub">€188 left</span>
        <span className="sub">12 days to go</span>
      </div>
    </div>

    <div className="card chart piece">
      {WEEK.map((share, day) => (
        <span className="column" key={day}>
          <span className="columnTrack">
            <span className="columnBar" style={{ height: `${share * 100}%` }} />
          </span>
          <span className="columnDay">{'MTWTFSS'[day]}</span>
        </span>
      ))}
    </div>
  </StyledScene>
);

export const NotificationScene = ({ active }: SceneProps) => (
  <StyledScene
    className={sceneClass('notifications', active)}
    aria-hidden="true"
  >
    <div className="notification piece">
      <span className="appGlyph">
        <IonIcon name="card" />
      </span>
      <span className="notificationText">
        <span className="notificationTop">
          <span className="appName">Your bank</span>
          <span className="sub">· now</span>
        </span>
        <span className="name">Payment</span>
        <span className="sub">You paid €12.40 at Bakery</span>
      </span>
    </div>

    <span className="flow piece">
      <IonIcon name="arrow-down" />
    </span>

    <div className="card reviewRow piece">
      <IonIcon name="checkmark-circle" className="tick" />
      <span className="reviewText">
        <span className="name">Bakery</span>
        <span className="chips">
          <span className="chip">Personal</span>
          <span className="chip">Label</span>
        </span>
      </span>
      <span className="money">€12.40</span>
    </div>
  </StyledScene>
);
