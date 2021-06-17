import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreProvider } from "../store/reducer";
import { UIStoreProvider } from "../uiStore/reducer";
import path from "../utils/path";
import HomePage from "../layouts/Home";
import StudentsListPage from "../layouts/StudentsList";
import RollCallSystemPage from "../layouts/RollCallSystem";
import FullAttendanceListPage from "../layouts/FullAttendanceList";

const Routes = () => {
  return (
    <UIStoreProvider>
      <StoreProvider>
        <Router>
          <Switch>
            {/* 專注度統計 */}
            <Route exact path={path.home} component={HomePage} />
            {/* 學生名單 */}
            <Route
              exact
              path={path.studentsList}
              component={StudentsListPage}
            />
            {/* 點名系統 */}
            <Route
              exact
              path={path.rollCallSystem}
              component={RollCallSystemPage}
            />
            {/* 完整點名系統 */}
            <Route
              exact
              path={path.fullAttendanceList}
              component={FullAttendanceListPage}
            />
          </Switch>
        </Router>
      </StoreProvider>
    </UIStoreProvider>
  );
};

export default Routes;
