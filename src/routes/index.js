import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "../store/reducer";
import path from "../utils/path";
import HomePage from "../layouts/Home";

const Routes = () => {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          {/* 首頁 */}
          <Route exact path={path.home} component={HomePage} />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default Routes;
