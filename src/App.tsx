import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./pages/Auth/AuthPage";
import routes from "./routes";
import GoogleCallback from "./pages/GoogleCallback";
import Home from "./pages/Home/Home";
import Groups from "./pages/Groups/Groups";
import RedirectToExpenses from "./routes/RedirectToExpenses";
import Group from "./pages/Group/Group";
import Expenses from "./pages/Expenses/Expenses";
import Transfers from "./pages/Transfers/Transfers";
import Members from "./pages/Members/Members";
import Protected from "./pages/Protected/Protected";
import Analytics from "./pages/Analytics/Analytics";
import RedirectToAnalytics from "./routes/RedirectToAnalytics";
import CurrentBudget from "./pages/Budget/CurrentBudget/CurrentBudget";
import CreateBudget from "./pages/Budget/CreateBudget/CreateBudget";
import Budget from "./pages/Budget/Budget";
import RedirectToBudget from "./routes/RedirectToBudget";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import GenerateInvitationCode from "./pages/GenerateInvitationCode/GenerateInvitationCode";
import Groups2 from "./pages/Groups/Groups2";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.AUTH} element={<Auth />} />
        <Route path = {routes.CREATE} element={<CreateAccount/>}/>
        <Route path={routes.GOOGLE_REDIRECT} element={<GoogleCallback />} />
        <Route element={<Protected />}>
          <Route path={routes.ROOT} element={<Home />} />
          <Route path={routes.JOIN} element={<Home />} />
          <Route path="/shared" element={<Groups2 />} />
          <Route path="/shared/generatecode/:groupid" element={<GenerateInvitationCode/>}/>
          <Route path="/shared/:groupid" element={<Group />}>
            <Route index element={<RedirectToExpenses />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="debts" element={<Members />} />
            <Route path="*" element={<RedirectToExpenses />} />
          </Route>

          <Route path="/analytics/*" element={<RedirectToAnalytics />} />
          <Route path="/analytics" element={<Analytics />} />

          <Route path="/budget" element={<Budget />}>
            <Route index element={<RedirectToBudget />} />
            <Route path="current" element={<CurrentBudget />} />
            <Route path="create" element={<CreateBudget />} />
            <Route path="*" element={<RedirectToBudget />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="*" element={<h1>Lost ?</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
