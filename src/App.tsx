import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/AuthPage";
import routes from "./routes";
import GoogleCallback from "./pages/GoogleCallback";
import Home from "./pages/Home/Home";
import Groups from "./pages/Groups/Groups";
import RedirectToActiveGroups from "./routes/RedirectToActiveGroups";
import ArchivedGroups from "./pages/Groups/ArchivedGroups/ArchivedGroups";
import ActiveGroups from "./pages/Groups/ActiveGroups/ActiveGroups";
import RedirectToExpenses from "./routes/RedirectToExpenses";
import Group from "./pages/Group/Group";
import Expenses from "./pages/Expenses/Expenses";
import Transfers from "./pages/Transfers/Transfers";
import Members from "./pages/Members/Members";

import Join from "./pages/Join";
import Protected from "./pages/Protected/Protected";


const App = ( ) => {
  return (
    <Router>
      <Routes>
        <Route path={routes.AUTH} element={<Auth />} />
        <Route path={routes.GOOGLE_REDIRECT} element={<GoogleCallback />} />
        <Route element={<Protected />}>
          <Route path={routes.ROOT} element={<Home />} />
          <Route path={routes.JOIN} element={<Join />} />
          <Route path="/groups" element={<Groups />}>
            <Route index element={<RedirectToActiveGroups />} />
            <Route path="active" element={<ActiveGroups />} />
            <Route path="archived" element={<ArchivedGroups />} />
          </Route>
          <Route path="/groups/active/:groupid" element={<Group />}>
            <Route index element={<RedirectToExpenses />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="debts" element={<Members />} />
            <Route path="*" element={<RedirectToExpenses />} />
          </Route>
          <Route path="*" element={<h1>Lost ?</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
