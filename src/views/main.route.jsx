import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/login/Login";
import Register from "./components/Authentication/register/Register";
import Dashboard from "./components/Dashboard";
import PublicRoute from "../utils/auth/PublicRoute";
import PrivateRoute from "../utils/auth/PrivateRoute";
import Loader from "../utils/Loader";

function MainRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            {/* loader will work if Login page took longer than expected */}
            <PublicRoute>
              <Login />
            </PublicRoute>
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Loader />}>
            <PublicRoute>
              <Register />
            </PublicRoute>
          </Suspense>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          </Suspense>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
