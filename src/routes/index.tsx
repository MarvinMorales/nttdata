import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { dashboard, homeRoute } from "./routesConfig";
import GlobalLayout from "../containers/GlobalLayout";
import HomePage from "../containers/HomePage";
import DashboardPage from "../containers/DashboardPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={homeRoute} element={<HomePage />} />
        <Route path={homeRoute} element={<GlobalLayout />}>
          <Route path={dashboard} element={<DashboardPage />}/>
        </Route>
      </Routes>
    </Router>
  );
}