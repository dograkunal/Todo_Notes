import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../../../utils/Loader/index";
import Dashboard from "./toDoFunctions/index";
import EditModal from "./toDoFunctions/editModal";

function DashboardRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Suspense fallback={<Loader />}>
              <EditModal />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default DashboardRoutes;
