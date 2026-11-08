import coffeeRow from './pieces/coffee-row.webp';
import owedRecent from './pieces/owed-recent.webp';
import budgetingCard from './pieces/budgeting-card.webp';
import cinemaRow from './pieces/cinema-row.webp';
import pizzaShareRow from './pieces/pizza-share-row.webp';
import cleaningShareRow from './pieces/cleaning-share-row.webp';
import youOwedCard from './pieces/you-owed-card.webp';
import pizzaGroupRow from './pieces/pizza-group-row.webp';
import trendsChart from './pieces/trends-chart.webp';
import coffeeReviewRow from './pieces/coffee-review-row.webp';
import pizzaReviewRow from './pieces/pizza-review-row.webp';
import { StyledScene } from './WelcomeScenes.styled';

/**
 * The pictures of the welcome tour: pieces of the app itself (an expense row, the budget card, a
 * trip's debts, a payment waiting to be added), cut from captures of its screens and floating over a
 * soft light. Nothing in them is drawn, so the tour shows only what the app has; they need cutting
 * again when those screens change. The pieces rise into place when their slide is first reached.
 */

type SceneProps = { active: boolean };

const sceneClass = (name: string, active: boolean) =>
  `scene ${name}${active ? ' active' : ''}`;

// Cut at twice the size they are shown.
const Piece = ({ src, className }: { src: string; className: string }) => (
  <img
    className={`piece ${className}`}
    src={src}
    srcSet={`${src} 2x`}
    alt=""
    decoding="async"
    draggable={false}
  />
);

export const WelcomeScene = ({ active }: SceneProps) => (
  <StyledScene className={sceneClass('welcome', active)} aria-hidden="true">
    <img className="appIcon piece" src="/icon-192x192.png" alt="" />
    <Piece src={coffeeRow} className="floater coffee" />
    <Piece src={budgetingCard} className="floater budget" />
    <Piece src={owedRecent} className="floater owed" />
  </StyledScene>
);

// Your Expenses: a cinema ticket of your own, then your shares of two group expenses.
export const LedgerScene = ({ active }: SceneProps) => (
  <StyledScene className={sceneClass('ledger', active)} aria-hidden="true">
    <Piece src={cinemaRow} className="row" />
    <Piece src={pizzaShareRow} className="row" />
    <Piece src={cleaningShareRow} className="row" />
  </StyledScene>
);

// A trip's debts, and a group expense with your share of it.
export const SharingScene = ({ active }: SceneProps) => (
  <StyledScene className={sceneClass('sharing', active)} aria-hidden="true">
    <Piece src={youOwedCard} className="debts" />
    <Piece src={pizzaGroupRow} className="groupRow" />
  </StyledScene>
);

// The home screen's budget card, and the month's spending trend.
export const BudgetScene = ({ active }: SceneProps) => (
  <StyledScene className={sceneClass('budgets', active)} aria-hidden="true">
    <Piece src={budgetingCard} className="budgetCard" />
    <Piece src={trendsChart} className="chart" />
  </StyledScene>
);

// Two payments from notifications, waiting to be added: one to personal, one to a group.
export const NotificationScene = ({ active }: SceneProps) => (
  <StyledScene
    className={sceneClass('notifications', active)}
    aria-hidden="true"
  >
    <Piece src={coffeeReviewRow} className="reviewRow" />
    <Piece src={pizzaReviewRow} className="reviewRow" />
  </StyledScene>
);
