import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Auth from './pages/Auth/AuthPage';
import routes from './routes';
import GoogleCallback from './pages/GoogleCallback';
import Home2 from './pages/Home2/Home2';
import RedirectToExpenses from './routes/RedirectToExpenses';
import Group from './pages/TransactionsWrappers/Group';
import Expenses from './pages/Expenses/Expenses';
import Transfers from './pages/Transfers/Transfers';
import Members from './pages/Members/Members';
import Protected from './pages/Protected/Protected';
import Analytics from './pages/Analytics/Analytics';
import RedirectToAnalytics from './routes/RedirectToAnalytics';
import CreateBudget from './pages/Budget/CreateBudget/CreateBudget';
import Budget from './pages/Budget/Budget';
import RedirectToBudget from './routes/RedirectToBudget';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import GenerateInvitationCode from './pages/GenerateInvitationCode/GenerateInvitationCode';
import Shared from './pages/Groups/Shared';
import RedirectToNonGroupExpenses from './routes/RedirectToNonGroupExpenses';
import NonGroup from './pages/TransactionsWrappers/NonGroup';
import { Personal } from './pages/Personal/Personal';
import { BudgetActions } from './pages/Budget/BudgetActions/BudgetActions';
import { ManageBudgets } from './pages/Budget/ManageBudgets/ManageBudgets';
import { PwaInstallPrompt } from './components/PwaInstallPrompt/PwaInstallPrompt';
import { PrometheusWelcome } from './pages/Prometheus/Welcome/Welcome';
import { PrometheusSetup } from './pages/Prometheus/Setup/Setup';
import { PrometheusCorrelation } from './pages/Prometheus/Correlation/Correlation';
import { PrometheusProvider } from './pages/Prometheus/PrometheusProvider';

const App = () => {
  return (
    <>
      <Router>
      <Routes>
        <Route path={routes.AUTH} element={<Auth />} />
        <Route path={routes.CREATE} element={<CreateAccount />} />
        <Route path={routes.GOOGLE_REDIRECT} element={<GoogleCallback />} />
        <Route element={<Protected />}>
          <Route path={routes.ROOT} element={<Home2 />} />
          <Route path={routes.JOIN} element={<Home2 />} />
          <Route path="/shared" element={<Shared />} />
          <Route
            path="/shared/generatecode/:groupid"
            element={<GenerateInvitationCode />}
          />

          <Route path="/shared/:groupid" element={<Group />}>
            <Route index element={<RedirectToExpenses />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="debts" element={<Members />} />
            <Route path="*" element={<RedirectToExpenses />} />
          </Route>

          <Route path="/shared/nongroup" element={<NonGroup />}>
            <Route index element={<RedirectToNonGroupExpenses />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="debts" element={<Members />} />
            <Route path="*" element={<RedirectToNonGroupExpenses />} />
          </Route>

          <Route path="/personal" element={<Personal />}>
            <Route index element={<Expenses />} />
          </Route>

          <Route path="/analytics/*" element={<RedirectToAnalytics />} />
          <Route path="/analytics" element={<Analytics />} />

          <Route path="/budget" element={<Budget />}>
            <Route index element={<RedirectToBudget />} />
            <Route path="create" element={<CreateBudget />} />
            <Route path="actions" element={<BudgetActions />} />
            <Route path="manage" element={<ManageBudgets />} />
            <Route path="*" element={<RedirectToBudget />} />
          </Route>

          <Route element={<PrometheusProvider />}>
            <Route
              path={routes.PROMETHEUS_WELCOME}
              element={<PrometheusWelcome />}
            />
            <Route
              path={routes.PROMETHEUS_SETUP}
              element={<PrometheusSetup />}
            />
            <Route
              path={routes.PROMETHEUS_CORRELATION}
              element={<PrometheusCorrelation />}
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="*" element={<h1>Lost ?</h1>} />
      </Routes>
    </Router>
    <PwaInstallPrompt />
    </>
  );
};

export default App;
