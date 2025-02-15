import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/AuthPage";
import routes from "./routes";
import GoogleCallback from "./pages/GoogleCallback";
import Protected from "./pages/Protected";
import { APIProvider } from "@vis.gl/react-google-maps";
import config from "./config";
import Home from "./pages/Home/Home";
import Groups from "./pages/Groups/Groups";
import RedirectToActiveGroups from "./routes/RedirectToActiveGroups";
import ArchivedGroups from "./pages/Groups/ArchivedGroups/ArchivedGroups";
import DeletedGroups from "./pages/Groups/DeletedGroups/DeletedGroups";
import ActiveGroups from "./pages/Groups/ActiveGroups/ActiveGroups";

const App: React.FC = () => {
  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <Router>
        <Routes>
          <Route path={routes.AUTH} element={<Auth />} />
          <Route path={routes.GOOGLE_REDIRECT} element={<GoogleCallback />} />
          <Route element={<Protected />}>
            <Route path={routes.ROOT} element={<Home />} />
            <Route path="/groups" element={<Groups />}>
              <Route index element={<RedirectToActiveGroups />} />
              {/*when the /groups rout is matched, it will render whatever is in the RedirectToActiveGroups*/}
              <Route path="active" element={<ActiveGroups />} />
              <Route path="archived" element={<ArchivedGroups />} />
              <Route path="deleted" element={<DeletedGroups />} />
              {/* <Route path="*" element={<RedirectToActiveGroups />} /> */}
              {/*when it lands on /groups/active/whatever it will again land on active groups*/}
            </Route>
            <Route path="*" element={<h1>Lost ?</h1>} />
          </Route>
        </Routes>
      </Router>
    </APIProvider>
  );
};

export default App;
