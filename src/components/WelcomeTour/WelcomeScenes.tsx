import homeScreen from './screens/home.webp';
import personalScreen from './screens/personal.webp';
import debtsScreen from './screens/debts.webp';
import budgetScreen from './screens/budget.webp';
import paymentsScreen from './screens/payments.webp';
import { StyledScene } from './WelcomeScenes.styled';

/**
 * The pictures of the welcome tour: captures of the app's own screens, each cropped to the part its
 * slide is about, so the tour shows nothing the app doesn't. They are taken at twice the size they
 * are shown, and need retaking when those screens change. A picture rises in when its slide is first
 * reached.
 */

type SceneProps = { active: boolean };

const Screen = ({ src, active }: SceneProps & { src: string }) => (
  <StyledScene className={active ? 'active' : undefined} aria-hidden="true">
    <img
      className="screen"
      src={src}
      srcSet={`${src} 2x`}
      alt=""
      decoding="async"
      draggable={false}
    />
  </StyledScene>
);

// Home: where everything is.
export const WelcomeScene = ({ active }: SceneProps) => (
  <Screen src={homeScreen} active={active} />
);

// The personal ledger: expenses that are yours alone, and your shares of group ones.
export const LedgerScene = ({ active }: SceneProps) => (
  <Screen src={personalScreen} active={active} />
);

// A trip's debts: who owes whom.
export const SharingScene = ({ active }: SceneProps) => (
  <Screen src={debtsScreen} active={active} />
);

// A monthly budget: what's spent and what's left.
export const BudgetScene = ({ active }: SceneProps) => (
  <Screen src={budgetScreen} active={active} />
);

// The window where payments from notifications wait to be added.
export const NotificationScene = ({ active }: SceneProps) => (
  <Screen src={paymentsScreen} active={active} />
);
