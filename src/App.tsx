import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/AuthPage";
import routes from "./routes";
import GoogleCallback from "./pages/GoogleCallback";
import GroupSelection from "./pages/GroupSelection";
import Group from "./pages/Group";
import Protected from "./pages/Protected";
import { APIProvider } from "@vis.gl/react-google-maps";
import config from "./config";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyles from "./styles/global";
import "./App.css";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <APIProvider apiKey={config.googleMapsApiKey}>
          <Router>
            <Routes>
              <Route element={<Protected />}>
                <Route path={routes.ROOT} element={<GroupSelection />} />
                <Route path=":groupId" element={<Group />} />
                <Route path="*" element={<h1>Lost ?</h1>} />
              </Route>
              <Route
                path={routes.GOOGLE_REDIRECT}
                element={<GoogleCallback />}
              />
              <Route path={routes.AUTH} element={<Auth />} />
            </Routes>
          </Router>
        </APIProvider>
      </>
    </ThemeProvider>
  );
};

export default App;
