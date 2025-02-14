import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/AuthPage";
import routes from "./routes";
import GoogleCallback from "./pages/GoogleCallback";
import Protected from "./pages/Protected";
import { APIProvider } from "@vis.gl/react-google-maps";
import config from "./config";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <Router>
        <Routes>
          <Route path={routes.AUTH} element={<Auth />} />
          <Route path={routes.GOOGLE_REDIRECT} element={<GoogleCallback />} />
          <Route element={<Protected />}>
            <Route path={routes.ROOT} element={<Home />} />
            {/* <Route path="/groups" element={<Groups />}/> */}
            {/* <Route path=":groupId" element={<Group />} /> */}
            <Route path="*" element={<h1>Lost ?</h1>} />
          </Route>
        </Routes>
      </Router>
    </APIProvider>
  );
};

export default App;
