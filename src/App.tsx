import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Auth from './pages/Auth/AuthPage';
import routes from './routes';
import GoogleCallback from './pages/GoogleCallback';
import Home from './pages/Home/Home';
import RedirectToExpenses from './routes/RedirectToExpenses';
import RedirectToAnalytics from './routes/RedirectToAnalytics';
import RedirectToBudget from './routes/RedirectToBudget';
import RedirectToNonGroupExpenses from './routes/RedirectToNonGroupExpenses';
import Protected from './pages/Protected/Protected';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Spinner from './components/Spinner/Spinner';
import { PwaInstallPrompt } from './components/PwaInstallPrompt/PwaInstallPrompt';
import {
  Group,
  NonGroup,
  Expenses,
  Transfers,
  Members,
  Analytics,
  Budget,
  CreateBudget,
  Shared,
  GenerateInvitationCode,
  Personal,
  BudgetActions,
  ManageBudgets,
} from './lazyRoutes';

const SuspenseFallback = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
    }}
  >
    <Spinner />
  </div>
);

const App = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            <Route path={routes.AUTH} element={<Auth />} />
            <Route path={routes.CREATE} element={<CreateAccount />} />
            <Route path={routes.GOOGLE_REDIRECT} element={<GoogleCallback />} />
            <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
            <Route element={<Protected />}>
              <Route path={routes.ROOT} element={<Home />} />
              <Route path={routes.JOIN} element={<Home />} />
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

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="*" element={<h1>Lost ?</h1>} />
          </Routes>
        </Suspense>
      </Router>
      <PwaInstallPrompt />
    </>
  );
};

export default App;
